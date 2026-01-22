/**
 * Order API Service - Fetch order data from backend
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
    const clerkId = localStorage.getItem('clerkUserId');
    return clerkId ? { Authorization: `Bearer clerkId:${clerkId}` } : {};
};

export const orderAPI = {
    // Get user's orders
    getMyOrders: async () => {
        const response = await axios.get(
            `${API_URL}/api/orders/my-orders`,
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Get single order by ID
    getOrder: async (orderId) => {
        const response = await axios.get(
            `${API_URL}/api/orders/${orderId}`,
            { headers: getAuthHeader() }
        );
        return response.data;
    },

    // Track order by order number (public)
    trackOrder: async (orderNumber) => {
        const response = await axios.get(
            `${API_URL}/api/orders/track/${orderNumber}`
        );
        return response.data;
    },

    // Create order (used with payment flow)
    createOrder: async (orderData) => {
        const response = await axios.post(
            `${API_URL}/api/orders`,
            orderData,
            { headers: getAuthHeader() }
        );
        return response.data;
    }
};

export default orderAPI;
