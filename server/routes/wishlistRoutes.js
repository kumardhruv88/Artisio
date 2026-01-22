import express from 'express';
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    checkInWishlist
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All wishlist routes require authentication
router.use(protect);

// Wishlist operations
router.route('/')
    .get(getWishlist)
    .post(addToWishlist)
    .delete(clearWishlist);

router.route('/check/:productId')
    .get(checkInWishlist);

router.route('/:productId')
    .delete(removeFromWishlist);

export default router;
