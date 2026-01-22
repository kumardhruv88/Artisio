/**
 * Upload Controller - Handle image uploads
 */

import {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    deleteMultipleImages
} from '../utils/cloudinaryService.js';

// @desc    Upload single image
// @route   POST /api/upload/single
// @access  Private (Admin)
export const uploadSingleImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const folder = req.body.folder || 'artisio/products';

        const result = await uploadImage(req.file.buffer, folder);

        res.json({
            success: true,
            message: 'Image uploaded successfully',
            data: result
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Image upload failed',
            error: error.message
        });
    }
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private (Admin)
export const uploadMultiple = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const folder = req.body.folder || 'artisio/products';

        const results = await uploadMultipleImages(req.files, folder);

        res.json({
            success: true,
            message: `${results.length} images uploaded successfully`,
            data: results
        });
    } catch (error) {
        console.error('Multiple upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Image upload failed',
            error: error.message
        });
    }
};

// @desc    Delete image
// @route   DELETE /api/upload/:publicId
// @access  Private (Admin)
export const deleteImageById = async (req, res) => {
    try {
        const { publicId } = req.params;

        if (!publicId) {
            return res.status(400).json({
                success: false,
                message: 'Public ID is required'
            });
        }

        // Decode public_id (it comes URL encoded)
        const decodedPublicId = decodeURIComponent(publicId);

        const result = await deleteImage(decodedPublicId);

        if (result.result === 'ok') {
            res.json({
                success: true,
                message: 'Image deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Image deletion failed',
            error: error.message
        });
    }
};

// @desc    Delete multiple images
// @route   POST /api/upload/delete-multiple
// @access  Private (Admin)
export const deleteMultiple = async (req, res) => {
    try {
        const { publicIds } = req.body;

        if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Public IDs array is required'
            });
        }

        const results = await deleteMultipleImages(publicIds);

        res.json({
            success: true,
            message: `${results.length} images deleted successfully`,
            data: results
        });
    } catch (error) {
        console.error('Multiple delete error:', error);
        res.status(500).json({
            success: false,
            message: 'Image deletion failed',
            error: error.message
        });
    }
};
