/**
 * Testimonials - Adachi-style feedback cards with split background
 * 3-4 cards with customer reviews, cream/dark split bg
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Food Blogger',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
            content: 'ARTISIO has completely transformed my kitchen! The quality of artisan products is unmatched, and knowing the story behind each item makes every meal special.',
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Home Chef',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
            content: 'As a chef, I appreciate the authenticity and craftsmanship. Every product tells a story, and the taste speaks for itself.',
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Coffee Enthusiast',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
            content: 'The subscription box is amazing! I discover new artisans every month, and the customer service is exceptional.',
        },
    ];

    // Animation variants
    const titleVariants = {
        hidden: { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            transition: { duration: 1, delay: i * 0.15, ease: [0.19, 1, 0.22, 1] }
        })
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.19, 1, 0.22, 1] }
        })
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {/* Split Background - Cream top, Dark bottom */}
            <div className="absolute inset-0">
                <div className="h-[40%] bg-[#F5F3EE]" />
                <div className="h-[60%] bg-primary-dark" />
            </div>

            <div className="relative z-10 py-20">
                {/* Title Section - In cream area */}
                <div className="container-custom text-center mb-16">
                    <div className="overflow-hidden">
                        <motion.h2
                            custom={0}
                            variants={titleVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-dark italic mb-4"
                        >
                            What Our Customers Say
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="text-primary-dark/60 text-lg"
                    >
                        Join thousands of satisfied food lovers
                    </motion.p>
                </div>

                {/* Testimonial Cards */}
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                className="bg-[#3A4A4A] p-8 relative group hover:-translate-y-2 transition-transform duration-300"
                            >
                                {/* Quote Icon */}
                                <Quote className="w-10 h-10 text-secondary mb-6" />

                                {/* Testimonial Content */}
                                <p className="text-accent-cream/80 text-lg leading-relaxed mb-8 font-display italic">
                                    "{testimonial.content}"
                                </p>

                                {/* Customer Info */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-secondary"
                                    />
                                    <div>
                                        <h4 className="text-secondary font-semibold tracking-wider uppercase text-sm">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-accent-cream/50 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>

                                {/* Decorative corner */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
