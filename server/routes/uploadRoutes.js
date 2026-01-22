/**
 * Upload Routes - Image upload endpoints
 */

import express from 'express';
import {
    uploadSingleImage,
    uploadMultiple,
    deleteImageById,
    deleteMultiple
} from '../controllers/uploadController.js';
import { uploadSingle, uploadMultiple as uploadMultipleMiddleware } from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All upload routes require authentication (admin only in production)
// For now, we'll allow any authenticated user
router.use(protect);

// Upload single image
router.post('/single', uploadSingle, uploadSingleImage);

// Upload multiple images
router.post('/multiple', uploadMultipleMiddleware, uploadMultiple);

// Delete single image
router.delete('/:publicId', deleteImageById);

// Delete multiple images
router.post('/delete-multiple', deleteMultiple);

export default router;
