import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, ShoppingBag, Heart, MapPin,
    CreditCard, Bell, Settings, Award, LogOut
} from 'lucide-react';

/**
 * AccountSidebar - Navigation sidebar for user account pages
 * Design: Clean sidebar with active state indicators
 */
const AccountSidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: 'Dashboard',
            path: '/account',
            badge: null,
        },
        {
            icon: ShoppingBag,
            label: 'Orders',
            path: '/account/orders',
            badge: '3',
        },
        {
            icon: Heart,
            label: 'Wishlist',
            path: '/account/wishlist',
            badge: '12',
        },
        {
            icon: MapPin,
            label: 'Addresses',
            path: '/account/addresses',
            badge: null,
        },
        {
            icon: CreditCard,
            label: 'Payment Methods',
            path: '/account/payment-methods',
            badge: null,
        },
        {
            icon: Award,
            label: 'Loyalty Rewards',
            path: '/account/loyalty',
            badge: null,
        },
        {
            icon: Settings,
            label: 'Settings',
            path: '/account/settings',
            badge: null,
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-card p-6 sticky top-24">
            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link key={item.path} to={item.path}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className={`
                  flex items-center justify-between px-4 py-3 rounded-lg transition-all
                  ${isActive
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-gray-700 hover:bg-neutral-gray'
                                    }
                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                {item.badge && (
                                    <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${isActive ? 'bg-white text-primary' : 'bg-secondary text-white'}
                  `}>
                                        {item.badge}
                                    </span>
                                )}
                            </motion.div>
                        </Link>
                    );
                })}

                <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all w-full mt-6">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                </button>
            </nav>
        </div>
    );
};

export default AccountSidebar;
