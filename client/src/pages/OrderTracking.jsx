/**
 * OrderTracking - Premium Order Tracking Page (Light Theme)
 * Compact, clean styling matching ARTISIO website
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Package, Truck, CheckCircle, MapPin, Search,
    Loader, Clock, Box, Home, ShoppingBag, ArrowLeft, Phone
} from 'lucide-react';
import { orderAPI } from '@/services/orderAPI';

const OrderTracking = () => {
    const { orderId } = useParams();
    const [orderNumber, setOrderNumber] = useState(orderId || '');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (orderId) handleTrackOrder(orderId);
    }, [orderId]);

    const generateTimeline = (orderData) => {
        const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
        const currentIndex = statusOrder.indexOf(orderData.status);
        const icons = { pending: ShoppingBag, confirmed: CheckCircle, processing: Box, shipped: Truck, delivered: Home };
        return [
            { status: 'pending', label: 'Placed', date: orderData.createdAt ? new Date(orderData.createdAt).toLocaleDateString() : '', completed: currentIndex >= 0, icon: icons.pending },
            { status: 'confirmed', label: 'Confirmed', date: '', completed: currentIndex >= 1, current: currentIndex === 1, icon: icons.confirmed },
            { status: 'processing', label: 'Processing', date: '', completed: currentIndex >= 2, current: currentIndex === 2, icon: icons.processing },
            { status: 'shipped', label: 'Shipped', date: '', completed: currentIndex >= 3, current: currentIndex === 3, icon: icons.shipped },
            { status: 'delivered', label: 'Delivered', date: orderData.deliveredAt ? new Date(orderData.deliveredAt).toLocaleDateString() : '', completed: currentIndex >= 4, current: currentIndex === 4, icon: icons.delivered },
        ];
    };

    const handleTrackOrder = async (id) => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await orderAPI.trackOrder(id);
            if (response.success && response.data) {
                setOrder(response.data);
                if (!orderNumber) setOrderNumber(id);
            } else {
                setError('Order not found');
                setOrder(null);
            }
        } catch (err) {
            setError('Order not found. Tracking may take a few minutes to appear.');
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (orderNumber.trim()) handleTrackOrder(orderNumber.trim());
    };

    const displayOrder = order ? {
        id: order.orderNumber || order._id,
        status: order.status || 'processing',
        estimatedDelivery: order.estimatedDelivery
            ? new Date(order.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            : '5-7 business days',
        carrier: order.carrier || 'ARTISIO Express',
        trackingNumber: order.trackingNumber || 'Pending',
        deliveryAddress: order.shippingAddress || {},
        items: order.items || [],
        timeline: generateTimeline(order),
        total: order.total || 0,
    } : null;

    return (
        <div className="min-h-screen bg-[#fcfbf9] py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <Link to="/products" className="inline-flex items-center gap-1 text-gray-400 hover:text-[#1a3a3a] text-xs mb-6 transition-colors">
                    <ArrowLeft size={14} /> Back to Shop
                </Link>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-[#1a3a3a] italic mb-1">Track Your <span className="text-[#D4AF37]">Order</span></h1>
                    <p className="text-gray-500 text-xs">Enter your order number to see real-time status</p>
                </motion.div>

                {/* Search */}
                <div className="mb-10 max-w-md mx-auto">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            className="w-full pl-10 pr-24 py-3 bg-white border border-gray-200 focus:border-[#D4AF37] rounded-full outline-none transition-all text-sm"
                            placeholder="Order Number (e.g., ART-10001)"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#1a3a3a] text-white px-5 py-2 rounded-full text-xs font-medium hover:bg-black transition-colors"
                        >
                            {loading ? <Loader className="w-3 h-3 animate-spin" /> : 'Track'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
                </div>

                {displayOrder && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        {/* Status Banner */}
                        <div className="bg-[#1a3a3a] text-white p-4 md:p-5 rounded-xl">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-[#D4AF37]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-white/60 text-[10px] uppercase tracking-wider">Order #{displayOrder.id}</span>
                                            <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">{displayOrder.status}</span>
                                        </div>
                                        <h2 className="text-lg font-serif italic">{displayOrder.status === 'delivered' ? 'Delivered!' : displayOrder.status === 'shipped' ? 'On The Way' : 'Order Confirmed'}</h2>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg text-right">
                                    <p className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-wider mb-0.5">Estimated Delivery</p>
                                    <p className="text-sm font-medium">{displayOrder.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Timeline & Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {/* Progress */}
                                <div className="bg-white rounded-xl border border-gray-100 p-4">
                                    <h3 className="text-sm font-medium text-[#1a3a3a] mb-5">Tracking Progress</h3>
                                    <div className="flex justify-between items-start relative">
                                        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-100 -z-0">
                                            <div className="h-full bg-[#D4AF37]" style={{ width: `${(displayOrder.timeline.filter(s => s.completed).length - 1) / (displayOrder.timeline.length - 1) * 100}%` }} />
                                        </div>
                                        {displayOrder.timeline.map((step, i) => {
                                            const Icon = step.icon;
                                            return (
                                                <div key={step.status} className="flex flex-col items-center relative z-10">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${step.completed ? 'bg-[#D4AF37]' : 'bg-gray-100'} ${step.current ? 'ring-2 ring-[#D4AF37] ring-offset-2' : ''}`}>
                                                        <Icon size={14} className={step.completed ? 'text-white' : 'text-gray-400'} />
                                                    </div>
                                                    <p className={`text-[10px] mt-2 text-center ${step.completed ? 'text-[#1a3a3a] font-medium' : 'text-gray-400'}`}>{step.label}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                                        <h3 className="text-sm font-medium text-[#1a3a3a]">Order Items</h3>
                                        <span className="text-xs text-[#D4AF37] font-medium">${displayOrder.total.toFixed(2)}</span>
                                    </div>
                                    <div className="divide-y divide-gray-50">
                                        {displayOrder.items.map((item, i) => (
                                            <div key={i} className="p-3 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                                                    {item.image && <img src={item.image} alt="" className="w-full h-full object-cover" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-medium text-[#1a3a3a] truncate">{item.name}</p>
                                                    <p className="text-[10px] text-gray-400">Qty: {item.quantity}</p>
                                                </div>
                                                <span className="text-xs text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-3">
                                <div className="bg-white rounded-xl border border-gray-100 p-3">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Shipping</h4>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between"><span className="text-gray-500">Carrier</span><span className="text-[#1a3a3a] font-medium">{displayOrder.carrier}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Tracking</span><span className="text-[#D4AF37] font-mono text-[11px]">{displayOrder.trackingNumber}</span></div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-100 p-3">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <MapPin size={12} className="text-[#D4AF37]" />
                                        <h4 className="text-xs font-medium text-[#1a3a3a]">Delivery Address</h4>
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-relaxed">
                                        {displayOrder.deliveryAddress.firstName} {displayOrder.deliveryAddress.lastName}<br />
                                        {displayOrder.deliveryAddress.street}<br />
                                        {displayOrder.deliveryAddress.city}, {displayOrder.deliveryAddress.state}
                                    </p>
                                </div>

                                <div className="bg-[#f8f6f3] rounded-xl p-3 text-center">
                                    <Phone className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
                                    <h4 className="text-xs font-medium text-[#1a3a3a] mb-0.5">Need Help?</h4>
                                    <p className="text-[10px] text-gray-500 mb-2">Our team is ready to assist</p>
                                    <a href="mailto:support@artisio.com" className="block w-full py-2 bg-white border border-gray-200 rounded-lg text-xs text-[#1a3a3a] hover:bg-gray-50 transition-colors">
                                        Contact Support
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {!order && !loading && !error && (
                    <div className="text-center py-16">
                        <Package className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                        <h3 className="text-lg text-[#1a3a3a] font-serif mb-1">Enter Your Order Number</h3>
                        <p className="text-gray-400 text-xs">Find it in your confirmation email or receipt</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTracking;
