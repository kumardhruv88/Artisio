/**
 * Review Routes
 */

import express from 'express';
import {
    getProductReviews,
    getUserReviews,
    createReview,
    updateReview,
    deleteReview,
    markHelpful,
    canReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews);

// Protected routes
router.use(protect);

router.route('/')
    .get(getUserReviews)
    .post(createReview);

router.route('/:id')
    .put(updateReview)
    .delete(deleteReview);

router.post('/:id/helpful', markHelpful);
router.get('/can-review/:productId', canReview);

export default router;
