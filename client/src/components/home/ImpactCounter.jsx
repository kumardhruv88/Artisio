/**
 * ImpactCounter - Images pop from left and right, overlapping artistic layout
 * 2 from left, 2 from right, big overlapping images
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ImpactCounter = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    const [counts, setCounts] = useState({
        trees: 0,
        artisans: 0,
        orders: 0,
        donated: 0,
    });

    const targets = {
        trees: 12543,
        artisans: 156,
        orders: 48921,
        donated: 25000,
    };

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
                trees: Math.floor(targets.trees * progress),
                artisans: Math.floor(targets.artisans * progress),
                orders: Math.floor(targets.orders * progress),
                donated: Math.floor(targets.donated * progress),
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setCounts(targets);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isInView]);

    // Title animation
    const titleVariants = {
        hidden: { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            transition: { duration: 1, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }
        })
    };

    // Images slide from left/right
    const fromLeft = {
        hidden: { opacity: 0, x: -150 },
        visible: (delay) => ({
            opacity: 1,
            x: 0,
            transition: { duration: 1, delay, ease: [0.19, 1, 0.22, 1] }
        })
    };

    const fromRight = {
        hidden: { opacity: 0, x: 150 },
        visible: (delay) => ({
            opacity: 1,
            x: 0,
            transition: { duration: 1, delay, ease: [0.19, 1, 0.22, 1] }
        })
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {/* Split Background - Cream top, Dark bottom - Matching Testimonials */}
            <div className="absolute inset-0">
                <div className="h-[40%] bg-[#F5F3EE]" />
                <div className="h-[60%] bg-primary-dark" />
            </div>

            {/* Title at Top - Center - Adjusted Text Color for Cream Background */}
            <div className="text-center pt-20 pb-12 relative z-20">
                <div className="overflow-hidden">
                    <motion.h2
                        custom={0}
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-dark italic"
                    >
                        Our Impact
                    </motion.h2>
                </div>
                <div className="overflow-hidden">
                    <motion.h2
                        custom={1}
                        variants={titleVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="font-display text-4xl md:text-6xl lg:text-7xl text-secondary italic"
                    >
                        Together
                    </motion.h2>
                </div>
            </div>

            {/* Big Overlapping Images - 2 from left, 2 from right */}
            <div className="container-custom relative h-[600px] md:h-[700px]">
                {/* Image 1 - Trees - From Left, top-left */}
                <motion.div
                    custom={0.4}
                    variants={fromLeft}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="absolute left-0 top-0 w-[42%] md:w-[38%] h-[48%] z-10"
                >
                    <div className="relative h-full overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800"
                            alt="Trees Planted"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="font-display text-3xl md:text-4xl text-white">
                                {counts.trees.toLocaleString()}
                            </span>
                            <p className="text-accent-cream/70 text-xs tracking-wider uppercase mt-1">Trees Planted</p>
                        </div>
                    </div>
                </motion.div>

                {/* Image 2 - Artisans - From Left, bottom-left */}
                <motion.div
                    custom={0.6}
                    variants={fromLeft}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="absolute left-[5%] md:left-[8%] bottom-[8%] w-[44%] md:w-[40%] h-[48%] z-20"
                >
                    <div className="relative h-full overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
                            alt="Artisans Supported"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="font-display text-3xl md:text-4xl text-white">
                                {counts.artisans.toLocaleString()}
                            </span>
                            <p className="text-accent-cream/70 text-xs tracking-wider uppercase mt-1">Artisans Supported</p>
                        </div>
                    </div>
                </motion.div>

                {/* Image 3 - Orders - From Right, top-right */}
                <motion.div
                    custom={0.5}
                    variants={fromRight}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="absolute right-[5%] top-0 w-[42%] md:w-[38%] h-[48%] z-10"
                >
                    <div className="relative h-full overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800"
                            alt="Orders Delivered"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="font-display text-3xl md:text-4xl text-white">
                                {counts.orders.toLocaleString()}
                            </span>
                            <p className="text-accent-cream/70 text-xs tracking-wider uppercase mt-1">Orders Delivered</p>
                        </div>
                    </div>
                </motion.div>

                {/* Image 4 - Donated - From Right, bottom-right */}
                <motion.div
                    custom={0.7}
                    variants={fromRight}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="absolute right-0 bottom-[8%] w-[44%] md:w-[40%] h-[48%] z-20"
                >
                    <div className="relative h-full overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800"
                            alt="Donated"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="font-display text-3xl md:text-4xl text-white">
                                ${counts.donated.toLocaleString()}
                            </span>
                            <p className="text-accent-cream/70 text-xs tracking-wider uppercase mt-1">Donated</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom tagline */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="text-center pb-16 relative z-30"
            >
                <p className="text-accent-cream/60 text-lg">
                    <span className="text-secondary">Sustainability is at our core.</span>{' '}
                    For every order, we plant a tree.
                </p>
            </motion.div>
        </section>
    );
};

export default ImpactCounter;
