/**
 * Cloudinary Upload Service
 */

import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

/**
 * Upload single image to Cloudinary
 * @param {Buffer} fileBuffer - Image file buffer
 * @param {String} folder - Cloudinary folder (e.g., 'products', 'avatars')
 * @returns {Promise} - Upload result with url and public_id
 */
export const uploadImage = (fileBuffer, folder = 'artisio') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
                transformation: [
                    { quality: 'auto', fetch_format: 'auto' },
                    { width: 1200, height: 1200, crop: 'limit' }
                ]
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                        width: result.width,
                        height: result.height,
                        format: result.format
                    });
                }
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};

/**
 * Upload multiple images to Cloudinary
 * @param {Array} files - Array of file buffers
 * @param {String} folder - Cloudinary folder
 * @returns {Promise} - Array of upload results
 */
export const uploadMultipleImages = async (files, folder = 'artisio') => {
    try {
        const uploadPromises = files.map(file => uploadImage(file.buffer, folder));
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        throw new Error(`Multiple upload failed: ${error.message}`);
    }
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - Cloudinary public_id
 * @returns {Promise} - Deletion result
 */
export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error(`Image deletion failed: ${error.message}`);
    }
};

/**
 * Delete multiple images from Cloudinary
 * @param {Array} publicIds - Array of public_ids
 * @returns {Promise} - Deletion results
 */
export const deleteMultipleImages = async (publicIds) => {
    try {
        const deletePromises = publicIds.map(id => cloudinary.uploader.destroy(id));
        const results = await Promise.all(deletePromises);
        return results;
    } catch (error) {
        throw new Error(`Multiple deletion failed: ${error.message}`);
    }
};

/**
 * Get optimized image URL with transformations
 * @param {String} publicId - Cloudinary public_id
 * @param {Object} options - Transformation options
 * @returns {String} - Optimized image URL
 */
export const getOptimizedUrl = (publicId, options = {}) => {
    const {
        width = 800,
        height = 800,
        quality = 'auto',
        format = 'auto'
    } = options;

    return cloudinary.url(publicId, {
        transformation: [
            { width, height, crop: 'limit' },
            { quality, fetch_format: format }
        ]
    });
};
