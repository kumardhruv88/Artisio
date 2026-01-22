import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Trash2, Sparkles } from 'lucide-react';

/**
 * Privacy - Privacy Policy page
 */
const Privacy = () => {
    const sections = [
        {
            icon: Eye,
            title: 'Information We Collect',
            content: [
                'Account information (name, email, phone, address)',
                'Payment details (processed securely via Stripe)',
                'Order history and preferences',
                'Website usage data and cookies',
                'Communications with our support team',
            ],
        },
        {
            icon: Shield,
            title: 'How We Use Your Data',
            content: [
                'Process and fulfill your orders',
                'Send order updates and shipping notifications',
                'Personalize your shopping experience',
                'Send marketing emails (with your consent)',
                'Improve our products and services',
            ],
        },
        {
            icon: Lock,
            title: 'Data Protection',
            content: [
                'SSL encryption on all pages',
                'PCI-compliant payment processing',
                'Regular security audits',
                'Limited employee access to personal data',
                'Secure data centers',
            ],
        },
        {
            icon: Trash2,
            title: 'Your Rights',
            content: [
                'Access your personal data anytime',
                'Request data correction or deletion',
                'Opt out of marketing communications',
                'Download your data (GDPR)',
                'Close your account at any time',
            ],
        },
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
                        Your Data
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-5xl text-white italic"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-accent-cream/60 text-sm mt-4"
                    >
                        Last updated: January 2026
                    </motion.p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-12">
                <div className="container-custom max-w-3xl">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        At ARTISIO, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you shop with us. By using our website, you agree to the terms outlined below.
                    </p>
                </div>
            </section>

            {/* Sections */}
            <section className="pb-16">
                <div className="container-custom max-w-3xl">
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <section.icon className="w-5 h-5 text-secondary" />
                                    <h2 className="font-medium text-primary-dark">{section.title}</h2>
                                </div>
                                <ul className="space-y-2">
                                    {section.content.map((item) => (
                                        <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="text-secondary mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-12 bg-white">
                <div className="container-custom max-w-3xl text-center">
                    <h2 className="font-display text-xl text-primary-dark italic mb-4">Questions?</h2>
                    <p className="text-sm text-gray-600">
                        Contact our privacy team at <a href="mailto:privacy@artisio.com" className="text-secondary hover:underline">privacy@artisio.com</a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
