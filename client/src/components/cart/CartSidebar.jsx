import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@components/common/Button';

/**
 * CartSidebar - Premium sliding cart with smooth animations
 * Design: Modern sidebar overlay with product management and checkout flow
 */
const CartSidebar = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Organic Ethiopian Coffee',
            image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200',
            price: 24.99,
            quantity: 2,
            variant: '250g, Whole Bean',
        },
        {
            id: 2,
            name: 'Artisan Honey Collection',
            image: 'https://images.unsplash.com/photo-1587049352846-4a222e784ecb?w=200',
            price: 18.50,
            quantity: 1,
            variant: '500ml',
        },
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);

    const updateQuantity = (id, delta) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const applyPromo = () => {
        if (promoCode.trim()) {
            setAppliedPromo({ code: promoCode, discount: 10 });
            setPromoCode('');
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal - discount + shipping;
    const freeShippingProgress = Math.min((subtotal / 50) * 100, 100);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-serif font-bold text-primary">
                                    Shopping Cart
                                </h2>
                                <span className="flex items-center justify-center w-6 h-6 bg-secondary text-white rounded-full text-sm font-bold">
                                    {cartItems.length}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Free Shipping Progress */}
                        {shipping > 0 && (
                            <div className="px-6 py-4 bg-secondary/10">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-700">
                                        {subtotal >= 50 ? (
                                            <span className="text-green-600 font-semibold">
                                                🎉 You've got free shipping!
                                            </span>
                                        ) : (
                                            <>Add <span className="font-semibold text-secondary">${(50 - subtotal).toFixed(2)}</span> more for free shipping</>
                                        )}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${freeShippingProgress}%` }}
                                        className="h-full bg-gradient-to-r from-secondary to-secondary-dark rounded-full"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-gray-500 mb-6">
                                        Add some artisan products to get started
                                    </p>
                                    <Button variant="primary" onClick={onClose}>
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex gap-4 bg-neutral-gray rounded-lg p-4"
                                    >
                                        {/* Product Image */}
                                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-primary mb-1 truncate">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">{item.variant}</p>

                                            <div className="flex items-center justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-3 font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <span className="font-bold text-primary">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors h-fit"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-200 p-6 space-y-4 bg-white">
                                {/* Promo Code */}
                                <div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Promo code"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        />
                                        <Button variant="outline" onClick={applyPromo}>
                                            Apply
                                        </Button>
                                    </div>
                                    {appliedPromo && (
                                        <div className="flex items-center justify-between mt-2 text-sm">
                                            <span className="text-green-600 font-medium">
                                                Code "{appliedPromo.code}" applied
                                            </span>
                                            <button
                                                onClick={() => setAppliedPromo(null)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Price Summary */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount ({appliedPromo.discount}%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="pt-2 border-t border-gray-200 flex justify-between text-lg font-bold text-primary">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link to="/checkout" onClick={onClose}>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-full"
                                        rightIcon={<ArrowRight className="w-5 h-5" />}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                <Link to="/cart" onClick={onClose}>
                                    <Button variant="ghost" className="w-full">
                                        View Full Cart
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
