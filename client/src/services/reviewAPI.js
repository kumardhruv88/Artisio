/**
 * Review API Service
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
    const clerkId = localStorage.getItem('clerkUserId');
    return clerkId ? { Authorization: `Bearer clerkId:${clerkId}` } : {};
};

export const reviewAPI = {
    // Get reviews for a product
    getProductReviews: async (productId, page = 1, limit = 10, sort = '-createdAt') => {
        const response = await axios.get(
            `${API_URL}/api/reviews/product/${productId}?page=${page}&limit=${limit}&sort=${sort}`
        );
        return response.data;
    },

    // Get user's reviews
    getUserReviews: async () => {
        const response = await axios.get(`${API_URL}/api/reviews`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Create a review
    createReview: async (productId, rating, title, comment, orderId = null) => {
        const response = await axios.post(
            `${API_URL}/api/reviews`,
            { productId, rating, title, comment, orderId },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Update a review
    updateReview: async (reviewId, rating, title, comment) => {
        const response = await axios.put(
            `${API_URL}/api/reviews/${reviewId}`,
            { rating, title, comment },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Delete a review
    deleteReview: async (reviewId) => {
        const response = await axios.delete(
            `${API_URL}/api/reviews/${reviewId}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Mark review as helpful
    markHelpful: async (reviewId, vote) => {
        const response = await axios.post(
            `${API_URL}/api/reviews/${reviewId}/helpful`,
            { vote },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Check if user can review product
    canReview: async (productId) => {
        const response = await axios.get(
            `${API_URL}/api/reviews/can-review/${productId}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    }
};
