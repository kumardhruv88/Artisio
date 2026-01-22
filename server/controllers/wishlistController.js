import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.userId })
            .populate({
                path: 'products.productId',
                select: 'name slug price salePrice images rating stock status'
            });

        if (!wishlist) {
            return res.json({
                success: true,
                data: {
                    products: [],
                    count: 0
                }
            });
        }

        // Filter out any null products (in case product was deleted)
        const validProducts = wishlist.products.filter(item => item.productId !== null);

        res.json({
            success: true,
            data: {
                products: validProducts,
                count: validProducts.length
            }
        });
    } catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching wishlist',
            error: error.message
        });
    }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
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

        // Get or create wishlist
        const wishlist = await Wishlist.getOrCreate(req.userId);

        // Add product
        const added = wishlist.addProduct(productId);

        if (!added) {
            return res.status(400).json({
                success: false,
                message: 'Product already in wishlist'
            });
        }

        await wishlist.save();

        // Populate and return
        await wishlist.populate({
            path: 'products.productId',
            select: 'name slug price salePrice images rating stock status'
        });

        res.status(201).json({
            success: true,
            message: 'Product added to wishlist',
            data: {
                products: wishlist.products,
                count: wishlist.products.length
            }
        });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding to wishlist',
            error: error.message
        });
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: req.userId });

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: 'Wishlist not found'
            });
        }

        const removed = wishlist.removeProduct(productId);

        if (!removed) {
            return res.status(404).json({
                success: false,
                message: 'Product not in wishlist'
            });
        }

        await wishlist.save();

        res.json({
            success: true,
            message: 'Product removed from wishlist',
            data: {
                count: wishlist.products.length
            }
        });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing from wishlist',
            error: error.message
        });
    }
};

// @desc    Clear entire wishlist
// @route   DELETE /api/wishlist
// @access  Private
export const clearWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.userId });

        if (!wishlist) {
            return res.json({
                success: true,
                message: 'Wishlist already empty'
            });
        }

        wishlist.products = [];
        await wishlist.save();

        res.json({
            success: true,
            message: 'Wishlist cleared'
        });
    } catch (error) {
        console.error('Clear wishlist error:', error);
        res.status(500).json({
            success: false,
            message: 'Error clearing wishlist',
            error: error.message
        });
    }
};

// @desc    Check if product is in wishlist
// @route   GET /api/wishlist/check/:productId
// @access  Private
export const checkInWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: req.userId });

        if (!wishlist) {
            return res.json({
                success: true,
                data: { inWishlist: false }
            });
        }

        const inWishlist = wishlist.products.some(
            item => item.productId.toString() === productId
        );

        res.json({
            success: true,
            data: { inWishlist }
        });
    } catch (error) {
        console.error('Check wishlist error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking wishlist',
            error: error.message
        });
    }
};
