/**
 * Gift Card Routes - Gift card API endpoints
 */

import express from 'express';
import {
    purchaseGiftCard,
    checkBalance,
    redeemGiftCard,
    getMyGiftCards,
    validateGiftCard
} from '../controllers/giftCardController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/balance/:code', checkBalance);

// Protected routes
router.post('/', protect, purchaseGiftCard);
router.post('/redeem', protect, redeemGiftCard);
router.post('/validate', optionalAuth, validateGiftCard);
router.get('/my-cards', protect, getMyGiftCards);

export default router;
