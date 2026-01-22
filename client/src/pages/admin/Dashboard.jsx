/**
 * Admin Dashboard - Modern Glassmorphism Analytics Dashboard
 * Fixed: Dropdown styling, refresh functionality, quick actions
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign,
    ArrowUpRight, ArrowDownRight, MoreHorizontal, Loader2,
    Package, Eye, RefreshCw, Calendar, BarChart3, Plus
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import adminAPI from '../../services/adminAPI';

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [analytics, setAnalytics] = useState(null);
    const [dateRange, setDateRange] = useState('7days');

    const fetchAnalytics = useCallback(async (showLoader = true) => {
        try {
            if (showLoader) setLoading(true);
            setRefreshing(true);
            const response = await adminAPI.getAnalytics();
            if (response.success) {
                setAnalytics(response.data);
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    const handleRefresh = () => {
        fetchAnalytics(false);
    };

    // Stats data
    const statsData = analytics?.stats ? [
        {
            label: 'Total Revenue',
            value: `$${analytics.stats.totalRevenue.toLocaleString()}`,
            change: analytics.stats.revenueChange,
            trend: analytics.stats.revenueChange >= 0 ? 'up' : 'down',
            icon: DollarSign,
            color: 'from-emerald-500 to-green-600',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20'
        },
        {
            label: 'Active Orders',
            value: analytics.stats.activeOrders.toString(),
            change: 18.2,
            trend: 'up',
            icon: ShoppingBag,
            color: 'from-blue-500 to-cyan-600',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20'
        },
        {
            label: 'New Customers',
            value: analytics.stats.newCustomers.toString(),
            change: 12.5,
            trend: 'up',
            icon: Users,
            color: 'from-violet-500 to-purple-600',
            bgColor: 'bg-violet-500/10',
            borderColor: 'border-violet-500/20'
        },
        {
            label: 'Avg. Order Value',
            value: `$${analytics.stats.avgOrderValue}`,
            change: 5.4,
            trend: 'up',
            icon: TrendingUp,
            color: 'from-amber-500 to-orange-600',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20'
        },
    ] : [
        { label: 'Total Revenue', value: '$0', change: 0, trend: 'up', icon: DollarSign, color: 'from-emerald-500 to-green-600', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20' },
        { label: 'Active Orders', value: '0', change: 0, trend: 'up', icon: ShoppingBag, color: 'from-blue-500 to-cyan-600', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
        { label: 'New Customers', value: '0', change: 0, trend: 'up', icon: Users, color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-500/10', borderColor: 'border-violet-500/20' },
        { label: 'Avg. Order Value', value: '$0', change: 0, trend: 'up', icon: TrendingUp, color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
    ];

    const salesData = analytics?.weeklyData || [
        { name: 'Mon', sales: 0, orders: 0 },
        { name: 'Tue', sales: 0, orders: 0 },
        { name: 'Wed', sales: 0, orders: 0 },
        { name: 'Thu', sales: 0, orders: 0 },
        { name: 'Fri', sales: 0, orders: 0 },
        { name: 'Sat', sales: 0, orders: 0 },
        { name: 'Sun', sales: 0, orders: 0 },
    ];

    const topProducts = analytics?.topProducts || [];
    const recentOrders = analytics?.recentOrders || [];

    // Category breakdown for pie chart
    const categoryData = [
        { name: 'Coffee', value: 35, color: '#D4AF37' },
        { name: 'Chocolate', value: 25, color: '#b8962f' },
        { name: 'Honey', value: 20, color: '#8B7355' },
        { name: 'Tea', value: 15, color: '#1a3a3a' },
        { name: 'Other', value: 5, color: '#444' },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
    };

    // Custom tooltip for charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1a1a]/95 backdrop-blur-lg border border-white/10 rounded-xl p-3 shadow-xl">
                    <p className="text-[#888] text-xs mb-1">{label}</p>
                    <p className="text-[#D4AF37] font-semibold">${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display text-[#FAF9F7] mb-1">
                        Dashboard <span className="text-[#D4AF37]">Overview</span>
                    </h1>
                    <p className="text-[#666] text-sm">Here's what's happening with your store today.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Fixed dropdown styling - dark theme */}
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="bg-[#1a1a1a] border border-white/10 text-[#FAF9F7] text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[#D4AF37]/50 cursor-pointer appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            backgroundSize: '16px',
                            paddingRight: '40px'
                        }}
                    >
                        <option value="7days" className="bg-[#1a1a1a]">Last 7 Days</option>
                        <option value="30days" className="bg-[#1a1a1a]">Last 30 Days</option>
                        <option value="90days" className="bg-[#1a1a1a]">Last 90 Days</option>
                        <option value="year" className="bg-[#1a1a1a]">This Year</option>
                    </select>

                    {/* Working Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {statsData.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className={`relative group bg-[#111]/60 backdrop-blur-xl rounded-2xl border ${stat.borderColor} p-5 overflow-hidden cursor-default`}
                    >
                        {/* Glow effect on hover */}
                        <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                                    <stat.icon size={20} className="text-white" />
                                </div>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stat.trend === 'up'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-red-500/10 text-red-400'
                                    }`}>
                                    {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {Math.abs(stat.change)}%
                                </div>
                            </div>

                            <p className="text-[#888] text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-2xl font-display text-[#FAF9F7] font-semibold">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Revenue Chart - Large */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-display text-[#FAF9F7]">Revenue Analytics</h3>
                            <p className="text-[#555] text-xs mt-0.5">Daily revenue breakdown</p>
                        </div>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7] transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>

                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#555', fontSize: 11 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#555', fontSize: 11 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#D4AF37"
                                    strokeWidth={2}
                                    fill="url(#colorRevenue)"
                                    dot={{ fill: '#D4AF37', strokeWidth: 0, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#D4AF37', strokeWidth: 2, fill: '#0a0f0f' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Category Breakdown - Pie Chart */}
                <motion.div
                    variants={itemVariants}
                    className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-6"
                >
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-display text-[#FAF9F7]">Sales by Category</h3>
                            <p className="text-[#555] text-xs mt-0.5">Revenue distribution</p>
                        </div>
                    </div>

                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {categoryData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-xs text-[#888]">{item.name}</span>
                                <span className="text-xs text-[#555] ml-auto">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Top Products */}
                <motion.div
                    variants={itemVariants}
                    className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-6"
                >
                    <div className="flex justify-between items-center mb-5">
                        <div>
                            <h3 className="text-lg font-display text-[#FAF9F7]">Top Products</h3>
                            <p className="text-[#555] text-xs mt-0.5">Best performing items</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/products')}
                            className="text-xs text-[#D4AF37] hover:underline font-medium"
                        >
                            View All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {(topProducts.length > 0 ? topProducts : [
                            { name: 'No products yet', sales: '0 sales', price: '$0', img: 'https://images.unsplash.com/photo-1578749556920-d1d3abd0846a?w=100' }
                        ]).slice(0, 4).map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                            >
                                <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] overflow-hidden border border-white/5 group-hover:border-[#D4AF37]/30 transition-colors">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-[#FAF9F7] truncate">{item.name}</h4>
                                    <p className="text-xs text-[#555]">{item.sales}</p>
                                </div>
                                <div className="text-sm font-semibold text-[#D4AF37]">{item.price}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Orders */}
                <motion.div
                    variants={itemVariants}
                    className="lg:col-span-2 bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden"
                >
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-display text-[#FAF9F7]">Recent Orders</h3>
                            <p className="text-[#555] text-xs mt-0.5">Latest transactions</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="text-xs text-[#D4AF37] hover:underline font-medium"
                        >
                            View All
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-[#555] uppercase tracking-wider text-[10px]">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Order</th>
                                    <th className="px-6 py-3 font-semibold">Customer</th>
                                    <th className="px-6 py-3 font-semibold">Date</th>
                                    <th className="px-6 py-3 font-semibold">Status</th>
                                    <th className="px-6 py-3 font-semibold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {(recentOrders.length > 0 ? recentOrders : [
                                    { id: 'No orders', customer: '-', date: '-', status: 'Pending', amount: '$0' }
                                ]).map((row, idx) => (
                                    <motion.tr
                                        key={row.id || idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 + idx * 0.05 }}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-[#FAF9F7]">{row.id}</td>
                                        <td className="px-6 py-4 text-sm text-[#888]">{row.customer}</td>
                                        <td className="px-6 py-4 text-sm text-[#555]">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} />
                                                {row.date}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
                                                ${row.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    row.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        row.status === 'Shipped' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                                                            row.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                                'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-[#D4AF37] text-right">{row.amount}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions Footer - Now Functional */}
            <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 pt-4"
            >
                <button
                    onClick={() => navigate('/admin/products')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/30 rounded-xl text-sm text-[#888] hover:text-[#FAF9F7] transition-all"
                >
                    <Plus size={16} />
                    Add Product
                </button>
                <button
                    onClick={() => navigate('/admin/orders')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/30 rounded-xl text-sm text-[#888] hover:text-[#FAF9F7] transition-all"
                >
                    <ShoppingBag size={16} />
                    Create Order
                </button>
                <button
                    onClick={() => navigate('/admin/inventory')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4AF37]/30 rounded-xl text-sm text-[#888] hover:text-[#FAF9F7] transition-all"
                >
                    <BarChart3 size={16} />
                    View Analytics
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
