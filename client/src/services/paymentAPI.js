/**
 * Payment API Service
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
    const clerkId = localStorage.getItem('clerkUserId');
    const sessionId = localStorage.getItem('guestSessionId');

    if (!clerkId) {
        console.warn('No clerkUserId found - payment may fail. User must be logged in.');
    }

    return {
        ...(clerkId ? { Authorization: `Bearer clerkId:${clerkId}` } : {}),
        'x-session-id': sessionId || ''
    };
};

export const paymentAPI = {
    // Create payment intent
    createPaymentIntent: async (amount, currency = 'usd') => {
        const response = await axios.post(
            `${API_URL}/api/payment/create-intent`,
            { amount, currency },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Create checkout session
    createCheckoutSession: async (shippingAddress, cartItems) => {
        const response = await axios.post(
            `${API_URL}/api/payment/checkout`,
            { shippingAddress, cartItems },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Confirm payment and create order
    confirmPayment: async (paymentIntentId, shippingAddress, items, totals = {}) => {
        const response = await axios.post(
            `${API_URL}/api/payment/confirm`,
            { paymentIntentId, shippingAddress, items, totals },
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Get payment intent details
    getPaymentIntent: async (paymentIntentId) => {
        const response = await axios.get(
            `${API_URL}/api/payment/intent/${paymentIntentId}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    }
};

