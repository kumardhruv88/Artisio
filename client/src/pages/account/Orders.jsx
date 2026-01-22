/**
 * Orders - Lumière-style order history with real API
 */

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import {
    Package, Search, RefreshCw,
    Truck, CheckCircle, Clock, ShoppingBag, ArrowRight, ArrowLeft, MapPin, CreditCard
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Orders = () => {
    const { user } = useUser();
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Use user.id directly from Clerk hook
                const clerkId = user?.id;

                if (!clerkId) {
                    setOrders([]);
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_URL}/api/orders`, {
                    headers: { Authorization: `Bearer clerkId:${clerkId}` }
                });

                if (response.data.success) {
                    setOrders(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setOrders([]);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user]);

    const statusConfig = {
        'delivered': { icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.1)', label: 'Delivered' },
        'shipped': { icon: Truck, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'In Transit' },
        'processing': { icon: Clock, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', label: 'Processing' },
        'pending': { icon: Clock, color: '#6b7280', bg: 'rgba(107,114,128,0.1)', label: 'Pending' },
    };

    const getStatusDisplay = (status) => {
        const statusKey = status?.toLowerCase() || 'processing';
        return statusConfig[statusKey] || statusConfig['processing'];
    };

    const filterOptions = [
        { key: 'all', label: 'All' },
        { key: 'delivered', label: 'Delivered' },
        { key: 'shipped', label: 'In Transit' },
        { key: 'processing', label: 'Processing' },
    ];

    const filteredOrders = orders.filter(order => {
        const matchesFilter = activeFilter === 'all' || order.status?.toLowerCase() === activeFilter;
        const matchesSearch = order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items?.some(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    // Loading state
    if (loading) {
        return (
            <div style={{
                minHeight: 'calc(100vh - 80px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(180deg, #f8f6f0 0%, #fff 100%)',
            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f0f0f0',
                        borderTopColor: '#D4AF37',
                        borderRadius: '50%',
                    }}
                />
            </div>
        );
    }

    // Empty state
    if (orders.length === 0) {
        return (
            <div style={{
                minHeight: 'calc(100vh - 80px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(180deg, #f8f6f0 0%, #fff 100%)',
                padding: '40px 20px',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', maxWidth: '400px' }}
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ShoppingBag size={80} color="#D4AF37" strokeWidth={1} style={{ marginBottom: '32px' }} />
                    </motion.div>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '32px',
                        fontWeight: '400',
                        color: '#1a3a3a',
                        marginBottom: '16px',
                    }}>
                        No orders yet
                    </h2>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '16px',
                        color: '#888',
                        marginBottom: '32px',
                        lineHeight: '1.6',
                    }}>
                        Start exploring our curated collection of artisan products and place your first order.
                    </p>
                    <Link
                        to="/products"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '16px 40px',
                            background: 'linear-gradient(135deg, #1a3a3a 0%, #2a4a5a 100%)',
                            color: '#fff',
                            textDecoration: 'none',
                            borderRadius: '50px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            fontWeight: '500',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Browse Products <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            background: 'linear-gradient(180deg, #f8f6f0 0%, #fff 100%)',
            paddingTop: '40px',
            paddingBottom: '60px',
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
                {/* Header with Back Button */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '40px' }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => navigate('/account')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '12px',
                                color: '#D4AF37',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                            }}>
                                ORDERS
                            </p>
                            <h1 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '32px',
                                fontWeight: '400',
                                color: '#1a3a3a',
                            }}>
                                Order History
                            </h1>
                        </div>
                    </div>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '16px',
                        marginBottom: '32px',
                    }}
                >
                    {/* Search */}
                    <div style={{
                        position: 'relative',
                        flex: '1',
                        minWidth: '200px',
                    }}>
                        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 16px 14px 48px',
                                border: '1px solid rgba(212,175,55,0.3)',
                                borderRadius: '12px',
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '14px',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                            }}
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {filterOptions.map(option => (
                            <button
                                key={option.key}
                                onClick={() => setActiveFilter(option.key)}
                                style={{
                                    padding: '14px 20px',
                                    border: 'none',
                                    borderRadius: '10px',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: '13px',
                                    fontWeight: activeFilter === option.key ? '600' : '400',
                                    backgroundColor: activeFilter === option.key ? '#1a3a3a' : '#fff',
                                    color: activeFilter === option.key ? '#fff' : '#666',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    boxShadow: activeFilter === option.key ? '0 4px 12px rgba(26,58,58,0.2)' : 'none',
                                }}
                            >
                                {option.label} {option.key === 'all' ? `(${orders.length})` : `(${orders.filter(o => o.status?.toLowerCase() === option.key).length})`}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Orders List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredOrders.map((order, index) => {
                        const firstItem = order.items?.[0];
                        const StatusIcon = getStatusDisplay(order.status).icon;
                        const statusStyle = getStatusDisplay(order.status);

                        return (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    border: '1px solid rgba(212,175,55,0.15)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {/* Order Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '20px',
                                    paddingBottom: '16px',
                                    borderBottom: '1px solid #f0f0f0',
                                }}>
                                    <div>
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888', marginBottom: '4px' }}>ORDER ID</p>
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: '600', color: '#1a3a3a' }}>
                                            {order.orderNumber}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888', marginBottom: '4px' }}>DATE</p>
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#1a3a3a' }}>
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888', marginBottom: '4px' }}>TOTAL</p>
                                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: '600', color: '#1a3a3a' }}>
                                            ${order.total?.toFixed(2)}
                                        </p>
                                    </div>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        backgroundColor: statusStyle.bg,
                                    }}>
                                        <StatusIcon size={14} color={statusStyle.color} />
                                        <span style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            color: statusStyle.color,
                                        }}>
                                            {statusStyle.label}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {order.items?.slice(0, 2).map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                border: '1px solid #eee',
                                            }}>
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Package size={24} color="#ccc" />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: '500', color: '#1a3a3a' }}>
                                                    {item.name}
                                                </p>
                                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#888' }}>
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: '600', color: '#1a3a3a' }}>
                                                ${item.price?.toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                    {order.items?.length > 2 && (
                                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#888', marginLeft: '80px' }}>
                                            +{order.items.length - 2} more items
                                        </p>
                                    )}
                                </div>

                                {/* View Details Button */}
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <Link
                                        to={`/track-order/${order.orderNumber}`}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '12px 24px',
                                            background: 'linear-gradient(135deg, #1a3a3a 0%, #2a4a5a 100%)',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: '10px',
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: '13px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        VIEW DETAILS <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* No results */}
                {filteredOrders.length === 0 && orders.length > 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        border: '1px solid rgba(212,175,55,0.15)',
                    }}>
                        <Search size={48} color="#888" style={{ marginBottom: '16px' }} />
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#888' }}>
                            No orders match your search
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
