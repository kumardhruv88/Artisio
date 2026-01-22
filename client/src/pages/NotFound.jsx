import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

/**
 * NotFound - 404 Error page
 */
const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0a2525] flex items-center justify-center p-8">
            {/* Background elements */}
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#1a4545]/30 rounded-full blur-3xl" />

            {/* Decorative circles */}
            <div className="absolute top-1/3 left-[20%] w-[150px] h-[150px] border border-secondary/10 rounded-full" />
            <div className="absolute bottom-1/3 right-[20%] w-[200px] h-[200px] border border-accent-cream/5 rounded-full" />

            <div className="relative z-10 text-center max-w-lg">
                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="font-display text-[120px] md:text-[180px] text-secondary/20 italic leading-none">
                        404
                    </span>
                </motion.div>

                {/* Message */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-3xl md:text-4xl text-accent-cream italic -mt-12 mb-4"
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-accent-cream/60 text-sm mb-8"
                >
                    The page you're looking for seems to have wandered off. Let's get you back on track.
                </motion.p>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-primary-dark text-xs tracking-[0.15em] uppercase hover:bg-secondary-light transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-secondary text-secondary text-xs tracking-[0.15em] uppercase hover:bg-secondary hover:text-primary-dark transition-colors"
                    >
                        <Search className="w-4 h-4" />
                        Browse Products
                    </Link>
                </motion.div>

                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 text-accent-cream/40 text-xs hover:text-secondary transition-colors mt-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Go Back
                </motion.button>
            </div>
        </div>
    );
};

export default NotFound;
