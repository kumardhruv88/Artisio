/**
 * Admin Subscriptions - Modern Glassmorphism Subscriptions Management
 * Dark theme matching the admin dashboard
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Plus, Package, Loader2, RefreshCw, Calendar,
    DollarSign, Users, TrendingUp, X, Edit2, Pause, Play, Trash2
} from 'lucide-react';

const Subscriptions = () => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeTab, setActiveTab] = useState('plans');

    const [plans, setPlans] = useState([
        {
            id: 1,
            name: 'Coffee Connoisseur',
            price: 49,
            interval: 'month',
            description: 'Premium single-origin coffee box',
            features: ['2 bags of specialty coffee', 'Tasting notes', 'Free shipping'],
            subscribers: 245,
            revenue: 12005,
            status: 'active'
        },
        {
            id: 2,
            name: 'Gourmet Explorer',
            price: 79,
            interval: 'month',
            description: 'Curated artisan food discovery box',
            features: ['5-7 artisan products', 'Recipe cards', 'Priority shipping'],
            subscribers: 189,
            revenue: 14931,
            status: 'active'
        },
        {
            id: 3,
            name: 'Tea Ceremony',
            price: 39,
            interval: 'month',
            description: 'Premium loose-leaf tea collection',
            features: ['3 premium teas', 'Steeping guide', 'Free shipping'],
            subscribers: 156,
            revenue: 6084,
            status: 'active'
        },
        {
            id: 4,
            name: 'Chocolate Journey',
            price: 59,
            interval: 'month',
            description: 'World chocolate discovery',
            features: ['4-6 chocolate bars', 'Origin stories', 'Tasting journal'],
            subscribers: 98,
            revenue: 5782,
            status: 'paused'
        }
    ]);

    const [subscribers, setSubscribers] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', plan: 'Coffee Connoisseur', status: 'active', startDate: '2024-11-15', nextBilling: '2025-02-15', amount: 49 },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', plan: 'Gourmet Explorer', status: 'active', startDate: '2024-10-20', nextBilling: '2025-02-20', amount: 79 },
        { id: 3, name: 'Carol White', email: 'carol@example.com', plan: 'Tea Ceremony', status: 'cancelled', startDate: '2024-09-01', nextBilling: '-', amount: 39 },
        { id: 4, name: 'David Brown', email: 'david@example.com', plan: 'Coffee Connoisseur', status: 'active', startDate: '2024-12-01', nextBilling: '2025-03-01', amount: 49 },
    ]);

    const totalRevenue = plans.reduce((sum, p) => sum + p.revenue, 0);
    const totalSubscribers = plans.reduce((sum, p) => sum + p.subscribers, 0);

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

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
                        Subscription <span className="text-[#D4AF37]">Management</span>
                    </h1>
                    <p className="text-[#666] text-sm">Manage subscription plans and subscribers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
                    >
                        <Plus size={16} />
                        Create Plan
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Plans', value: plans.length, icon: Package, color: 'from-[#D4AF37] to-[#b8962f]' },
                    { label: 'Active Subscribers', value: totalSubscribers, icon: Users, color: 'from-emerald-500 to-green-600' },
                    { label: 'Monthly Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'from-violet-500 to-purple-600' },
                    { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'from-blue-500 to-cyan-600' }
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

            {/* Tabs */}
            <div className="flex gap-2 bg-[#111]/60 backdrop-blur-xl rounded-xl border border-white/5 p-1 w-fit">
                <button
                    onClick={() => setActiveTab('plans')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'plans'
                            ? 'bg-[#D4AF37] text-[#0a0f0f]'
                            : 'text-[#888] hover:text-[#FAF9F7]'
                        }`}
                >
                    Subscription Plans
                </button>
                <button
                    onClick={() => setActiveTab('subscribers')}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'subscribers'
                            ? 'bg-[#D4AF37] text-[#0a0f0f]'
                            : 'text-[#888] hover:text-[#FAF9F7]'
                        }`}
                >
                    Subscribers
                </button>
            </div>

            {/* Plans View */}
            {activeTab === 'plans' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-5 hover:border-[#D4AF37]/30 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
                                    ${plan.status === 'active'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-amber-500/10 text-amber-400'}`}
                                >
                                    {plan.status}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7]">
                                        <Edit2 size={14} />
                                    </button>
                                    {plan.status === 'active' ? (
                                        <button className="p-1.5 hover:bg-amber-500/10 rounded-lg text-[#555] hover:text-amber-400">
                                            <Pause size={14} />
                                        </button>
                                    ) : (
                                        <button className="p-1.5 hover:bg-emerald-500/10 rounded-lg text-[#555] hover:text-emerald-400">
                                            <Play size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-lg font-display text-[#FAF9F7] mb-1">{plan.name}</h3>
                            <p className="text-xs text-[#555] mb-4">{plan.description}</p>

                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-3xl font-display text-[#D4AF37] font-semibold">${plan.price}</span>
                                <span className="text-sm text-[#555]">/{plan.interval}</span>
                            </div>

                            <ul className="space-y-2 mb-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-[#888]">
                                        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                                <div className="bg-[#0a0f0f] rounded-lg p-2.5">
                                    <p className="text-[10px] text-[#555] uppercase">Subscribers</p>
                                    <p className="text-sm font-semibold text-[#FAF9F7]">{plan.subscribers}</p>
                                </div>
                                <div className="bg-[#0a0f0f] rounded-lg p-2.5">
                                    <p className="text-[10px] text-[#555] uppercase">Revenue</p>
                                    <p className="text-sm font-semibold text-[#D4AF37]">${plan.revenue}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Subscribers View */}
            {activeTab === 'subscribers' && (
                <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                            <input
                                type="text"
                                placeholder="Search subscribers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02] text-[#555] uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Subscriber</th>
                                <th className="px-6 py-4 font-semibold">Plan</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Next Billing</th>
                                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {subscribers.filter(s =>
                                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                s.email.toLowerCase().includes(searchQuery.toLowerCase())
                            ).map((subscriber, idx) => (
                                <motion.tr
                                    key={subscriber.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-[#FAF9F7]">{subscriber.name}</p>
                                            <p className="text-xs text-[#555]">{subscriber.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#D4AF37]">{subscriber.plan}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
                                            ${subscriber.status === 'active'
                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'bg-red-500/10 text-red-400'}`}
                                        >
                                            {subscriber.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#888]">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-[#555]" />
                                            {subscriber.nextBilling}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-semibold text-[#FAF9F7]">
                                        ${subscriber.amount}/mo
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Plan Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6 z-50"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-display text-[#FAF9F7]">Create Subscription Plan</h3>
                                <button onClick={() => setShowAddModal(false)} className="text-[#555] hover:text-[#FAF9F7]">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Plan Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                        placeholder="e.g. Artisan Discovery Box"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Price ($)</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                            placeholder="49"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Interval</label>
                                        <select className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 outline-none">
                                            <option>month</option>
                                            <option>quarter</option>
                                            <option>year</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Description</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none resize-none"
                                        placeholder="What's included in this subscription..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end mt-6">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold rounded-xl transition-all"
                                >
                                    Create Plan
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Subscriptions;
