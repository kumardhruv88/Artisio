/**
 * Login - Premium Artisio Login Page
 * Lumière-inspired ultra-compact design with Clerk authentication
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useSignIn } from '@clerk/clerk-react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { signIn, isLoaded, setActive } = useSignIn();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        setIsLoading(true);
        setError('');

        try {
            const result = await signIn.create({
                identifier: email,
                password: password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                navigate('/');
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!isLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            });
        } catch (err) {
            setError('Google sign-in failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F7] flex flex-col">
            {/* Centered Content */}
            <div className="flex-1 flex items-center justify-center pt-20 pb-10 px-4">
                <div className="w-full max-w-[360px]">
                    {/* Page Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="font-display text-3xl text-[#1a3a3a] italic text-center mb-8"
                    >
                        Welcome Back
                    </motion.h1>

                    {/* Login Card - Ultra Compact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6"
                    >
                        {/* Card Header */}
                        <div className="text-center mb-5">
                            <h2 className="text-[15px] font-medium text-[#1a3a3a]">
                                Sign in to Artisio
                            </h2>
                            <p className="text-[13px] text-[#999] mt-0.5">
                                Welcome back! Please sign in to continue
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-4 p-2.5 bg-red-50 text-red-600 text-[13px] rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Email */}
                            <div>
                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#666] mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2.5 border border-[#e8e5e0] rounded-lg text-[14px] text-[#333] placeholder-[#bbb] focus:border-[#D4AF37] focus:outline-none transition-colors"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-[11px] font-semibold uppercase tracking-wide text-[#666]">
                                        Password
                                    </label>
                                    <Link to="/forgot-password" className="text-[11px] font-semibold text-[#D4AF37] hover:text-[#b8962f] uppercase tracking-wide transition-colors">
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-9 pr-10 py-2.5 border border-[#e8e5e0] rounded-lg text-[14px] text-[#333] placeholder-[#bbb] focus:border-[#D4AF37] focus:outline-none transition-colors"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bbb] hover:text-[#888] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 bg-[#1a3a3a] hover:bg-[#0f2828] text-white text-[12px] font-semibold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sign In <ArrowRight className="w-3.5 h-3.5" /></>}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-4">
                            <div className="flex-1 h-px bg-[#eee]"></div>
                            <span className="text-[11px] text-[#bbb] uppercase">or</span>
                            <div className="flex-1 h-px bg-[#eee]"></div>
                        </div>

                        {/* Google */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-[#e8e5e0] rounded-lg text-[#444] hover:border-[#D4AF37] hover:bg-[#fffef9] transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-[13px] font-medium">Continue with Google</span>
                        </button>

                        {/* Sign up link */}
                        <p className="text-center text-[13px] text-[#777] mt-5">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-[#D4AF37] hover:text-[#b8962f] font-medium transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </motion.div>

                    {/* Footer */}
                    <p className="text-center text-[11px] text-[#bbb] mt-5">
                        Secured by <span className="font-medium text-[#999]">Clerk</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
