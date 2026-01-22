/**
 * ScrollProgress - Reading progress indicator
 * Shows scroll progress at top of page
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = ({ color = 'bg-secondary' }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 h-[3px] ${color} z-[100] origin-left`}
            style={{ scaleX }}
        />
    );
};

/**
 * SectionDivider - Ornate divider between sections
 */
export const SectionDivider = ({ variant = 'default', className = '' }) => {
    const variants = {
        default: (
            <div className={`w-full py-8 flex justify-center ${className}`}>
                <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent" />
            </div>
        ),
        ornate: (
            <div className={`w-full py-8 flex items-center justify-center gap-4 ${className}`}>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-secondary" />
                <span className="text-secondary text-sm">◆</span>
                <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-secondary" />
            </div>
        ),
        line: (
            <div className={`w-full py-12 ${className}`}>
                <div className="w-full h-[1px] bg-white/10" />
            </div>
        ),
    };

    return variants[variant] || variants.default;
};

/**
 * ScrollIndicator - Animated scroll down indicator
 */
export const ScrollIndicator = ({ onClick }) => {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={onClick}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <motion.div
                className="flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <span className="text-accent-cream/60 text-xs tracking-widest uppercase">
                    Scroll
                </span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
            </motion.div>
        </motion.div>
    );
};

export default ScrollProgress;
