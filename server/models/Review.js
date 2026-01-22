/**
 * Review Model - Product reviews and ratings
 */

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true
    },
    user: {
        type: String, // Clerk user ID
        required: true,
        index: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    images: [{
        url: String,
        public_id: String
    }],
    // Verified purchase
    verifiedPurchase: {
        type: Boolean,
        default: false
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    // Helpful votes
    helpful: {
        type: Number,
        default: 0
    },
    helpfulVotes: [{
        user: String,
        vote: {
            type: String,
            enum: ['helpful', 'not-helpful']
        }
    }],
    // Moderation
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'approved' // Auto-approve for now
    },
    moderatorNote: String,
    // Admin response
    response: {
        text: String,
        respondedBy: String,
        respondedAt: Date
    }
}, {
    timestamps: true
});

// Indexes for queries
reviewSchema.index({ product: 1, user: 1 }, { unique: true }); // One review per user per product
reviewSchema.index({ product: 1, status: 1, createdAt: -1 });
reviewSchema.index({ rating: 1 });

// Update product rating after review save/update/delete
reviewSchema.post('save', async function () {
    await this.constructor.updateProductRating(this.product);
});

reviewSchema.post('remove', async function () {
    await this.constructor.updateProductRating(this.product);
});

// Static method to calculate and update product rating
reviewSchema.statics.updateProductRating = async function (productId) {
    const Product = mongoose.model('Product');

    const stats = await this.aggregate([
        {
            $match: {
                product: productId,
                status: 'approved'
            }
        },
        {
            $group: {
                _id: '$product',
                averageRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 },
                ratingDistribution: {
                    $push: '$rating'
                }
            }
        }
    ]);

    if (stats.length > 0) {
        const { averageRating, totalReviews } = stats[0];

        // Calculate rating distribution
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        stats[0].ratingDistribution.forEach(rating => {
            distribution[rating]++;
        });

        await Product.findByIdAndUpdate(productId, {
            rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
            reviewCount: totalReviews,
            ratingDistribution: distribution
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            rating: 0,
            reviewCount: 0,
            ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        });
    }
};

// Method to mark review as helpful
reviewSchema.methods.markHelpful = function (userId, vote) {
    // Remove previous vote from same user
    this.helpfulVotes = this.helpfulVotes.filter(v => v.user !== userId);

    // Add new vote
    this.helpfulVotes.push({ user: userId, vote });

    // Calculate helpful count (helpful - not-helpful)
    const helpfulCount = this.helpfulVotes.filter(v => v.vote === 'helpful').length;
    const notHelpfulCount = this.helpfulVotes.filter(v => v.vote === 'not-helpful').length;
    this.helpful = helpfulCount - notHelpfulCount;
};

export default mongoose.model('Review', reviewSchema);
