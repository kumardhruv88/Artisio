/**
 * Admin Categories - Modern Glassmorphism Categories Management
 * Food & Beverage categories for ARTISIO
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Plus, Edit2, Trash2, FolderTree, Loader2, RefreshCw,
    Coffee, Candy, Droplet, Leaf, FlaskConical, Wheat, Image, X
} from 'lucide-react';

const Categories = () => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '' });

    // Food categories for ARTISIO
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Coffee',
            description: 'Premium single-origin and artisan roasted coffees',
            products: 24,
            icon: Coffee,
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
            color: 'from-amber-600 to-amber-800'
        },
        {
            id: 2,
            name: 'Chocolate',
            description: 'Handcrafted chocolates and confections',
            products: 18,
            icon: Candy,
            image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400',
            color: 'from-amber-800 to-amber-950'
        },
        {
            id: 3,
            name: 'Honey & Preserves',
            description: 'Raw honey, jams, and artisan preserves',
            products: 15,
            icon: Droplet,
            image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
            color: 'from-yellow-500 to-amber-600'
        },
        {
            id: 4,
            name: 'Tea',
            description: 'Fine teas from around the world',
            products: 21,
            icon: Leaf,
            image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
            color: 'from-green-600 to-emerald-700'
        },
        {
            id: 5,
            name: 'Oils & Vinegars',
            description: 'Extra virgin olive oils and aged balsamic',
            products: 12,
            icon: FlaskConical,
            image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
            color: 'from-lime-600 to-green-700'
        },
        {
            id: 6,
            name: 'Spices',
            description: 'Exotic spices and seasoning blends',
            products: 19,
            icon: Wheat,
            image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400',
            color: 'from-orange-500 to-red-600'
        },
        {
            id: 7,
            name: 'Cheese',
            description: 'Artisan cheeses from small farms',
            products: 14,
            icon: Wheat,
            image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400',
            color: 'from-yellow-400 to-amber-500'
        },
        {
            id: 8,
            name: 'Bakery',
            description: 'Fresh baked goods and pastries',
            products: 8,
            icon: Wheat,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
            color: 'from-amber-400 to-orange-500'
        }
    ]);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 500);
    }, []);

    const handleAddCategory = () => {
        if (newCategory.name) {
            setCategories([...categories, {
                id: categories.length + 1,
                name: newCategory.name,
                description: newCategory.description,
                products: 0,
                icon: Wheat,
                image: newCategory.image || 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400',
                color: 'from-[#D4AF37] to-[#b8962f]'
            }]);
            setNewCategory({ name: '', description: '', image: '' });
            setShowAddModal(false);
        }
    };

    const handleDeleteCategory = (id) => {
        setCategories(categories.filter(c => c.id !== id));
        setShowDeleteModal(false);
        setSelectedCategory(null);
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        Product <span className="text-[#D4AF37]">Categories</span>
                    </h1>
                    <p className="text-[#666] text-sm">Organize your products into catalog sections.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setLoading(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] hover:text-[#FAF9F7] transition-all"
                    >
                        <RefreshCw size={16} />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
                    >
                        <Plus size={16} />
                        Add Category
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Categories', value: categories.length, color: 'from-[#D4AF37] to-[#b8962f]' },
                    { label: 'Total Products', value: categories.reduce((sum, c) => sum + c.products, 0), color: 'from-emerald-500 to-green-600' },
                    { label: 'Active', value: categories.length, color: 'from-blue-500 to-cyan-600' },
                    { label: 'Empty', value: categories.filter(c => c.products === 0).length, color: 'from-amber-500 to-orange-600' }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                            <FolderTree size={18} className="text-white" />
                        </div>
                        <p className="text-2xl font-display text-[#FAF9F7] font-semibold">{stat.value}</p>
                        <p className="text-[#555] text-xs font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-4">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555]" size={18} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredCategories.map((category, idx) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden hover:border-[#D4AF37]/30 transition-all"
                    >
                        {/* Image */}
                        <div className="relative h-40 overflow-hidden">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Icon Badge */}
                            <div className={`absolute top-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                                <category.icon size={18} className="text-white" />
                            </div>

                            {/* Actions */}
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors">
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setShowDeleteModal(true);
                                    }}
                                    className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="text-lg font-display text-[#FAF9F7] mb-1">{category.name}</h3>
                            <p className="text-xs text-[#555] mb-3 line-clamp-2">{category.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#D4AF37] font-medium">{category.products} products</span>
                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold uppercase rounded-full">
                                    Active
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add Category Modal */}
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
                                <h3 className="text-xl font-display text-[#FAF9F7]">Add New Category</h3>
                                <button onClick={() => setShowAddModal(false)} className="text-[#555] hover:text-[#FAF9F7]">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                        placeholder="e.g. Artisan Pasta"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Description</label>
                                    <textarea
                                        value={newCategory.description}
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none resize-none"
                                        placeholder="Category description..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        value={newCategory.image}
                                        onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                                        className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                        placeholder="https://..."
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
                                    onClick={handleAddCategory}
                                    className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold rounded-xl transition-all"
                                >
                                    Create Category
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDeleteModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6 z-50"
                        >
                            <h3 className="text-xl font-display text-[#FAF9F7] mb-2">Delete Category</h3>
                            <p className="text-[#888] text-sm mb-6">
                                Are you sure you want to delete "{selectedCategory?.name}"? This will affect {selectedCategory?.products} products.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(selectedCategory?.id)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-all"
                                >
                                    Delete Category
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Categories;
