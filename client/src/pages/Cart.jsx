import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

/**
 * Cart Page - Lumière-style cart with real-time API integration
 */
const Cart = () => {
    const {
        cart,
        cartTotals,
        promoCode: appliedPromo,
        loading,
        updateQuantity: updateCartQuantity,
        removeFromCart,
        applyPromoCode,
        removePromoCode
    } = useCart();

    const [promoCodeInput, setPromoCodeInput] = useState('');
    const [promoError, setPromoError] = useState('');

    const handleApplyPromo = async () => {
        setPromoError('');
        const result = await applyPromoCode(promoCodeInput);
        if (result?.success) {
            setPromoCodeInput('');
        } else {
            setPromoError(result?.message || 'Invalid promo code');
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #fafaf8 0%, #ffffff 100%)' }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f0f0f0',
                        borderTopColor: '#D4AF37',
                        borderRadius: '50%',
                    }}
                />
            </div>
        );
    }

    // Empty Cart State
    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #fafaf8 0%, #ffffff 100%)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center px-6 max-w-md"
                >
                    <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                        <ShoppingBag size={48} style={{ color: '#9ca3af' }} />
                    </div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', fontWeight: 600, color: '#1a3a3a', marginBottom: '16px' }}>
                        Your Cart is Empty
                    </h2>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#6b7280', marginBottom: '32px', lineHeight: 1.6 }}>
                        Discover our curated collection of artisan products and find something special.
                    </p>
                    <Link to="/products">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 mx-auto"
                            style={{
                                padding: '16px 40px',
                                backgroundColor: '#1a3a3a',
                                color: '#ffffff',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '14px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                border: 'none',
                                borderRadius: '0',
                                cursor: 'pointer',
                            }}
                        >
                            Start Shopping <ArrowRight size={16} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    const { subtotal, discount, tax, shipping, total } = cartTotals;

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fafaf8 0%, #ffffff 100%)' }}>
            {/* Breadcrumb */}
            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="max-w-[1200px] mx-auto px-6 py-4">
                    <div className="flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>
                        <Link to="/" className="hover:text-[#1a3a3a] transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span style={{ color: '#1a3a3a' }}>Shopping Cart</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-12">
                {/* Page Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '42px',
                        fontWeight: 600,
                        color: '#1a3a3a',
                        marginBottom: '48px',
                    }}
                >
                    Shopping Cart
                </motion.h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {/* Column Headers - Desktop */}
                        <div className="hidden md:grid items-center gap-6 pb-4 mb-2" style={{ gridTemplateColumns: '100px 1fr 140px 100px 48px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Product</span>
                            <span></span>
                            <span className="text-center" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Quantity</span>
                            <span className="text-right" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Subtotal</span>
                            <span></span>
                        </div>

                        {/* Cart Items List */}
                        <div>
                            {cart.map((item, index) => {
                                const product = item.product || {};
                                const itemPrice = item.price || product.salePrice || product.price || 0;
                                const itemSubtotal = itemPrice * item.quantity;
                                const itemImage = product.images?.[0] || product.image || '';

                                return (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="grid items-center gap-6 py-6"
                                        style={{
                                            gridTemplateColumns: window.innerWidth >= 768 ? '100px 1fr 140px 100px 48px' : '80px 1fr',
                                            borderBottom: index !== cart.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                                        }}
                                    >
                                        {/* Product Image */}
                                        <Link to={`/products/${product.slug || item._id}`}>
                                            <motion.div
                                                whileHover={{ scale: 1.03 }}
                                                className="overflow-hidden"
                                                style={{ width: '100px', height: '100px', borderRadius: '8px', backgroundColor: '#f8f6f0' }}
                                            >
                                                <img
                                                    src={itemImage}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </motion.div>
                                        </Link>

                                        {/* Product Info */}
                                        <div className="min-w-0">
                                            <Link to={`/products/${product.slug || item._id}`}>
                                                <h3
                                                    className="transition-colors hover:text-[#d4af37]"
                                                    style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#1a3a3a', marginBottom: '6px' }}
                                                >
                                                    {product.name || 'Product'}
                                                </h3>
                                            </Link>
                                            {item.variant && (
                                                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                                                    {item.variant}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#1a3a3a' }}>${itemPrice.toFixed(2)}</span>
                                            </div>

                                            {/* Mobile: Quantity & Delete */}
                                            <div className="flex items-center gap-4 mt-4 md:hidden">
                                                <div className="flex items-center" style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                                                    <button onClick={() => updateCartQuantity(item._id, item.quantity - 1)} disabled={item.quantity <= 1} className="p-2 disabled:opacity-40">
                                                        <Minus size={14} style={{ color: '#1a3a3a' }} />
                                                    </button>
                                                    <span style={{ padding: '0 16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#1a3a3a' }}>{item.quantity}</span>
                                                    <button onClick={() => updateCartQuantity(item._id, item.quantity + 1)} className="p-2">
                                                        <Plus size={14} style={{ color: '#1a3a3a' }} />
                                                    </button>
                                                </div>
                                                <button onClick={() => removeFromCart(item._id)} className="p-2 hover:text-red-500 transition-colors" style={{ color: '#9ca3af' }}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Quantity - Desktop */}
                                        <div className="hidden md:flex items-center justify-center" style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                                            <button
                                                onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                                className="p-3 transition-colors hover:bg-[#f8f6f0] disabled:opacity-40"
                                            >
                                                <Minus size={14} style={{ color: '#1a3a3a' }} />
                                            </button>
                                            <span style={{ padding: '0 20px', fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, color: '#1a3a3a' }}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                                                className="p-3 transition-colors hover:bg-[#f8f6f0]"
                                            >
                                                <Plus size={14} style={{ color: '#1a3a3a' }} />
                                            </button>
                                        </div>

                                        {/* Subtotal - Desktop */}
                                        <div className="hidden md:block text-right">
                                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Subtotal</p>
                                            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#1a3a3a' }}>
                                                ${itemSubtotal.toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Delete - Desktop */}
                                        <div className="hidden md:flex justify-center">
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="p-2 rounded-full transition-all hover:bg-red-50 hover:text-red-500"
                                                style={{ color: '#9ca3af' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Summary - Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    padding: '32px',
                                }}
                            >
                                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 600, color: '#1a3a3a', marginBottom: '24px' }}>
                                    Order Summary
                                </h2>

                                {/* Price Breakdown */}
                                <div className="space-y-4 pb-6 mb-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                                    <div className="flex justify-between">
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6b7280' }}>Subtotal ({cart.length} items)</span>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, color: '#1a3a3a' }}>${subtotal?.toFixed(2) || '0.00'}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between">
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#059669' }}>Discount</span>
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, color: '#059669' }}>-${discount?.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6b7280' }}>Shipping</span>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, color: shipping === 0 ? '#059669' : '#1a3a3a' }}>
                                            {shipping === 0 ? 'Free' : `$${shipping?.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6b7280' }}>Tax (8%)</span>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, color: '#1a3a3a' }}>${tax?.toFixed(2) || '0.00'}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between mb-8">
                                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: '#1a3a3a' }}>Total</span>
                                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 600, color: '#1a3a3a' }}>${total?.toFixed(2) || '0.00'}</span>
                                </div>

                                {/* Promo Code */}
                                <div className="mb-6">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9ca3af' }} />
                                            <input
                                                type="text"
                                                value={promoCodeInput}
                                                onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                                                placeholder="Promo code"
                                                className="w-full pl-10 pr-4 py-3 outline-none focus:border-[#1a3a3a] transition-colors"
                                                style={{
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontSize: '14px',
                                                    border: '1px solid rgba(0,0,0,0.1)',
                                                    backgroundColor: '#ffffff',
                                                    color: '#1a3a3a',
                                                }}
                                            />
                                        </div>
                                        <button
                                            onClick={handleApplyPromo}
                                            className="transition-colors hover:bg-[#234e7e]"
                                            style={{
                                                padding: '0 20px',
                                                backgroundColor: '#1a3a3a',
                                                color: '#ffffff',
                                                fontFamily: 'Inter, sans-serif',
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {promoError && (
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#ef4444', marginTop: '8px' }}>{promoError}</p>
                                    )}
                                    {appliedPromo && (
                                        <div className="flex items-center justify-between mt-3">
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#059669' }}>
                                                "{appliedPromo.code}" applied!
                                            </span>
                                            <button
                                                onClick={removePromoCode}
                                                style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Checkout Button */}
                                <Link to="/checkout">
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full flex items-center justify-center gap-2"
                                        style={{
                                            padding: '16px',
                                            backgroundColor: '#1a3a3a',
                                            color: '#ffffff',
                                            fontFamily: 'Inter, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Proceed to Checkout <ArrowRight size={16} />
                                    </motion.button>
                                </Link>

                                {/* Continue Shopping */}
                                <Link to="/products" className="block text-center mt-4">
                                    <span
                                        className="transition-colors hover:text-[#d4af37]"
                                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', textDecoration: 'underline' }}
                                    >
                                        Continue Shopping
                                    </span>
                                </Link>
                            </motion.div>

                            {/* Trust Badges */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 p-4" style={{ backgroundColor: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.1)' }}>
                                    <span style={{ fontSize: '18px' }}>🔒</span>
                                    <div>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a3a3a' }}>Secure Checkout</p>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b7280' }}>256-bit SSL encryption</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4" style={{ backgroundColor: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
                                    <span style={{ fontSize: '18px' }}>📦</span>
                                    <div>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a3a3a' }}>Free Shipping</p>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b7280' }}>On orders over $50</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
