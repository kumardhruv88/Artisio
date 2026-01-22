/**
 * AccountDashboard - Premium Lumière Design with Dynamic Hero
 * Beautiful hero section only on this page
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import {
    Package, Heart, MapPin, CreditCard, Settings,
    ArrowRight, Truck, CheckCircle, Clock, ShoppingBag,
    Gift, ChevronRight, Sparkles, Crown, Star, Award
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AccountDashboard = () => {
    const { user } = useUser();
    const { wishlistCount } = useWishlist();
    const { cartCount } = useCart();
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const clerkId = localStorage.getItem('clerkUserId');
                if (!clerkId) {
                    setRecentOrders([]);
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_URL}/api/orders`, {
                    headers: { Authorization: `Bearer clerkId:${clerkId}` }
                });

                if (response.data.success) {
                    setOrderCount(response.data.data.length);
                    setRecentOrders(response.data.data.slice(0, 3));
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setRecentOrders([]);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'January 2024';

    const quickActions = [
        { icon: Package, label: 'My Orders', desc: 'Track & manage orders', link: '/account/orders', gradient: 'from-emerald-500 to-teal-600' },
        { icon: Heart, label: 'Wishlist', desc: `${wishlistCount} saved items`, link: '/wishlist', gradient: 'from-rose-500 to-pink-600', badge: wishlistCount },
        { icon: MapPin, label: 'Addresses', desc: 'Manage shipping', link: '/account/addresses', gradient: 'from-blue-500 to-indigo-600' },
        { icon: CreditCard, label: 'Payment', desc: 'Cards & billing', link: '/account/payment-methods', gradient: 'from-violet-500 to-purple-600' },
        { icon: Gift, label: 'Rewards', desc: '1,240 points', link: '/account/rewards', gradient: 'from-amber-500 to-orange-600' },
        { icon: Settings, label: 'Settings', desc: 'Profile & security', link: '/account/settings', gradient: 'from-slate-500 to-gray-600' },
    ];

    const statusConfig = {
        'delivered': { icon: CheckCircle, bg: 'bg-emerald-50', text: 'text-emerald-600' },
        'shipped': { icon: Truck, bg: 'bg-amber-50', text: 'text-amber-600' },
        'processing': { icon: Clock, bg: 'bg-blue-50', text: 'text-blue-600' },
    };

    const getStatus = (status) => statusConfig[status?.toLowerCase()] || statusConfig['processing'];

    return (
        <div className="scroll-smooth min-h-screen">
            {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION - Premium Glassmorphism Design (Dashboard Only)
                Uses same background as navbar for seamless blend
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative overflow-hidden">
                {/* Background matching navbar color #1e3939 for seamless look */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, #1e3939 0%, #1a3a3a 30%, #234e52 100%)',
                    }}
                />

                {/* Animated gradient orbs */}
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
                    style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
                />
                <motion.div
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15"
                    style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
                />

                {/* Diamond pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="relative z-10 px-6 py-16 max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-10">

                        {/* Left: Avatar & Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-6 bg-white/5 backdrop-blur-sm rounded-3xl p-6 pr-12 border border-white/10"
                        >
                            {/* Avatar with ring */}
                            <div className="relative">
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="relative"
                                >
                                    {/* Rotating ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-2 rounded-full"
                                        style={{
                                            background: 'conic-gradient(from 0deg, #D4AF37, transparent 30%, #D4AF37 60%, transparent 90%)',
                                            opacity: 0.5
                                        }}
                                    />

                                    {/* Avatar container */}
                                    <div
                                        className="relative w-28 h-28 rounded-full p-1"
                                        style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #f4d03f 50%, #D4AF37 100%)' }}
                                    >
                                        <div className="w-full h-full rounded-full overflow-hidden bg-[#1a3a3a] flex items-center justify-center">
                                            {user?.imageUrl ? (
                                                <img src={user.imageUrl} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-5xl font-serif text-[#D4AF37]">
                                                    {user?.firstName?.[0] || 'A'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* User Info */}
                            <div>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase mb-2"
                                >
                                    Welcome Back
                                </motion.p>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white text-3xl lg:text-4xl font-serif mb-1"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {user?.fullName || 'Valued Member'}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-white/50 text-sm"
                                >
                                    Member since {memberSince}
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Right: Stats Cards */}
                        <div className="flex gap-4 flex-wrap justify-center lg:justify-end flex-1">
                            {/* Orders Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/10 text-center min-w-[120px]"
                            >
                                <p className="text-white text-4xl font-serif mb-1">{orderCount}</p>
                                <p className="text-white/40 text-xs uppercase tracking-widest">Orders</p>
                            </motion.div>

                            {/* Points Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-[#D4AF37]/30 text-center min-w-[120px]"
                            >
                                <p className="text-[#D4AF37] text-4xl font-serif mb-1">1,240</p>
                                <p className="text-white/40 text-xs uppercase tracking-widest">Points</p>
                            </motion.div>

                            {/* Tier Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-gradient-to-br from-[#D4AF37]/20 to-amber-600/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-[#D4AF37]/30 text-center min-w-[120px]"
                            >
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Crown size={20} className="text-[#D4AF37]" />
                                    <p className="text-white text-2xl font-serif">Gold</p>
                                </div>
                                <p className="text-white/40 text-xs uppercase tracking-widest">Tier</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                WHITE BACKGROUND AREA - Quick Actions & Orders
            ═══════════════════════════════════════════════════════════════ */}
            <div style={{ background: 'linear-gradient(180deg, #f8f7f4 0%, #ffffff 100%)' }}>
                {/* QUICK ACTIONS - Premium Card Grid */}
                <section className="max-w-6xl mx-auto px-6 py-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <motion.div
                                    key={action.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.05 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                >
                                    <Link
                                        to={action.link}
                                        className="group block relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                                    >
                                        {action.badge > 0 && (
                                            <span className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center text-xs font-bold text-white rounded-full bg-rose-500">
                                                {action.badge}
                                            </span>
                                        )}
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="text-white" size={22} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 text-sm mb-1">{action.label}</h3>
                                        <p className="text-xs text-gray-400">{action.desc}</p>
                                        <ChevronRight
                                            size={16}
                                            className="absolute bottom-4 right-4 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                        />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════
                RECENT ORDERS SECTION
            ═══════════════════════════════════════════════════════════════ */}
                <section className="px-6 pb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-serif text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Recent Orders
                        </h2>
                        <Link
                            to="/account/orders"
                            className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all duration-300"
                            style={{ color: '#D4AF37' }}
                        >
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="bg-white rounded-2xl p-12 flex justify-center border border-gray-100">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                className="w-8 h-8 border-2 border-gray-200 border-t-amber-500 rounded-full"
                            />
                        </div>
                    ) : recentOrders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-2xl p-12 text-center border border-gray-100"
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-serif text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                No orders yet
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                                Start exploring our curated collection of artisan products.
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all duration-300 hover:shadow-lg"
                                style={{ background: 'linear-gradient(135deg, #1a3a3a 0%, #2a5a5a 100%)' }}
                            >
                                <Sparkles size={16} />
                                Explore Products
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {recentOrders.map((order, index) => {
                                const firstItem = order.items?.[0];
                                const status = getStatus(order.status);
                                const StatusIcon = status.icon;

                                return (
                                    <motion.div
                                        key={order._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                        className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex gap-5">
                                            <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                                                {firstItem?.image ? (
                                                    <img src={firstItem.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package size={24} className="text-gray-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 mb-2">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 truncate">
                                                            {firstItem?.name || 'Order'}
                                                            {order.items?.length > 1 && (
                                                                <span className="text-gray-400 text-xs ml-2">+{order.items.length - 1} more</span>
                                                            )}
                                                        </h4>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            #{order.orderNumber} • {new Date(order.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-gray-900 whitespace-nowrap">${order.total?.toFixed(2)}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                                                        <StatusIcon size={12} />
                                                        <span className="capitalize">{order.status}</span>
                                                    </span>
                                                    <Link
                                                        to={`/account/orders/${order._id}`}
                                                        className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
                                                    >
                                                        Details <ChevronRight size={14} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AccountDashboard;

