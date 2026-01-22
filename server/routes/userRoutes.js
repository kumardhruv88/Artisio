/**
 * User Routes
 */

import express from 'express';
import {
    getMe,
    syncUser,
    updateProfile,
    addAddress,
    deleteAddress,
    addToWishlist,
    removeFromWishlist,
    getWishlist
} from '../controllers/userController.js';
import { requireAuth, verifyWebhook } from '../middleware/auth.js';

const router = express.Router();

// Clerk webhook for user sync (from Clerk dashboard)
router.post('/webhook', verifyWebhook, syncUser);

// Public sync endpoint (from frontend login)
router.post('/sync', syncUser);

// Protected routes
router.get('/me', requireAuth, getMe);
router.put('/me', requireAuth, updateProfile);

// Addresses
router.post('/me/addresses', requireAuth, addAddress);
router.delete('/me/addresses/:id', requireAuth, deleteAddress);

// Wishlist
router.get('/me/wishlist', requireAuth, getWishlist);
router.post('/me/wishlist/:productId', requireAuth, addToWishlist);
router.delete('/me/wishlist/:productId', requireAuth, removeFromWishlist);

export default router;
