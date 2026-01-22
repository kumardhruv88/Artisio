/**
 * OrderConfirmation - Premium Order Success Page (Light Theme)
 * Compact, clean styling matching ARTISIO website
 */

import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import {
    Check, Package, Truck, MapPin, Download,
    ArrowRight, Mail, Loader, Clock, Shield
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { orderAPI } from '@/services/orderAPI';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const { user } = useUser();
    const [order, setOrder] = useState(location.state?.order || null);
    const [loading, setLoading] = useState(!order);
    const [error, setError] = useState(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    useEffect(() => {
        if (order) return;
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const id = orderId || location.state?.orderId || localStorage.getItem('lastOrderId');
                if (id) {
                    const response = await orderAPI.getOrder(id);
                    if (response.success) setOrder(response.data);
                    else setError('Order not found');
                } else {
                    setError('No order ID provided');
                }
            } catch (err) {
                setError('Failed to load order details');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId, location.state, order]);

    const displayEmail = order?.guestEmail || order?.shippingAddress?.email || user?.primaryEmailAddress?.emailAddress || 'customer@email.com';

    const handleDownloadInvoice = () => {
        setIsGeneratingPdf(true);
        const doc = new jsPDF();
        const primaryColor = '#1a3a3a';

        doc.setFont('times', 'italic');
        doc.setFontSize(24);
        doc.setTextColor(primaryColor);
        doc.text('ARTISIO', 105, 20, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Artisan Food & Beverage', 105, 26, { align: 'center' });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(primaryColor);
        doc.text('INVOICE / RECEIPT', 14, 45);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60);
        doc.text(`Order #: ${order.orderNumber}`, 14, 52);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 57);

        const address = order.shippingAddress;
        doc.setFont('helvetica', 'bold');
        doc.text('Ship To:', 120, 45);
        doc.setFont('helvetica', 'normal');
        doc.text([`${address.firstName} ${address.lastName}`, address.street, `${address.city}, ${address.state} ${address.postalCode}`], 120, 52);

        const tableColumn = ["Item", "Qty", "Price", "Total"];
        const tableRows = order.items.map(item => [item.name, item.quantity, `$${item.price.toFixed(2)}`, `$${(item.price * item.quantity).toFixed(2)}`]);

        doc.autoTable({
            startY: 75,
            head: [tableColumn],
            body: tableRows,
            theme: 'plain',
            headStyles: { fillColor: [240, 240, 240], textColor: primaryColor, fontStyle: 'bold' },
            styles: { textColor: 60, fontSize: 10 },
        });

        const finalY = doc.lastAutoTable.finalY + 8;
        doc.text(`Subtotal: $${order.subtotal.toFixed(2)}`, 140, finalY);
        doc.text(`Shipping: ${order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}`, 140, finalY + 5);
        doc.text(`Tax: $${order.tax.toFixed(2)}`, 140, finalY + 10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total: $${order.total.toFixed(2)}`, 140, finalY + 17);

        doc.save(`invoice_${order.orderNumber}.pdf`);
        setIsGeneratingPdf(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
                <Loader className="w-6 h-6 animate-spin text-[#D4AF37]" />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfbf9] px-4">
                <Package className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">{error || 'Order not found'}</p>
                <Link to="/" className="mt-3 text-[#D4AF37] text-sm hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfbf9] py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Success Header */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 mb-4">
                        <Check className="w-7 h-7 text-white" strokeWidth={3} />
                    </div>
                    <h1 className="text-3xl font-serif text-[#1a3a3a] mb-1 italic">Thank you!</h1>
                    <p className="text-gray-500 text-sm">Your order has been confirmed</p>
                    <p className="mt-2 text-xs text-[#D4AF37] tracking-widest uppercase font-medium">Order #{order.orderNumber}</p>
                </motion.div>

                {/* Quick Actions */}
                <div className="flex justify-center gap-3 mb-8">
                    <Link to={`/track-order/${order.orderNumber}`}>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1a3a3a] text-white text-xs font-medium rounded-lg hover:bg-black transition-colors">
                            <Truck size={14} /> Track Order
                        </button>
                    </Link>
                    <button
                        onClick={handleDownloadInvoice}
                        disabled={isGeneratingPdf}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#1a3a3a] text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        {isGeneratingPdf ? <Loader size={14} className="animate-spin" /> : <Download size={14} />}
                        Invoice
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Order Items */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-sm font-medium text-[#1a3a3a]">Order Items</h3>
                            <span className="text-xs text-gray-400">{order.items.length} items</span>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="p-3 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-medium text-[#1a3a3a] truncate">{item.name}</h4>
                                        <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-medium text-[#1a3a3a]">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-gray-100">
                            <div className="space-y-1 text-xs">
                                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-emerald-600">{order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}</span></div>
                                <div className="flex justify-between text-gray-500"><span>Tax</span><span>${order.tax.toFixed(2)}</span></div>
                                <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between">
                                    <span className="font-medium text-[#1a3a3a]">Total</span>
                                    <span className="text-lg font-serif text-[#1a3a3a]">${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
                        <div className="bg-white rounded-xl border border-gray-100 p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Mail size={14} className="text-[#D4AF37]" />
                                <span className="text-xs font-medium text-[#1a3a3a]">Confirmation Sent</span>
                            </div>
                            <p className="text-[11px] text-gray-500 truncate">{displayEmail}</p>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin size={14} className="text-[#D4AF37]" />
                                <span className="text-xs font-medium text-[#1a3a3a]">Shipping To</span>
                            </div>
                            <p className="text-[11px] text-gray-500 leading-relaxed">
                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                                {order.shippingAddress.street}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock size={14} className="text-[#D4AF37]" />
                                <span className="text-xs font-medium text-[#1a3a3a]">Estimated Delivery</span>
                            </div>
                            <p className="text-[11px] text-gray-500">
                                {order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : '3-5 Business Days'}
                            </p>
                        </div>

                        <div className="bg-[#f8f6f3] rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield size={14} className="text-[#D4AF37]" />
                                <span className="text-xs font-medium text-[#1a3a3a]">ARTISIO Promise</span>
                            </div>
                            <ul className="space-y-1 text-[11px] text-gray-500">
                                <li className="flex items-center gap-1"><Check size={10} className="text-emerald-500" /> Secure checkout</li>
                                <li className="flex items-center gap-1"><Check size={10} className="text-emerald-500" /> 30-day returns</li>
                                <li className="flex items-center gap-1"><Check size={10} className="text-emerald-500" /> Quality guaranteed</li>
                            </ul>
                        </div>

                        <Link to="/products" className="block">
                            <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-[#1a3a3a] text-xs flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors">
                                Continue Shopping <ArrowRight size={12} />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
