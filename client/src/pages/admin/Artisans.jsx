/**
 * Admin Artisans - Modern Glassmorphism Artisans Management
 * Dark theme matching the admin dashboard
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Plus, Edit2, Trash2, Users, Loader2, RefreshCw,
    MapPin, Package, CheckCircle, Clock, X, Mail, ExternalLink
} from 'lucide-react';

const Artisans = () => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [selectedArtisan, setSelectedArtisan] = useState(null);

    const [artisans, setArtisans] = useState([
        {
            id: 1,
            name: 'Elena Rossi',
            brand: 'Tuscan Heritage',
            location: 'Florence, Italy',
            country: 'Italy',
            products: 45,
            status: 'verified',
            joinDate: 'Mar 2025',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
            specialty: 'Olive Oils & Balsamic'
        },
        {
            id: 2,
            name: 'Kenji Tanaka',
            brand: 'Kyoto Ceramics',
            location: 'Kyoto, Japan',
            country: 'Japan',
            products: 32,
            status: 'verified',
            joinDate: 'Jan 2025',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
            specialty: 'Premium Matcha & Tea'
        },
        {
            id: 3,
            name: 'Amara Okafor',
            brand: 'Lagos Weavers',
            location: 'Lagos, Nigeria',
            country: 'Nigeria',
            products: 67,
            status: 'pending',
            joinDate: 'Feb 2025',
            image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200',
            specialty: 'African Spices'
        },
        {
            id: 4,
            name: 'Marcus Chen',
            brand: 'Golden Valley Coffee',
            location: 'San Francisco, USA',
            country: 'USA',
            products: 28,
            status: 'verified',
            joinDate: 'Dec 2024',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
            specialty: 'Single-Origin Coffee'
        },
        {
            id: 5,
            name: 'Sophie Laurent',
            brand: 'Provence Délices',
            location: 'Provence, France',
            country: 'France',
            products: 52,
            status: 'verified',
            joinDate: 'Nov 2024',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
            specialty: 'Artisan Honey & Preserves'
        }
    ]);

    const pendingRequests = artisans.filter(a => a.status === 'pending').length;

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    const handleVerify = (artisanId) => {
        setArtisans(artisans.map(a =>
            a.id === artisanId ? { ...a, status: 'verified' } : a
        ));
        setShowVerifyModal(false);
    };

    const filteredArtisans = artisans.filter(artisan => {
        const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artisan.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = locationFilter === 'all' || artisan.country === locationFilter;
        return matchesSearch && matchesLocation;
    });

    const locations = ['all', ...new Set(artisans.map(a => a.country))];

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
                        Artisan <span className="text-[#D4AF37]">Partners</span>
                    </h1>
                    <p className="text-[#666] text-sm">Manage artisan profiles and verification requests.</p>
                </div>
                <div className="flex items-center gap-3">
                    {pendingRequests > 0 && (
                        <button
                            onClick={() => setShowVerifyModal(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm text-amber-400 hover:bg-amber-500/20 transition-all"
                        >
                            <Clock size={16} />
                            {pendingRequests} Pending
                        </button>
                    )}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
                    >
                        <Plus size={16} />
                        Invite Artisan
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Artisans', value: artisans.length, color: 'from-[#D4AF37] to-[#b8962f]' },
                    { label: 'Verified', value: artisans.filter(a => a.status === 'verified').length, color: 'from-emerald-500 to-green-600' },
                    { label: 'Pending', value: pendingRequests, color: 'from-amber-500 to-orange-600' },
                    { label: 'Total Products', value: artisans.reduce((sum, a) => sum + a.products, 0), color: 'from-violet-500 to-purple-600' }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                            <Users size={18} className="text-white" />
                        </div>
                        <p className="text-2xl font-display text-[#FAF9F7] font-semibold">{stat.value}</p>
                        <p className="text-[#555] text-xs font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                    <input
                        type="text"
                        placeholder="Search artisans..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                    />
                </div>
                <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 outline-none cursor-pointer"
                >
                    {locations.map(loc => (
                        <option key={loc} value={loc} className="bg-[#1a1a1a]">
                            {loc === 'all' ? 'All Locations' : loc}
                        </option>
                    ))}
                </select>
            </div>

            {/* Artisans Table */}
            <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/[0.02] text-[#555] uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Artisan</th>
                            <th className="px-6 py-4 font-semibold">Brand</th>
                            <th className="px-6 py-4 font-semibold">Location</th>
                            <th className="px-6 py-4 font-semibold">Products</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredArtisans.map((artisan, idx) => (
                            <motion.tr
                                key={artisan.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                                            <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#FAF9F7]">{artisan.name}</p>
                                            <p className="text-xs text-[#555]">Since {artisan.joinDate}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-[#D4AF37] font-medium">{artisan.brand}</p>
                                    <p className="text-xs text-[#555]">{artisan.specialty}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-[#888]">
                                        <MapPin size={12} className="text-[#555]" />
                                        {artisan.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-[#888]">
                                        <Package size={12} className="text-[#555]" />
                                        {artisan.products}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
                                        ${artisan.status === 'verified'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}
                                    >
                                        {artisan.status === 'verified' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                        {artisan.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7] transition-colors">
                                            <ExternalLink size={16} />
                                        </button>
                                        <button className="p-2 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7] transition-colors">
                                            <Mail size={16} />
                                        </button>
                                        <button className="p-2 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7] transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Invite Artisan Modal */}
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
                                <h3 className="text-xl font-display text-[#FAF9F7]">Invite Artisan</h3>
                                <button onClick={() => setShowAddModal(false)} className="text-[#555] hover:text-[#FAF9F7]">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                        placeholder="artisan@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Personal Message (Optional)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none resize-none"
                                        placeholder="We'd love to have you join ARTISIO..."
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
                                    Send Invitation
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Verification Requests Modal */}
            <AnimatePresence>
                {showVerifyModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowVerifyModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl p-6 z-50"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-display text-[#FAF9F7]">Pending Verifications</h3>
                                <button onClick={() => setShowVerifyModal(false)} className="text-[#555] hover:text-[#FAF9F7]">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {artisans.filter(a => a.status === 'pending').map(artisan => (
                                    <div key={artisan.id} className="flex items-center justify-between p-4 bg-[#0a0f0f] rounded-xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <img src={artisan.image} alt={artisan.name} className="w-12 h-12 rounded-xl object-cover" />
                                            <div>
                                                <p className="text-sm font-medium text-[#FAF9F7]">{artisan.name}</p>
                                                <p className="text-xs text-[#D4AF37]">{artisan.brand}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-[#888] transition-all">
                                                Reject
                                            </button>
                                            <button
                                                onClick={() => handleVerify(artisan.id)}
                                                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-xs font-medium transition-all"
                                            >
                                                Verify
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Artisans;
