/**
 * Addresses - Compact list-based design with API integration
 * Professional table-like layout, minimal spacing
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Edit2, Trash2, Check, X, Home, Briefcase, ArrowLeft, Star, Loader2 } from 'lucide-react';
import userAPI from '../../services/userAPI';

const Addresses = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        label: 'Home',
        name: '',
        street: '',
        apt: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
        phone: '',
        isDefault: false
    });

    // Load addresses from API
    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            setLoading(true);
            const response = await userAPI.getAddresses();
            if (response.success) {
                setAddresses(response.data || []);
            }
        } catch (err) {
            console.error('Error loading addresses:', err);
            setError('Failed to load addresses');
        } finally {
            setLoading(false);
        }
    };

    const deleteAddress = async (id) => {
        try {
            await userAPI.deleteAddress(id);
            setAddresses(addresses.filter(addr => addr._id !== id));
        } catch (err) {
            console.error('Error deleting address:', err);
            setError('Failed to delete address');
        }
    };

    const setAsDefault = async (id) => {
        try {
            await userAPI.setDefaultAddress(id);
            await loadAddresses(); // Reload to get updated addresses
        } catch (err) {
            console.error('Error setting default:', err);
            setError('Failed to set default address');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await userAPI.addAddress({
                ...formData,
                name: formData.name || user?.fullName || 'Guest'
            });
            await loadAddresses();
            setShowAddForm(false);
            setFormData({
                label: 'Home', name: '', street: '', apt: '', city: '', state: '', zip: '', country: 'United States', phone: '', isDefault: false
            });
        } catch (err) {
            console.error('Error adding address:', err);
            setError('Failed to add address');
        } finally {
            setSaving(false);
        }
    };

    const getLabelIcon = (label) => label === 'Home' ? Home : label === 'Work' ? Briefcase : MapPin;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-[#D4AF37]" />
            </div>
        );
    }

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
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#D4AF37]">Addresses</p>
                        <h1 className="text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#1a3a3a' }}>
                            Saved Addresses
                        </h1>
                    </div>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#1a3a3a] text-white text-[11px] uppercase tracking-wider hover:bg-[#0f2424] transition-colors"
                >
                    <Plus size={12} /> Add
                </button>
            </div>

            {/* Compact List */}
            <div className="bg-white border border-gray-200">
                {addresses.map((address, index) => {
                    const LabelIcon = getLabelIcon(address.label);
                    return (
                        <div
                            key={address._id || index}
                            className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                        >
                            {/* Icon */}
                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <LabelIcon size={14} className="text-gray-600" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        {address.label}
                                    </span>
                                    {address.isDefault && (
                                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#D4AF37] text-white text-[9px] font-semibold uppercase tracking-wider">
                                            <Star size={8} fill="white" /> Default
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm font-medium text-gray-900">{address.name}</p>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {address.street}{address.apt && `, ${address.apt}`}, {address.city}, {address.state} {address.zip}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">{address.phone}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button className="p-1.5 text-gray-400 hover:text-[#D4AF37] hover:bg-gray-100 transition-colors">
                                    <Edit2 size={13} />
                                </button>
                                <button
                                    onClick={() => deleteAddress(address._id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={13} />
                                </button>
                                {!address.isDefault && (
                                    <button
                                        onClick={() => setAsDefault(address._id)}
                                        className="text-[10px] px-2 py-1 text-gray-500 hover:text-[#D4AF37] hover:bg-gray-100 transition-colors"
                                    >
                                        Set Default
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Add New Row */}
                <button
                    onClick={() => setShowAddForm(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 text-gray-400 hover:text-[#D4AF37] hover:bg-gray-50 transition-colors border-t border-dashed border-gray-200"
                >
                    <Plus size={14} />
                    <span className="text-xs">Add New Address</span>
                </button>
            </div>

            {/* Add Modal - Compact */}
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
                                <h3 className="text-base font-medium">Add New Address</h3>
                                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-gray-600">
                                    <X size={18} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">Label</label>
                                        <select
                                            value={formData.label}
                                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                        >
                                            <option>Home</option>
                                            <option>Work</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder={user?.fullName || ''}
                                            className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">Street Address</label>
                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                        className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">City</label>
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">State</label>
                                        <input
                                            type="text"
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">ZIP</label>
                                        <input
                                            type="text"
                                            value={formData.zip}
                                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                            className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[9px] uppercase tracking-wider text-gray-400 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-1.5 text-xs border border-gray-200 focus:border-[#D4AF37] outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <input
                                        type="checkbox"
                                        id="default"
                                        checked={formData.isDefault}
                                        onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                        className="w-3 h-3 accent-[#D4AF37]"
                                    />
                                    <label htmlFor="default" className="text-xs text-gray-600">Set as default</label>
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
                                        disabled={saving}
                                        className="flex-1 py-1.5 text-xs bg-[#1a3a3a] text-white hover:bg-[#0f2424] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                                        {saving ? 'Saving...' : 'Save'}
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

export default Addresses;
