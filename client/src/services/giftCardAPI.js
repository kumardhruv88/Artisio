/**
 * Gift Card API Service - Frontend service for gift card operations
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
    const clerkId = localStorage.getItem('clerkUserId');
    return clerkId ? { Authorization: `Bearer clerkId:${clerkId}` } : {};
};

export const giftCardAPI = {
    // Purchase a gift card
    purchase: async (giftCardData) => {
        const response = await axios.post(
            `${API_URL}/api/gift-cards`,
            giftCardData,
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Check gift card balance (public)
    checkBalance: async (code) => {
        const response = await axios.get(
            `${API_URL}/api/gift-cards/balance/${code}`
        );
        return response.data;
    },

    // Validate gift card for checkout
    validate: async (code) => {
        const response = await axios.post(
            `${API_URL}/api/gift-cards/validate`,
            { code },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Redeem gift card on order
    redeem: async (code, amount, orderId, orderNumber) => {
        const response = await axios.post(
            `${API_URL}/api/gift-cards/redeem`,
            { code, amount, orderId, orderNumber },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Get user's purchased gift cards
    getMyCards: async () => {
        const response = await axios.get(
            `${API_URL}/api/gift-cards/my-cards`,
            { headers: getAuthHeader() }
        );
        return response.data;
    }
};

export default giftCardAPI;
