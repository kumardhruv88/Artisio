import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';

/**
 * Terms - Terms & Conditions page
 */
const Terms = () => {
    const sections = [
        {
            title: '1. Acceptance of Terms',
            content: 'By accessing and using the ARTISIO website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.',
        },
        {
            title: '2. Account Registration',
            content: 'You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
        },
        {
            title: '3. Products and Pricing',
            content: 'All products are subject to availability. Prices are displayed in USD and may change without notice. We reserve the right to correct pricing errors and cancel orders affected by such errors.',
        },
        {
            title: '4. Orders and Payment',
            content: 'By placing an order, you make an offer to purchase products. We reserve the right to accept or decline any order. Payment is processed securely through Stripe. Orders are confirmed only after successful payment.',
        },
        {
            title: '5. Shipping and Delivery',
            content: 'Delivery times are estimates and not guarantees. Risk of loss passes to you upon delivery. Please refer to our Shipping Policy for detailed information.',
        },
        {
            title: '6. Returns and Refunds',
            content: 'Returns are accepted within 30 days for eligible items. Please refer to our Returns Policy for complete details on the return process and eligibility.',
        },
        {
            title: '7. Intellectual Property',
            content: 'All content on this website, including text, images, logos, and designs, is owned by ARTISIO and protected by copyright laws. Unauthorized use is prohibited.',
        },
        {
            title: '8. User Conduct',
            content: 'You agree not to use the website for any unlawful purpose, upload harmful content, attempt to gain unauthorized access, or interfere with the website\'s operation.',
        },
        {
            title: '9. Limitation of Liability',
            content: 'ARTISIO is not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our liability is limited to the amount paid for the products purchased.',
        },
        {
            title: '10. Changes to Terms',
            content: 'We may update these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms. We encourage you to review this page periodically.',
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
                        Legal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-5xl text-white italic"
                    >
                        Terms & Conditions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-accent-cream/60 text-sm mt-4"
                    >
                        Effective: January 2026
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container-custom max-w-3xl">
                    <div className="space-y-6">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white p-6"
                            >
                                <h2 className="font-medium text-primary-dark mb-3">{section.title}</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
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
                        Contact us at <a href="mailto:legal@artisio.com" className="text-secondary hover:underline">legal@artisio.com</a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Terms;
