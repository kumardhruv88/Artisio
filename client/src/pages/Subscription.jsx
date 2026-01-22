import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import {
    Package, Check, Star, Sparkles, ArrowRight,
    Gift, Truck, Heart, RefreshCw, Clock, ChevronRight, X
} from 'lucide-react';

/**
 * Subscription - Premium subscription box landing page
 * Design: Full artistic design with animations and editorial layout
 */
const Subscription = () => {
    const navigate = useNavigate();
    const [selectedTier, setSelectedTier] = useState('connoisseur');
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [showSampleBox, setShowSampleBox] = useState(false);
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    const handleStartSubscription = () => {
        navigate('/login');
    };

    // Sample box items
    const sampleBoxItems = [
        { name: 'Artisan Coffee Blend', origin: 'Oaxaca, Mexico', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300', price: '$28' },
        { name: 'Raw Wildflower Honey', origin: 'Vermont, USA', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784ecb?w=300', price: '$24' },
        { name: 'Extra Virgin Olive Oil', origin: 'Tuscany, Italy', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300', price: '$38' },
        { name: 'Dark Chocolate Truffles', origin: 'Lyon, France', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300', price: '$32' },
        { name: 'Aged Balsamic Vinegar', origin: 'Modena, Italy', image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300', price: '$45' },
        { name: 'Ceremonial Matcha', origin: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300', price: '$48' },
    ];

    const tiers = [
        {
            id: 'starter',
            name: 'Starter',
            subtitle: 'Begin Your Journey',
            monthlyPrice: 29,
            yearlyPrice: 290,
            description: 'Perfect for beginners exploring artisan flavors',
            products: '4-5 products',
            features: [
                'Curated artisan selection',
                'Free standard shipping',
                'Product story cards',
                'Recipe suggestions',
            ],
            popular: false,
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600'
        },
        {
            id: 'connoisseur',
            name: 'Connoisseur',
            subtitle: 'For The Passionate',
            monthlyPrice: 49,
            yearlyPrice: 490,
            description: 'For the passionate food lover seeking variety',
            products: '7-8 products',
            features: [
                'Premium artisan selection',
                'Free express shipping',
                'Exclusive member items',
                'Early access to new products',
                'Personalized tasting notes',
                'Priority customer support',
            ],
            popular: true,
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600'
        },
        {
            id: 'collector',
            name: 'Collector',
            subtitle: 'The Ultimate Experience',
            monthlyPrice: 89,
            yearlyPrice: 890,
            description: 'The ultimate artisan experience for connoisseurs',
            products: '12+ products',
            features: [
                'Rare and limited editions',
                'Free express shipping',
                'Personal concierge service',
                'Exclusive VIP events access',
                'Annual premium gift box',
                'Behind-the-scenes artisan tours',
                'First access to collaborations',
            ],
            popular: false,
            image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600'
        },
    ];

    const howItWorks = [
        { icon: Heart, title: 'Tell Us Your Taste', desc: 'Take a quick quiz to share your preferences', num: '01' },
        { icon: Package, title: 'We Curate For You', desc: 'Our experts select products you will love', num: '02' },
        { icon: Truck, title: 'Delivered Monthly', desc: 'Fresh artisan goods arrive at your door', num: '03' },
        { icon: RefreshCw, title: 'Flexible & Easy', desc: 'Skip, pause, or cancel anytime', num: '04' },
    ];

    // Text animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 100, clipPath: 'inset(100% 0 0 0)' },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            transition: { duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.19, 1, 0.22, 1] }
        })
    };

    return (
        <div className="min-h-screen">
            {/* HERO SECTION - Full Screen with Artistic Design */}
            <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80"
                        alt="Artisan Foods"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary-dark/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] border border-secondary/20 rounded-full hidden lg:block" />
                <div className="absolute top-1/3 right-[15%] w-[300px] h-[300px] border border-accent-cream/10 rounded-full hidden lg:block" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="mb-8"
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 border border-secondary/40 text-secondary text-xs tracking-[0.2em] uppercase">
                                    <Sparkles className="w-4 h-4" />
                                    Premium Subscription Boxes
                                </span>
                            </motion.div>

                            {/* Title with Clip Animation */}
                            <div className="overflow-hidden">
                                <motion.h1
                                    custom={0}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate={isHeroInView ? "visible" : "hidden"}
                                    className="font-display text-5xl md:text-6xl lg:text-7xl text-white italic leading-[1.1]"
                                >
                                    Discover Artisan
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h1
                                    custom={1}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate={isHeroInView ? "visible" : "hidden"}
                                    className="font-display text-5xl md:text-6xl lg:text-7xl text-secondary italic leading-[1.1]"
                                >
                                    Treasures Monthly
                                </motion.h1>
                            </div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="mt-8 text-accent-cream/70 text-lg max-w-xl"
                            >
                                Hand-picked artisan foods and beverages delivered to your door. Each box tells a story of craftsmanship and passion.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="mt-10 flex flex-col sm:flex-row gap-4"
                            >
                                <button
                                    onClick={handleStartSubscription}
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-secondary text-primary-dark text-sm tracking-[0.15em] uppercase hover:bg-secondary-light transition-colors"
                                >
                                    Take the Taste Quiz
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => setShowSampleBox(true)}
                                    className="inline-flex items-center gap-3 px-8 py-4 border border-accent-cream/30 text-accent-cream text-sm tracking-[0.15em] uppercase hover:bg-accent-cream/10 transition-colors"
                                >
                                    View Sample Box
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
                >
                    <span className="text-xs tracking-[0.3em] uppercase mb-3">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-[1px] h-10 bg-white/30"
                    />
                </motion.div>
            </section>

            {/* HOW IT WORKS - Smooth Transition with Dynamic Background */}
            <section className="relative py-32 overflow-hidden">
                {/* Multi-layer smooth gradient background */}
                <div className="absolute inset-0">
                    {/* Top gradient blending from hero */}
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary-dark via-[#0f2e2e] to-transparent z-10" />

                    {/* Main rich gradient - NOT dull green */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a2525] via-[#123838] to-[#0a2525]" />

                    {/* Radial glow accents for depth */}
                    <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-[#1a4545]/40 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0d3030]/50 rounded-full blur-3xl" />

                    {/* Decorative diagonal stripes */}
                    <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent transform -skew-x-12" />
                    <div className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-accent-cream/5 to-transparent transform skew-x-12" />

                    {/* Subtle dot pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
                        backgroundSize: '50px 50px'
                    }} />

                    {/* Bottom gradient for smooth transition to next section */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f2828] via-[#0f2828]/80 to-transparent z-10" />
                </div>


                <div className="container-custom relative z-10">
                    {/* Section Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-secondary text-sm tracking-[0.3em] uppercase mb-4"
                            >
                                The Process
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-display text-4xl md:text-5xl text-accent-cream italic"
                            >
                                How It Works
                            </motion.h2>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-accent-cream/50 max-w-md mt-4 lg:mt-0"
                        >
                            Four simple steps to artisan bliss. We handle the curation, you enjoy the discovery.
                        </motion.p>
                    </div>

                    {/* Steps - Horizontal with Numbers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {howItWorks.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                {/* Large Number */}
                                <span className="font-display text-[80px] text-secondary/10 absolute -top-8 -left-2 leading-none">
                                    {step.num}
                                </span>

                                {/* Icon */}
                                <div className="relative z-10 w-16 h-16 border border-secondary/30 flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                                    <step.icon className="w-7 h-7 text-secondary" />
                                </div>

                                {/* Content */}
                                <h3 className="font-display text-xl text-accent-cream italic mb-3">{step.title}</h3>
                                <p className="text-accent-cream/50 text-sm leading-relaxed">{step.desc}</p>

                                {/* Connector Line */}
                                {index < 3 && (
                                    <div className="hidden lg:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-secondary/30 to-transparent" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING TIERS - Smooth Gradient Transition */}
            <section className="relative py-32 overflow-hidden">
                {/* Multi-layer gradient background - smooth transition from dark section */}
                <div className="absolute inset-0">
                    {/* Top gradient blending from previous section */}
                    <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0f2828] via-[#1a3838] to-[#2a4a4a] z-10" />

                    {/* Transition layer - teal to cream */}
                    <div className="absolute top-32 left-0 right-0 h-48 bg-gradient-to-b from-[#2a4a4a] via-[#4a6a6a] to-[#8a9a9a] z-10" />
                    <div className="absolute top-64 left-0 right-0 h-32 bg-gradient-to-b from-[#8a9a9a] via-[#C5C0B5] to-[#E8E4DD] z-10" />

                    {/* Main cream area */}
                    <div className="absolute top-80 left-0 right-0 h-[calc(40%-320px)] bg-[#F5F3EE]" />

                    {/* Cream to dark gradient at cards transition */}
                    <div className="absolute top-[35%] left-0 right-0 h-32 bg-gradient-to-b from-[#F5F3EE] via-[#E0DDD5] to-[#C5C0B5]" />
                    <div className="absolute top-[40%] left-0 right-0 h-24 bg-gradient-to-b from-[#C5C0B5] via-[#8a9a9a] to-[#4a6a6a]" />
                    <div className="absolute top-[45%] left-0 right-0 h-24 bg-gradient-to-b from-[#4a6a6a] via-[#2a4a4a] to-[#0f2828]" />

                    {/* Rich dark area for cards */}
                    <div className="absolute top-[50%] left-0 right-0 h-[50%] bg-gradient-to-b from-[#0f2828] via-[#123838] to-[#0a2525]" />

                    {/* Radial glows */}
                    <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-[#1a4545]/30 rounded-full blur-3xl" />

                    {/* Bottom gradient for next section */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a2525] to-transparent z-10" />
                </div>


                <div className="container-custom relative z-10">
                    {/* Header on Cream */}
                    <div className="text-center mb-16">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary text-sm tracking-[0.3em] uppercase mb-4"
                        >
                            Choose Your Experience
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-4xl md:text-5xl text-primary-dark italic mb-6"
                        >
                            Select Your Box
                        </motion.h2>

                        {/* Billing Toggle - Elegant */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-6"
                        >
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`text-sm tracking-[0.1em] uppercase transition-all pb-2 border-b-2 ${billingCycle === 'monthly'
                                    ? 'text-primary-dark border-secondary'
                                    : 'text-gray-400 border-transparent hover:text-primary-dark'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`text-sm tracking-[0.1em] uppercase transition-all pb-2 border-b-2 flex items-center gap-2 ${billingCycle === 'yearly'
                                    ? 'text-primary-dark border-secondary'
                                    : 'text-gray-400 border-transparent hover:text-primary-dark'
                                    }`}
                            >
                                Yearly
                                <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full">Save 17%</span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                viewport={{ once: true }}
                                className={`relative ${tier.popular ? 'lg:-mt-6 lg:mb-6' : ''}`}
                            >
                                <div
                                    onClick={() => setSelectedTier(tier.id)}
                                    className={`cursor-pointer p-8 h-full transition-all duration-300 ${tier.popular
                                        ? 'bg-white shadow-2xl'
                                        : selectedTier === tier.id
                                            ? 'bg-white shadow-xl'
                                            : 'bg-white/95 hover:bg-white hover:shadow-lg'
                                        }`}
                                >
                                    {/* Popular Badge */}
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="bg-secondary text-primary-dark text-[10px] tracking-[0.15em] uppercase px-4 py-2 shadow-lg">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    {/* Tier Header */}
                                    <div className="text-center mb-8 pt-4">
                                        <p className="text-secondary text-xs tracking-[0.2em] uppercase mb-2">{tier.subtitle}</p>
                                        <h3 className="font-display text-3xl text-primary-dark italic mb-2">{tier.name}</h3>
                                        <p className="text-gray-500 text-sm">{tier.description}</p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-center mb-8 pb-8 border-b border-gray-100">
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-5xl font-display text-primary-dark">
                                                ${billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                            </span>
                                        </div>
                                        <p className="text-secondary font-medium mt-2">{tier.products}</p>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-4 mb-8">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-5 h-5 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-secondary" />
                                                </div>
                                                <span className="text-gray-600 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <button
                                        className={`w-full py-4 text-sm tracking-[0.15em] uppercase transition-all ${tier.popular || selectedTier === tier.id
                                            ? 'bg-secondary text-primary-dark hover:bg-secondary-light'
                                            : 'border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white'
                                            }`}
                                    >
                                        {selectedTier === tier.id ? 'Selected' : 'Choose Plan'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT'S IN THE BOX - Editorial Split with Smooth Transition */}
            <section className="relative overflow-hidden">
                {/* Smooth transition from dark pricing section */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a2525] via-[#123838] to-transparent z-20" />

                <div className="flex flex-col lg:flex-row min-h-screen">
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-auto">

                        <motion.div
                            initial={{ opacity: 0, scale: 1.1 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true }}
                            className="absolute inset-0"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1557275357-072087771588?w=1200"
                                alt="Subscription Box"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F5F3EE] hidden lg:block" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EE] to-transparent lg:hidden" />
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute bottom-8 left-8 lg:bottom-auto lg:top-1/2 lg:right-8 lg:left-auto bg-white p-5 shadow-xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Next Box Ships</p>
                                    <p className="text-xl font-display text-primary-dark italic">5 Days</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 bg-[#F5F3EE] flex items-center py-20 lg:py-0">
                        <div className="container-custom lg:pl-20 lg:pr-0">
                            <div className="max-w-lg">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="inline-flex items-center gap-2 text-secondary text-sm tracking-[0.2em] uppercase mb-6">
                                        <Gift className="w-4 h-4" />
                                        Sneak Peek
                                    </span>
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="font-display text-4xl md:text-5xl text-primary-dark italic mb-6"
                                >
                                    What's Inside The Box?
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-gray-600 mb-10"
                                >
                                    Every month, we curate a selection of the finest artisan products. From small-batch coffee to handcrafted preserves, each item is chosen for its exceptional quality and unique story.
                                </motion.p>

                                {/* Product Categories Grid */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="grid grid-cols-2 gap-4 mb-10"
                                >
                                    {[
                                        { emoji: '☕', label: 'Specialty Coffee' },
                                        { emoji: '🍯', label: 'Artisan Honey' },
                                        { emoji: '🧀', label: 'Craft Cheeses' },
                                        { emoji: '🍫', label: 'Bean-to-Bar Chocolate' },
                                        { emoji: '🫒', label: 'Premium Olive Oil' },
                                        { emoji: '🌶️', label: 'Small-Batch Sauces' },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-3 py-3 border-b border-gray-200"
                                        >
                                            <span className="text-2xl">{item.emoji}</span>
                                            <span className="text-gray-700">{item.label}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <button
                                        onClick={handleStartSubscription}
                                        className="group inline-flex items-center gap-3 text-primary-dark text-sm tracking-[0.15em] uppercase hover:text-secondary transition-colors"
                                    >
                                        Start Your Subscription
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA - Full Width with Smooth Transition */}
            <section className="relative py-40 overflow-hidden">
                {/* Smooth transition from cream section */}
                <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-[#F5F3EE] via-[#E0DDD5] to-transparent z-10" />

                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1920"
                        alt="Artisan Foods"
                        className="w-full h-full object-cover"
                    />
                    {/* Rich overlay with gradient - not flat */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020]/90 via-primary-dark/85 to-[#0d2828]/90" />

                    {/* Radial glows for depth */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1a4040]/30 rounded-full blur-3xl" />
                </div>

                {/* Decorative Lines */}
                <div className="absolute top-20 left-[10%] w-[1px] h-32 bg-gradient-to-b from-secondary/50 to-transparent" />
                <div className="absolute bottom-20 right-[15%] w-[1px] h-32 bg-gradient-to-t from-secondary/50 to-transparent" />


                <div className="container-custom relative z-10 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary text-sm tracking-[0.3em] uppercase mb-6"
                    >
                        Join 10,000+ Food Lovers
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl text-accent-cream italic mb-6 max-w-3xl mx-auto"
                    >
                        Ready to Start Your Artisan Journey?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-accent-cream/60 text-lg max-w-xl mx-auto mb-10"
                    >
                        Join thousands of food lovers discovering new artisan favorites every month. Your first box ships in just 5 days.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={handleStartSubscription}
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-secondary text-primary-dark text-sm tracking-[0.2em] uppercase hover:bg-secondary-light transition-colors"
                        >
                            Get Started Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Sample Box Modal - Premium Split Design */}
            <AnimatePresence>
                {showSampleBox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
                        onClick={() => setShowSampleBox(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="relative w-[95vw] max-w-6xl h-[85vh] max-h-[700px] overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowSampleBox(false)}
                                className="absolute top-4 right-4 z-30 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Split Layout */}
                            <div className="flex h-full">
                                {/* Left Side - Dark with Info */}
                                <div className="w-[40%] bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0d2828] p-10 flex flex-col justify-between relative overflow-hidden">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-secondary/10 rounded-full blur-3xl" />
                                    <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-[#1a4545]/30 rounded-full blur-3xl" />

                                    <div className="relative z-10">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <span className="inline-flex items-center gap-2 text-secondary text-xs tracking-[0.2em] uppercase mb-6">
                                                <Gift className="w-4 h-4" />
                                                Sneak Peek
                                            </span>
                                            <h2 className="font-display text-4xl xl:text-5xl text-accent-cream italic leading-tight mb-6">
                                                What's Inside<br />The Box?
                                            </h2>
                                            <p className="text-accent-cream/60 leading-relaxed mb-8">
                                                Each month, we curate a unique selection of artisan treasures from around the world. Here's a taste of what awaits you.
                                            </p>
                                        </motion.div>

                                        {/* Stats */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="grid grid-cols-3 gap-4 mb-8"
                                        >
                                            <div className="text-center p-4 border border-accent-cream/10">
                                                <p className="text-secondary text-2xl font-display italic mb-1">7-8</p>
                                                <p className="text-accent-cream/40 text-[10px] uppercase tracking-wider">Products</p>
                                            </div>
                                            <div className="text-center p-4 border border-accent-cream/10">
                                                <p className="text-secondary text-2xl font-display italic mb-1">$215+</p>
                                                <p className="text-accent-cream/40 text-[10px] uppercase tracking-wider">Value</p>
                                            </div>
                                            <div className="text-center p-4 border border-accent-cream/10">
                                                <p className="text-secondary text-2xl font-display italic mb-1">6+</p>
                                                <p className="text-accent-cream/40 text-[10px] uppercase tracking-wider">Countries</p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* CTA at bottom */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <p className="text-accent-cream/40 text-sm mb-3">Yours for just</p>
                                        <p className="font-display text-5xl text-secondary italic mb-6">$49<span className="text-2xl text-accent-cream/60">/mo</span></p>
                                        <button
                                            onClick={() => {
                                                setShowSampleBox(false);
                                                handleStartSubscription();
                                            }}
                                            className="w-full py-4 bg-secondary text-primary-dark text-sm tracking-[0.15em] uppercase hover:bg-secondary-light transition-colors flex items-center justify-center gap-3"
                                        >
                                            Start Now
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                </div>

                                {/* Right Side - Products Showcase */}
                                <div className="w-[60%] bg-[#F5F3EE] relative overflow-hidden">
                                    {/* Scrolling Product Rows */}
                                    <div className="absolute inset-0 flex flex-col justify-center py-8 gap-6">

                                        {/* Row 1 - Moving Left */}
                                        <motion.div
                                            className="flex gap-4 whitespace-nowrap"
                                            animate={{ x: [0, -600] }}
                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        >
                                            {[...sampleBoxItems, ...sampleBoxItems].map((item, i) => (
                                                <div key={`row1-${i}`} className="w-[200px] flex-shrink-0 bg-white shadow-lg overflow-hidden group">
                                                    <div className="h-[140px] overflow-hidden">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="p-3">
                                                        <p className="font-display text-sm text-primary-dark italic truncate">{item.name}</p>
                                                        <div className="flex justify-between items-center mt-1">
                                                            <p className="text-[10px] text-gray-400 uppercase tracking-wide">{item.origin}</p>
                                                            <p className="text-secondary text-xs font-semibold">{item.price}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>

                                        {/* Row 2 - Moving Right */}
                                        <motion.div
                                            className="flex gap-4 whitespace-nowrap"
                                            animate={{ x: [-400, 200] }}
                                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                        >
                                            {[...sampleBoxItems.slice(3), ...sampleBoxItems.slice(0, 3), ...sampleBoxItems].map((item, i) => (
                                                <div key={`row2-${i}`} className="w-[180px] flex-shrink-0 bg-white shadow-lg overflow-hidden group">
                                                    <div className="h-[120px] overflow-hidden">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="p-3">
                                                        <p className="font-display text-sm text-primary-dark italic truncate">{item.name}</p>
                                                        <p className="text-secondary text-xs font-semibold mt-1">{item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>

                                        {/* Row 3 - Moving Left Slower */}
                                        <motion.div
                                            className="flex gap-4 whitespace-nowrap"
                                            animate={{ x: [100, -500] }}
                                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                        >
                                            {[...sampleBoxItems.reverse(), ...sampleBoxItems].map((item, i) => (
                                                <div key={`row3-${i}`} className="w-[160px] flex-shrink-0 bg-white shadow-lg overflow-hidden group">
                                                    <div className="h-[100px] overflow-hidden">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="p-2">
                                                        <p className="font-display text-xs text-primary-dark italic truncate">{item.name}</p>
                                                        <p className="text-secondary text-[10px] font-semibold mt-0.5">{item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>

                                    </div>

                                    {/* Gradient Overlays for smooth edges */}
                                    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#F5F3EE] to-transparent z-10 pointer-events-none" />
                                    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#F5F3EE] to-transparent z-10 pointer-events-none" />

                                    {/* Central highlight badge */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5, type: 'spring' }}
                                        className="absolute top-6 right-6 bg-primary-dark text-accent-cream px-4 py-2 shadow-xl z-20"
                                    >
                                        <p className="text-[10px] tracking-[0.2em] uppercase">Curated Monthly</p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Subscription;
