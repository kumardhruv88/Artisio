/**
 * Admin Inventory - Modern Glassmorphism Inventory Management
 * Dark theme matching the admin dashboard
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search, Package, Loader2, RefreshCw, AlertTriangle,
    TrendingDown, TrendingUp, Archive, BarChart3, Filter
} from 'lucide-react';
import adminAPI from '../../services/adminAPI';

const Inventory = () => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [stockFilter, setStockFilter] = useState('all');
    const [inventory, setInventory] = useState([]);
    const [stats, setStats] = useState({
        totalProducts: 0,
        inStock: 0,
        lowStock: 0,
        outOfStock: 0
    });

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            // Try admin inventory endpoint
            try {
                const response = await adminAPI.getInventory();
                if (response.success) {
                    setStats(response.data.stats);
                    setInventory(response.data.products || []);
                }
            } catch (e) {
                // Fallback to products
                const res = await fetch('http://localhost:5000/api/products');
                const products = await res.json();
                const data = Array.isArray(products) ? products : products.data || [];
                setInventory(data);

                const lowStockThreshold = 10;
                setStats({
                    totalProducts: data.length,
                    inStock: data.filter(p => (p.stock || 0) > lowStockThreshold).length,
                    lowStock: data.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= lowStockThreshold).length,
                    outOfStock: data.filter(p => (p.stock || 0) === 0).length
                });
            }
        } catch (error) {
            console.error('Error fetching inventory:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStockStatus = (stock) => {
        if (stock === 0) return { label: 'Out of Stock', color: 'text-red-400 bg-red-500/10 border-red-500/20' };
        if (stock <= 10) return { label: 'Low Stock', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
        return { label: 'In Stock', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    };

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku?.toLowerCase().includes(searchQuery.toLowerCase());
        const stock = item.stock || 0;
        const matchesFilter = stockFilter === 'all' ||
            (stockFilter === 'instock' && stock > 10) ||
            (stockFilter === 'lowstock' && stock > 0 && stock <= 10) ||
            (stockFilter === 'outofstock' && stock === 0);
        return matchesSearch && matchesFilter;
    });

    // Low stock alerts
    const lowStockAlerts = inventory.filter(p => (p.stock || 0) <= 10 && (p.stock || 0) > 0).slice(0, 5);
    const outOfStockAlerts = inventory.filter(p => (p.stock || 0) === 0).slice(0, 3);

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
                        Inventory <span className="text-[#D4AF37]">Management</span>
                    </h1>
                    <p className="text-[#666] text-sm">Monitor stock levels and manage product inventory.</p>
                </div>
                <button
                    onClick={fetchInventory}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'from-[#D4AF37] to-[#b8962f]' },
                    { label: 'In Stock', value: stats.inStock, icon: Archive, color: 'from-emerald-500 to-green-600' },
                    { label: 'Low Stock', value: stats.lowStock, icon: TrendingDown, color: 'from-amber-500 to-orange-600' },
                    { label: 'Out of Stock', value: stats.outOfStock, icon: AlertTriangle, color: 'from-red-500 to-rose-600' }
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

            {/* Alerts Section */}
            {(lowStockAlerts.length > 0 || outOfStockAlerts.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Low Stock Alerts */}
                    {lowStockAlerts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingDown className="text-amber-400" size={18} />
                                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide">Low Stock Alerts</h3>
                            </div>
                            <div className="space-y-3">
                                {lowStockAlerts.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-[#0a0f0f]/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] overflow-hidden">
                                                {item.images?.[0] && (
                                                    <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[#FAF9F7]">{item.name}</p>
                                                <p className="text-xs text-[#555]">{item.category}</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold">
                                            {item.stock} left
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Out of Stock Alerts */}
                    {outOfStockAlerts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="text-red-400" size={18} />
                                <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wide">Out of Stock</h3>
                            </div>
                            <div className="space-y-3">
                                {outOfStockAlerts.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-[#0a0f0f]/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] overflow-hidden">
                                                {item.images?.[0] && (
                                                    <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[#FAF9F7]">{item.name}</p>
                                                <p className="text-xs text-[#555]">{item.category}</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold">
                                            Restock
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Filters */}
            <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                    <input
                        type="text"
                        placeholder="Search by product name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                    />
                </div>
                <div className="flex gap-3">
                    <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className="px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 outline-none cursor-pointer"
                    >
                        <option value="all" className="bg-[#1a1a1a]">All Products</option>
                        <option value="instock" className="bg-[#1a1a1a]">In Stock</option>
                        <option value="lowstock" className="bg-[#1a1a1a]">Low Stock</option>
                        <option value="outofstock" className="bg-[#1a1a1a]">Out of Stock</option>
                    </select>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/[0.02] text-[#555] uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Product</th>
                            <th className="px-6 py-4 font-semibold">SKU</th>
                            <th className="px-6 py-4 font-semibold">Category</th>
                            <th className="px-6 py-4 font-semibold">Stock</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredInventory.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-[#555]">
                                    <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>No inventory items found</p>
                                </td>
                            </tr>
                        ) : (
                            filteredInventory.map((item, idx) => {
                                const status = getStockStatus(item.stock || 0);
                                return (
                                    <motion.tr
                                        key={item._id || idx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] overflow-hidden border border-white/5">
                                                    {item.images?.[0] ? (
                                                        <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Package className="w-4 h-4 text-[#333]" />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-[#FAF9F7]">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#555] font-mono">{item.sku || '-'}</td>
                                        <td className="px-6 py-4 text-sm text-[#888]">{item.category}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${(item.stock || 0) === 0 ? 'bg-red-500' :
                                                                (item.stock || 0) <= 10 ? 'bg-amber-500' : 'bg-emerald-500'
                                                            }`}
                                                        style={{ width: `${Math.min((item.stock || 0) / 100 * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-[#FAF9F7]">{item.stock || 0}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${status.color}`}>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="px-3 py-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg text-xs font-medium transition-all">
                                                Restock
                                            </button>
                                        </td>
                                    </motion.tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default Inventory;
