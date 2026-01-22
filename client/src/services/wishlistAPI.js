/**
 * Wishlist API Service
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
    const clerkId = localStorage.getItem('clerkUserId');
    return clerkId ? { Authorization: `Bearer clerkId:${clerkId}` } : {};
};

export const wishlistAPI = {
    // Get user's wishlist
    getWishlist: async () => {
        const response = await axios.get(`${API_URL}/api/wishlist`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Add product to wishlist
    addToWishlist: async (productId) => {
        const response = await axios.post(
            `${API_URL}/api/wishlist`,
            { productId },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Remove product from wishlist
    removeFromWishlist: async (productId) => {
        const response = await axios.delete(
            `${API_URL}/api/wishlist/${productId}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Clear entire wishlist
    clearWishlist: async () => {
        const response = await axios.delete(`${API_URL}/api/wishlist`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Check if product is in wishlist
    checkInWishlist: async (productId) => {
        const response = await axios.get(
            `${API_URL}/api/wishlist/check/${productId}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    }
};
