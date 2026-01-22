/**
 * User Model - Syncs with Clerk Authentication
 * Stores user data from Clerk webhooks + app-specific data
 */

import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    label: { type: String, default: 'Home' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'United States' },
    phone: { type: String },
    isDefault: { type: Boolean, default: false }
}, { _id: true });

const userSchema = new mongoose.Schema({
    // Clerk ID - Primary identifier
    clerkId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    // Basic Info (synced from Clerk)
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    avatar: { type: String, default: '' },
    phone: { type: String, default: '' },

    // App-specific data
    addresses: [addressSchema],

    // Loyalty Program
    loyaltyPoints: { type: Number, default: 0 },
    loyaltyTier: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
        default: 'Bronze'
    },

    // Preferences
    preferences: {
        dietary: [{ type: String }],
        allergens: [{ type: String }],
        favoriteCategories: [{ type: String }],
        newsletter: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: false }
    },

    // Wishlist
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

    // Stats
    totalOrders: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },

    // Dates
    lastLoginAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update tier based on spending
userSchema.methods.updateLoyaltyTier = function () {
    if (this.totalSpent >= 5000) this.loyaltyTier = 'Platinum';
    else if (this.totalSpent >= 2000) this.loyaltyTier = 'Gold';
    else if (this.totalSpent >= 500) this.loyaltyTier = 'Silver';
    else this.loyaltyTier = 'Bronze';
};

// Full name virtual
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

// Update timestamp on save
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model('User', userSchema);
