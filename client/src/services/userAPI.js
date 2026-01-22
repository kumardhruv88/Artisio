/**
 * User API Service - Frontend service for user profile and addresses
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get auth header
const getAuthHeader = () => {
    const clerkId = localStorage.getItem('clerkUserId');
    return clerkId ? { Authorization: `Bearer ${clerkId}` } : {};
};

const userAPI = {
    /**
     * Get current user profile
     */
    getProfile: async () => {
        try {
            const response = await axios.get(`${API_URL}/users/me`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },

    /**
     * Update user profile
     */
    updateProfile: async (updates) => {
        try {
            const response = await axios.put(`${API_URL}/users/me`, updates, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    /**
     * Get user addresses
     */
    getAddresses: async () => {
        try {
            const response = await axios.get(`${API_URL}/users/me`, {
                headers: getAuthHeader()
            });
            return { success: true, data: response.data?.data?.addresses || [] };
        } catch (error) {
            console.error('Error fetching addresses:', error);
            return { success: false, data: [] };
        }
    },

    /**
     * Add new address
     */
    addAddress: async (address) => {
        try {
            const response = await axios.post(`${API_URL}/users/me/addresses`, address, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error adding address:', error);
            throw error;
        }
    },

    /**
     * Update address (delete and re-add)
     */
    updateAddress: async (addressId, address) => {
        try {
            // Delete old address
            await axios.delete(`${API_URL}/users/me/addresses/${addressId}`, {
                headers: getAuthHeader()
            });
            // Add updated address
            const response = await axios.post(`${API_URL}/users/me/addresses`, address, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error updating address:', error);
            throw error;
        }
    },

    /**
     * Delete address
     */
    deleteAddress: async (addressId) => {
        try {
            const response = await axios.delete(`${API_URL}/users/me/addresses/${addressId}`, {
                headers: getAuthHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting address:', error);
            throw error;
        }
    },

    /**
     * Set default address
     */
    setDefaultAddress: async (addressId) => {
        try {
            // Get current addresses
            const profileRes = await axios.get(`${API_URL}/users/me`, {
                headers: getAuthHeader()
            });
            const addresses = profileRes.data?.data?.addresses || [];

            // Find the address and update it with isDefault
            const targetAddress = addresses.find(a => a._id === addressId);
            if (targetAddress) {
                // Delete and re-add with isDefault true
                await axios.delete(`${API_URL}/users/me/addresses/${addressId}`, {
                    headers: getAuthHeader()
                });
                const response = await axios.post(`${API_URL}/users/me/addresses`,
                    { ...targetAddress, isDefault: true },
                    { headers: getAuthHeader() }
                );
                return response.data;
            }
            return { success: false, message: 'Address not found' };
        } catch (error) {
            console.error('Error setting default address:', error);
            throw error;
        }
    }
};

export default userAPI;
