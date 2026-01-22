/**
 * Admin Routes - Dashboard and management endpoints
 */

import express from 'express';
import {
    getDashboardAnalytics,
    getAllOrders,
    updateOrderStatus,
    getAllCustomers,
    getCustomerDetails,
    getAdminProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getInventory
} from '../controllers/adminController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Dashboard analytics
router.get('/analytics', optionalAuth, getDashboardAnalytics);

// Orders management
router.get('/orders', optionalAuth, getAllOrders);
router.put('/orders/:id/status', optionalAuth, updateOrderStatus);

// Customers management
router.get('/customers', optionalAuth, getAllCustomers);
router.get('/customers/:id', optionalAuth, getCustomerDetails);

// Products management (admin)
router.get('/products', optionalAuth, getAdminProducts);
router.post('/products', optionalAuth, createProduct);
router.put('/products/:id', optionalAuth, updateProduct);
router.delete('/products/:id', optionalAuth, deleteProduct);

// Inventory
router.get('/inventory', optionalAuth, getInventory);

export default router;
