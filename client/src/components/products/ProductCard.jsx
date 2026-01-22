/**
 * ProductCard - Product card with working wishlist and cart functionality
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product, index = 0 }) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart, isInCart } = useCart();
    const [addedToCart, setAddedToCart] = useState(false);

    const productId = product._id || product.id;
    const isWishlisted = isInWishlist(productId);
    const inCart = isInCart(productId);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const badgeVariant = (badge) => {
        switch (badge) {
            case 'New': return 'bg-blue-500';
            case 'Sale': return 'bg-red-500';
            case 'Bestseller': return 'bg-amber-500';
            case 'Low Stock': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="h-full"
        >
            <div className="group bg-white rounded-xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative overflow-hidden aspect-square bg-gray-100">
                    <Link to={`/products/${product.slug || productId}`}>
                        <img
                            src={product.image || product.images?.[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                    </Link>

                    {/* Badge */}
                    {product.badge && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className={`px-2.5 py-1 text-xs font-medium text-white rounded-full ${badgeVariant(product.badge)}`}>
                                {product.badge}
                            </span>
                        </div>
                    )}

                    {/* Wishlist Button - Always visible */}
                    <button
                        onClick={handleWishlistClick}
                        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${isWishlisted
                                ? 'bg-pink-500 text-white shadow-lg'
                                : 'bg-white/90 text-gray-600 hover:bg-pink-500 hover:text-white'
                            }`}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart
                            className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-current scale-110' : ''}`}
                        />
                    </button>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <Link
                            to={`/products/${product.slug || productId}`}
                            className="px-4 py-2 bg-white text-gray-800 rounded-full text-sm font-medium hover:bg-[#D4AF37] hover:text-white transition-colors"
                        >
                            Quick View
                        </Link>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Artisan/Brand */}
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {product.artisan || product.brand || product.category}
                    </p>

                    {/* Name */}
                    <Link to={`/products/${product.slug || productId}`}>
                        <h3 className="font-medium text-gray-900 mb-2 hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 0)
                                            ? 'text-amber-400 fill-amber-400'
                                            : 'text-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">
                            ({product.reviewCount || product.reviews || 0})
                        </span>
                    </div>

                    {/* Dietary Tags */}
                    {product.dietary && product.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {product.dietary.slice(0, 2).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] px-1.5 py-0.5 bg-green-50 text-green-700 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                        <div>
                            {product.salePrice || product.compareAtPrice ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-gray-900">
                                        ${(product.salePrice || product.price).toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        ${(product.compareAtPrice || product.price).toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold text-gray-900">
                                    ${product.price?.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={addedToCart || inCart}
                            className={`p-2.5 rounded-full transition-all duration-300 ${addedToCart || inCart
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-[#D4AF37] hover:text-white'
                                }`}
                            aria-label="Add to cart"
                        >
                            {addedToCart || inCart ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <ShoppingCart className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {/* Stock Indicator */}
                    {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
                        <p className="text-xs text-orange-600 mt-2">
                            Only {product.stock} left
                        </p>
                    )}
                    {product.stock === 0 && (
                        <p className="text-xs text-red-600 mt-2">Out of stock</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
