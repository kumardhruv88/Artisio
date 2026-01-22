import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Leaf, Users, Award, ArrowRight } from 'lucide-react';

/**
 * About - About Us page
 * Design: Lumière-inspired with split staggered images like CategoryShowcase
 */
const About = () => {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    // Parallax for hero images
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start end", "end start"]
    });
    const y1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);

    const values = [
        { icon: Heart, title: 'Passion', desc: 'Every product tells a story of dedication and craft' },
        { icon: Leaf, title: 'Sustainability', desc: 'Committed to ethical sourcing and eco-friendly practices' },
        { icon: Users, title: 'Community', desc: 'Supporting artisan families and local economies' },
        { icon: Award, title: 'Quality', desc: 'Only the finest handcrafted products make our collection' },
    ];

    const stats = [
        { value: '15+', label: 'Years' },
        { value: '50+', label: 'Artisans' },
    ];

    const team = [
        { name: 'Sarah Mitchell', role: 'Founder & CEO', desc: 'Former chef with a passion for artisan foods' },
        { name: 'David Chen', role: 'Head of Sourcing', desc: 'Travels the world discovering hidden gems' },
        { name: 'Maria Santos', role: 'Customer Experience', desc: 'Ensuring every order brings joy' },
    ];

    // Hero images for staggered layout
    const heroImages = [
        {
            src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop',
            alt: 'Artisan jewelry',
            offset: 'mt-[15%]',
            motion: y1,
        },
        {
            src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=600&fit=crop',
            alt: 'Gold accessories',
            offset: 'mt-[8%]',
            motion: y2,
        },
        {
            src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop',
            alt: 'Luxury crafts',
            offset: 'mt-[22%]',
            motion: y3,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F5F3EE]">
            {/* HERO SECTION - Split Layout with Staggered Images */}
            <section ref={heroRef} className="relative min-h-screen overflow-hidden">
                <div className="container-custom h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen gap-8 lg:gap-0">
                        {/* Left Content Side */}
                        <div className="flex flex-col justify-center py-24 lg:py-32 lg:pr-12 relative z-10">
                            {/* Decorative Line */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isHeroInView ? { width: '50px' } : {}}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="h-[1px] bg-[#8B3A62] mb-8"
                            />

                            {/* EST Tag */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 }}
                                className="text-[#8B3A62] text-[10px] tracking-[0.3em] uppercase mb-8 font-body font-medium"
                            >
                                EST. 2018
                            </motion.p>

                            {/* Main Heading - Lumière style */}
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="font-display text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] text-[#1a1a1a] leading-[1.05] mb-1 font-normal"
                            >
                                Curated for the
                            </motion.h1>
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="font-display text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] text-[#8B3A62] italic leading-[1.05] mb-10"
                            >
                                Modern Connoisseur.
                            </motion.h1>

                            {/* Description Paragraphs */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={isHeroInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.7 }}
                                className="text-[#555555] text-[15px] leading-[1.8] mb-5 max-w-[420px]"
                            >
                                <span className="font-semibold text-[#1a1a1a]">Artisio</span> represents the intersection of timeless elegance and contemporary design. We believe that true luxury lies not in excess, but in the intentional curation of beauty.
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={isHeroInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.8 }}
                                className="text-[#555555] text-[15px] leading-[1.8] mb-12 max-w-[420px]"
                            >
                                Each piece in our collection is a testament to the mastery of our artisans. Sourced from the finest ateliers around the world, our products are crafted to be more than just objects—they are enduring companions for your journey.
                            </motion.p>

                            {/* Stats Row */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 1 }}
                                className="flex gap-12 border-t border-[#e0ddd6] pt-8"
                            >
                                {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <p className="font-display text-[2.5rem] text-[#1a1a1a] italic leading-none">{stat.value}</p>
                                        <p className="text-[11px] text-[#888888] tracking-[0.15em] uppercase mt-2">{stat.label}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right Side - Staggered Images like CategoryShowcase */}
                        <div className="relative hidden lg:flex items-start justify-end gap-3 pt-20 pb-10 -mr-8">
                            {heroImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    style={{ y: image.motion }}
                                    initial={{ opacity: 0, y: 60 }}
                                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 + index * 0.15, duration: 0.8 }}
                                    className={`flex-1 ${image.offset} max-w-[180px]`}
                                >
                                    <div className="relative overflow-hidden h-[55vh] group">
                                        <motion.img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        {/* Subtle gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile: Single elegant image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isHeroInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.6 }}
                            className="lg:hidden h-[40vh] -mx-6 mb-8"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop"
                                alt="Artisan products"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STORY SECTION - Split Layout */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute left-0 top-0 w-full lg:w-1/2 h-full bg-[#F5F3EE]" />
                    <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-[#0d2828] to-[#0a2525]" />
                    </div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-[#8B3A62] text-[10px] tracking-[0.25em] uppercase mb-4 font-medium">How It Started</p>
                            <h2 className="font-display text-3xl text-primary-dark italic mb-6">From Kitchen to Community</h2>
                            <p className="text-[#555555] text-[15px] mb-5 leading-[1.8]">
                                It all began with a simple belief: that food should tell a story. Our founder, Sarah, spent years as a chef before realizing that the most memorable meals came from ingredients made with love and tradition.
                            </p>
                            <p className="text-[#555555] text-[15px] mb-8 leading-[1.8]">
                                She set out to find artisans who shared this philosophy—small-batch producers, family farms, and craftspeople who poured their hearts into every product. ARTISIO became the bridge connecting these makers with people who truly appreciate their craft.
                            </p>
                            <Link
                                to="/artisans"
                                className="inline-flex items-center gap-2 text-[#8B3A62] text-[11px] tracking-[0.2em] uppercase font-medium hover:gap-3 transition-all"
                            >
                                Meet Our Artisans
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:pl-16"
                        >
                            <div className="bg-white/5 lg:bg-transparent p-8 lg:p-0">
                                <p className="text-secondary text-[10px] tracking-[0.25em] uppercase mb-4 font-medium">Our Mission</p>
                                <h2 className="font-display text-3xl text-primary-dark lg:text-accent-cream italic mb-6">Celebrating Craft</h2>
                                <p className="text-[#555555] lg:text-accent-cream/70 text-[15px] leading-[1.8]">
                                    We believe every artisan product carries the soul of its maker. Our mission is to preserve these traditions, support small producers, and bring you foods that transform everyday moments into extraordinary experiences.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* VALUES SECTION */}
            <section className="py-24 bg-[#F5F3EE]">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-[#8B3A62] text-[10px] tracking-[0.25em] uppercase mb-4 font-medium">What We Stand For</p>
                        <h2 className="font-display text-3xl text-primary-dark italic">Our Values</h2>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-14 h-14 bg-[#8B3A62]/10 flex items-center justify-center mx-auto mb-5">
                                    <value.icon className="w-6 h-6 text-[#8B3A62]" />
                                </div>
                                <h3 className="font-medium text-primary-dark mb-2 text-[15px]">{value.title}</h3>
                                <p className="text-[13px] text-[#777777] leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS SECTION - Dark */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0d2828]" />
                <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl" />

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { value: '150+', label: 'Artisan Partners' },
                            { value: '25K+', label: 'Happy Customers' },
                            { value: '500+', label: 'Unique Products' },
                            { value: '12', label: 'Countries Sourced' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <p className="font-display text-4xl lg:text-5xl text-secondary italic mb-3">{stat.value}</p>
                                <p className="text-accent-cream/60 text-[11px] tracking-[0.15em] uppercase">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM SECTION */}
            <section className="py-24 bg-[#F5F3EE]">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-[#8B3A62] text-[10px] tracking-[0.25em] uppercase mb-4 font-medium">The People Behind ARTISIO</p>
                        <h2 className="font-display text-3xl text-primary-dark italic">Meet Our Team</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-28 h-28 bg-gradient-to-br from-primary-dark to-[#1a4545] mx-auto mb-5 flex items-center justify-center">
                                    <span className="font-display text-2xl text-secondary italic">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="font-medium text-primary-dark mb-1 text-[15px]">{member.name}</h3>
                                <p className="text-[#8B3A62] text-[12px] mb-2 tracking-wide">{member.role}</p>
                                <p className="text-[13px] text-[#777777]">{member.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0d2828]" />
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl" />

                <div className="container-custom relative z-10 text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary text-[10px] tracking-[0.3em] uppercase mb-4 font-medium"
                    >
                        Start Your Journey
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-3xl md:text-4xl text-accent-cream italic mb-8"
                    >
                        Discover Artisan Excellence
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-4 justify-center"
                    >
                        <Link
                            to="/products"
                            className="px-10 py-4 bg-secondary text-primary-dark text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-secondary-light transition-colors"
                        >
                            Shop Now
                        </Link>
                        <Link
                            to="/subscription"
                            className="px-10 py-4 border border-secondary text-secondary text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-secondary hover:text-primary-dark transition-colors"
                        >
                            Subscribe
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
