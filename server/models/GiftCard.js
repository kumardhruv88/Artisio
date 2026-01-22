/**
 * GiftCard Model - Handles gift card data
 */

import mongoose from 'mongoose';
import crypto from 'crypto';

const giftCardSchema = new mongoose.Schema({
    // Gift Card Code (auto-generated)
    code: {
        type: String,
        unique: true,
        required: true
    },

    // Amount
    initialBalance: {
        type: Number,
        required: true,
        min: 5,
        max: 500
    },
    currentBalance: {
        type: Number,
        required: true
    },

    // Sender Info
    senderName: {
        type: String,
        required: true
    },
    senderEmail: {
        type: String,
        required: true
    },

    // Recipient Info
    recipientName: {
        type: String,
        required: true
    },
    recipientEmail: {
        type: String,
        required: true
    },

    // Personalization
    message: {
        type: String,
        maxlength: 500
    },
    designTemplate: {
        type: String,
        default: 'classic'
    },

    // Delivery
    deliveryMethod: {
        type: String,
        enum: ['email', 'physical'],
        default: 'email'
    },
    scheduledDelivery: {
        type: Date,
        default: null // null = send immediately
    },
    deliveredAt: {
        type: Date,
        default: null
    },
    isDelivered: {
        type: Boolean,
        default: false
    },

    // Status
    status: {
        type: String,
        enum: ['pending', 'active', 'partially_used', 'depleted', 'expired', 'cancelled'],
        default: 'pending'
    },

    // Payment
    purchaseOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    purchasedBy: {
        type: String // clerkId
    },

    // Expiry
    expiresAt: {
        type: Date,
        required: true
    },

    // Usage History
    usageHistory: [{
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        amount: { type: Number },
        date: { type: Date, default: Date.now },
        orderNumber: { type: String }
    }],

    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Generate unique gift card code before save
giftCardSchema.pre('save', function (next) {
    if (!this.code) {
        // Generate a readable code: ART-XXXX-XXXX-XXXX
        const segment = () => crypto.randomBytes(2).toString('hex').toUpperCase();
        this.code = `ART-${segment()}-${segment()}-${segment()}`;
    }
    if (this.currentBalance === undefined) {
        this.currentBalance = this.initialBalance;
    }
    this.updatedAt = new Date();
    next();
});

// Update status based on balance
giftCardSchema.pre('save', function (next) {
    if (this.currentBalance === 0) {
        this.status = 'depleted';
    } else if (this.currentBalance < this.initialBalance) {
        this.status = 'partially_used';
    } else if (this.status === 'pending' && this.isDelivered) {
        this.status = 'active';
    }
    next();
});

// Check if expired
giftCardSchema.methods.isExpired = function () {
    return new Date() > this.expiresAt;
};

// Check if usable
giftCardSchema.methods.isUsable = function () {
    return this.currentBalance > 0 &&
        !this.isExpired() &&
        ['active', 'partially_used'].includes(this.status);
};

// Apply to order
giftCardSchema.methods.applyToOrder = async function (orderId, orderNumber, amount) {
    if (amount > this.currentBalance) {
        throw new Error('Insufficient gift card balance');
    }

    this.currentBalance -= amount;
    this.usageHistory.push({
        orderId,
        amount,
        orderNumber,
        date: new Date()
    });

    await this.save();
    return this.currentBalance;
};

export default mongoose.model('GiftCard', giftCardSchema);
