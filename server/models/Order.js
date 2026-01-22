/**
 * Order Model - Handles all order data
 */

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    variant: { type: String }, // e.g., "500g", "Large"
    subtotal: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    // Order Number (auto-generated)
    orderNumber: {
        type: String,
        unique: true
    },

    // Customer
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    clerkId: { type: String }, // For quick lookup

    // Guest checkout info
    guestEmail: { type: String },

    // Order Items
    items: [orderItemSchema],

    // Pricing
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    discountCode: { type: String },
    shippingCost: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },

    // Shipping
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        street: { type: String, required: true },
        apartment: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, default: 'United States' },
        phone: { type: String }
    },

    shippingMethod: {
        type: String,
        enum: ['standard', 'express', 'overnight', 'pickup'],
        default: 'standard'
    },

    // Gift Options
    isGift: { type: Boolean, default: false },
    giftMessage: { type: String },
    giftWrapping: { type: Boolean, default: false },

    // Payment
    paymentMethod: {
        type: String,
        enum: ['card', 'apple_pay', 'google_pay', 'gift_card'],
        default: 'card'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
        default: 'pending'
    },
    stripePaymentIntentId: { type: String },
    paidAt: { type: Date },

    // Order Status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
        default: 'pending'
    },

    // Tracking
    trackingNumber: { type: String },
    carrier: { type: String },
    estimatedDelivery: { type: Date },
    deliveredAt: { type: Date },

    // Notes
    customerNotes: { type: String },
    adminNotes: { type: String },

    // Status History
    statusHistory: [{
        status: { type: String },
        note: { type: String },
        updatedBy: { type: String }, // admin name or 'system'
        timestamp: { type: Date, default: Date.now }
    }],

    // Dates
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Generate order number before save
orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose.model('Order').countDocuments();
        this.orderNumber = `ART-${String(count + 10001).padStart(5, '0')}`;
    }
    this.updatedAt = new Date();
    next();
});

// Add status to history when status changes
orderSchema.pre('save', function (next) {
    if (this.isModified('status')) {
        this.statusHistory.push({
            status: this.status,
            note: `Order ${this.status}`,
            updatedBy: 'system',
            timestamp: new Date()
        });
    }
    next();
});

export default mongoose.model('Order', orderSchema);
