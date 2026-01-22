/**
 * ProfileSettings - Lumière-style account settings with API integration
 * Compact spacing, thin typography, clean sections
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Bell, Globe, Camera, Save, Trash2, ArrowLeft, Loader2, Check } from 'lucide-react';
import userAPI from '../../services/userAPI';

const ProfileSettings = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.primaryEmailAddress?.emailAddress || '',
        phone: user?.phoneNumbers?.[0]?.phoneNumber || '',
        avatar: user?.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    });
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotions: true,
        newsletter: false,
        smsAlerts: false,
    });

    // Load profile from backend on mount
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await userAPI.getProfile();
                if (response.success && response.data) {
                    setProfile(prev => ({
                        ...prev,
                        firstName: response.data.firstName || prev.firstName,
                        lastName: response.data.lastName || prev.lastName,
                        phone: response.data.phone || prev.phone,
                    }));
                    if (response.data.preferences) {
                        setNotifications(response.data.preferences);
                    }
                }
            } catch (err) {
                console.error('Error loading profile:', err);
            }
        };
        loadProfile();
    }, []);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await userAPI.updateProfile({
                firstName: profile.firstName,
                lastName: profile.lastName,
                phone: profile.phone,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('Error saving profile:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveNotifications = async () => {
        try {
            setSaving(true);
            await userAPI.updateProfile({ preferences: notifications });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('Error saving notifications:', err);
        } finally {
            setSaving(false);
        }
    };

    const sections = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'preferences', label: 'Preferences', icon: Globe },
    ];

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/account')}
                    className="p-1.5 hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 text-gray-600" />
                </button>
                <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#D4AF37]">Settings</p>
                    <h1 className="text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#1a3a3a' }}>
                        Account Settings
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-1">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <nav className="bg-white border border-gray-100 overflow-hidden sticky top-24">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className="w-full flex items-center gap-3 px-5 py-4 transition-all border-b border-gray-100 last:border-0"
                                    style={{
                                        backgroundColor: activeSection === section.id ? '#1a3a3a' : 'transparent',
                                        color: activeSection === section.id ? 'white' : '#666',
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        border: 'none',
                                        borderBottom: activeSection === section.id ? 'none' : '1px solid #f3f4f6',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Icon size={16} />
                                    {section.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white border border-gray-100 p-8"
                        >
                            <h2 className="text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#1a3a3a' }}>
                                Personal Information
                            </h2>

                            {/* Avatar */}
                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                                <div className="relative">
                                    <img
                                        src={profile.avatar}
                                        alt={`${profile.firstName} ${profile.lastName}`}
                                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                    />
                                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1a3a3a] hover:bg-[#0f2424] flex items-center justify-center text-white transition-colors">
                                        <Camera size={14} />
                                    </button>
                                </div>
                                <div>
                                    <p className="text-base font-medium text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        {profile.firstName} {profile.lastName}
                                    </p>
                                    <p className="text-sm text-gray-500">{profile.email}</p>
                                    <button className="mt-2 text-xs text-[#D4AF37] hover:text-[#b8962f] transition-colors">
                                        Change Photo
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSaveProfile} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.firstName}
                                            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                            className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none"
                                            style={{ fontFamily: "'Inter', sans-serif" }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.lastName}
                                            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                            className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1a3a3a] text-white text-xs uppercase tracking-wider hover:bg-[#0f2424] transition-colors mt-6 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
                                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* Security Section */}
                    {activeSection === 'security' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-white border border-gray-100 p-8">
                                <h2 className="text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#1a3a3a' }}>
                                    Change Password
                                </h2>
                                <form className="space-y-5">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                            Current Password
                                        </label>
                                        <input type="password" className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                                New Password
                                            </label>
                                            <input type="password" className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                                Confirm Password
                                            </label>
                                            <input type="password" className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none" />
                                        </div>
                                    </div>
                                    <button type="submit" className="px-6 py-2.5 bg-[#1a3a3a] text-white text-xs uppercase tracking-wider hover:bg-[#0f2424] transition-colors">
                                        Update Password
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white border-2 border-red-100 p-8">
                                <h2 className="text-lg mb-3 text-red-500" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                                    Delete Account
                                </h2>
                                <p className="text-sm text-gray-600 mb-6">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-500 text-red-500 text-xs uppercase tracking-wider hover:bg-red-50 transition-colors">
                                    <Trash2 size={14} /> Delete Account
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Section */}
                    {activeSection === 'notifications' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border border-gray-100 p-8">
                            <h2 className="text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#1a3a3a' }}>
                                Notification Preferences
                            </h2>
                            <div className="space-y-1">
                                {[
                                    { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about your order status' },
                                    { key: 'promotions', label: 'Promotions & Offers', desc: 'Receive special deals and discounts' },
                                    { key: 'newsletter', label: 'Newsletter', desc: 'Weekly updates about new products' },
                                    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Text message notifications' },
                                ].map((item) => (
                                    <div key={item.key} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                {item.label}
                                            </p>
                                            <p className="text-xs text-gray-400">{item.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                                            className="relative w-12 h-6 rounded-full transition-colors duration-300"
                                            style={{ backgroundColor: notifications[item.key] ? '#D4AF37' : '#e5e7eb' }}
                                        >
                                            <span
                                                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300"
                                                style={{ left: notifications[item.key] ? '26px' : '2px' }}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleSaveNotifications}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#1a3a3a] text-white text-xs uppercase tracking-wider hover:bg-[#0f2424] transition-colors mt-6 disabled:opacity-50"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
                                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Preferences'}
                            </button>
                        </motion.div>
                    )}

                    {/* Preferences Section */}
                    {activeSection === 'preferences' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white border border-gray-100 p-8">
                            <h2 className="text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#1a3a3a' }}>
                                Site Preferences
                            </h2>
                            <form className="space-y-5">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                        Language
                                    </label>
                                    <select className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none">
                                        <option>English (US)</option>
                                        <option>English (UK)</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                        Currency
                                    </label>
                                    <select className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>CAD ($)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                                        Timezone
                                    </label>
                                    <select className="w-full px-4 py-2.5 text-sm border border-gray-200 focus:border-[#D4AF37] outline-none">
                                        <option>Pacific Time (PT)</option>
                                        <option>Eastern Time (ET)</option>
                                        <option>Central Time (CT)</option>
                                        <option>Mountain Time (MT)</option>
                                    </select>
                                </div>
                                <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-[#1a3a3a] text-white text-xs uppercase tracking-wider hover:bg-[#0f2424] transition-colors">
                                    <Save size={14} /> Save Preferences
                                </button>
                            </form>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
