/**
 * Admin Orders - Modern Glassmorphism Orders Management
 * Fixed: Export functionality, refresh button, data fetching
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, Eye, MoreHorizontal, Truck, Package,
    CheckCircle, XCircle, Clock, Calendar, Loader2,
    ChevronDown, Download, RefreshCw, X
} from 'lucide-react';
import adminAPI from '../../services/adminAPI';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [metrics, setMetrics] = useState({
        total: 0,
        pending: 0,
        shipped: 0,
        cancelled: 0
    });

    const fetchOrders = useCallback(async (showLoader = true) => {
        try {
            if (showLoader) setLoading(true);
            setRefreshing(true);

            const response = await adminAPI.getOrders({
                status: statusFilter !== 'all' ? statusFilter : undefined
            });

            if (response.success) {
                const ordersData = response.data.map(order => ({
                    id: order.orderNumber || order._id?.slice(-8).toUpperCase() || order._id,
                    _id: order._id,
                    customer: `${order.shippingAddress?.firstName || 'Guest'} ${order.shippingAddress?.lastName || ''}`.trim() || 'Customer',
                    email: order.shippingAddress?.email || order.guestEmail || '-',
                    date: new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    rawDate: order.createdAt,
                    items: order.items?.length || 0,
                    total: order.total || 0,
                    status: order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending',
                    payment: order.paymentStatus === 'paid' ? 'Paid' : order.paymentStatus === 'refunded' ? 'Refunded' : 'Pending',
                    shippingAddress: order.shippingAddress,
                    orderItems: order.items
                }));
                setOrders(ordersData);

                // Calculate metrics from ALL orders
                const allOrders = response.data;
                setMetrics({
                    total: response.pagination?.total || ordersData.length,
                    pending: allOrders.filter(o => o.status === 'pending' || o.status === 'processing').length,
                    shipped: allOrders.filter(o => o.status === 'shipped').length,
                    cancelled: allOrders.filter(o => o.status === 'cancelled').length
                });
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [statusFilter]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleRefresh = () => {
        fetchOrders(false);
    };

    const handleExport = async () => {
        setExporting(true);
        try {
            // Generate CSV from orders
            const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Items', 'Total', 'Status', 'Payment'];
            const csvData = orders.map(order => [
                order.id,
                order.date,
                order.customer,
                order.email,
                order.items,
                `$${order.total.toFixed(2)}`,
                order.status,
                order.payment
            ]);

            const csvContent = [
                headers.join(','),
                ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
            ].join('\n');

            // Download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Export error:', error);
            alert('Failed to export orders');
        } finally {
            setExporting(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await adminAPI.updateOrderStatus(orderId, { status: newStatus.toLowerCase() });
            await fetchOrders(false);
            setShowOrderModal(false);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Shipped': return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
            case 'Processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={14} />;
            case 'Shipped': return <Truck size={14} />;
            case 'Processing': return <Package size={14} />;
            case 'Cancelled': return <XCircle size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const metricsData = [
        { label: 'Total Orders', value: metrics.total, sub: 'All time', color: 'from-[#D4AF37] to-[#b8962f]' },
        { label: 'Pending', value: metrics.pending, sub: 'Action needed', color: 'from-amber-500 to-orange-600' },
        { label: 'Shipped', value: metrics.shipped, sub: 'In transit', color: 'from-violet-500 to-purple-600' },
        { label: 'Cancelled', value: metrics.cancelled, sub: 'Review required', color: 'from-red-500 to-rose-600' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                    <Loader2 className="w-10 h-10 text-[#D4AF37]" />
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display text-[#FAF9F7] mb-1">
                        Orders <span className="text-[#D4AF37]">Management</span>
                    </h1>
                    <p className="text-[#666] text-sm">Track and manage customer orders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] hover:text-[#FAF9F7] transition-all disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={exporting || orders.length === 0}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all disabled:opacity-50"
                    >
                        {exporting ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Download size={16} />
                        )}
                        {exporting ? 'Exporting...' : 'Export'}
                    </button>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metricsData.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                            <span className="text-white font-bold text-sm">{stat.value}</span>
                        </div>
                        <p className="text-[#888] text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                        <p className="text-xs text-[#555] mt-0.5">{stat.sub}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                    <input
                        type="text"
                        placeholder="Search by order ID, customer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 outline-none cursor-pointer"
                    >
                        <option value="all" className="bg-[#1a1a1a]">All Statuses</option>
                        <option value="pending" className="bg-[#1a1a1a]">Pending</option>
                        <option value="processing" className="bg-[#1a1a1a]">Processing</option>
                        <option value="shipped" className="bg-[#1a1a1a]">Shipped</option>
                        <option value="delivered" className="bg-[#1a1a1a]">Delivered</option>
                        <option value="cancelled" className="bg-[#1a1a1a]">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02] text-[#555] uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Items</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Payment</th>
                                <th className="px-6 py-4 font-semibold text-right">Total</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-[#555]">
                                        <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                        <p>No orders found</p>
                                        <p className="text-xs mt-1">Orders will appear here when customers place them</p>
                                    </td>
                                </tr>
                            ) : filteredOrders.map((order, idx) => (
                                <motion.tr
                                    key={order._id || idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-[#FAF9F7] font-mono">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-[#555]">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={12} />
                                            {order.date}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-[#FAF9F7]">{order.customer}</p>
                                            <p className="text-xs text-[#555]">{order.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#888]">{order.items} items</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium ${order.payment === 'Paid' ? 'text-emerald-400' : 'text-[#555]'}`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-sm font-semibold text-[#D4AF37]">
                                            ${order.total.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowOrderModal(true);
                                                }}
                                                className="p-2 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7] transition-colors"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {showOrderModal && selectedOrder && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowOrderModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-display text-[#FAF9F7]">Order #{selectedOrder.id}</h3>
                                <button onClick={() => setShowOrderModal(false)} className="text-[#555] hover:text-[#FAF9F7]">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#0a0f0f] rounded-xl p-4 border border-white/5">
                                        <p className="text-[10px] text-[#555] uppercase mb-1">Customer</p>
                                        <p className="text-sm font-medium text-[#FAF9F7]">{selectedOrder.customer}</p>
                                        <p className="text-xs text-[#555]">{selectedOrder.email}</p>
                                    </div>
                                    <div className="bg-[#0a0f0f] rounded-xl p-4 border border-white/5">
                                        <p className="text-[10px] text-[#555] uppercase mb-1">Order Date</p>
                                        <p className="text-sm font-medium text-[#FAF9F7]">{selectedOrder.date}</p>
                                    </div>
                                </div>

                                <div className="bg-[#0a0f0f] rounded-xl p-4 border border-white/5">
                                    <p className="text-[10px] text-[#555] uppercase mb-2">Update Status</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusChange(selectedOrder._id, status)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedOrder.status === status
                                                        ? 'bg-[#D4AF37] text-[#0a0f0f]'
                                                        : 'bg-white/5 text-[#888] hover:bg-white/10'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#0a0f0f] rounded-xl p-4 border border-white/5">
                                    <p className="text-[10px] text-[#555] uppercase mb-2">Order Total</p>
                                    <p className="text-2xl font-display text-[#D4AF37] font-semibold">${selectedOrder.total.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end mt-6">
                                <button
                                    onClick={() => setShowOrderModal(false)}
                                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Orders;
