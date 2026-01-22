/**
 * PageLoader - Elegant loading screen
 * Shows on initial page load with logo animation
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ isLoading = true }) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[10000] bg-primary-dark flex items-center justify-center"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark opacity-50" />

                    {/* Logo container */}
                    <div className="relative z-10 text-center">
                        {/* Animated logo */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.19, 1, 0.22, 1],
                            }}
                            className="mb-8"
                        >
                            <motion.h1
                                className="font-accent text-4xl md:text-5xl text-secondary tracking-widest"
                                animate={{
                                    opacity: [1, 0.6, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            >
                                ARTISIO
                            </motion.h1>
                        </motion.div>

                        {/* Loading bar */}
                        <div className="w-48 h-[2px] bg-white/10 mx-auto overflow-hidden">
                            <motion.div
                                className="h-full bg-secondary"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-6 text-accent-cream/60 text-sm tracking-wider uppercase"
                        >
                            Curating Artisan Excellence
                        </motion.p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Corner accents */}
                        <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-secondary/20" />
                        <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-secondary/20" />
                        <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-secondary/20" />
                        <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-secondary/20" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;
