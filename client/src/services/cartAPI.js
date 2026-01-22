/**
 * Cart API Service
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Generate or retrieve guest session ID immediately
const getOrCreateSessionId = () => {
    let sessionId = localStorage.getItem('guestSessionId');
    if (!sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('guestSessionId', sessionId);
    }
    return sessionId;
};

// Initialize session ID on module load
const guestSessionId = getOrCreateSessionId();

const getAuthHeader = () => {
    const clerkId = localStorage.getItem('clerkUserId');
    // Always use the stored session ID for consistency
    const sessionId = localStorage.getItem('guestSessionId') || guestSessionId;
    return {
        ...(clerkId ? { Authorization: `Bearer clerkId:${clerkId}` } : {}),
        'x-session-id': sessionId
    };
};

export const cartAPI = {
    // Get cart
    getCart: async () => {
        const response = await axios.get(`${API_URL}/api/cart`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Add item to cart
    addToCart: async (productId, quantity = 1, variant = null) => {
        const response = await axios.post(
            `${API_URL}/api/cart`,
            { productId, quantity, variant },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Update cart item quantity
    updateCartItem: async (itemId, quantity) => {
        const response = await axios.put(
            `${API_URL}/api/cart/${itemId}`,
            { quantity },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Remove item from cart
    removeFromCart: async (itemId) => {
        const response = await axios.delete(
            `${API_URL}/api/cart/${itemId}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Clear cart
    clearCart: async () => {
        const response = await axios.delete(`${API_URL}/api/cart`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Apply promo code
    applyPromoCode: async (code) => {
        const response = await axios.post(
            `${API_URL}/api/cart/promo`,
            { code },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Remove promo code
    removePromoCode: async () => {
        const response = await axios.delete(`${API_URL}/api/cart/promo`, {
            headers: getAuthHeader()
        });
        return response.data;
    },

    // Merge guest cart with user cart
    mergeCart: async (sessionId) => {
        const response = await axios.post(
            `${API_URL}/api/cart/merge`,
            { sessionId },
            { headers: getAuthHeader() }
        );
        return response.data;
    }
};
