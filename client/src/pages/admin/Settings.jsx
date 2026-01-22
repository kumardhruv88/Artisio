/**
 * Admin Settings - Modern Glassmorphism Settings Page
 * Dark theme matching the admin dashboard
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Save, Settings as SettingsIcon, Store, Bell, Shield, Palette, Globe,
    Mail, CreditCard, Truck, User, Key, Loader2, Check, ChevronRight
} from 'lucide-react';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('store');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [settings, setSettings] = useState({
        store: {
            name: 'ARTISIO',
            email: 'hello@artisio.com',
            phone: '+1 (555) 123-4567',
            address: '123 Artisan Lane, San Francisco, CA 94102',
            currency: 'USD',
            timezone: 'America/Los_Angeles'
        },
        notifications: {
            orderConfirmation: true,
            orderShipped: true,
            lowStock: true,
            newCustomer: false,
            weeklyReport: true,
            marketingEmails: false
        },
        shipping: {
            freeShippingThreshold: 75,
            standardRate: 5.99,
            expressRate: 15.99,
            internationalRate: 25.99
        },
        appearance: {
            theme: 'Dark',
            accentColor: '#D4AF37'
        }
    });

    const sections = [
        { id: 'store', label: 'Store Details', icon: Store },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'shipping', label: 'Shipping', icon: Truck },
        { id: 'payment', label: 'Payment', icon: CreditCard },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    const handleSave = async () => {
        setSaving(true);
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

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
                        Admin <span className="text-[#D4AF37]">Settings</span>
                    </h1>
                    <p className="text-[#666] text-sm">Configure your store settings and preferences.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] text-[#0a0f0f] text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all disabled:opacity-50"
                >
                    {saving ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : saved ? (
                        <Check size={16} />
                    ) : (
                        <Save size={16} />
                    )}
                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-3">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === section.id
                                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                                    : 'text-[#888] hover:text-[#FAF9F7] hover:bg-white/5'
                                    }`}
                            >
                                <section.icon size={18} />
                                <span className="text-sm font-medium">{section.label}</span>
                                <ChevronRight size={14} className="ml-auto opacity-50" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    <div className="bg-[#111]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-6">
                        {/* Store Details */}
                        {activeSection === 'store' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#b8962f] flex items-center justify-center">
                                        <Store size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-display text-[#FAF9F7]">Store Details</h2>
                                        <p className="text-xs text-[#555]">Manage your store information</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Store Name</label>
                                        <input
                                            type="text"
                                            value={settings.store.name}
                                            onChange={(e) => setSettings({ ...settings, store: { ...settings.store, name: e.target.value } })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Contact Email</label>
                                        <input
                                            type="email"
                                            value={settings.store.email}
                                            onChange={(e) => setSettings({ ...settings, store: { ...settings.store, email: e.target.value } })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            value={settings.store.phone}
                                            onChange={(e) => setSettings({ ...settings, store: { ...settings.store, phone: e.target.value } })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Currency</label>
                                        <select
                                            value={settings.store.currency}
                                            onChange={(e) => setSettings({ ...settings, store: { ...settings.store, currency: e.target.value } })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 outline-none"
                                        >
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                            <option value="INR">INR (₹)</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Business Address</label>
                                    <textarea
                                        value={settings.store.address}
                                        onChange={(e) => setSettings({ ...settings, store: { ...settings.store, address: e.target.value } })}
                                        rows={2}
                                        className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 focus:outline-none resize-none"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Notifications */}
                        {activeSection === 'notifications' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                        <Bell size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-display text-[#FAF9F7]">Notifications</h2>
                                        <p className="text-xs text-[#555]">Manage email and push notifications</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { key: 'orderConfirmation', label: 'Order Confirmation', description: 'Send confirmation emails when orders are placed' },
                                        { key: 'orderShipped', label: 'Order Shipped', description: 'Notify customers when orders are shipped' },
                                        { key: 'lowStock', label: 'Low Stock Alerts', description: 'Get notified when products are running low' },
                                        { key: 'newCustomer', label: 'New Customer Signup', description: 'Get notified when new customers register' },
                                        { key: 'weeklyReport', label: 'Weekly Reports', description: 'Receive weekly sales and analytics reports' },
                                        { key: 'marketingEmails', label: 'Marketing Emails', description: 'Send promotional emails to customers' },
                                    ].map((item) => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-[#0a0f0f] rounded-xl border border-white/5">
                                            <div>
                                                <p className="text-sm font-medium text-[#FAF9F7]">{item.label}</p>
                                                <p className="text-xs text-[#555] mt-0.5">{item.description}</p>
                                            </div>
                                            <button
                                                onClick={() => setSettings({
                                                    ...settings,
                                                    notifications: {
                                                        ...settings.notifications,
                                                        [item.key]: !settings.notifications[item.key]
                                                    }
                                                })}
                                                className={`relative w-12 h-6 rounded-full transition-colors ${settings.notifications[item.key] ? 'bg-[#D4AF37]' : 'bg-[#333]'
                                                    }`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications[item.key] ? 'translate-x-7' : 'translate-x-1'
                                                    }`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Shipping */}
                        {activeSection === 'shipping' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                                        <Truck size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-display text-[#FAF9F7]">Shipping Settings</h2>
                                        <p className="text-xs text-[#555]">Configure shipping rates and options</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Free Shipping Threshold ($)</label>
                                        <input
                                            type="number"
                                            value={settings.shipping.freeShippingThreshold}
                                            onChange={(e) => setSettings({ ...settings, shipping: { ...settings.shipping, freeShippingThreshold: parseFloat(e.target.value) } })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Standard Rate ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={settings.shipping.standardRate}
                                            onChange={(e) => setSettings({ ...settings, shipping: { ...settings.shipping, standardRate: parseFloat(e.target.value) } })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">Express Rate ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={settings.shipping.expressRate}
                                            onChange={(e) => setSettings({ ...settings, shipping: { ...settings.shipping, expressRate: parseFloat(e.target.value) } })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">International Rate ($)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={settings.shipping.internationalRate}
                                            onChange={(e) => setSettings({ ...settings, shipping: { ...settings.shipping, internationalRate: parseFloat(e.target.value) } })}
                                            className="w-full px-4 py-3 bg-[#0a0f0f] border border-white/10 rounded-xl text-sm text-[#FAF9F7] focus:border-[#D4AF37]/50 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Payment */}
                        {activeSection === 'payment' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                                        <CreditCard size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-display text-[#FAF9F7]">Payment Settings</h2>
                                        <p className="text-xs text-[#555]">Configure payment gateways</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { name: 'Stripe', status: 'connected', icon: '💳' },
                                        { name: 'PayPal', status: 'disconnected', icon: '🅿️' },
                                        { name: 'Apple Pay', status: 'connected', icon: '🍎' },
                                    ].map((gateway) => (
                                        <div key={gateway.name} className="flex items-center justify-between p-4 bg-[#0a0f0f] rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{gateway.icon}</span>
                                                <div>
                                                    <p className="text-sm font-medium text-[#FAF9F7]">{gateway.name}</p>
                                                    <p className={`text-xs ${gateway.status === 'connected' ? 'text-emerald-400' : 'text-[#555]'}`}>
                                                        {gateway.status === 'connected' ? 'Connected' : 'Not connected'}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${gateway.status === 'connected'
                                                ? 'bg-white/5 text-[#888] hover:bg-white/10'
                                                : 'bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20'
                                                }`}>
                                                {gateway.status === 'connected' ? 'Configure' : 'Connect'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Security */}
                        {activeSection === 'security' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                                        <Shield size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-display text-[#FAF9F7]">Security Settings</h2>
                                        <p className="text-xs text-[#555]">Manage account security</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-[#0a0f0f] rounded-xl border border-white/5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Key size={18} className="text-[#D4AF37]" />
                                                <span className="text-sm font-medium text-[#FAF9F7]">Change Password</span>
                                            </div>
                                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-[#888] transition-all">
                                                Update
                                            </button>
                                        </div>
                                        <p className="text-xs text-[#555]">Last changed 30 days ago</p>
                                    </div>

                                    <div className="p-4 bg-[#0a0f0f] rounded-xl border border-white/5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <Shield size={18} className="text-emerald-400" />
                                                <span className="text-sm font-medium text-[#FAF9F7]">Two-Factor Authentication</span>
                                            </div>
                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold uppercase rounded-full">
                                                Enabled
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#555]">Your account is protected with 2FA</p>
                                    </div>

                                    <div className="p-4 bg-[#0a0f0f] rounded-xl border border-white/5">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <User size={18} className="text-[#888]" />
                                                <span className="text-sm font-medium text-[#FAF9F7]">Active Sessions</span>
                                            </div>
                                            <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-xs text-red-400 transition-all">
                                                Sign Out All
                                            </button>
                                        </div>
                                        <p className="text-xs text-[#555]">2 active sessions</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Appearance */}
                        {activeSection === 'appearance' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                                        <Palette size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-display text-[#FAF9F7]">Appearance</h2>
                                        <p className="text-xs text-[#555]">Customize your admin interface</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-3">Theme</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['Dark', 'Light', 'System'].map((theme) => (
                                                <button
                                                    key={theme}
                                                    onClick={() => setSettings({
                                                        ...settings,
                                                        appearance: { ...settings.appearance, theme }
                                                    })}
                                                    className={`p-4 rounded-xl border text-center transition-all ${settings.appearance.theme === theme
                                                            ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]'
                                                            : 'bg-[#0a0f0f] border-white/5 text-[#888] hover:border-white/10 hover:text-[#FAF9F7]'
                                                        }`}
                                                >
                                                    <span className="text-sm font-medium">{theme}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-3">Accent Color</label>
                                        <div className="flex gap-3">
                                            {['#D4AF37', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'].map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => setSettings({
                                                        ...settings,
                                                        appearance: { ...settings.appearance, accentColor: color }
                                                    })}
                                                    className={`w-10 h-10 rounded-xl transition-all hover:scale-110 ${settings.appearance.accentColor === color
                                                            ? 'ring-2 ring-white ring-offset-2 ring-offset-[#111] scale-110'
                                                            : 'opacity-70 hover:opacity-100'
                                                        }`}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-[#555] mt-3">
                                            Selected: <span style={{ color: settings.appearance.accentColor }} className="font-medium">{settings.appearance.accentColor}</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
