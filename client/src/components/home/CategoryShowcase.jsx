/**
 * CategoryShowcase - Exact Adachi "View Our Menu" style
 * Soft beige text visible on cream background, staggered images
 */

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoryShowcase = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    // Parallax
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Categories with artistic stagger - BIGGER images, less margin
    const categories = [
        {
            id: 1,
            name: 'COFFEE & TEA',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
            topOffset: 'mt-[12%]',
            motionY: y1,
        },
        {
            id: 2,
            name: 'CHOCOLATES',
            image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500',
            topOffset: 'mt-[22%]',
            motionY: y2,
        },
        {
            id: 3,
            name: 'BEVERAGES',
            image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500',
            topOffset: 'mt-[18%]',
            motionY: y1,
        },
        {
            id: 4,
            name: 'HAPPY HOUR',
            image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500',
            topOffset: 'mt-[8%]',
            motionY: y2,
        },
        {
            id: 5,
            name: 'DESSERTS',
            image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500',
            topOffset: 'mt-[15%]',
            motionY: y1,
        },
    ];

    // Text animation
    const textVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-[75vh] bg-[#F5F3EE] overflow-visible"
        >
            {/* HUGE Background Text - Soft taupe/beige color like Adachi */}
            <div className="absolute top-[8%] left-0 right-0 z-20 pointer-events-none">
                <motion.h2
                    variants={textVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="font-display text-[14vw] md:text-[11vw] italic leading-[0.9] text-center whitespace-nowrap"
                    style={{
                        color: '#D4CFC5', // Soft taupe/beige - visible on cream
                    }}
                >
                    Shop by Category
                </motion.h2>
            </div>

            {/* Staggered Images - overlap into next section */}
            <div className="relative z-10 container-custom pt-[5vh] -mb-20">
                <div className="flex gap-2 md:gap-4 h-[85vh]">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            style={{ y: category.motionY }}
                            initial={{ opacity: 0, y: 80 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                            className={`flex-1 ${category.topOffset}`}
                        >
                            <Link to={`/products?category=${category.id}`} className="block h-full group">
                                <div className="relative h-full overflow-hidden">
                                    <motion.img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                    />

                                    {/* Dark gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                    {/* Category Label */}
                                    <div className="absolute bottom-4 left-2 right-2 text-center">
                                        <span className="text-white text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium">
                                            {category.name}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
