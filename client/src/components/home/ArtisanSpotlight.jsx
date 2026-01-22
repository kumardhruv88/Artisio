/**
 * ArtisanSpotlight - Adachi-style with split cream/dark background
 * Product image as main, small artisan portrait with animated intro
 */

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const ArtisanSpotlight = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    // Parallax for product image
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const artisan = {
        name: 'Maria Santos',
        business: 'Santos Family Vineyards',
        location: 'Napa Valley, California',
        portrait: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        productImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200',
        bio: 'Third-generation winemaker crafting award-winning organic wines using traditional methods passed down through generations.',
        quote: '"Every bottle tells the story of our land and our heritage."',
        productName: 'Reserve Cabernet 2024',
        productPrice: '$45.00',
    };

    // Animation variants
    const titleVariants = {
        hidden: { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            transition: { duration: 1, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }
        })
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (delay) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] }
        })
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }
        }
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {/* Split Background - Cream left/top, Dark right/bottom */}
            <div className="absolute inset-0">
                {/* Desktop: Left cream panel */}
                <div className="hidden lg:block absolute left-0 top-0 w-[35%] h-full bg-[#F5F3EE]" />
                {/* Desktop: Right dark panel */}
                <div className="hidden lg:block absolute right-0 top-0 w-[65%] h-full bg-primary-dark" />
                {/* Mobile: Full dark */}
                <div className="lg:hidden absolute inset-0 bg-primary-dark" />
            </div>

            <div className="relative z-10 py-16 lg:py-24">
                {/* Big Title at Top */}
                <div className="container-custom text-center lg:text-left lg:pl-[38%] mb-12">
                    <div className="overflow-hidden">
                        <motion.h2
                            custom={0}
                            variants={titleVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-accent-cream italic leading-[0.95]"
                        >
                            Artisan of
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h2
                            custom={1}
                            variants={titleVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="font-display text-4xl md:text-5xl lg:text-6xl text-secondary italic leading-[0.95]"
                        >
                            the Month
                        </motion.h2>
                    </div>
                </div>

                {/* Main Content - Product Image + Artisan Info */}
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                        {/* Left - BIG Product Image (3 cols) */}
                        <motion.div
                            style={{ y: imageY }}
                            initial={{ opacity: 0, x: -60 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.9, delay: 0.3 }}
                            className="lg:col-span-3"
                        >
                            <div className="relative overflow-hidden h-[350px] md:h-[450px] lg:h-[550px]">
                                <motion.img
                                    src={artisan.productImage}
                                    alt={artisan.productName}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.5 }}
                                />
                                {/* Product label */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.8 }}
                                    className="absolute bottom-6 left-6 bg-primary-dark/80 backdrop-blur-sm px-4 py-3"
                                >
                                    <span className="text-white text-sm tracking-wider uppercase block">{artisan.productName}</span>
                                    <p className="text-secondary text-xl font-display">{artisan.productPrice}</p>
                                </motion.div>
                                {/* Decorative corners */}
                                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-secondary pointer-events-none" />
                            </div>
                        </motion.div>

                        {/* Right - Artisan Info (2 cols) */}
                        <div className="lg:col-span-2">
                            {/* Small Artisan Portrait */}
                            <motion.div
                                variants={scaleIn}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="mb-5"
                            >
                                <img
                                    src={artisan.portrait}
                                    alt={artisan.name}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-secondary"
                                />
                            </motion.div>

                            {/* Label */}
                            <motion.p
                                custom={0.5}
                                variants={fadeInUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="text-secondary text-xs tracking-[0.25em] uppercase mb-2"
                            >
                                Featured Artisan
                            </motion.p>

                            {/* Name */}
                            <motion.h3
                                custom={0.6}
                                variants={fadeInUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="font-display text-3xl md:text-4xl text-accent-cream mb-1"
                            >
                                {artisan.name}
                            </motion.h3>

                            <motion.p
                                custom={0.7}
                                variants={fadeInUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="text-accent-cream/60 text-lg mb-3"
                            >
                                {artisan.business}
                            </motion.p>

                            {/* Location */}
                            <motion.div
                                custom={0.75}
                                variants={fadeInUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="flex items-center gap-2 text-accent-cream/50 mb-5"
                            >
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{artisan.location}</span>
                            </motion.div>

                            {/* Quote */}
                            <motion.blockquote
                                custom={0.85}
                                variants={fadeInUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="font-display text-xl text-accent-cream/80 italic mb-5 leading-relaxed"
                            >
                                {artisan.quote}
                            </motion.blockquote>

                            {/* Bio */}
                            <motion.p
                                custom={0.95}
                                variants={fadeInUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="text-accent-cream/60 leading-relaxed mb-6 text-sm"
                            >
                                {artisan.bio}
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                custom={1.05}
                                variants={fadeInUp}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                <Link
                                    to="/artisans/maria-santos"
                                    className="group inline-flex items-center gap-2 text-secondary text-sm tracking-[0.15em] uppercase hover:text-secondary-light transition-colors"
                                >
                                    Meet the Artisan
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArtisanSpotlight;
