import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import Button from '@components/common/Button';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setEmail('');

            // Reset after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 3000);
        }, 1000);
    };

    return (
        <section className="py-16 bg-primary text-white">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6">
                            <Mail className="w-8 h-8" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Stay in the Loop
                        </h2>
                        <p className="text-lg text-white/90 mb-8">
                            Get exclusive deals, new product alerts, and artisan stories delivered to your inbox
                        </p>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1 relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            className="w-full pl-12 pr-4 py-3 rounded-lg text-neutral-darkGray focus:outline-none focus:ring-2 focus:ring-secondary"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        size="lg"
                                        loading={isLoading}
                                        disabled={isLoading}
                                    >
                                        Subscribe
                                    </Button>
                                </div>
                                <p className="text-sm text-white/70 mt-4">
                                    Join 50,000+ subscribers. Unsubscribe anytime.
                                </p>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center"
                            >
                                <CheckCircle className="w-16 h-16 text-secondary mb-4" />
                                <h3 className="text-2xl font-serif font-bold mb-2">
                                    You're All Set!
                                </h3>
                                <p className="text-white/90">
                                    Check your inbox for a welcome message
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
