import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, MapPin, Package, Sparkles } from 'lucide-react';

/**
 * Shipping - Shipping Information page
 */
const Shipping = () => {
    const shippingOptions = [
        { icon: Truck, title: 'Standard Shipping', time: '3-5 Business Days', price: 'Free over $50', desc: 'Perfect for planned purchases' },
        { icon: Clock, title: 'Express Shipping', time: '1-2 Business Days', price: '$15', desc: 'When you need it faster' },
        { icon: MapPin, title: 'Local Pickup', time: 'Same Day', price: 'Free', desc: 'Collect from our SF location' },
    ];

    const zones = [
        { region: 'Continental US', standard: '3-5 days', express: '1-2 days' },
        { region: 'Alaska & Hawaii', standard: '5-7 days', express: '2-3 days' },
        { region: 'Canada', standard: '7-10 days', express: '3-5 days' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F3EE]">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a2020] via-primary-dark to-[#0a2525]" />
                <div className="absolute top-0 right-[20%] w-[300px] h-[300px] bg-secondary/15 rounded-full blur-3xl" />

                <div className="container-custom relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 border border-secondary/40 text-secondary text-[10px] tracking-[0.2em] uppercase mb-4"
                    >
                        <Sparkles className="w-3 h-3" />
                        Delivery
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-5xl text-white italic"
                    >
                        Shipping Information
                    </motion.h1>
                </div>
            </section>

            {/* Shipping Options */}
            <section className="py-16">
                <div className="container-custom">
                    <h2 className="font-display text-2xl text-primary-dark italic mb-8 text-center">Delivery Options</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {shippingOptions.map((option, index) => (
                            <motion.div
                                key={option.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 border-l-2 border-secondary"
                            >
                                <option.icon className="w-6 h-6 text-secondary mb-4" />
                                <h3 className="font-medium text-primary-dark mb-1">{option.title}</h3>
                                <p className="text-secondary text-sm mb-1">{option.time}</p>
                                <p className="text-xs text-gray-500 mb-2">{option.price}</p>
                                <p className="text-xs text-gray-400">{option.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zones Table */}
            <section className="py-16 bg-white">
                <div className="container-custom max-w-3xl">
                    <h2 className="font-display text-2xl text-primary-dark italic mb-8 text-center">Shipping Zones</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 text-gray-500 font-normal text-xs uppercase tracking-wider">Region</th>
                                    <th className="text-left py-3 text-gray-500 font-normal text-xs uppercase tracking-wider">Standard</th>
                                    <th className="text-left py-3 text-gray-500 font-normal text-xs uppercase tracking-wider">Express</th>
                                </tr>
                            </thead>
                            <tbody>
                                {zones.map((zone) => (
                                    <tr key={zone.region} className="border-b border-gray-100">
                                        <td className="py-4 text-primary-dark">{zone.region}</td>
                                        <td className="py-4 text-gray-600">{zone.standard}</td>
                                        <td className="py-4 text-gray-600">{zone.express}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Additional Info */}
            <section className="py-16">
                <div className="container-custom max-w-3xl">
                    <h2 className="font-display text-2xl text-primary-dark italic mb-8 text-center">Good to Know</h2>
                    <div className="space-y-4 text-sm text-gray-600">
                        <div className="bg-white p-4">
                            <h3 className="font-medium text-primary-dark mb-2">Order Processing</h3>
                            <p>Orders placed before 2 PM EST are processed the same day. Weekend orders ship Monday.</p>
                        </div>
                        <div className="bg-white p-4">
                            <h3 className="font-medium text-primary-dark mb-2">Tracking</h3>
                            <p>You'll receive a tracking number via email once your order ships.</p>
                        </div>
                        <div className="bg-white p-4">
                            <h3 className="font-medium text-primary-dark mb-2">Perishables</h3>
                            <p>Temperature-sensitive items ship with insulated packaging and ice packs.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shipping;
