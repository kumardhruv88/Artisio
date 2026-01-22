/**
 * Payment Routes - Stripe payment endpoints
 */

import express from 'express';
import {
    createPaymentIntent,
    createCheckoutSession,
    confirmPayment,
    getPaymentIntent,
    refundPayment,
    handleWebhook
} from '../controllers/paymentController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Webhook route (must be before express.json() middleware)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// For development/testing, use optionalAuth to allow testing without strict authentication
// In production, use protect middleware
const authMiddleware = process.env.NODE_ENV === 'production' ? protect : optionalAuth;

// Create payment intent
router.post('/create-intent', authMiddleware, createPaymentIntent);

// Create checkout session
router.post('/checkout', authMiddleware, createCheckoutSession);

// Confirm payment and create order
router.post('/confirm', authMiddleware, confirmPayment);

// Get payment intent details
router.get('/intent/:id', authMiddleware, getPaymentIntent);

// Refund payment (admin only - add admin middleware later)
router.post('/refund', protect, refundPayment);

export default router;
