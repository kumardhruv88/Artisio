import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CreditCard, Lock, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { paymentAPI } from '@/services/paymentAPI';

/**
 * Checkout - Lumière-style multi-step checkout
 * Now uses real cart data from CartContext
 */
const Checkout = () => {
    const navigate = useNavigate();
    const { cart, cartTotals, clearCart } = useCart();
    const [currentStep, setCurrentStep] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        // Shipping
        fullName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: '',
        // Payment
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    // Use real cart data
    const cartItems = cart.map(item => ({
        id: item._id,
        productId: item.product?._id || item.product,
        name: item.product?.name || 'Product',
        image: item.product?.images?.[0] || item.product?.image || '',
        price: item.price || item.product?.salePrice || item.product?.price || 0,
        quantity: item.quantity || 1,
    }));

    const { subtotal, tax, shipping, total } = cartTotals;

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleContinue = async () => {
        if (currentStep === 1) {
            // Validate shipping form
            if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
                setError('Please fill in all required fields');
                return;
            }
            setError('');
            setCurrentStep(2);
        } else {
            // Process payment
            setProcessing(true);
            setError('');

            try {
                // Create payment intent
                const intentResponse = await paymentAPI.createPaymentIntent(Math.round(total * 100), 'usd');

                if (!intentResponse.success) {
                    throw new Error(intentResponse.message || 'Failed to create payment');
                }

                // Prepare order items
                const orderItems = cartItems.map(item => ({
                    product: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                }));

                // Confirm payment and create order - use paymentIntentId, not clientSecret
                const confirmResponse = await paymentAPI.confirmPayment(
                    intentResponse.data.paymentIntentId,
                    {
                        fullName: formData.fullName,
                        email: formData.email,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.zipCode,
                        country: formData.country,
                        phone: formData.phone
                    },
                    orderItems,
                    { subtotal, tax, shipping, total }
                );

                if (confirmResponse.success && confirmResponse.data?.order) {
                    // Clear cart and navigate to confirmation
                    await clearCart();
                    navigate(`/order-confirmation/${confirmResponse.data.order._id}`);
                } else {
                    throw new Error(confirmResponse.message || 'Payment failed');
                }
            } catch (err) {
                console.error('Payment error:', err);
                setError(err.message || 'Payment failed. Please try again.');
            } finally {
                setProcessing(false);
            }
        }
    };

    // Compact input styles for single-view checkout
    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '6px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        color: '#1a3a3a',
        backgroundColor: '#fafafa',
        outline: 'none',
        transition: 'border-color 0.2s ease, background-color 0.2s ease',
    };

    const labelStyle = {
        display: 'block',
        fontFamily: 'Inter, sans-serif',
        fontSize: '12px',
        fontWeight: 600,
        color: '#1a3a3a',
        marginBottom: '4px',
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafaf8' }}>
            {/* Back to Cart - Compact */}
            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', backgroundColor: '#fff' }}>
                <div className="max-w-[1100px] mx-auto px-6 py-2">
                    <Link to="/cart" className="flex items-center gap-2 transition-colors hover:text-[#d4af37]" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>
                        <ArrowLeft size={14} />
                        Back to Cart
                    </Link>
                </div>
            </div>

            <div className="max-w-[1100px] mx-auto px-6 py-6">
                {/* Title & Steps - Compact header */}
                <div className="flex items-center justify-between mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '32px',
                            fontWeight: 600,
                            color: '#1a3a3a',
                        }}
                    >
                        Checkout
                    </motion.h1>

                    {/* Step Indicator - Inline */}
                    <div className="flex items-center gap-2">
                        {/* Step 1 */}
                        <div className="flex items-center gap-2">
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: currentStep >= 1 ? '#d4af37' : '#e5e7eb',
                                    color: currentStep >= 1 ? '#1a3a3a' : '#9ca3af',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                }}
                            >
                                1
                            </div>
                            <span style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '13px',
                                fontWeight: currentStep === 1 ? 600 : 400,
                                color: currentStep === 1 ? '#1a3a3a' : '#9ca3af',
                            }}>
                                Shipping
                            </span>
                        </div>

                        {/* Line */}
                        <div style={{ width: '40px', height: '1px', backgroundColor: '#e5e7eb' }} />

                        {/* Step 2 */}
                        <div className="flex items-center gap-2">
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: currentStep >= 2 ? '#d4af37' : '#e5e7eb',
                                    color: currentStep >= 2 ? '#1a3a3a' : '#9ca3af',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                }}
                            >
                                2
                            </div>
                            <span style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '13px',
                                fontWeight: currentStep === 2 ? 600 : 400,
                                color: currentStep === 2 ? '#1a3a3a' : '#9ca3af',
                            }}>
                                Payment
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        {/* Step 1: Shipping Address */}
                        {currentStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    borderRadius: '12px',
                                    padding: '24px',
                                }}
                            >
                                <h2 style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    color: '#1a3a3a',
                                    marginBottom: '20px',
                                }}>
                                    Shipping Address
                                </h2>

                                <div className="space-y-4">
                                    {/* Full Name */}
                                    <div>
                                        <label style={labelStyle}>Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            placeholder="John Doe"
                                            style={inputStyle}
                                            className="focus:border-[#1a3a3a]"
                                        />
                                    </div>

                                    {/* Email Address */}
                                    <div>
                                        <label style={labelStyle}>Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="john@example.com"
                                            style={inputStyle}
                                            className="focus:border-[#1a3a3a]"
                                        />
                                    </div>

                                    {/* Street Address */}
                                    <div>
                                        <label style={labelStyle}>Street Address</label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            placeholder="123 Main St"
                                            style={inputStyle}
                                            className="focus:border-[#1a3a3a]"
                                        />
                                    </div>

                                    {/* City / State */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label style={labelStyle}>City</label>
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => handleInputChange('city', e.target.value)}
                                                placeholder="New York"
                                                style={inputStyle}
                                                className="focus:border-[#1a3a3a]"
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>State / Province</label>
                                            <input
                                                type="text"
                                                value={formData.state}
                                                onChange={(e) => handleInputChange('state', e.target.value)}
                                                placeholder="NY"
                                                style={inputStyle}
                                                className="focus:border-[#1a3a3a]"
                                            />
                                        </div>
                                    </div>

                                    {/* ZIP / Country */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label style={labelStyle}>ZIP / Postal Code</label>
                                            <input
                                                type="text"
                                                value={formData.zipCode}
                                                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                                placeholder="10001"
                                                style={inputStyle}
                                                className="focus:border-[#1a3a3a]"
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Country</label>
                                            <input
                                                type="text"
                                                value={formData.country}
                                                onChange={(e) => handleInputChange('country', e.target.value)}
                                                style={inputStyle}
                                                className="focus:border-[#1a3a3a]"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label style={labelStyle}>Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            placeholder="+1 (555) 123-4567"
                                            style={inputStyle}
                                            className="focus:border-[#1a3a3a]"
                                        />
                                    </div>

                                    {/* Continue Button */}
                                    <motion.button
                                        onClick={handleContinue}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full flex items-center justify-center gap-2 mt-5"
                                        style={{
                                            padding: '14px',
                                            backgroundColor: '#1a3a3a',
                                            color: '#ffffff',
                                            fontFamily: 'Inter, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Continue to Payment <ArrowRight size={16} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Payment */}
                        {currentStep === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    borderRadius: '12px',
                                    padding: '24px',
                                }}
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <h2 style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '24px',
                                        fontWeight: 600,
                                        color: '#1a3a3a',
                                    }}>
                                        Payment Details
                                    </h2>
                                    <div className="flex items-center gap-2" style={{ color: '#059669' }}>
                                        <Lock size={16} />
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500 }}>Secure</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Card Number */}
                                    <div>
                                        <label style={labelStyle}>Card Number</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={formData.cardNumber}
                                                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                                placeholder="1234 5678 9012 3456"
                                                style={inputStyle}
                                                className="focus:border-[#1a3a3a]"
                                            />
                                            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2" size={20} style={{ color: '#9ca3af' }} />
                                        </div>
                                    </div>

                                    {/* Name on Card */}
                                    <div>
                                        <label style={labelStyle}>Name on Card</label>
                                        <input
                                            type="text"
                                            value={formData.cardName}
                                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                                            placeholder="John Doe"
                                            style={inputStyle}
                                            className="focus:border-[#1a3a3a]"
                                        />
                                    </div>

                                    {/* Expiry / CVV */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label style={labelStyle}>Expiry Date</label>
                                            <input
                                                type="text"
                                                value={formData.expiryDate}
                                                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                                placeholder="MM / YY"
                                                style={inputStyle}
                                                className="focus:border-[#1a3a3a]"
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>CVV</label>
                                            <input
                                                type="password"
                                                value={formData.cvv}
                                                onChange={(e) => handleInputChange('cvv', e.target.value)}
                                                placeholder="123"
                                                style={inputStyle}
                                                className="focus:border-[#1a3a3a]"
                                            />
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    {error && (
                                        <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px' }}>{error}</p>
                                    )}
                                    <div className="flex items-center gap-4 mt-8">
                                        <button
                                            onClick={() => setCurrentStep(1)}
                                            disabled={processing}
                                            className="flex items-center gap-2 transition-colors hover:text-[#1a3a3a]"
                                            style={{
                                                padding: '18px 24px',
                                                backgroundColor: 'transparent',
                                                border: '1px solid rgba(0,0,0,0.1)',
                                                color: '#6b7280',
                                                fontFamily: 'Inter, sans-serif',
                                                fontSize: '15px',
                                                fontWeight: 500,
                                                cursor: processing ? 'not-allowed' : 'pointer',
                                                opacity: processing ? 0.5 : 1,
                                            }}
                                        >
                                            <ArrowLeft size={16} /> Back
                                        </button>
                                        <motion.button
                                            onClick={handleContinue}
                                            disabled={processing}
                                            whileHover={{ scale: processing ? 1 : 1.01 }}
                                            whileTap={{ scale: processing ? 1 : 0.99 }}
                                            className="flex-1 flex items-center justify-center gap-2"
                                            style={{
                                                padding: '18px',
                                                backgroundColor: '#1a3a3a',
                                                color: '#ffffff',
                                                fontFamily: 'Inter, sans-serif',
                                                fontSize: '15px',
                                                fontWeight: 600,
                                                border: 'none',
                                                cursor: processing ? 'not-allowed' : 'pointer',
                                                opacity: processing ? 0.7 : 1,
                                            }}
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Place Order <ArrowRight size={18} />
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                }}
                            >
                                <h3 style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: '#1a3a3a',
                                    marginBottom: '16px',
                                }}>
                                    Order Summary
                                </h3>

                                {/* Cart Items - Compact */}
                                <div className="space-y-3 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <div className="overflow-hidden" style={{ width: '48px', height: '48px', borderRadius: '6px', backgroundColor: '#f8f6f0', flexShrink: 0 }}>
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a3a3a', marginBottom: '2px', lineHeight: 1.3 }}>
                                                    {item.name}
                                                </h4>
                                                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6b7280' }}>
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1a3a3a' }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Breakdown - Tighter */}
                                <div className="space-y-2 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                                    <div className="flex justify-between">
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>Subtotal</span>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#1a3a3a' }}>${subtotal?.toFixed(2) || '0.00'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>Shipping</span>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#059669' }}>{shipping === 0 ? 'Free' : `$${shipping?.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280' }}>Tax (8%)</span>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#1a3a3a' }}>${tax?.toFixed(2) || '0.00'}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center">
                                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#1a3a3a' }}>Total</span>
                                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 600, color: '#1a3a3a' }}>${total?.toFixed(2) || '0.00'}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
