/**
 * Admin API Service - Frontend service for admin dashboard
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get auth header
const getAuthHeader = () => {
    const clerkId = localStorage.getItem('clerkUserId');
    return clerkId ? { Authorization: `Bearer ${clerkId}` } : {};
};

const adminAPI = {
    // ==================== ANALYTICS ====================

    /**
     * Get dashboard analytics
     */
    getAnalytics: async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/analytics`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching analytics:', error);
            throw error;
        }
    },

    // ==================== ORDERS ====================

    /**
     * Get all orders with pagination
     */
    getOrders: async (params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/admin/orders`, {
                headers: getAuthHeader(),
                params
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    /**
     * Update order status
     */
    updateOrderStatus: async (orderId, statusData) => {
        try {
            const response = await axios.put(
                `${API_URL}/admin/orders/${orderId}/status`,
                statusData,
                { headers: getAuthHeader() }
            );
            return response.data;
        } catch (error) {
            console.error('Error updating order status:', error);
            throw error;
        }
    },

    // ==================== CUSTOMERS ====================

    /**
     * Get all customers with pagination
     */
    getCustomers: async (params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/admin/customers`, {
                headers: getAuthHeader(),
                params
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    },

    /**
     * Get customer details by ID
     */
    getCustomerDetails: async (customerId) => {
        try {
            const response = await axios.get(`${API_URL}/admin/customers/${customerId}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching customer details:', error);
            throw error;
        }
    },

    // ==================== PRODUCTS ====================

    /**
     * Get all products for admin
     */
    getProducts: async (params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/admin/products`, {
                headers: getAuthHeader(),
                params
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    /**
     * Create a new product
     */
    createProduct: async (productData) => {
        try {
            const response = await axios.post(`${API_URL}/admin/products`, productData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    /**
     * Update a product
     */
    updateProduct: async (productId, productData) => {
        try {
            const response = await axios.put(`${API_URL}/admin/products/${productId}`, productData, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    /**
     * Delete a product
     */
    deleteProduct: async (productId) => {
        try {
            const response = await axios.delete(`${API_URL}/admin/products/${productId}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    // ==================== INVENTORY ====================

    /**
     * Get inventory overview
     */
    getInventory: async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/inventory`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    }
};

export default adminAPI;
