/**
 * Register - Premium Artisio Registration Page
 * Lumière-inspired ultra-compact design with Clerk authentication
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, User, Check, Loader2 } from 'lucide-react';
import { useSignUp } from '@clerk/clerk-react';

const Register = () => {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const { signUp, isLoaded, setActive } = useSignUp();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        setIsLoading(true);
        setError('');

        try {
            const result = await signUp.create({
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailAddress: formData.email,
                password: formData.password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                navigate('/');
            } else {
                await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
                setStep(3);
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;
        try {
            await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            });
        } catch (err) {
            setError('Google sign-up failed');
        }
    };

    const passwordStrength = (() => {
        let s = 0;
        if (formData.password.length >= 8) s++;
        if (/[A-Z]/.test(formData.password)) s++;
        if (/[0-9]/.test(formData.password)) s++;
        if (/[^A-Za-z0-9]/.test(formData.password)) s++;
        return s;
    })();

    return (
        <div className="min-h-screen bg-[#FAF9F7] flex flex-col">
            <div className="flex-1 flex items-center justify-center pt-20 pb-10 px-4">
                <div className="w-full max-w-[360px]">
                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-3xl text-[#1a3a3a] italic text-center mb-6"
                    >
                        Create Account
                    </motion.h1>

                    {/* Progress */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {[1, 2].map((s) => (
                            <div key={s} className="flex items-center">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium ${step >= s ? 'bg-[#1a3a3a] text-white' : 'bg-[#e8e5e0] text-[#999]'
                                    }`}>
                                    {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                                </div>
                                {s < 2 && <div className={`w-8 h-0.5 mx-1.5 ${step > s ? 'bg-[#1a3a3a]' : 'bg-[#e8e5e0]'}`} />}
                            </div>
                        ))}
                    </div>

                    {/* Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6"
                    >
                        <div className="text-center mb-4">
                            <h2 className="text-[15px] font-medium text-[#1a3a3a]">
                                {step === 1 ? 'Your Details' : 'Set Password'}
                            </h2>
                            <p className="text-[13px] text-[#999] mt-0.5">
                                {step === 1 ? 'Enter your name to get started' : 'Create your login credentials'}
                            </p>
                        </div>

                        {step === 1 && (
                            <>
                                <button
                                    onClick={handleGoogleSignUp}
                                    className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-[#e8e5e0] rounded-lg text-[#444] hover:border-[#D4AF37] hover:bg-[#fffef9] transition-all mb-4"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="text-[13px] font-medium">Continue with Google</span>
                                </button>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex-1 h-px bg-[#eee]"></div>
                                    <span className="text-[11px] text-[#bbb] uppercase">or</span>
                                    <div className="flex-1 h-px bg-[#eee]"></div>
                                </div>
                            </>
                        )}

                        {error && (
                            <div className="mb-3 p-2.5 bg-red-50 text-red-600 text-[13px] rounded-lg">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                                        <div className="grid grid-cols-2 gap-2.5">
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#666] mb-1.5">First Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
                                                    <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full pl-9 pr-2 py-2.5 border border-[#e8e5e0] rounded-lg text-[14px] placeholder-[#bbb] focus:border-[#D4AF37] focus:outline-none" placeholder="John" required />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#666] mb-1.5">Last Name</label>
                                                <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2.5 border border-[#e8e5e0] rounded-lg text-[14px] placeholder-[#bbb] focus:border-[#D4AF37] focus:outline-none" placeholder="Doe" required />
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => setStep(2)} disabled={!formData.firstName || !formData.lastName} className="w-full py-2.5 bg-[#1a3a3a] hover:bg-[#0f2828] text-white text-[12px] font-semibold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                                            Continue <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#666] mb-1.5">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-9 pr-3 py-2.5 border border-[#e8e5e0] rounded-lg text-[14px] placeholder-[#bbb] focus:border-[#D4AF37] focus:outline-none" placeholder="you@example.com" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-[#666] mb-1.5">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bbb]" />
                                                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="w-full pl-9 pr-10 py-2.5 border border-[#e8e5e0] rounded-lg text-[14px] placeholder-[#bbb] focus:border-[#D4AF37] focus:outline-none" placeholder="Min. 8 characters" required minLength={8} />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bbb] hover:text-[#888]">
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            {formData.password && (
                                                <div className="mt-1.5 flex gap-1">
                                                    {[0, 1, 2, 3].map(i => (
                                                        <div key={i} className={`h-1 flex-1 rounded-full ${i < passwordStrength ? ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'][passwordStrength - 1] : 'bg-[#e8e5e0]'}`} />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2.5 pt-1">
                                            <button type="button" onClick={() => setStep(1)} className="px-4 py-2.5 border border-[#e8e5e0] text-[#666] hover:border-[#D4AF37] text-[12px] font-semibold uppercase rounded-lg flex items-center gap-1.5">
                                                <ArrowLeft className="w-3.5 h-3.5" /> Back
                                            </button>
                                            <button type="submit" disabled={isLoading || passwordStrength < 2} className="flex-1 py-2.5 bg-[#1a3a3a] hover:bg-[#0f2828] text-white text-[12px] font-semibold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create <ArrowRight className="w-3.5 h-3.5" /></>}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>

                        <p className="text-center text-[13px] text-[#777] mt-5">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#D4AF37] hover:text-[#b8962f] font-medium">Sign in</Link>
                        </p>
                    </motion.div>

                    <p className="text-center text-[11px] text-[#bbb] mt-5">
                        Secured by <span className="font-medium text-[#999]">Clerk</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
