/**
 * Review Controller - Product reviews and ratings
 */

import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const { sort = '-createdAt', page = 1, limit = 10 } = req.query;

        const reviews = await Review.find({
            product: productId,
            status: 'approved'
        })
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean();

        const count = await Review.countDocuments({
            product: productId,
            status: 'approved'
        });

        // Get rating statistics
        const stats = await Review.aggregate([
            {
                $match: {
                    product: mongoose.Types.ObjectId(productId),
                    status: 'approved'
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 },
                    distribution: {
                        $push: '$rating'
                    }
                }
            }
        ]);

        let ratingStats = {
            averageRating: 0,
            totalReviews: 0,
            distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };

        if (stats.length > 0) {
            ratingStats.averageRating = Math.round(stats[0].averageRating * 10) / 10;
            ratingStats.totalReviews = stats[0].totalReviews;

            stats[0].distribution.forEach(rating => {
                ratingStats.distribution[rating]++;
            });
        }

        res.json({
            success: true,
            data: {
                reviews,
                stats: ratingStats,
                pagination: {
                    page: parseInt(page),
                    pages: Math.ceil(count / limit),
                    total: count
                }
            }
        });
    } catch (error) {
        console.error('Get reviews error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/user
// @access  Private
export const getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.userId })
            .populate('product', 'name slug images')
            .sort('-createdAt');

        res.json({
            success: true,
            data: reviews
        });
    } catch (error) {
        console.error('Get user reviews error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
    try {
        const { productId, rating, title, comment, orderId } = req.body;

        // Validate input
        if (!productId || !rating || !title || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            product: productId,
            user: req.userId
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product'
            });
        }

        // Check if verified purchase (if orderId provided)
        let verifiedPurchase = false;
        if (orderId) {
            const order = await Order.findOne({
                _id: orderId,
                user: req.userId,
                'items.product': productId
            });
            verifiedPurchase = !!order;
        }

        // Create review
        const review = await Review.create({
            product: productId,
            user: req.userId,
            userName: req.user?.fullName || req.user?.firstName || 'Anonymous',
            userEmail: req.user?.emailAddresses?.[0]?.emailAddress || '',
            rating,
            title,
            comment,
            verifiedPurchase,
            orderId: orderId || undefined
        });

        // Product rating will be updated automatically via post-save hook

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully',
            data: review
        });
    } catch (error) {
        console.error('Create review error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
    try {
        const { rating, title, comment } = req.body;

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check ownership
        if (review.user !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this review'
            });
        }

        // Update fields
        if (rating) review.rating = rating;
        if (title) review.title = title;
        if (comment) review.comment = comment;

        await review.save();

        res.json({
            success: true,
            message: 'Review updated successfully',
            data: review
        });
    } catch (error) {
        console.error('Update review error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        // Check ownership
        if (review.user !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this review'
            });
        }

        const productId = review.product;
        await review.remove();

        // Update product rating
        await Review.updateProductRating(productId);

        res.json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        console.error('Delete review error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Mark review as helpful/not helpful
// @route   POST /api/reviews/:id/helpful
// @access  Private
export const markHelpful = async (req, res) => {
    try {
        const { vote } = req.body; // 'helpful' or 'not-helpful'

        if (!['helpful', 'not-helpful'].includes(vote)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid vote type'
            });
        }

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        review.markHelpful(req.userId, vote);
        await review.save();

        res.json({
            success: true,
            message: 'Thank you for your feedback',
            data: {
                helpful: review.helpful
            }
        });
    } catch (error) {
        console.error('Mark helpful error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Check if user can review product
// @route   GET /api/reviews/can-review/:productId
// @access  Private
export const canReview = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check if already reviewed
        const existingReview = await Review.findOne({
            product: productId,
            user: req.userId
        });

        if (existingReview) {
            return res.json({
                success: true,
                data: {
                    canReview: false,
                    reason: 'already_reviewed',
                    existingReview
                }
            });
        }

        // Check if purchased (optional - you can make this required)
        const hasPurchased = await Order.findOne({
            user: req.userId,
            'items.product': productId,
            status: { $in: ['delivered', 'completed'] }
        });

        res.json({
            success: true,
            data: {
                canReview: true,
                verifiedPurchase: !!hasPurchased
            }
        });
    } catch (error) {
        console.error('Can review error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
