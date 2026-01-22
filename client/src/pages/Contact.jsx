import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Mail, Phone, MapPin, Clock, Send, MessageCircle,
    Instagram, Facebook, Twitter, Youtube, ArrowRight, CheckCircle, Sparkles, Loader2
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Contact - Redesigned Contact page with overlapping sections
 * Design: Overlapping cards, smooth transitions, compact design
 */
const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        orderNumber: '',
        message: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post(`${API_URL}/api/email/contact`, {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                orderNumber: formData.orderNumber,
                message: formData.message
            });
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', orderNumber: '', message: '' });
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again or email us directly.');
        } finally {
            setLoading(false);
        }
    };

    const contactMethods = [
        { icon: Mail, label: 'Email Us', value: 'support@artisio.com', description: 'We reply within 24 hours' },
        { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567', description: 'Mon-Fri 9am-6pm EST' },
        { icon: MessageCircle, label: 'Live Chat', value: 'Start a conversation', description: 'Average response: 2 min' },
    ];

    const socialLinks = [
        { icon: Instagram, label: 'Instagram', url: '#' },
        { icon: Facebook, label: 'Facebook', url: '#' },
        { icon: Twitter, label: 'Twitter', url: '#' },
        { icon: Youtube, label: 'YouTube', url: '#' },
    ];

    const businessHours = [
        { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
        { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
        { day: 'Sunday', hours: 'Closed' },
    ];

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0a2525] flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <div className="w-16 h-16 bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-secondary" />
                    </div>
                    <h1 className="font-display text-3xl text-accent-cream italic mb-4">Message Sent!</h1>
                    <p className="text-accent-cream/60 text-sm mb-8">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-3 bg-secondary text-primary-dark text-xs tracking-[0.15em] uppercase hover:bg-secondary-light transition-colors"
                    >
                        Send Another Message
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE]">
            {/* HERO SECTION - Extended to overlap with cards */}
            <section ref={heroRef} className="relative pb-32 overflow-hidden">
                {/* Dark background that extends down */}
                <div className="absolute inset-0 h-[70%]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0a2525]" />

                    {/* Radial glows */}
                    <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] bg-[#1a4545]/40 rounded-full blur-3xl" />

                    {/* Decorative circles */}
                    <div className="absolute top-1/4 right-[15%] w-[200px] h-[200px] border border-secondary/20 rounded-full" />
                    <div className="absolute top-1/3 right-[18%] w-[140px] h-[140px] border border-accent-cream/10 rounded-full" />

                    {/* Diagonal stripes */}
                    <div className="absolute top-0 left-[25%] w-[1px] h-full bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent transform -skew-x-12" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container-custom pt-28 pb-16">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-4"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-secondary/40 text-secondary text-[10px] tracking-[0.2em] uppercase">
                            <Sparkles className="w-3 h-3" />
                            Let's Connect
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="font-display text-5xl md:text-6xl text-white italic leading-[1.1] mb-4"
                    >
                        Get in Touch
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-accent-cream/60 text-sm max-w-md"
                    >
                        We'd love to hear from you. Our team is always here to help with your questions, feedback, or just to chat about artisan food.
                    </motion.p>
                </div>

                {/* OVERLAPPING CONTACT CARDS - Positioned to overlap hero/cream transition */}
                <div className="relative z-20 container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {contactMethods.map((method, index) => (
                            <motion.a
                                key={method.label}
                                href="#"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                className="group bg-white py-4 px-5 shadow-md flex items-center gap-4 border-l-2 border-secondary"
                            >
                                <div className="w-10 h-10 bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary transition-colors">
                                    <method.icon className="w-5 h-5 text-secondary group-hover:text-primary-dark transition-colors" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-medium text-primary-dark">{method.label}</h3>
                                    <p className="text-secondary text-xs truncate">{method.value}</p>
                                    <p className="text-[10px] text-gray-400">{method.description}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT - Split Background that overlaps with hero */}
            <section className="relative -mt-8 overflow-hidden">
                {/* Split Background */}
                <div className="absolute inset-0">
                    {/* Left side - Cream (form) */}
                    <div className="absolute left-0 top-0 w-full lg:w-[55%] h-full bg-[#F5F3EE]" />
                    {/* Right side - Dark (info) */}
                    <div className="absolute right-0 top-0 w-[45%] h-full hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-[#0d2828] to-[#0a2525]" />
                        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-secondary/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 right-16 w-[100px] h-[100px] border border-secondary/15 rounded-full" />
                    </div>
                </div>

                <div className="container-custom relative z-10 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* LEFT - Form (Cream) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-7 lg:pr-12"
                        >
                            <p className="text-secondary text-[10px] tracking-[0.2em] uppercase mb-3">Send a Message</p>
                            <h2 className="font-display text-2xl text-primary-dark italic mb-6">We'd Love to Hear From You</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Your Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-secondary transition-colors text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-secondary transition-colors text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Subject</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-secondary transition-colors text-sm bg-transparent"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="order">Order Issue</option>
                                            <option value="product">Product Question</option>
                                            <option value="subscription">Subscription Inquiry</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Order Number (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="ORD-XXXXX"
                                            value={formData.orderNumber}
                                            onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                                            className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-secondary transition-colors text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[9px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">Your Message</label>
                                    <textarea
                                        className="w-full px-3 py-2.5 border border-gray-200 focus:outline-none focus:border-secondary transition-colors text-sm resize-none"
                                        rows={4}
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-xs">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-secondary text-primary-dark text-xs tracking-[0.15em] uppercase hover:bg-secondary-light transition-colors inline-flex items-center gap-2 group disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* RIGHT - Info (Dark) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-5 lg:pl-8 space-y-6"
                        >
                            {/* Office */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin className="w-4 h-4 text-secondary" />
                                    <h3 className="font-display text-lg text-primary-dark lg:text-accent-cream italic">Our Office</h3>
                                </div>
                                <div className="aspect-[16/10] bg-gray-200 mb-3 overflow-hidden max-w-sm">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764027306087!3d37.75781499662406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1705000000000!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Office Location"
                                    />
                                </div>
                                <div className="text-sm text-gray-600 lg:text-accent-cream/70">
                                    <p className="font-medium text-primary-dark lg:text-accent-cream">ARTISIO Headquarters</p>
                                    <p className="text-xs">123 Artisan Way, Suite 456 • San Francisco, CA 94102</p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="w-4 h-4 text-secondary" />
                                    <h3 className="font-display text-lg text-primary-dark lg:text-accent-cream italic">Business Hours</h3>
                                </div>
                                <div className="space-y-1.5 text-xs">
                                    {businessHours.map((item) => (
                                        <div key={item.day} className="flex justify-between">
                                            <span className="text-gray-500 lg:text-accent-cream/50">{item.day}</span>
                                            <span className="text-primary-dark lg:text-accent-cream">{item.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-secondary" />
                                    <h3 className="font-display text-lg text-primary-dark lg:text-accent-cream italic">Follow Us</h3>
                                </div>
                                <p className="text-xs text-gray-500 lg:text-accent-cream/50 mb-3">Stay connected for updates and artisan spotlights.</p>
                                <div className="flex gap-2">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.url}
                                            className="w-8 h-8 border border-gray-200 lg:border-accent-cream/20 flex items-center justify-center text-gray-400 lg:text-accent-cream/50 hover:bg-secondary hover:text-primary-dark hover:border-secondary transition-all"
                                            aria-label={social.label}
                                        >
                                            <social.icon className="w-4 h-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA - Smooth blend with main section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0d2828]" />
                <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-3xl" />

                <div className="container-custom relative z-20">
                    <div className="max-w-xl mx-auto text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary text-[10px] tracking-[0.3em] uppercase mb-3"
                        >
                            Prefer Email?
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-2xl md:text-3xl text-accent-cream italic mb-3"
                        >
                            Reach Out Directly
                        </motion.h2>
                        <motion.a
                            href="mailto:hello@artisio.com"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-secondary text-secondary text-xs tracking-[0.15em] uppercase hover:bg-secondary hover:text-primary-dark transition-colors group"
                        >
                            hello@artisio.com
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
