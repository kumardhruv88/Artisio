/**
 * Order Controller - Handles order operations
 */

import Order from '../models/Order.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            shippingMethod,
            paymentMethod,
            discountCode,
            isGift,
            giftMessage,
            giftWrapping,
            customerNotes
        } = req.body;

        const clerkId = req.auth?.clerkId;

        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Calculate shipping
        const shippingCosts = {
            standard: subtotal >= 50 ? 0 : 5.99,
            express: 14.99,
            overnight: 29.99,
            pickup: 0
        };
        const shippingCost = shippingCosts[shippingMethod] || 5.99;

        // Calculate tax (8%)
        const tax = Math.round(subtotal * 0.08 * 100) / 100;

        // Gift wrapping
        const giftCost = giftWrapping ? 5 : 0;

        // TODO: Apply discount code
        const discount = 0;

        const total = subtotal + shippingCost + tax + giftCost - discount;

        // Find user if logged in
        let user = null;
        if (clerkId) {
            user = await User.findOne({ clerkId });
        }

        // Create order
        const order = new Order({
            user: user?._id,
            clerkId,
            guestEmail: !clerkId ? req.body.email : undefined,
            items: items.map(item => ({
                product: item.productId,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                variant: item.variant,
                subtotal: item.price * item.quantity
            })),
            subtotal,
            discount,
            discountCode,
            shippingCost,
            tax,
            total,
            shippingAddress,
            shippingMethod,
            paymentMethod,
            isGift,
            giftMessage,
            giftWrapping,
            customerNotes,
            status: 'pending',
            paymentStatus: 'pending'
        });

        await order.save();

        // Update user stats if logged in
        if (user) {
            user.totalOrders += 1;
            user.totalSpent += total;
            user.updateLoyaltyTier();

            // Add loyalty points (1 point per dollar)
            user.loyaltyPoints += Math.floor(total);

            await user.save();

            // Clear user's cart
            await Cart.findOneAndDelete({ clerkId });
        }

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create Stripe payment intent
// @route   POST /api/orders/create-payment-intent
export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, orderId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            metadata: { orderId }
        });

        // Update order with payment intent ID
        if (orderId) {
            await Order.findByIdAndUpdate(orderId, {
                stripePaymentIntentId: paymentIntent.id
            });
        }

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Confirm payment (webhook or manual)
// @route   POST /api/orders/:id/confirm-payment
export const confirmPayment = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndUpdate(
            id,
            {
                paymentStatus: 'paid',
                paidAt: new Date(),
                status: 'confirmed'
            },
            { new: true }
        );

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user's orders
// @route   GET /api/orders/my-orders
export const getMyOrders = async (req, res) => {
    try {
        const { clerkId } = req.auth;

        const orders = await Order.find({ clerkId })
            .sort({ createdAt: -1 })
            .populate('items.product', 'name images slug')
            .populate('user', 'email firstName lastName');

        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const clerkId = req.auth?.clerkId;

        const order = await Order.findById(id)
            .populate('items.product')
            .populate('user', 'email firstName lastName');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if user owns this order (unless admin)
        if (clerkId && order.clerkId !== clerkId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get order by order number (for tracking)
// @route   GET /api/orders/track/:orderNumber
export const trackOrder = async (req, res) => {
    try {
        const { orderNumber } = req.params;

        const order = await Order.findOne({ orderNumber }).select(
            'orderNumber status statusHistory trackingNumber carrier estimatedDelivery shippingAddress createdAt'
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
export const getAllOrders = async (req, res) => {
    try {
        const { status, paymentStatus, page = 1, limit = 20 } = req.query;

        const query = {};
        if (status) query.status = status;
        if (paymentStatus) query.paymentStatus = paymentStatus;

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('user', 'firstName lastName email');

        const total = await Order.countDocuments(query);

        res.json({
            success: true,
            data: orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, trackingNumber, carrier, estimatedDelivery, note } = req.body;

        const updateData = { status };
        if (trackingNumber) updateData.trackingNumber = trackingNumber;
        if (carrier) updateData.carrier = carrier;
        if (estimatedDelivery) updateData.estimatedDelivery = estimatedDelivery;

        if (status === 'delivered') {
            updateData.deliveredAt = new Date();
        }

        const order = await Order.findByIdAndUpdate(id, updateData, { new: true });

        // Add to status history
        order.statusHistory.push({
            status,
            note: note || `Status changed to ${status}`,
            updatedBy: 'admin',
            timestamp: new Date()
        });
        await order.save();

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
