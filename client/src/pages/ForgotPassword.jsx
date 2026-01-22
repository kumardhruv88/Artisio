import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#f8f6f0] px-4 py-12">
            <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-lg shadow-sm text-center">
                {!submitted ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-serif text-[#1a3a3a] mb-4">Reset Password</h1>
                        <p className="text-gray-500 mb-8">
                            Enter the email associated with your account and we'll send you a link to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                label="Email Address"
                                className="text-left"
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full justify-center"
                                isLoading={loading}
                            >
                                Send Reset Link
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#1a3a3a] transition-colors">
                                <ArrowLeft size={14} /> Back to Login
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={32} />
                        </div>
                        <h2 className="text-2xl font-serif text-[#1a3a3a] mb-4">Check Your Email</h2>
                        <p className="text-gray-500 mb-8">
                            We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full justify-center"
                            onClick={() => setSubmitted(false)}
                        >
                            Try another email
                        </Button>
                        <div className="mt-6">
                            <Link to="/login" className="text-sm font-medium text-[#1a3a3a] hover:underline">
                                Return to Login
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
