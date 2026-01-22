/**
 * Admin Customers - Modern Glassmorphism Customers Management
 * With View Details Modal
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Users, Mail, Phone, ShoppingBag, DollarSign,
    Loader2, MoreHorizontal, Eye, RefreshCw, Download, Crown,
    X, MapPin, Calendar, CreditCard, User
} from 'lucide-react';
import adminAPI from '../../services/adminAPI';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getCustomers({ search: searchQuery });
            if (response.success) {
                setCustomers(response.data);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (customer) => {
        setSelectedCustomer(customer);
        setShowDetailsModal(true);
    };

    const handleSendEmail = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const filteredCustomers = customers.filter(customer =>
        customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: customers.length,
        active: customers.filter(c => c.totalOrders > 0).length,
        vip: customers.filter(c => c.totalSpent >= 500).length,
        new: customers.filter(c => {
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return new Date(c.createdAt) > weekAgo;
        }).length
    };

    const getTierBadge = (spent) => {
        if (spent >= 5000) return { label: 'Platinum', color: 'from-violet-500 to-purple-600' };
        if (spent >= 2000) return { label: 'Gold', color: 'from-[#D4AF37] to-[#b8962f]' };
        if (spent >= 500) return { label: 'Silver', color: 'from-gray-400 to-gray-500' };
        return { label: 'Bronze', color: 'from-amber-600 to-orange-700' };
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display text-[#FAF9F7] mb-1">
                        Customer <span className="text-[#D4AF37]">Database</span>
                    </h1>
                    <p className="text-[#666] text-sm">Manage and analyze your customer base.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchCustomers}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] hover:text-[#FAF9F7] transition-all"
                    >
                        <RefreshCw size={16} />
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Customers', value: stats.total, icon: Users, color: 'from-[#D4AF37] to-[#b8962f]' },
                    { label: 'Active Buyers', value: stats.active, icon: ShoppingBag, color: 'from-emerald-500 to-green-600' },
                    { label: 'VIP Members', value: stats.vip, icon: Crown, color: 'from-violet-500 to-purple-600' },
                    { label: 'New This Week', value: stats.new, icon: Users, color: 'from-blue-500 to-cyan-600' }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                            <stat.icon size={18} className="text-white" />
                        </div>
                        <p className="text-2xl font-display text-[#FAF9F7] font-semibold">{stat.value}</p>
                        <p className="text-[#555] text-xs font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* Customers Grid */}
            {filteredCustomers.length === 0 ? (
                <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 py-20 text-center">
                    <Users className="w-16 h-16 mx-auto mb-4 text-[#333]" />
                    <p className="text-[#555]">No customers found</p>
                    <p className="text-[#444] text-sm mt-1">Customers will appear here when they sign up</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCustomers.map((customer, idx) => {
                        const tier = getTierBadge(customer.totalSpent || 0);
                        return (
                            <motion.div
                                key={customer._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-[#D4AF37]/30 transition-all"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a3a3a] to-[#0a1a1a] flex items-center justify-center text-[#D4AF37] font-display font-semibold text-lg border border-white/10">
                                            {customer.firstName?.[0] || customer.email?.[0]?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-[#FAF9F7]">
                                                {customer.firstName || customer.lastName
                                                    ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
                                                    : 'Anonymous'}
                                            </h3>
                                            <p className="text-xs text-[#555]">{customer.email}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7] transition-all">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>

                                {/* Tier Badge */}
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${tier.color} text-[10px] font-bold uppercase tracking-wide text-white mb-4`}>
                                    <Crown size={10} />
                                    {tier.label}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-[#0a0f0f] rounded-xl p-3 border border-white/5">
                                        <div className="flex items-center gap-2 mb-1">
                                            <ShoppingBag size={12} className="text-[#555]" />
                                            <span className="text-[10px] text-[#555] uppercase">Orders</span>
                                        </div>
                                        <p className="text-lg font-semibold text-[#FAF9F7]">{customer.totalOrders || 0}</p>
                                    </div>
                                    <div className="bg-[#0a0f0f] rounded-xl p-3 border border-white/5">
                                        <div className="flex items-center gap-2 mb-1">
                                            <DollarSign size={12} className="text-[#555]" />
                                            <span className="text-[10px] text-[#555] uppercase">Spent</span>
                                        </div>
                                        <p className="text-lg font-semibold text-[#D4AF37]">${(customer.totalSpent || 0).toFixed(0)}</p>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="space-y-2 text-xs text-[#555]">
                                    {customer.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone size={12} />
                                            <span>{customer.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Mail size={12} />
                                        <span className="truncate">{customer.email}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                                    <button
                                        onClick={() => handleViewDetails(customer)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-[#888] hover:text-[#FAF9F7] transition-all"
                                    >
                                        <Eye size={14} />
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleSendEmail(customer.email)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg text-xs text-[#D4AF37] transition-all"
                                    >
                                        <Mail size={14} />
                                        Send Email
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Customer Details Modal */}
            <AnimatePresence>
                {showDetailsModal && selectedCustomer && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDetailsModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl max-h-[85vh] overflow-y-auto"
                            >
                                {/* Modal Header */}
                                <div className="sticky top-0 bg-[#111] border-b border-white/5 p-6 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a3a3a] to-[#0a1a1a] flex items-center justify-center text-[#D4AF37] font-display font-bold text-2xl border border-white/10">
                                            {selectedCustomer.firstName?.[0] || selectedCustomer.email?.[0]?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-display text-[#FAF9F7]">
                                                {selectedCustomer.firstName || selectedCustomer.lastName
                                                    ? `${selectedCustomer.firstName || ''} ${selectedCustomer.lastName || ''}`.trim()
                                                    : 'Anonymous Customer'}
                                            </h2>
                                            <p className="text-sm text-[#555]">{selectedCustomer.email}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7]">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Modal Content */}
                                <div className="p-6 space-y-6">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-[#0a0f0f] rounded-xl p-4 border border-white/5 text-center">
                                            <p className="text-2xl font-display font-bold text-[#D4AF37]">{selectedCustomer.totalOrders || 0}</p>
                                            <p className="text-xs text-[#555] uppercase tracking-wider mt-1">Total Orders</p>
                                        </div>
                                        <div className="bg-[#0a0f0f] rounded-xl p-4 border border-white/5 text-center">
                                            <p className="text-2xl font-display font-bold text-emerald-400">${(selectedCustomer.totalSpent || 0).toFixed(0)}</p>
                                            <p className="text-xs text-[#555] uppercase tracking-wider mt-1">Total Spent</p>
                                        </div>
                                        <div className="bg-[#0a0f0f] rounded-xl p-4 border border-white/5 text-center">
                                            <p className="text-2xl font-display font-bold text-violet-400">{selectedCustomer.loyaltyPoints || 0}</p>
                                            <p className="text-xs text-[#555] uppercase tracking-wider mt-1">Loyalty Points</p>
                                        </div>
                                    </div>

                                    {/* Profile Information */}
                                    <div className="bg-[#0a0f0f] rounded-xl border border-white/5 p-5">
                                        <h3 className="text-sm font-semibold text-[#FAF9F7] mb-4 flex items-center gap-2">
                                            <User size={16} className="text-[#D4AF37]" />
                                            Profile Information
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Full Name</p>
                                                <p className="text-[#FAF9F7]">{`${selectedCustomer.firstName || '-'} ${selectedCustomer.lastName || ''}`}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Email</p>
                                                <p className="text-[#FAF9F7]">{selectedCustomer.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Phone</p>
                                                <p className="text-[#FAF9F7]">{selectedCustomer.phone || 'Not provided'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Member Since</p>
                                                <p className="text-[#FAF9F7]">
                                                    {selectedCustomer.createdAt
                                                        ? new Date(selectedCustomer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                        : '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Addresses */}
                                    <div className="bg-[#0a0f0f] rounded-xl border border-white/5 p-5">
                                        <h3 className="text-sm font-semibold text-[#FAF9F7] mb-4 flex items-center gap-2">
                                            <MapPin size={16} className="text-[#D4AF37]" />
                                            Saved Addresses
                                        </h3>
                                        {selectedCustomer.addresses?.length > 0 ? (
                                            <div className="space-y-3">
                                                {selectedCustomer.addresses.map((addr, i) => (
                                                    <div key={i} className="bg-white/5 rounded-lg p-3">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs font-medium text-[#FAF9F7]">{addr.label || `Address ${i + 1}`}</span>
                                                            {addr.isDefault && (
                                                                <span className="text-[9px] px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded uppercase">Default</span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-[#888]">
                                                            {addr.street}, {addr.city}, {addr.state} {addr.postalCode}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-[#555]">No addresses saved</p>
                                        )}
                                    </div>

                                    {/* Account Activity */}
                                    <div className="bg-[#0a0f0f] rounded-xl border border-white/5 p-5">
                                        <h3 className="text-sm font-semibold text-[#FAF9F7] mb-4 flex items-center gap-2">
                                            <Calendar size={16} className="text-[#D4AF37]" />
                                            Account Activity
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Last Login</p>
                                                <p className="text-[#FAF9F7]">
                                                    {selectedCustomer.lastLoginAt
                                                        ? new Date(selectedCustomer.lastLoginAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                        : 'Never'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-[#555] uppercase tracking-wider mb-1">Account Status</p>
                                                <span className="inline-flex items-center px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="sticky bottom-0 bg-[#111] border-t border-white/5 p-4 flex justify-end gap-3">
                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] transition-all"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => handleSendEmail(selectedCustomer.email)}
                                        className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold rounded-xl transition-all"
                                    >
                                        Send Email
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Customers;
