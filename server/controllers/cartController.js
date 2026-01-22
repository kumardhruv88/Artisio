/**
 * Cart Controller - Enhanced with totals calculation
 */

import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get cart with calculated totals
// @route   GET /api/cart
export const getCart = async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        const sessionId = req.headers['x-session-id'];

        let cart;
        if (clerkId) {
            cart = await Cart.findOne({ clerkId }).populate({
                path: 'items.product',
                select: 'name slug price salePrice images stock status'
            });
        } else if (sessionId) {
            cart = await Cart.findOne({ sessionId }).populate({
                path: 'items.product',
                select: 'name slug price salePrice images stock status'
            });
        }

        if (!cart) {
            return res.json({
                success: true,
                data: {
                    items: [],
                    subtotal: 0,
                    discount: 0,
                    tax: 0,
                    shipping: 0,
                    total: 0,
                    count: 0
                }
            });
        }

        // Calculate totals
        const totals = cart.calculateTotals();

        res.json({
            success: true,
            data: {
                items: cart.items,
                promoCode: cart.promoCode,
                ...totals,
                count: cart.items.length
            }
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
export const addToCart = async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        const sessionId = req.headers['x-session-id'];
        const { productId, quantity = 1, variant } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        // Verify product exists and get price
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // Find or create cart
        const identifier = clerkId || sessionId;
        if (!identifier) {
            return res.status(400).json({
                success: false,
                message: 'Session ID required for guest users'
            });
        }

        let cart = await Cart.getOrCreate(identifier);

        // Get current price
        const price = product.salePrice || product.price;

        // Check if item already exists
        const existingItem = cart.items.find(
            item => item.product.toString() === productId && item.variant === variant
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                variant,
                price
            });
        }

        await cart.save();

        // Populate and return
        cart = await Cart.findById(cart._id).populate({
            path: 'items.product',
            select: 'name slug price salePrice images stock status'
        });

        const totals = cart.calculateTotals();

        res.json({
            success: true,
            message: 'Item added to cart',
            data: {
                items: cart.items,
                ...totals,
                count: cart.items.length
            }
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
export const updateCartItem = async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        const sessionId = req.headers['x-session-id'];
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (quantity < 0) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be positive'
            });
        }

        const query = clerkId ? { clerkId } : { sessionId };
        const cart = await Cart.findOne(query);

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const item = cart.items.id(itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        if (quantity === 0) {
            cart.items.pull(itemId);
        } else {
            item.quantity = quantity;
        }

        await cart.save();

        const updatedCart = await Cart.findById(cart._id).populate({
            path: 'items.product',
            select: 'name slug price salePrice images stock status'
        });

        const totals = updatedCart.calculateTotals();

        res.json({
            success: true,
            data: {
                items: updatedCart.items,
                ...totals,
                count: updatedCart.items.length
            }
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
export const removeFromCart = async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        const sessionId = req.headers['x-session-id'];
        const { itemId } = req.params;

        const query = clerkId ? { clerkId } : { sessionId };
        const cart = await Cart.findOne(query);

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items.pull(itemId);
        await cart.save();

        const updatedCart = await Cart.findById(cart._id).populate({
            path: 'items.product',
            select: 'name slug price salePrice images stock status'
        });

        const totals = updatedCart.calculateTotals();

        res.json({
            success: true,
            message: 'Item removed from cart',
            data: {
                items: updatedCart.items,
                ...totals,
                count: updatedCart.items.length
            }
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
export const clearCart = async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        const sessionId = req.headers['x-session-id'];

        const query = clerkId ? { clerkId } : { sessionId };
        const cart = await Cart.findOne(query);

        if (cart) {
            cart.items = [];
            cart.promoCode = undefined;
            await cart.save();
        }

        res.json({
            success: true,
            message: 'Cart cleared',
            data: {
                items: [],
                subtotal: 0,
                discount: 0,
                tax: 0,
                shipping: 0,
                total: 0,
                count: 0
            }
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Apply promo code
// @route   POST /api/cart/promo
export const applyPromoCode = async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        const sessionId = req.headers['x-session-id'];
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: 'Promo code is required'
            });
        }

        const query = clerkId ? { clerkId } : { sessionId };
        const cart = await Cart.findOne(query);

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // Mock promo codes (TODO: Replace with database lookup)
        const promoCodes = {
            'WELCOME10': { discount: 10, type: 'percentage' },
            'SAVE20': { discount: 20, type: 'percentage' },
            'SAVE5': { discount: 5, type: 'fixed' },
            'FREESHIP': { discount: 15, type: 'fixed' }
        };

        const promo = promoCodes[code.toUpperCase()];

        if (!promo) {
            return res.status(400).json({
                success: false,
                message: 'Invalid promo code'
            });
        }

        cart.promoCode = {
            code: code.toUpperCase(),
            discount: promo.discount,
            type: promo.type
        };

        await cart.save();
        const totals = cart.calculateTotals();

        res.json({
            success: true,
            message: `Promo code ${code.toUpperCase()} applied!`,
            data: {
                promoCode: cart.promoCode,
                ...totals
            }
        });
    } catch (error) {
        console.error('Apply promo code error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Remove promo code
// @route   DELETE /api/cart/promo
export const removePromoCode = async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        const sessionId = req.headers['x-session-id'];

        const query = clerkId ? { clerkId } : { sessionId };
        const cart = await Cart.findOne(query);

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.promoCode = undefined;
        await cart.save();

        const totals = cart.calculateTotals();

        res.json({
            success: true,
            message: 'Promo code removed',
            data: { ...totals }
        });
    } catch (error) {
        console.error('Remove promo code error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Merge guest cart into user cart after login
// @route   POST /api/cart/merge
export const mergeCart = async (req, res) => {
    try {
        const clerkId = req.auth?.userId;
        const { sessionId } = req.body;

        if (!clerkId) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (!sessionId) {
            return res.json({ success: true, message: 'No guest cart to merge' });
        }

        const guestCart = await Cart.findOne({ sessionId });
        if (!guestCart || guestCart.items.length === 0) {
            return res.json({ success: true, message: 'No items to merge' });
        }

        let userCart = await Cart.findOne({ clerkId });

        if (!userCart) {
            // Convert guest cart to user cart
            guestCart.clerkId = clerkId;
            guestCart.sessionId = undefined;
            guestCart.expiresAt = undefined;
            await guestCart.save();

            const totals = guestCart.calculateTotals();

            return res.json({
                success: true,
                message: 'Cart transferred',
                data: {
                    items: guestCart.items,
                    ...totals,
                    count: guestCart.items.length
                }
            });
        }

        // Merge items
        for (const guestItem of guestCart.items) {
            const existingItem = userCart.items.find(
                item => item.product.toString() === guestItem.product.toString() &&
                    item.variant === guestItem.variant
            );

            if (existingItem) {
                existingItem.quantity += guestItem.quantity;
            } else {
                userCart.items.push(guestItem);
            }
        }

        await userCart.save();
        await Cart.findByIdAndDelete(guestCart._id);

        const mergedCart = await Cart.findById(userCart._id).populate({
            path: 'items.product',
            select: 'name slug price salePrice images stock status'
        });

        const totals = mergedCart.calculateTotals();

        res.json({
            success: true,
            message: 'Carts merged successfully',
            data: {
                items: mergedCart.items,
                ...totals,
                count: mergedCart.items.length
            }
        });
    } catch (error) {
        console.error('Merge cart error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
