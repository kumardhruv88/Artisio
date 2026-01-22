/**
 * FeaturedProducts - Adachi-style with 2 BIG artistic images
 * Large overlapping images placed like an artist
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Parallax for images
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);

    // Text animation
    const textVariants = {
        hidden: { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            transition: { duration: 1.2, delay: i * 0.25, ease: [0.19, 1, 0.22, 1] }
        })
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-primary-dark overflow-hidden"
        >
            {/* Left Black Panel */}
            <div className="absolute top-0 left-0 w-[35%] h-full bg-[#0a1f1f] z-0" />

            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Main Content Area */}
                <div className="flex-1 relative">

                    {/* BIG IMAGE 1 - Main center image (like the cocktails in Adachi) */}
                    <motion.div
                        style={{ y: y1 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute top-[8%] left-[25%] w-[55%] z-20"
                    >
                        <div className="relative overflow-hidden shadow-2xl">
                            <motion.img
                                src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200"
                                alt="Artisan Cocktails"
                                className="w-full h-auto object-cover"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.6 }}
                            />
                        </div>
                    </motion.div>

                    {/* BIG IMAGE 2 - Bottom right (like the dish in Adachi) */}
                    <motion.div
                        style={{ y: y2 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                        className="absolute bottom-[5%] right-[5%] w-[35%] z-30"
                    >
                        <div className="relative overflow-hidden shadow-2xl">
                            <motion.img
                                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800"
                                alt="Gourmet Dish"
                                className="w-full h-auto object-cover"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.6 }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Text at Bottom Left - Over the dark panel */}
                <div className="absolute bottom-[15%] left-[5%] z-40 max-w-lg">
                    <div className="overflow-hidden">
                        <motion.h2
                            custom={0}
                            variants={textVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="font-display text-5xl md:text-7xl lg:text-8xl text-accent-cream/80 italic leading-[0.95]"
                        >
                            Stylish and
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h2
                            custom={1}
                            variants={textVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="font-display text-5xl md:text-7xl lg:text-8xl text-accent-cream/80 italic leading-[0.95]"
                        >
                            Flavorful
                        </motion.h2>
                    </div>

                    {/* CTA Link */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="mt-8"
                    >
                        <Link
                            to="/products"
                            className="group inline-flex items-center gap-3 text-secondary text-sm tracking-[0.2em] uppercase hover:text-secondary-light transition-colors"
                        >
                            Explore Our Collection
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
