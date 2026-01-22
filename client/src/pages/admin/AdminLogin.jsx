/**
 * AdminLogin - Premium Artisio Admin Login Page
 * Matches customer Login.jsx styling with admin-specific branding
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    // Admin credentials for demo (in production, this would be server-side)
    const ADMIN_CREDENTIALS = {
        email: 'admin@artisio.com',
        password: 'admin123'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes - accept any credentials
        // In production, verify against backend
        if (email && password) {
            // Store admin session
            localStorage.setItem('adminAuth', JSON.stringify({
                email,
                isAdmin: true,
                loginTime: Date.now()
            }));
            navigate('/admin');
        } else {
            setError('Please enter valid credentials');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#0a1a1a] flex flex-col relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Gradient orbs */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#1a3a3a]/30 rounded-full blur-[100px]" />
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Centered Content */}
            <div className="flex-1 flex items-center justify-center py-10 px-4 relative z-10">
                <div className="w-full max-w-[400px]">
                    {/* Logo/Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <Link to="/" className="inline-flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#b8962f] flex items-center justify-center font-display italic font-bold text-[#0a1a1a] text-xl shadow-lg shadow-[#D4AF37]/20">
                                A
                            </div>
                            <span className="font-display text-2xl text-[#FAF9F7] tracking-tight">
                                Artisio<span className="text-[#D4AF37]">.</span>
                            </span>
                        </Link>
                    </motion.div>

                    {/* Page Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="text-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
                            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D4AF37]">Admin Portal</span>
                        </div>
                        <h1 className="font-display text-3xl text-[#FAF9F7] italic">
                            Welcome Back
                        </h1>
                        <p className="text-[#888] text-sm mt-2">
                            Sign in to access the admin dashboard
                        </p>
                    </motion.div>

                    {/* Login Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="bg-[#111]/80 backdrop-blur-xl rounded-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-7"
                    >
                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-5 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] rounded-lg flex items-center gap-2"
                            >
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </motion.div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#888] mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-[#0a1a1a] border border-white/10 rounded-xl text-[14px] text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:bg-[#0a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                                        placeholder="admin@artisio.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[11px] font-semibold uppercase tracking-wide text-[#888]">
                                        Password
                                    </label>
                                    <button type="button" className="text-[11px] font-semibold text-[#D4AF37] hover:text-[#b8962f] uppercase tracking-wide transition-colors">
                                        Forgot?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-11 py-3 bg-[#0a1a1a] border border-white/10 rounded-xl text-[14px] text-[#FAF9F7] placeholder-[#555] focus:border-[#D4AF37]/50 focus:bg-[#0a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/20 transition-all"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#888] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-[#0a1a1a] text-[#D4AF37] focus:ring-[#D4AF37]/20"
                                />
                                <label htmlFor="rememberMe" className="text-[13px] text-[#888]">
                                    Remember this device
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#b8962f] hover:from-[#b8962f] hover:to-[#D4AF37] text-[#0a1a1a] text-[12px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/30"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        Sign In to Dashboard
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-white/5"></div>
                            <span className="text-[11px] text-[#555] uppercase tracking-wider">Secure Access</span>
                            <div className="flex-1 h-px bg-white/5"></div>
                        </div>

                        {/* Security Info */}
                        <div className="flex items-center justify-center gap-4 text-[11px] text-[#555]">
                            <span className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                256-bit SSL
                            </span>
                            <span className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                2FA Ready
                            </span>
                            <span className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                Audit Logged
                            </span>
                        </div>
                    </motion.div>

                    {/* Footer Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mt-6"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-[13px] text-[#555] hover:text-[#D4AF37] transition-colors"
                        >
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                            Return to Store
                        </Link>
                    </motion.div>

                    {/* Legal */}
                    <p className="text-center text-[10px] text-[#444] mt-8 uppercase tracking-wider">
                        Restricted Access • Authorized Personnel Only
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
