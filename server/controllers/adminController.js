/**
 * Admin Controller - Dashboard analytics and admin operations
 */

import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
export const getDashboardAnalytics = async (req, res) => {
    try {
        // Get date ranges
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        // Get total revenue (include all completed orders, not just 'paid' to catch more orders)
        const revenueResult = await Order.aggregate([
            { $match: { $or: [{ paymentStatus: 'paid' }, { paymentStatus: { $exists: false } }] } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;

        // Get last month revenue for comparison
        const lastMonthRevenue = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfLastMonth, $lt: startOfMonth }
                }
            },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const lastMonthTotal = lastMonthRevenue[0]?.total || 1;

        const thisMonthRevenue = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfMonth }
                }
            },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const thisMonthTotal = thisMonthRevenue[0]?.total || 0;
        const revenueChange = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal * 100).toFixed(1);

        // Get active orders count (include ALL non-cancelled orders)
        const activeOrders = await Order.countDocuments({
            status: { $nin: ['cancelled', 'delivered'] }
        });

        // Get new customers this month
        const newCustomers = await User.countDocuments({
            createdAt: { $gte: startOfMonth }
        });

        // Get average order value
        const avgOrderResult = await Order.aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $group: { _id: null, avg: { $avg: '$total' } } }
        ]);
        const avgOrderValue = avgOrderResult[0]?.avg || 0;

        // Get weekly sales data for chart
        const weeklyData = [];
        for (let i = 6; i >= 0; i--) {
            const dayStart = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(dayStart);
            dayEnd.setHours(23, 59, 59, 999);

            const dayRevenue = await Order.aggregate([
                {
                    $match: {
                        paymentStatus: 'paid',
                        createdAt: { $gte: dayStart, $lte: dayEnd }
                    }
                },
                { $group: { _id: null, total: { $sum: '$total' } } }
            ]);

            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            weeklyData.push({
                name: days[dayStart.getDay()],
                sales: dayRevenue[0]?.total || 0
            });
        }

        // Get top products
        const topProducts = await Order.aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $unwind: '$items' },
            {
                $group: {
                    _id: '$items.product',
                    name: { $first: '$items.name' },
                    image: { $first: '$items.image' },
                    totalSales: { $sum: '$items.quantity' },
                    totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
                }
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 5 }
        ]);

        // Get recent orders
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('orderNumber status total createdAt shippingAddress');

        res.json({
            success: true,
            data: {
                stats: {
                    totalRevenue,
                    revenueChange: parseFloat(revenueChange),
                    activeOrders,
                    newCustomers,
                    avgOrderValue: avgOrderValue.toFixed(2)
                },
                weeklyData,
                topProducts: topProducts.map(p => ({
                    name: p.name || 'Unknown Product',
                    sales: `${p.totalSales} sales`,
                    price: `$${p.totalRevenue.toFixed(2)}`,
                    img: p.image || 'https://images.unsplash.com/photo-1578749556920-d1d3abd0846a?w=100'
                })),
                recentOrders: recentOrders.map(o => ({
                    id: o.orderNumber,
                    customer: `${o.shippingAddress?.firstName || 'Guest'} ${o.shippingAddress?.lastName || ''}`.trim(),
                    date: o.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
                    amount: `$${o.total?.toFixed(2) || '0.00'}`
                }))
            }
        });
    } catch (error) {
        console.error('Dashboard analytics error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
export const getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const query = {};
        if (status && status !== 'all') {
            query.status = status;
        }

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Order.countDocuments(query);

        res.json({
            success: true,
            data: orders,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, trackingNumber, carrier } = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.status = status;
        if (trackingNumber) order.trackingNumber = trackingNumber;
        if (carrier) order.carrier = carrier;

        await order.save();

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all customers for admin
// @route   GET /api/admin/customers
export const getAllCustomers = async (req, res) => {
    try {
        const { page = 1, limit = 20, search = '' } = req.query;

        const query = {};
        if (search) {
            query.$or = [
                { email: { $regex: search, $options: 'i' } },
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } }
            ];
        }

        const customers = await User.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .select('-__v');

        const total = await User.countDocuments(query);

        // Get order stats for each customer
        const customersWithStats = await Promise.all(
            customers.map(async (customer) => {
                const orderStats = await Order.aggregate([
                    { $match: { clerkId: customer.clerkId } },
                    {
                        $group: {
                            _id: null,
                            totalOrders: { $sum: 1 },
                            totalSpent: { $sum: '$total' }
                        }
                    }
                ]);

                return {
                    ...customer.toObject(),
                    totalOrders: orderStats[0]?.totalOrders || 0,
                    totalSpent: orderStats[0]?.totalSpent || 0
                };
            })
        );

        res.json({
            success: true,
            data: customersWithStats,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get customer details
// @route   GET /api/admin/customers/:id
export const getCustomerDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await User.findById(id);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        // Get customer orders
        const orders = await Order.find({ clerkId: customer.clerkId })
            .sort({ createdAt: -1 })
            .limit(10);

        // Get order stats
        const orderStats = await Order.aggregate([
            { $match: { clerkId: customer.clerkId } },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalSpent: { $sum: '$total' },
                    avgOrderValue: { $avg: '$total' }
                }
            }
        ]);

        res.json({
            success: true,
            data: {
                customer,
                orders,
                stats: {
                    totalOrders: orderStats[0]?.totalOrders || 0,
                    totalSpent: orderStats[0]?.totalSpent || 0,
                    avgOrderValue: orderStats[0]?.avgOrderValue || 0
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all products for admin (with more fields)
// @route   GET /api/admin/products
export const getAdminProducts = async (req, res) => {
    try {
        const { page = 1, limit = 500, status, search = '' } = req.query;

        const query = {};
        if (status && status !== 'all') {
            query.status = status;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { sku: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            data: products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create product
// @route   POST /api/admin/products
export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get inventory overview
// @route   GET /api/admin/inventory
export const getInventory = async (req, res) => {
    try {
        // Get all products with stock info
        const products = await Product.find()
            .select('name sku images stock status category')
            .sort({ stock: 1 }); // Low stock first

        const lowStockThreshold = 10;

        const stats = {
            totalProducts: products.length,
            inStock: products.filter(p => p.stock > lowStockThreshold).length,
            lowStock: products.filter(p => p.stock > 0 && p.stock <= lowStockThreshold).length,
            outOfStock: products.filter(p => p.stock === 0).length
        };

        const lowStockAlerts = products
            .filter(p => p.stock <= lowStockThreshold)
            .slice(0, 10);

        res.json({
            success: true,
            data: {
                stats,
                lowStockAlerts,
                products
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

