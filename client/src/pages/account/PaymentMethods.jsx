/**
 * PaymentMethods - Compact table-style layout
 * Professional card list design, minimal spacing
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Plus, Trash2, Check, X, Shield, ArrowLeft, Star } from 'lucide-react';

const PaymentMethods = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [cards, setCards] = useState([
        { id: '1', brand: 'Visa', last4: '4242', expiry: '12/25', name: user?.fullName || 'Guest', isDefault: true },
        { id: '2', brand: 'Mastercard', last4: '8888', expiry: '09/24', name: user?.fullName || 'Guest', isDefault: false },
    ]);
    const [showAddForm, setShowAddForm] = useState(false);

    const deleteCard = (id) => setCards(cards.filter(card => card.id !== id));
    const setAsDefault = (id) => setCards(cards.map(card => ({ ...card, isDefault: card.id === id })));

    const getBrandColor = (brand) => {
        if (brand === 'Visa') return '#1a3a3a';
        if (brand === 'Mastercard') return '#eb001b';
        if (brand === 'Amex') return '#006fcf';
        return '#666';
    };

    return (
        <div className="space-y-4">
            {/* Back Button + Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/account')}
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#D4AF37]">Payment</p>
                        <h1 className="text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#1a3a3a' }}>
                            Payment Methods
                        </h1>
                    </div>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a3a3a] text-white text-[11px] uppercase tracking-wider hover:bg-[#0f2424] transition-colors"
                >
                    <Plus size={12} /> Add Card
                </button>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-100">
                <Shield size={14} className="text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-700">Your payment information is encrypted and securely stored.</p>
            </div>

            {/* Compact Card List */}
            <div className="bg-white border border-gray-200">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                        {/* Brand Icon */}
                        <div
                            className="w-12 h-8 rounded flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: getBrandColor(card.brand) + '15', border: `1px solid ${getBrandColor(card.brand)}30` }}
                        >
                            <CreditCard size={16} style={{ color: getBrandColor(card.brand) }} />
                        </div>

                        {/* Card Details */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span
                                    className="text-xs font-semibold uppercase"
                                    style={{ color: getBrandColor(card.brand) }}
                                >
                                    {card.brand}
                                </span>
                                {card.isDefault && (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#D4AF37] text-white text-[9px] font-semibold uppercase tracking-wider">
                                        <Star size={8} fill="white" /> Default
                                    </span>
                                )}
                            </div>
                            <p className="text-sm font-mono text-gray-900">•••• •••• •••• {card.last4}</p>
                            <p className="text-xs text-gray-500">Expires {card.expiry}</p>
                        </div>

                        {/* Cardholder Name */}
                        <div className="hidden md:block flex-shrink-0">
                            <p className="text-[10px] uppercase tracking-wider text-gray-400">Cardholder</p>
                            <p className="text-xs text-gray-700">{card.name}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={() => deleteCard(card.id)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={13} />
                            </button>
                            {!card.isDefault && (
                                <button
                                    onClick={() => setAsDefault(card.id)}
                                    className="text-[10px] px-2 py-1 text-gray-500 hover:text-[#D4AF37] hover:bg-gray-100 transition-colors"
                                >
                                    Set Default
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Add New Row */}
                <button
                    onClick={() => setShowAddForm(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 text-gray-400 hover:text-[#D4AF37] hover:bg-gray-50 transition-colors border-t border-dashed border-gray-200"
                >
                    <Plus size={14} />
                    <span className="text-xs">Add New Card</span>
                </button>
            </div>

            {/* Add Card Modal - Compact */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                        onClick={() => setShowAddForm(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md bg-white p-5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-medium">Add Payment Card</h3>
                                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={18} />
                                </button>
                            </div>
                            <form className="space-y-3">
                                <div>
                                    <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name on card"
                                        className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">Expiry</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <input type="checkbox" id="defaultCard" className="w-3 h-3 accent-[#D4AF37]" />
                                    <label htmlFor="defaultCard" className="text-xs text-gray-600">Set as default</label>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="flex-1 py-1.5 text-xs border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-1.5 text-xs bg-[#1a3a3a] text-white hover:bg-[#0f2424] transition-colors"
                                    >
                                        Add Card
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentMethods;
