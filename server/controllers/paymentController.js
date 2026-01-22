/**
 * Payment Controller - Handle Stripe payments
 */

import stripe from '../config/stripe.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';
import { sendOrderConfirmation } from '../utils/emailService.js';

// @desc    Create payment intent
// @route   POST /api/payment/create-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency = 'usd' } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid amount is required'
            });
        }

        // Create payment intent with card-only (no redirects for simpler testing)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'  // Prevent redirect-based payment methods
            },
            metadata: {
                userId: req.userId,
                integration: 'artisio_ecommerce'
            }
        });

        res.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id
            }
        });
    } catch (error) {
        console.error('Create payment intent error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment intent creation failed',
            error: error.message
        });
    }
};

// @desc    Create checkout session for cart
// @route   POST /api/payment/checkout
// @access  Private
export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.userId;
        const { shippingAddress, cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: 'Shipping address is required'
            });
        }

        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal >= 50 ? 0 : 15;
        const total = subtotal + tax + shipping;

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100),
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId,
                subtotal: subtotal.toFixed(2),
                tax: tax.toFixed(2),
                shipping: shipping.toFixed(2),
                total: total.toFixed(2)
            }
        });

        res.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id,
                amount: total
            }
        });
    } catch (error) {
        console.error('Checkout session error:', error);
        res.status(500).json({
            success: false,
            message: 'Checkout session creation failed',
            error: error.message
        });
    }
};

// @desc    Confirm payment and create order
// @route   POST /api/payment/confirm
// @access  Private
export const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId, shippingAddress, items, totals } = req.body;
        const userId = req.userId;

        if (!paymentIntentId) {
            return res.status(400).json({
                success: false,
                message: 'Payment intent ID is required'
            });
        }

        // Check if we're in test mode
        const isTestMode = process.env.NODE_ENV !== 'production' ||
            process.env.STRIPE_SECRET_KEY?.includes('sk_test');

        let paymentIntent;

        // Fetch user from database to get correct email and ObjectId link
        const user = await User.findOne({ clerkId: userId });

        if (isTestMode) {
            // In TEST MODE: Just verify the payment intent exists, skip actual confirmation
            // This avoids the return_url requirement that Stripe enforces
            try {
                paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
                console.log('Test mode: Payment intent retrieved, status:', paymentIntent.status);
                // In test mode, we proceed regardless of status
            } catch (stripeError) {
                console.error('Stripe retrieve error:', stripeError);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment intent'
                });
            }
        } else {
            // In PRODUCTION: Actually confirm the payment
            paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            if (paymentIntent.status !== 'succeeded') {
                return res.status(400).json({
                    success: false,
                    message: `Payment not completed. Status: ${paymentIntent.status}`
                });
            }
        }

        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08;
        const shippingCost = subtotal >= 50 ? 0 : 15;
        const total = subtotal + tax + shippingCost;

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Transform shipping address from frontend format to Order model format
        const nameParts = (shippingAddress.fullName || '').split(' ');
        const firstName = nameParts[0] || 'Guest';
        const lastName = nameParts.slice(1).join(' ') || 'Customer';

        const formattedAddress = {
            firstName,
            lastName,
            street: shippingAddress.address || shippingAddress.street || '',
            apartment: shippingAddress.apartment || '',
            city: shippingAddress.city || '',
            state: shippingAddress.state || '',
            postalCode: shippingAddress.zipCode || shippingAddress.postalCode || '',
            country: shippingAddress.country || 'United States',
            phone: shippingAddress.phone || ''
        };

        // Create order in database
        const order = await Order.create({
            user: user?._id, // Link to MongoDB User ID for account visibility
            clerkId: userId, // Store clerkId for reference
            orderNumber,
            items: items.map(item => ({
                product: item.productId || item.product || item._id || item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.images?.[0] || item.image || '',
                subtotal: item.price * item.quantity
            })),
            shippingAddress: formattedAddress,
            subtotal,
            tax,
            shippingCost,
            total,
            paymentMethod: 'card',
            paymentStatus: 'paid',
            stripePaymentIntentId: paymentIntent.id,
            paidAt: new Date(),
            status: 'confirmed'
        });

        // Clear user's cart
        await Cart.findOneAndUpdate(
            { clerkId: userId },
            { items: [], promoCode: null }
        );

        // Send order confirmation email
        // Priority: 1. Shipping Email, 2. Database User Email, 3. Fallback
        const customerEmail = shippingAddress?.email ||
            user?.email ||
            'customer@example.com';

        const customerName = shippingAddress?.fullName?.split(' ')[0] ||
            user?.firstName ||
            'Customer';

        console.log('Sending confirmation email to:', customerEmail);

        try {
            await sendOrderConfirmation(
                order,
                customerEmail,
                { firstName: customerName }
            );
        } catch (emailError) {
            console.error('Email send error:', emailError);
            // Don't fail the order if email fails
        }

        res.json({
            success: true,
            message: 'Order created successfully',
            data: {
                order,
                orderNumber: order.orderNumber
            }
        });
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment confirmation failed',
            error: error.message
        });
    }
};

// @desc    Get payment intent details
// @route   GET /api/payment/intent/:id
// @access  Private
export const getPaymentIntent = async (req, res) => {
    try {
        const { id } = req.params;

        const paymentIntent = await stripe.paymentIntents.retrieve(id);

        res.json({
            success: true,
            data: {
                id: paymentIntent.id,
                amount: paymentIntent.amount / 100,
                currency: paymentIntent.currency,
                status: paymentIntent.status,
                created: paymentIntent.created
            }
        });
    } catch (error) {
        console.error('Get payment intent error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve payment intent',
            error: error.message
        });
    }
};

// @desc    Refund payment
// @route   POST /api/payment/refund
// @access  Private (Admin)
export const refundPayment = async (req, res) => {
    try {
        const { paymentIntentId, amount, reason } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({
                success: false,
                message: 'Payment intent ID is required'
            });
        }

        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
            reason: reason || 'requested_by_customer'
        });

        // Update order status
        await Order.findOneAndUpdate(
            { paymentIntentId },
            {
                paymentStatus: 'refunded',
                status: 'cancelled'
            }
        );

        res.json({
            success: true,
            message: 'Refund processed successfully',
            data: {
                refundId: refund.id,
                amount: refund.amount / 100,
                status: refund.status
            }
        });
    } catch (error) {
        console.error('Refund error:', error);
        res.status(500).json({
            success: false,
            message: 'Refund failed',
            error: error.message
        });
    }
};

// @desc    Webhook handler for Stripe events
// @route   POST /api/payment/webhook
// @access  Public (Stripe)
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('💰 Payment succeeded:', paymentIntent.id);
            // You can update order status here
            break;

        case 'payment_intent.payment_failed':
            console.log('❌ Payment failed:', event.data.object.id);
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};
