/**
 * Hero - Adachi-style full-screen image with slow-motion text reveal
 * Large text lines appear one by one with elegant animation
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
    // Text lines that appear one by one (like "JAPANESE INSPIRED CUISINE")
    const heroLines = ['ARTISAN', 'CRAFTED', 'EXCELLENCE'];

    // Slow motion line reveal animation
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.4, // Delay between each line
                delayChildren: 0.5,
            },
        },
    };

    const lineVariants = {
        hidden: {
            opacity: 0,
            y: 80,
            clipPath: 'inset(100% 0 0 0)',
        },
        visible: {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            transition: {
                duration: 1.2,
                ease: [0.19, 1, 0.22, 1], // Expo out
            },
        },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
        },
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Full-screen Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920"
                    alt="Artisan food spread"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary-dark/50 to-transparent" />
            </div>

            {/* Left Side Content */}
            <div className="container-custom relative z-10 py-20">
                <div className="max-w-3xl">
                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-secondary text-sm md:text-base tracking-[0.3em] uppercase mb-6"
                    >
                        Premium Artisan Foods & Beverages
                    </motion.p>

                    {/* Large Text Lines - Slow Motion Reveal */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-10"
                    >
                        {heroLines.map((line, index) => (
                            <div key={index} className="overflow-hidden">
                                <motion.h1
                                    variants={lineVariants}
                                    className="font-display text-[4rem] md:text-[7rem] lg:text-[9rem] text-accent-cream leading-[0.9] tracking-tight"
                                    style={{ fontWeight: 400 }}
                                >
                                    {line}
                                </motion.h1>
                            </div>
                        ))}
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 2 }}
                        className="text-accent-cream/70 text-lg md:text-xl max-w-lg mb-8"
                    >
                        Discover exceptional handcrafted foods from passionate artisans around the world.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.3, duration: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            to="/products"
                            className="px-8 py-4 bg-secondary text-primary-dark text-sm tracking-wider uppercase font-medium hover:bg-secondary-light transition-all"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/artisans"
                            className="px-8 py-4 border border-accent-cream/40 text-accent-cream text-sm tracking-wider uppercase hover:bg-accent-cream hover:text-primary-dark transition-all"
                        >
                            Our Artisans
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Vertical Side Text (like Adachi) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20"
            >
                <div className="w-[1px] h-16 bg-secondary/50" />
                <span
                    className="text-accent-cream/60 text-xs tracking-widest"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    A R T I S I O
                </span>
                <div className="w-[1px] h-16 bg-secondary/50" />
            </motion.div>

            {/* Social Icons (like Adachi bottom-left) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
                className="absolute left-6 bottom-8 hidden lg:flex flex-col gap-4 z-20"
            >
                <a href="#" className="text-accent-cream/60 hover:text-secondary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                    </svg>
                </a>
                <a href="#" className="text-accent-cream/60 hover:text-secondary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-accent-cream/50 text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
