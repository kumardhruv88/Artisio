/**
 * Order Routes
 */

import express from 'express';
import {
    createOrder,
    createPaymentIntent,
    confirmPayment,
    getMyOrders,
    getOrder,
    trackOrder,
    getAllOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/track/:orderNumber', trackOrder);

// Customer routes
router.post('/', optionalAuth, createOrder);
router.post('/create-payment-intent', optionalAuth, createPaymentIntent);
router.post('/:id/confirm-payment', confirmPayment);
router.get('/my-orders', requireAuth, getMyOrders);
router.get('/:id', optionalAuth, getOrder);

// Admin routes (TODO: add admin auth middleware)
router.get('/', getAllOrders);
router.put('/:id/status', updateOrderStatus);

export default router;
