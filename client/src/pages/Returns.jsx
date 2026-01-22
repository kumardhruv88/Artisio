import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, XCircle, Clock, Sparkles } from 'lucide-react';

/**
 * Returns - Returns & Refunds Policy page
 */
const Returns = () => {
    const steps = [
        { num: '01', title: 'Initiate Return', desc: 'Log into your account and select the order to return' },
        { num: '02', title: 'Package Items', desc: 'Use original packaging or a secure alternative' },
        { num: '03', title: 'Ship Back', desc: 'Use our prepaid label or chosen carrier' },
        { num: '04', title: 'Get Refunded', desc: 'Refund processed within 5-7 business days' },
    ];

    const eligibleItems = [
        'Unopened food items within 30 days',
        'Defective or damaged products',
        'Incorrect items received',
        'Quality issues reported within 7 days',
    ];

    const nonEligibleItems = [
        'Opened or consumed products',
        'Personalized or custom items',
        'Gift cards',
        'Items past 30-day window',
    ];

    return (
        <div className="min-h-screen bg-[#F5F3EE]">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0a2525]" />
                <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-secondary/15 rounded-full blur-3xl" />

                <div className="container-custom relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 border border-secondary/40 text-secondary text-[10px] tracking-[0.2em] uppercase mb-4"
                    >
                        <Sparkles className="w-3 h-3" />
                        Hassle-Free
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-5xl text-white italic"
                    >
                        Returns & Refunds
                    </motion.h1>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-16">
                <div className="container-custom">
                    <h2 className="font-display text-2xl text-primary-dark italic mb-8 text-center">How It Works</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <span className="font-display text-3xl text-secondary italic">{step.num}</span>
                                <h3 className="font-medium text-primary-dark mt-2 mb-1">{step.title}</h3>
                                <p className="text-xs text-gray-500">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Eligibility */}
            <section className="py-16 bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <h3 className="font-medium text-primary-dark">Eligible for Returns</h3>
                            </div>
                            <ul className="space-y-2">
                                {eligibleItems.map((item) => (
                                    <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-green-600 mt-1">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <XCircle className="w-5 h-5 text-red-500" />
                                <h3 className="font-medium text-primary-dark">Non-Returnable</h3>
                            </div>
                            <ul className="space-y-2">
                                {nonEligibleItems.map((item) => (
                                    <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Refund Info */}
            <section className="py-16">
                <div className="container-custom max-w-3xl">
                    <h2 className="font-display text-2xl text-primary-dark italic mb-8 text-center">Refund Details</h2>
                    <div className="space-y-4 text-sm text-gray-600">
                        <div className="bg-white p-4">
                            <h3 className="font-medium text-primary-dark mb-2">Processing Time</h3>
                            <p>Refunds are processed within 5-7 business days after we receive your return.</p>
                        </div>
                        <div className="bg-white p-4">
                            <h3 className="font-medium text-primary-dark mb-2">Refund Method</h3>
                            <p>Refunds go to your original payment method. Store credit is also available.</p>
                        </div>
                        <div className="bg-white p-4">
                            <h3 className="font-medium text-primary-dark mb-2">Questions?</h3>
                            <p>Contact our support team at support@artisio.com for assistance.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Returns;
