/**
 * Wishlist - Displays user's saved items from WishlistContext
 * Works for both logged-in users and guests
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, Star, Eye } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist, loading } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        addToCart(item, 1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="animate-spin w-8 h-8 border-2 border-[#1a3a3a] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif text-[#1a3a3a] mb-2">
                        My Wishlist
                    </h1>
                    <p className="text-gray-500">
                        {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
                    </p>
                </div>
                {wishlist.length > 0 && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => wishlist.forEach(item => addToCart(item, 1))}
                        className="px-6 py-3 bg-[#1a3a3a] text-white text-sm font-medium uppercase tracking-wider rounded-xl hover:bg-[#0f2424] transition-colors"
                    >
                        Add All to Cart
                    </motion.button>
                )}
            </div>

            {/* Grid */}
            {wishlist.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-2xl font-serif text-[#1a3a3a] mb-3">
                        Your wishlist is empty
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Start adding your favorite artisan products to keep track of items you love
                    </p>
                    <Link to="/products">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-3 bg-[#1a3a3a] text-white text-sm font-medium uppercase tracking-wider rounded-xl"
                        >
                            Explore Products
                        </motion.button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((item, index) => (
                        <motion.div
                            key={item._id || item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden bg-gray-50">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Sale Badge */}
                                {item.salePrice && (
                                    <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-medium uppercase rounded-md">
                                        Sale
                                    </span>
                                )}

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromWishlist(item._id || item.id)}
                                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>

                                {/* Quick View */}
                                <Link to={`/products/${item.slug || item._id || item.id}`}>
                                    <div className="absolute bottom-3 left-3 right-3 text-center py-3 bg-white/95 rounded-lg opacity-0 group-hover:opacity-100 transition-all text-xs font-medium uppercase tracking-wide text-[#1a3a3a] hover:bg-white">
                                        <Eye className="inline w-4 h-4 mr-2" />
                                        Quick View
                                    </div>
                                </Link>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <p className="text-xs font-medium text-[#D4AF37] uppercase tracking-wider mb-2">
                                    {item.artisan || item.category || 'Artisan'}
                                </p>
                                <h3 className="font-serif text-lg text-[#1a3a3a] mb-3 line-clamp-1">
                                    {item.name}
                                </h3>

                                {/* Rating */}
                                {item.rating && (
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.floor(item.rating)
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Price */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-serif text-xl font-semibold text-[#1a3a3a]">
                                        ${(item.salePrice || item.price)?.toFixed(2)}
                                    </span>
                                    {item.salePrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            ${item.price?.toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Add to Cart */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAddToCart(item)}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#1a3a3a] text-white text-xs font-medium uppercase tracking-wider rounded-xl hover:bg-[#0f2424] transition-colors"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Add to Cart
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default Wishlist;
