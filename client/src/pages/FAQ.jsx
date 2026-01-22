import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, Package, CreditCard, Truck, RefreshCw, Gift, MessageCircle } from 'lucide-react';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

/**
 * FAQ - Frequently Asked Questions
 * Design: Accordion style with category navigation
 */
const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openItems, setOpenItems] = useState([]);

    const categories = [
        { id: 'all', label: 'All Questions', icon: HelpCircle },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'payment', label: 'Payment', icon: CreditCard },
        { id: 'shipping', label: 'Shipping', icon: Truck },
        { id: 'returns', label: 'Returns', icon: RefreshCw },
        { id: 'subscriptions', label: 'Subscriptions', icon: Gift },
    ];

    const faqs = [
        {
            id: 1,
            category: 'orders',
            question: 'How do I track my order?',
            answer: 'You can track your order by logging into your account and visiting the "Orders" section. You will also receive email updates with tracking information once your order ships. For real-time tracking, click the tracking link in your shipping confirmation email.',
        },
        {
            id: 2,
            category: 'orders',
            question: 'Can I modify or cancel my order after placing it?',
            answer: 'You can modify or cancel your order within 1 hour of placing it. After that, our team begins processing your order. Contact our support team immediately if you need to make changes. Note that some specialty items may have different cancellation policies.',
        },
        {
            id: 3,
            category: 'payment',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and ARTISIO gift cards. All payments are processed securely through Stripe with 256-bit encryption.',
        },
        {
            id: 4,
            category: 'payment',
            question: 'Is my payment information secure?',
            answer: 'Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. We never store your full credit card details on our servers. All transactions are processed through Stripe, a trusted payment processor.',
        },
        {
            id: 5,
            category: 'shipping',
            question: 'How long does shipping take?',
            answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. Free standard shipping is available for orders over $50. Delivery times may vary during holidays.',
        },
        {
            id: 6,
            category: 'shipping',
            question: 'Do you ship internationally?',
            answer: 'Yes! We ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Please note that additional customs duties or taxes may apply depending on your location.',
        },
        {
            id: 7,
            category: 'shipping',
            question: 'How do you handle perishable items?',
            answer: 'Perishable items are shipped with insulated packaging and ice packs to ensure freshness. We ship these items early in the week to avoid weekend delays. During extreme weather, we may delay shipping to protect product quality.',
        },
        {
            id: 8,
            category: 'returns',
            question: 'What is your return policy?',
            answer: 'We offer a 30-day satisfaction guarantee. If you are not happy with your purchase, contact us for a full refund or exchange. Perishable items cannot be returned unless damaged during shipping.',
        },
        {
            id: 9,
            category: 'returns',
            question: 'What if my order arrives damaged?',
            answer: 'We take great care in packaging, but if your order arrives damaged, please contact us within 48 hours with photos. We will send a replacement or issue a full refund at no extra cost to you.',
        },
        {
            id: 10,
            category: 'subscriptions',
            question: 'How do subscription boxes work?',
            answer: 'Choose your tier (Starter, Connoisseur, or Collector) and we will curate a box of artisan products each month. Your card is charged automatically, and boxes ship on the 1st of each month. You can customize preferences, skip months, or cancel anytime.',
        },
        {
            id: 11,
            category: 'subscriptions',
            question: 'Can I skip a month or pause my subscription?',
            answer: 'Yes! You can skip a month, pause, or cancel your subscription anytime from your account settings. Skip requests must be made by the 25th of the previous month to take effect.',
        },
        {
            id: 12,
            category: 'subscriptions',
            question: 'Can I choose what products go in my box?',
            answer: 'While we curate each box based on your preferences, Connoisseur and Collector tier members can swap up to 2 items per box. You will receive a preview email 5 days before shipping where you can make changes.',
        },
    ];

    const toggleItem = (id) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-neutral">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary via-primary-light to-secondary py-16 text-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
                        <h1 className="text-5xl font-serif font-bold mb-4">
                            How Can We Help?
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                            Find answers to commonly asked questions about orders, shipping, returns, and more.
                        </p>

                        {/* Search */}
                        <div className="max-w-xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for answers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary shadow-lg"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-20">
                <div className="container-custom">
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all
                  ${selectedCategory === category.id
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }
                `}
                            >
                                <category.icon className="w-4 h-4" />
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-16">
                <div className="container-custom max-w-4xl">
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12">
                            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-700 mb-2">No results found</h3>
                            <p className="text-gray-500">Try a different search term or browse all categories</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className="overflow-hidden">
                                        <button
                                            onClick={() => toggleItem(faq.id)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                            <ChevronDown className={`
                        w-5 h-5 text-gray-400 flex-shrink-0 transition-transform
                        ${openItems.includes(faq.id) ? 'rotate-180' : ''}
                      `} />
                                        </button>
                                        <AnimatePresence>
                                            {openItems.includes(faq.id) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Still Need Help */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <Card className="p-8 bg-gradient-to-r from-secondary/10 to-amber-50 border-secondary/30">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
                                    <MessageCircle className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-1">Still Have Questions?</h3>
                                    <p className="text-gray-600">Our support team is here to help you</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="secondary">
                                    Live Chat
                                </Button>
                                <Button variant="outline">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
