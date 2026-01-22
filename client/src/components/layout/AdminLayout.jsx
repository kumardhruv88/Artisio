/**
 * AdminLayout - Modern Glassmorphism Admin Layout
 * Features: Collapsible sidebar, dark theme, glass effects, framer-motion animations
 */

import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Package, ShoppingBag, Users, Settings,
    LogOut, Search, Bell, Menu, X, ChevronLeft, ChevronRight,
    PackageOpen, FolderTree, Palette, BarChart3, Boxes
} from 'lucide-react';

const AdminLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: FolderTree, label: 'Categories', path: '/admin/categories' },
        { icon: Palette, label: 'Artisans', path: '/admin/artisans' },
        { icon: PackageOpen, label: 'Subscriptions', path: '/admin/subscriptions' },
        { icon: Boxes, label: 'Inventory', path: '/admin/inventory' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    // Get current page title
    const currentPage = menuItems.find(item =>
        item.path === location.pathname ||
        (item.path !== '/admin' && location.pathname.startsWith(item.path))
    );

    return (
        <div className="min-h-screen bg-[#0a0f0f] flex overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#1a3a3a]/20 rounded-full blur-[150px]" />
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarCollapsed ? 80 : 260 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col bg-[#111]/80 backdrop-blur-2xl border-r border-white/5"
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-between px-5 border-b border-white/5">
                    <motion.div
                        className="flex items-center gap-3 overflow-hidden"
                        animate={{ opacity: sidebarCollapsed ? 0 : 1 }}
                    >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#b8962f] flex items-center justify-center font-display italic font-bold text-[#0a0f0f] text-lg shadow-lg shadow-[#D4AF37]/20 shrink-0">
                            A
                        </div>
                        {!sidebarCollapsed && (
                            <span className="font-display text-xl text-[#FAF9F7] tracking-tight whitespace-nowrap">
                                Artisio<span className="text-[#D4AF37]">.</span>
                            </span>
                        )}
                    </motion.div>

                    {/* Collapse Button */}
                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-[#888] hover:text-[#D4AF37] transition-all"
                    >
                        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    <div className="space-y-1">
                        {menuItems.map((item, index) => {
                            const isActive = location.pathname === item.path ||
                                (item.path !== '/admin' && location.pathname.startsWith(item.path));

                            return (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <NavLink
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                                        ${isActive
                                                ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 text-[#D4AF37]'
                                                : 'text-[#888] hover:text-[#FAF9F7] hover:bg-white/5'
                                            }`}
                                        title={sidebarCollapsed ? item.label : ''}
                                    >
                                        {/* Active indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute left-0 w-1 h-6 bg-[#D4AF37] rounded-r-full"
                                            />
                                        )}

                                        <item.icon
                                            size={20}
                                            className={`shrink-0 ${isActive ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'} transition-colors`}
                                        />

                                        <AnimatePresence>
                                            {!sidebarCollapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: 'auto' }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                                >
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </NavLink>
                                </motion.div>
                            );
                        })}
                    </div>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-white/5">
                    <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a3a3a] to-[#0a1a1a] flex items-center justify-center text-[#D4AF37] font-semibold border border-white/10">
                                A
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111]" />
                        </div>

                        <AnimatePresence>
                            {!sidebarCollapsed && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 min-w-0"
                                >
                                    <p className="text-sm font-medium text-[#FAF9F7] truncate">Admin</p>
                                    <p className="text-xs text-[#555] truncate">Super Admin</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {!sidebarCollapsed && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={handleLogout}
                                    className="p-2 text-[#555] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 relative z-10">
                {/* Header */}
                <header className="h-20 bg-[#0a0f0f]/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/5 px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-white/5 rounded-lg text-[#888]"
                        >
                            <Menu size={20} />
                        </button>

                        {/* Page Title */}
                        <div>
                            <motion.h1
                                key={currentPage?.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl font-display text-[#FAF9F7]"
                            >
                                {currentPage?.label || 'Dashboard'}
                            </motion.h1>
                            <p className="text-xs text-[#555] mt-0.5">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/5 focus-within:border-[#D4AF37]/30 transition-all w-64">
                            <Search size={16} className="text-[#555]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none outline-none text-sm text-[#FAF9F7] placeholder-[#555] w-full"
                            />
                            <kbd className="hidden lg:inline-flex text-[10px] text-[#555] bg-white/5 px-1.5 py-0.5 rounded">⌘K</kbd>
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[#888] hover:text-[#FAF9F7] transition-all border border-white/5">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                        </button>

                        {/* User Avatar */}
                        <button className="hidden sm:flex items-center gap-2 p-1.5 pr-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#b8962f] flex items-center justify-center text-[#0a0f0f] font-semibold text-sm">
                                A
                            </div>
                            <span className="text-sm text-[#888]">Admin</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-6 lg:p-8 overflow-auto">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="fixed top-0 left-0 h-full w-72 bg-[#111] z-50 lg:hidden"
                        >
                            {/* Mobile menu content - same as sidebar */}
                            <div className="h-20 flex items-center justify-between px-5 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#b8962f] flex items-center justify-center font-display italic font-bold text-[#0a0f0f] text-lg">
                                        A
                                    </div>
                                    <span className="font-display text-xl text-[#FAF9F7] tracking-tight">
                                        Artisio<span className="text-[#D4AF37]">.</span>
                                    </span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-lg text-[#888]"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <nav className="p-4 space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                                            ${isActive
                                                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                                                    : 'text-[#888] hover:text-[#FAF9F7] hover:bg-white/5'
                                                }`}
                                        >
                                            <item.icon size={20} />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </NavLink>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminLayout;
