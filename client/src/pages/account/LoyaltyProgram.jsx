import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Award, Star, Gift, TrendingUp, Clock, Sparkles, ArrowRight, ArrowLeft, Crown, Diamond, Medal } from 'lucide-react';

/**
 * LoyaltyProgram - Rewards per user.txt specifications
 * Points banner with gradient gold, 72px icon, 32px Playfair title
 */
const LoyaltyProgram = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('rewards');

    const user = {
        points: 1240,
        tier: 'Gold',
        tierProgress: 76,
        nextTier: 'Platinum',
        pointsToNext: 260,
        totalEarned: 3450,
        redeemed: 2210,
    };

    const rewards = [
        { id: '1', name: '10% Off Order', points: 200, image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200', available: true },
        { id: '2', name: 'Free Shipping', points: 150, image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=200', available: true },
        { id: '3', name: '$20 Gift Card', points: 500, image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200', available: true },
        { id: '4', name: 'Premium Sample Box', points: 750, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200', available: true },
        { id: '5', name: 'Exclusive Product', points: 1000, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200', available: user.points >= 1000 },
    ];

    const history = [
        { id: '1', type: 'earned', description: 'Order #ORD-10234', points: 85, date: 'Jan 15, 2024' },
        { id: '2', type: 'redeemed', description: '10% Off Coupon', points: -200, date: 'Jan 10, 2024' },
        { id: '3', type: 'earned', description: 'Referral Bonus', points: 250, date: 'Jan 5, 2024' },
        { id: '4', type: 'earned', description: 'Order #ORD-10189', points: 60, date: 'Jan 3, 2024' },
        { id: '5', type: 'earned', description: 'Birthday Bonus', points: 100, date: 'Dec 28, 2023' },
    ];

    const tiers = [
        { name: 'Bronze', minPoints: 0, perks: ['1 point per $1 spent', 'Birthday reward', 'Early access to sales'], icon: Medal, color: '#cd7f32' },
        { name: 'Silver', minPoints: 500, perks: ['1.25 points per $1', 'Free shipping on $50+', 'Member-only events'], icon: Star, color: '#c0c0c0' },
        { name: 'Gold', minPoints: 1000, perks: ['1.5 points per $1', 'Free shipping on all orders', 'Priority support'], icon: Crown, color: '#d4af37' },
        { name: 'Platinum', minPoints: 2500, perks: ['2 points per $1', 'Free express shipping', 'Exclusive products'], icon: Diamond, color: '#e5e4e2' },
    ];

    const tabs = [
        { key: 'rewards', label: 'Rewards' },
        { key: 'history', label: 'History' },
        { key: 'tiers', label: 'Tiers' },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/account')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <p className="text-xs uppercase tracking-[0.15em]" style={{ color: '#D4AF37' }}>Rewards</p>
                    <h1 className="text-2xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: '#1a3a3a' }}>
                        Loyalty Program
                    </h1>
                </div>
            </div>

            {/* Points Banner */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative overflow-hidden"
                style={{ padding: '48px 56px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '24px', border: '2px solid rgba(212,175,55,0.3)' }}
            >
                {/* Floating Stars */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                        className="absolute opacity-20"
                        style={{ right: `${80 + i * 60}px`, top: `${20 + i * 20}px` }}
                    >
                        <Sparkles size={20 + i * 4} style={{ color: '#d4af37' }} />
                    </motion.div>
                ))}

                <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Icon */}
                    <div className="flex items-center gap-6">
                        <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(212,175,55,0.3)' }}>
                            <Award size={36} style={{ color: '#1a3a3a' }} />
                        </div>
                        <div>
                            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 600, color: '#1a3a3a', lineHeight: 1 }}>{user.points.toLocaleString()}</p>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#78350f', marginTop: '4px' }}>Available Points</p>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="md:border-x md:px-8" style={{ borderColor: 'rgba(212,175,55,0.3)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#92400e' }}>{user.tier}</span>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#78350f' }}>{user.nextTier}</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(212,175,55,0.3)' }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${user.tierProgress}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full" style={{ backgroundColor: '#d4af37' }} />
                        </div>
                        <p className="flex items-center gap-1 mt-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#92400e' }}>
                            <TrendingUp size={14} /> {user.pointsToNext} points to {user.nextTier}
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-8">
                        <div>
                            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600, color: '#1a3a3a' }}>{user.totalEarned.toLocaleString()}</p>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#78350f', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Earned</p>
                        </div>
                        <div>
                            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600, color: '#1a3a3a' }}>{user.redeemed.toLocaleString()}</p>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#78350f', textTransform: 'uppercase', letterSpacing: '1px' }}>Redeemed</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-2 p-1.5 rounded-xl" style={{ backgroundColor: '#f3f4f6' }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className="flex-1 py-3 rounded-lg transition-all duration-300"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            fontWeight: 600,
                            backgroundColor: activeTab === tab.key ? '#ffffff' : 'transparent',
                            color: activeTab === tab.key ? '#1a3a3a' : '#6b7280',
                            boxShadow: activeTab === tab.key ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Rewards Tab */}
            {activeTab === 'rewards' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600, color: '#1a3a3a', marginBottom: '24px' }}>Available Rewards</h2>
                    <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
                        {rewards.map((reward, index) => (
                            <motion.div
                                key={reward.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -6, boxShadow: '0 12px 48px rgba(0,0,0,0.08)' }}
                                style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden' }}
                            >
                                <div className="aspect-[4/3] relative" style={{ backgroundColor: '#f8f6f0' }}>
                                    <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
                                    <span style={{ position: 'absolute', top: '12px', right: '12px', padding: '6px 12px', backgroundColor: '#d4af37', color: '#1a3a3a', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, borderRadius: '8px' }}>
                                        {reward.points} pts
                                    </span>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#1a3a3a', marginBottom: '16px' }}>{reward.name}</h3>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={!reward.available || user.points < reward.points}
                                        className="w-full py-3 rounded-lg flex items-center justify-center gap-2"
                                        style={{
                                            backgroundColor: reward.available && user.points >= reward.points ? '#1a3a3a' : '#e5e7eb',
                                            color: reward.available && user.points >= reward.points ? '#ffffff' : '#9ca3af',
                                            fontFamily: 'Inter, sans-serif',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            cursor: reward.available && user.points >= reward.points ? 'pointer' : 'not-allowed',
                                        }}
                                    >
                                        <Gift size={16} /> Redeem
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600, color: '#1a3a3a', marginBottom: '24px' }}>Points History</h2>
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                        {history.map((item, index) => (
                            <div key={item.id} className="flex items-center justify-between px-8 py-5" style={{ borderBottom: index !== history.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                                <div className="flex items-center gap-4">
                                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: item.type === 'earned' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {item.type === 'earned' ? <TrendingUp size={20} style={{ color: '#059669' }} /> : <Gift size={20} style={{ color: '#ef4444' }} />}
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600, color: '#1a3a3a' }}>{item.description}</p>
                                        <p className="flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>
                                            <Clock size={12} /> {item.date}
                                        </p>
                                    </div>
                                </div>
                                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 600, color: item.points > 0 ? '#059669' : '#ef4444' }}>
                                    {item.points > 0 ? '+' : ''}{item.points}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Tiers Tab */}
            {activeTab === 'tiers' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 600, color: '#1a3a3a', marginBottom: '24px' }}>Membership Tiers</h2>
                    <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                        {tiers.map((tier, index) => {
                            const TierIcon = tier.icon;
                            const isCurrent = tier.name === user.tier;
                            return (
                                <motion.div
                                    key={tier.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '20px',
                                        border: isCurrent ? `2px solid ${tier.color}` : '1px solid rgba(0,0,0,0.04)',
                                        padding: '32px',
                                        position: 'relative',
                                    }}
                                >
                                    {isCurrent && (
                                        <span style={{ position: 'absolute', top: '-12px', left: '24px', padding: '4px 12px', backgroundColor: tier.color, color: '#1a3a3a', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', borderRadius: '6px' }}>Current</span>
                                    )}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: `${tier.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <TierIcon size={28} style={{ color: tier.color }} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 600, color: '#1a3a3a' }}>{tier.name}</h3>
                                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>{tier.minPoints.toLocaleString()}+ points</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3">
                                        {tier.perks.map((perk, i) => (
                                            <li key={i} className="flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#4a5568' }}>
                                                <Star size={14} fill={tier.color} style={{ color: tier.color }} /> {perk}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default LoyaltyProgram;
