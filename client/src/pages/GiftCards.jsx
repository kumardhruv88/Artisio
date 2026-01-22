import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gift, CreditCard, Calendar, Mail, Heart, ArrowRight, Check, Sparkles, Loader } from 'lucide-react';
import { giftCardAPI } from '@/services/giftCardAPI';

/**
 * GiftCards - Premium gift card purchase page
 * Design: Compact artistic layout with all components
 * Connected to backend API for purchase and balance check
 */
const GiftCards = () => {
    const [amount, setAmount] = useState(50);
    const [customAmount, setCustomAmount] = useState('');
    const [deliveryType, setDeliveryType] = useState('email');
    const [selectedDesign, setSelectedDesign] = useState(0);
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const [formData, setFormData] = useState({
        recipientName: '',
        recipientEmail: '',
        senderName: '',
        message: '',
        sendDate: '',
    });

    // Purchase state
    const [purchasing, setPurchasing] = useState(false);
    const [purchaseSuccess, setPurchaseSuccess] = useState(null);
    const [purchaseError, setPurchaseError] = useState(null);

    // Balance check state
    const [balanceCode, setBalanceCode] = useState('');
    const [checkingBalance, setCheckingBalance] = useState(false);
    const [balanceResult, setBalanceResult] = useState(null);
    const [balanceError, setBalanceError] = useState(null);

    // Handle purchase
    const handlePurchase = async () => {
        setPurchasing(true);
        setPurchaseError(null);
        setPurchaseSuccess(null);

        try {
            const response = await giftCardAPI.purchase({
                amount: Number(amount || customAmount),
                senderName: formData.senderName || 'Anonymous',
                senderEmail: formData.senderEmail || '',
                recipientName: formData.recipientName,
                recipientEmail: formData.recipientEmail,
                message: formData.message,
                deliveryMethod: deliveryType,
                scheduledDelivery: formData.sendDate || null,
                designTemplate: ['classic', 'gold', 'rose', 'navy'][selectedDesign]
            });

            if (response.success) {
                setPurchaseSuccess(response.data);
            } else {
                setPurchaseError(response.message || 'Failed to purchase gift card');
            }
        } catch (err) {
            setPurchaseError(err.response?.data?.message || 'Failed to purchase gift card. Please try again.');
        } finally {
            setPurchasing(false);
        }
    };

    // Handle balance check
    const handleCheckBalance = async () => {
        if (!balanceCode.trim()) return;

        setCheckingBalance(true);
        setBalanceError(null);
        setBalanceResult(null);

        try {
            const response = await giftCardAPI.checkBalance(balanceCode.trim());
            if (response.success) {
                setBalanceResult(response.data);
            } else {
                setBalanceError(response.message || 'Gift card not found');
            }
        } catch (err) {
            setBalanceError(err.response?.data?.message || 'Gift card not found. Please check the code.');
        } finally {
            setCheckingBalance(false);
        }
    };

    const presetAmounts = [25, 50, 100, 150, 200];

    const cardDesigns = [
        { id: 0, name: 'Classic', gradient: 'from-[#0a2525] via-[#123838] to-[#0f2828]' },
        { id: 1, name: 'Gold', gradient: 'from-[#8B6914] via-[#D4AF37] to-[#8B6914]' },
        { id: 2, name: 'Rose', gradient: 'from-[#8B1E3F] via-[#C04C6D] to-[#8B1E3F]' },
        { id: 3, name: 'Navy', gradient: 'from-[#1a3a5c] via-[#2a5080] to-[#1a3a5c]' },
    ];

    const features = [
        { icon: Mail, title: 'Instant Delivery', desc: 'Sent within minutes' },
        { icon: Calendar, title: 'Schedule Ahead', desc: 'Pick a future date' },
        { icon: Heart, title: 'Personal Touch', desc: 'Custom message included' },
        { icon: CreditCard, title: 'Never Expires', desc: 'Use anytime' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F3EE]">
            {/* HERO + MAIN CONTENT - Single Combined Section */}
            <section ref={heroRef} className="relative overflow-hidden">
                {/* Background - Artistic Split Design */}
                <div className="absolute inset-0">
                    {/* Left half - Dark with texture */}
                    <div className="absolute left-0 top-0 w-full lg:w-[55%] h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0d2828]" />
                        {/* Subtle radial glow */}
                        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl" />
                        {/* Decorative circle */}
                        <div className="absolute top-32 right-0 w-[200px] h-[200px] border border-secondary/15 rounded-full translate-x-1/2" />
                        <div className="absolute bottom-40 left-20 w-[150px] h-[150px] border border-accent-cream/10 rounded-full" />
                    </div>
                    {/* Right half - Cream */}
                    <div className="absolute right-0 top-0 w-full lg:w-[45%] h-full bg-[#F5F3EE] hidden lg:block" />
                </div>

                {/* Content Grid */}
                <div className="relative z-10 container-custom pt-24 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">

                        {/* LEFT SIDE - Hero + Card Preview (Dark Background) */}
                        <div className="lg:col-span-6 lg:pr-16">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="mb-6"
                            >
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-secondary/40 text-secondary text-[10px] tracking-[0.2em] uppercase">
                                    <Gift className="w-3 h-3" />
                                    Gift Cards
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="font-display text-4xl md:text-5xl text-white italic leading-[1.1] mb-3"
                            >
                                Give the Gift
                            </motion.h1>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="font-display text-4xl md:text-5xl text-secondary italic leading-[1.1] mb-6"
                            >
                                of Artisan
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={isHeroInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-accent-cream/60 text-sm max-w-sm mb-8"
                            >
                                Share the joy of handcrafted foods with an ARTISIO gift card. Perfect for food lovers, holidays, and special occasions.
                            </motion.p>

                            {/* Card Preview - Floating */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="relative mb-6"
                            >
                                <motion.div
                                    key={selectedDesign}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className={`relative aspect-[1.7/1] max-w-sm overflow-hidden shadow-2xl bg-gradient-to-br ${cardDesigns[selectedDesign].gradient}`}
                                >
                                    {/* Card decorations */}
                                    <div className="absolute top-4 right-4 w-16 h-16 border border-white/15 rounded-full" />
                                    <div className="absolute top-6 right-6 w-10 h-10 border border-white/10 rounded-full" />
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />

                                    {/* Card content */}
                                    <div className="relative h-full flex flex-col justify-between p-5 text-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase">Gift Card</p>
                                                <p className="font-display text-xl italic">ARTISIO</p>
                                            </div>
                                            <Gift className="w-5 h-5 text-white/60" />
                                        </div>
                                        <div>
                                            <p className="text-white/50 text-[10px] tracking-[0.15em] uppercase">Amount</p>
                                            <p className="font-display text-3xl italic">${amount || customAmount || 0}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Design selector - Below card */}
                                <div className="flex gap-2 mt-4">
                                    <span className="text-[10px] text-accent-cream/40 tracking-wider uppercase mr-2 self-center">Design:</span>
                                    {cardDesigns.map((design, index) => (
                                        <button
                                            key={design.id}
                                            onClick={() => setSelectedDesign(index)}
                                            className={`w-10 h-6 bg-gradient-to-br ${design.gradient} transition-all hover:scale-105 ${selectedDesign === index ? 'ring-1 ring-secondary ring-offset-1 ring-offset-primary-dark' : ''
                                                }`}
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Features Grid - Full Feature Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="grid grid-cols-2 gap-4 mt-8"
                            >
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-white/5 backdrop-blur-sm border border-white/10">
                                        <div className="w-8 h-8 bg-secondary/20 flex items-center justify-center flex-shrink-0">
                                            <feature.icon className="w-4 h-4 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-accent-cream text-xs font-medium">{feature.title}</p>
                                            <p className="text-accent-cream/50 text-[10px]">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* RIGHT SIDE - Full Form (Cream Background) */}
                        <div className="lg:col-span-6 lg:pl-8">
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="bg-white p-6 lg:p-8 shadow-lg"
                            >
                                <h2 className="font-display text-2xl text-primary-dark italic mb-6">Create Your Gift</h2>

                                {/* Amount Selection */}
                                <div className="mb-6">
                                    <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-3">Select Amount</label>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {presetAmounts.map((preset) => (
                                            <button
                                                key={preset}
                                                onClick={() => { setAmount(preset); setCustomAmount(''); }}
                                                className={`px-4 py-2 text-xs tracking-wide transition-all ${amount === preset && !customAmount
                                                    ? 'bg-secondary text-primary-dark'
                                                    : 'border border-gray-200 text-gray-500 hover:border-secondary'
                                                    }`}
                                            >
                                                ${preset}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Or enter custom amount"
                                        value={customAmount}
                                        onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-secondary"
                                    />
                                </div>

                                {/* Delivery Method */}
                                <div className="mb-6">
                                    <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-3">Delivery Method</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setDeliveryType('email')}
                                            className={`p-4 text-left transition-all border ${deliveryType === 'email' ? 'border-secondary bg-secondary/5' : 'border-gray-200'
                                                }`}
                                        >
                                            <Mail className={`w-5 h-5 mb-2 ${deliveryType === 'email' ? 'text-secondary' : 'text-gray-400'}`} />
                                            <p className="font-medium text-sm text-primary-dark">Email</p>
                                            <p className="text-[10px] text-gray-500">Instant delivery</p>
                                        </button>
                                        <button
                                            onClick={() => setDeliveryType('mail')}
                                            className={`p-4 text-left transition-all border ${deliveryType === 'mail' ? 'border-secondary bg-secondary/5' : 'border-gray-200'
                                                }`}
                                        >
                                            <Gift className={`w-5 h-5 mb-2 ${deliveryType === 'mail' ? 'text-secondary' : 'text-gray-400'}`} />
                                            <p className="font-medium text-sm text-primary-dark">Physical Card</p>
                                            <p className="text-[10px] text-gray-500">+$5 shipping</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Recipient Info - Full Fields */}
                                <div className="space-y-4 mb-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-2">Recipient's Name</label>
                                            <input
                                                type="text"
                                                placeholder="Who is this for?"
                                                value={formData.recipientName}
                                                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                                                className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-secondary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-2">Your Name</label>
                                            <input
                                                type="text"
                                                placeholder="From..."
                                                value={formData.senderName}
                                                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                                                className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-secondary"
                                            />
                                        </div>
                                    </div>

                                    {deliveryType === 'email' && (
                                        <div>
                                            <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-2">Recipient's Email</label>
                                            <input
                                                type="email"
                                                placeholder="their@email.com"
                                                value={formData.recipientEmail}
                                                onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                                                className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-secondary"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-2">Personal Message (Optional)</label>
                                        <textarea
                                            className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-secondary resize-none"
                                            rows={2}
                                            placeholder="Add a heartfelt message..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            maxLength={200}
                                        />
                                        <p className="text-[10px] text-gray-400 mt-1">{formData.message.length}/200 characters</p>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-2">Send Date</label>
                                        <input
                                            type="date"
                                            value={formData.sendDate}
                                            onChange={(e) => setFormData({ ...formData, sendDate: e.target.value })}
                                            className="w-full px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-secondary"
                                        />
                                        <p className="text-[10px] text-gray-400 mt-1">Leave empty to send immediately</p>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="bg-gray-50 p-4 mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-500">Gift Card Amount</span>
                                        <span className="font-medium">${amount || customAmount || 0}</span>
                                    </div>
                                    {deliveryType === 'mail' && (
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-500">Shipping</span>
                                            <span className="font-medium">$5.00</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between pt-2 border-t border-gray-200">
                                        <span className="font-medium text-primary-dark">Total</span>
                                        <span className="font-display text-xl text-secondary italic">
                                            ${(Number(amount || customAmount || 0) + (deliveryType === 'mail' ? 5 : 0)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                {purchaseSuccess ? (
                                    <div className="bg-green-50 border border-green-200 p-4 text-center">
                                        <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                        <p className="font-medium text-green-800">Gift Card Created!</p>
                                        <p className="text-sm text-green-600 mt-1">Code: {purchaseSuccess.code}</p>
                                    </div>
                                ) : (
                                    <>
                                        {purchaseError && (
                                            <p className="text-red-500 text-sm mb-3 text-center">{purchaseError}</p>
                                        )}
                                        <button
                                            onClick={handlePurchase}
                                            disabled={purchasing || !(amount || customAmount) || !formData.recipientEmail}
                                            className="w-full py-4 bg-secondary text-primary-dark text-sm tracking-[0.15em] uppercase hover:bg-secondary-light transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {purchasing ? <Loader className="w-4 h-4 animate-spin" /> : 'Purchase Gift Card'}
                                            {!purchasing && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHECK BALANCE - Separate Clean Section */}
            <section className="py-16 bg-[#F5F3EE]">
                <div className="container-custom">
                    <div className="max-w-xl mx-auto text-center">
                        <p className="text-secondary text-xs tracking-[0.2em] uppercase mb-3">Already Have a Gift Card?</p>
                        <h3 className="font-display text-2xl text-primary-dark italic mb-6">Check Your Balance</h3>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Enter gift card code (e.g., ART-XXXX-XXXX-XXXX)"
                                value={balanceCode}
                                onChange={(e) => setBalanceCode(e.target.value.toUpperCase())}
                                className="flex-1 px-4 py-3 text-sm bg-white border border-gray-200 focus:outline-none focus:border-secondary"
                            />
                            <button
                                onClick={handleCheckBalance}
                                disabled={checkingBalance || !balanceCode.trim()}
                                className="px-6 py-3 bg-primary-dark text-white text-xs tracking-[0.15em] uppercase hover:bg-primary-dark/90 transition-colors disabled:opacity-50"
                            >
                                {checkingBalance ? <Loader className="w-4 h-4 animate-spin" /> : 'Check'}
                            </button>
                        </div>

                        {/* Balance Result */}
                        {balanceResult && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 text-center">
                                <p className="text-green-800 font-medium">Balance: ${balanceResult.balance?.toFixed(2)}</p>
                                <p className="text-sm text-green-600">Status: {balanceResult.status}</p>
                                {balanceResult.expiresAt && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Expires: {new Date(balanceResult.expiresAt).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        )}
                        {balanceError && (
                            <p className="mt-3 text-red-500 text-sm text-center">{balanceError}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA - Elegant Dark Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0d2828]" />
                <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-secondary/5 rounded-full blur-3xl" />

                <div className="container-custom relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary text-xs tracking-[0.3em] uppercase mb-4"
                        >
                            Corporate & Bulk Orders
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl md:text-4xl text-accent-cream italic mb-4"
                        >
                            Need Gift Cards for Your Team?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-accent-cream/60 text-sm mb-8"
                        >
                            We offer special discounts on bulk orders for businesses, events, and corporate gifting.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-8 py-4 border border-secondary text-secondary text-xs tracking-[0.15em] uppercase hover:bg-secondary hover:text-primary-dark transition-colors group"
                        >
                            Contact Us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GiftCards;
