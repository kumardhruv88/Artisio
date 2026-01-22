/**
 * WishlistPage - Lumière-inspired wishlist design
 * Clean edges, thin elegant typography, compact spacing
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const WishlistPage = () => {
    const navigate = useNavigate();
    const { wishlist, removeFromWishlist, clearWishlist, loading } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        addToCart(item, 1);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="animate-spin w-6 h-6 border border-[#333] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back</span>
                </button>

                {/* Empty State */}
                {wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-32"
                    >
                        {/* Heart Icon - Thin outline */}
                        <Heart
                            className="w-16 h-16 text-[#c0bdb8] mb-8"
                            strokeWidth={1}
                        />

                        {/* Title - Elegant serif */}
                        <h1
                            className="text-3xl md:text-4xl text-[#333] mb-4"
                            style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 400,
                                fontStyle: 'italic'
                            }}
                        >
                            Your Wishlist is Empty
                        </h1>

                        {/* Subtitle - Gold/tan color */}
                        <p
                            className="text-sm mb-10"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                color: '#D4AF37',
                                fontWeight: 400,
                                letterSpacing: '0.02em'
                            }}
                        >
                            Save your favorite items to your wishlist for later.
                        </p>

                        {/* CTA Button - Dark with arrow */}
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-3 px-8 py-4 bg-[#333] text-white transition-colors hover:bg-[#1a1a1a]"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Explore Collection
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        {/* Header Row */}
                        <div className="flex items-center justify-between mb-10">
                            <h1
                                className="text-3xl md:text-4xl text-[#333]"
                                style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 400,
                                    fontStyle: 'italic'
                                }}
                            >
                                My Wishlist
                            </h1>

                            {/* Clear All Button - Coral/red outlined */}
                            <button
                                onClick={clearWishlist}
                                className="px-5 py-2 border border-[#e84a5f] text-[#e84a5f] text-xs font-medium uppercase tracking-wider hover:bg-[#e84a5f] hover:text-white transition-colors rounded-full"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Product Grid - 3 columns on desktop */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                            <AnimatePresence>
                                {wishlist.map((item, index) => (
                                    <motion.div
                                        key={item._id || item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group"
                                    >
                                        {/* Image Container - Tall aspect ratio */}
                                        <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f4f2] mb-4">
                                            <Link to={`/products/${item.slug || item._id || item.id}`}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </Link>

                                            {/* Trash Button - Top right, subtle */}
                                            <button
                                                onClick={() => removeFromWishlist(item._id || item.id)}
                                                className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-[#666]" />
                                            </button>

                                            {/* Add to Bag Button - Appears on hover */}
                                            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className="w-full py-4 bg-[#333] text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#1a1a1a] transition-colors"
                                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                                >
                                                    Add to Bag
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Info - Compact spacing */}
                                        <div>
                                            {/* Category - Gold, uppercase, tiny */}
                                            <p
                                                className="mb-1"
                                                style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '10px',
                                                    fontWeight: 500,
                                                    color: '#D4AF37',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em'
                                                }}
                                            >
                                                {item.artisan || item.category || 'Artisan'}
                                            </p>

                                            {/* Product Name - Clean serif */}
                                            <Link to={`/products/${item.slug || item._id || item.id}`}>
                                                <h3
                                                    className="text-[#333] hover:text-[#666] transition-colors mb-2 line-clamp-1"
                                                    style={{
                                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                                        fontSize: '17px',
                                                        fontWeight: 400
                                                    }}
                                                >
                                                    {item.name}
                                                </h3>
                                            </Link>

                                            {/* Price - Simple */}
                                            <div className="flex items-center gap-2">
                                                <span
                                                    style={{
                                                        fontFamily: "'Inter', sans-serif",
                                                        fontSize: '14px',
                                                        fontWeight: 500,
                                                        color: '#333'
                                                    }}
                                                >
                                                    ${(item.salePrice || item.price)?.toFixed(2)}
                                                </span>
                                                {item.salePrice && item.price && item.salePrice < item.price && (
                                                    <span
                                                        style={{
                                                            fontFamily: "'Inter', sans-serif",
                                                            fontSize: '13px',
                                                            color: '#999',
                                                            textDecoration: 'line-through'
                                                        }}
                                                    >
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
