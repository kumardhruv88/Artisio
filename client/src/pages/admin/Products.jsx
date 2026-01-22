/**
 * Admin Products - Modern Glassmorphism Products Management
 * Fixed to properly fetch products from database
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Search, Filter, Plus, Edit2, Trash2, Eye, MoreHorizontal,
    Package, Image, Loader2, Grid, List, RefreshCw, Download, X
} from 'lucide-react';
import adminAPI from '../../services/adminAPI';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'Coffee',
        stock: '',
        description: '',
        images: ['']
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            // Try admin endpoint first, fallback to public
            try {
                const response = await adminAPI.getProducts();
                if (response.success && response.data) {
                    setProducts(response.data);
                } else if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else if (Array.isArray(response)) {
                    setProducts(response);
                }
            } catch (adminError) {
                // Fallback to public products API
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data.data) {
                    setProducts(data.data);
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await adminAPI.deleteProduct(productId);
            await fetchProducts();
            setShowDeleteModal(false);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const handleAddProduct = async () => {
        try {
            const productData = {
                ...newProduct,
                price: parseFloat(newProduct.price) || 0,
                stock: parseInt(newProduct.stock) || 0,
                slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
                status: 'published'
            };
            await adminAPI.createProduct(productData);
            await fetchProducts();
            setShowAddModal(false);
            setNewProduct({ name: '', price: '', category: 'Coffee', stock: '', description: '', images: [''] });
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        total: products.length,
        published: products.filter(p => p.status === 'published' || !p.status).length,
        draft: products.filter(p => p.status === 'draft').length,
        lowStock: products.filter(p => (p.stock || 0) <= 10).length
    };

    const categories = ['Coffee', 'Chocolate', 'Honey & Preserves', 'Oils & Vinegars', 'Tea', 'Spices', 'Cheese', 'Bakery'];

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
                        Products <span className="text-[#D4AF37]">Catalog</span>
                    </h1>
                    <p className="text-[#666] text-sm">Manage your product inventory and listings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchProducts}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] hover:text-[#FAF9F7] transition-all"
                    >
                        <RefreshCw size={16} />
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
                    >
                        <Plus size={16} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Products', value: stats.total, color: 'from-[#D4AF37] to-[#b8962f]' },
                    { label: 'Published', value: stats.published, color: 'from-emerald-500 to-green-600' },
                    { label: 'Draft', value: stats.draft, color: 'from-blue-500 to-cyan-600' },
                    { label: 'Low Stock', value: stats.lowStock, color: 'from-red-500 to-rose-600' }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-5"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                            <Package size={18} className="text-white" />
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
                        placeholder="Search products..."
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
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>

                    {/* View Toggle */}
                    <div className="flex bg-[#0a0f0f] border border-white/10 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-[#D4AF37] text-[#0a0f0f]' : 'text-[#555] hover:text-[#FAF9F7]'}`}
                        >
                            <Grid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-[#D4AF37] text-[#0a0f0f]' : 'text-[#555] hover:text-[#FAF9F7]'}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredProducts.length === 0 ? (
                        <div className="col-span-full py-20 text-center">
                            <Package className="w-16 h-16 mx-auto mb-4 text-[#333]" />
                            <p className="text-[#555]">No products found</p>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="mt-4 text-[#D4AF37] hover:underline text-sm"
                            >
                                Add your first product
                            </button>
                        </div>
                    ) : (
                        filteredProducts.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden hover:border-[#D4AF37]/30 transition-all"
                            >
                                {/* Image */}
                                <div className="relative aspect-square bg-[#0a0f0f] overflow-hidden">
                                    {product.images?.[0] ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Image className="w-12 h-12 text-[#333]" />
                                        </div>
                                    )}

                                    {/* Actions Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                        <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors">
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setShowDeleteModal(true);
                                            }}
                                            className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Status Badge */}
                                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
                                        ${(product.status === 'published' || !product.status) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                        {product.status || 'Published'}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <p className="text-xs text-[#555] mb-1">{product.category}</p>
                                    <h3 className="text-sm font-medium text-[#FAF9F7] truncate mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-[#D4AF37]">${product.price}</span>
                                        <span className={`text-xs ${(product.stock || 0) <= 10 ? 'text-red-400' : 'text-[#555]'}`}>
                                            {product.stock || 0} in stock
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            ) : (
                // List View
                <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02] text-[#555] uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Product</th>
                                <th className="px-6 py-4 font-semibold">SKU</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.map((product, idx) => (
                                <motion.tr
                                    key={product._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] overflow-hidden border border-white/5">
                                                {product.images?.[0] ? (
                                                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Image className="w-4 h-4 text-[#333]" />
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-[#FAF9F7]">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#555]">{product.sku || '-'}</td>
                                    <td className="px-6 py-4 text-sm text-[#888]">{product.category}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-[#D4AF37]">${product.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm ${(product.stock || 0) <= 10 ? 'text-red-400' : 'text-[#888]'}`}>
                                            {product.stock || 0}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
                                            ${(product.status === 'published' || !product.status) ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {product.status || 'Published'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-white/5 rounded-lg text-[#555] hover:text-[#FAF9F7] transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-[#555] hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete Confirmation Modal */}
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
                            <h3 className="text-xl font-display text-[#FAF9F7] mb-2">Delete Product</h3>
                            <p className="text-[#888] text-sm mb-6">
                                Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-[#888] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(selectedProduct?._id)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-all"
                                >
                                    Delete Product
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Add Product Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddModal(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        />
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-display text-[#FAF9F7]">Add New Product</h3>
                                    <button onClick={() => setShowAddModal(false)} className="text-[#555] hover:text-[#FAF9F7]">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                            placeholder="e.g. Ethiopian Yirgacheffe Coffee"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Price ($)</label>
                                            <input
                                                type="number"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                                placeholder="29.99"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Stock</label>
                                            <input
                                                type="number"
                                                value={newProduct.stock}
                                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                                className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                                placeholder="100"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Category</label>
                                        <select
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 outline-none cursor-pointer"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            value={newProduct.images[0]}
                                            onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Description</label>
                                        <textarea
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:outline-none resize-none"
                                            placeholder="Product description..."
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
                                        onClick={handleAddProduct}
                                        className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold rounded-xl transition-all"
                                    >
                                        Create Product
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

export default Products;
