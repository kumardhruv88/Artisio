/**
 * Cart Routes - Updated for new controller
 */

import express from 'express';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode,
    mergeCart
} from '../controllers/cartController.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// All cart routes support both guest (sessionId) and logged-in users
router.route('/')
    .get(optionalAuth, getCart)
    .post(optionalAuth, addToCart)
    .delete(optionalAuth, clearCart);

// Promo code routes - MUST come before /:itemId to prevent 'promo' being treated as itemId
router.route('/promo')
    .post(optionalAuth, applyPromoCode)
    .delete(optionalAuth, removePromoCode);

// Merge guest cart - also before /:itemId
router.post('/merge', requireAuth, mergeCart);

// Item-specific routes - must come last since :itemId is a catch-all parameter
router.route('/:itemId')
    .put(optionalAuth, updateCartItem)
    .delete(optionalAuth, removeFromCart);

export default router;
