/**
 * Cart Model - Enhanced persistent shopping cart with calculations
 */

import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    variant: { type: String }, // e.g., "500g", "Large"
    price: { type: Number, required: true }, // Price at time of adding
    addedAt: { type: Date, default: Date.now }
});

const cartSchema = new mongoose.Schema({
    // User reference
    clerkId: { type: String, index: true },

    // Session ID (for guest carts)
    sessionId: { type: String, index: true },

    // Cart Items
    items: [cartItemSchema],

    // Promo Code
    promoCode: {
        code: String,
        discount: Number,
        type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' }
    },

    // Calculated totals
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, default: 0 },

    // Expiry for guest carts (30 days)
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
}, {
    timestamps: true
});

// Calculate all cart totals
cartSchema.methods.calculateTotals = function () {
    try {
        // Safe Subtotal calculation ensuring items have prices
        this.subtotal = this.items.reduce((sum, item) => {
            const price = item.price || (item.product && item.product.price) || (item.product && item.product.salePrice) || 0;
            return sum + (price * (item.quantity || 1));
        }, 0);

        // Discount
        if (this.promoCode && this.promoCode.discount) {
            if (this.promoCode.type === 'percentage') {
                this.discount = (this.subtotal * this.promoCode.discount) / 100;
            } else {
                this.discount = this.promoCode.discount;
            }
        } else {
            this.discount = 0;
        }

        // Tax (8% - should be configurable based on location)
        const afterDisountAmt = Math.max(0, this.subtotal - this.discount);
        this.tax = Math.round(afterDisountAmt * 0.08 * 100) / 100;

        // Shipping (free over $50)
        this.shipping = afterDisountAmt >= 50 ? 0 : 15;
        if (this.items.length === 0) this.shipping = 0;

        // Total
        this.total = Math.round((afterDisountAmt + this.tax + this.shipping) * 100) / 100;

        return {
            subtotal: this.subtotal,
            discount: this.discount,
            tax: this.tax,
            shipping: this.shipping,
            total: this.total,
            freeShippingThreshold: 50,
            amountToFreeShipping: Math.max(0, 50 - afterDisountAmt)
        };
    } catch (e) {
         console.error('Error calculating totals:', e);
         return { subtotal: 0, discount: 0, tax: 0, shipping: 0, total: 0 };
    }
};

// Calculate before save
cartSchema.pre('save', function (next) {
    this.calculateTotals();
    next();
});

// TTL index for guest carts
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static: Get or create cart
cartSchema.statics.getOrCreate = async function (identifier) {
    const query = identifier.startsWith('user_')
        ? { clerkId: identifier }
        : { sessionId: identifier };

    let cart = await this.findOne(query);
    if (!cart) {
        cart = await this.create({ ...query, items: [] });
    }
    return cart;
};

export default mongoose.model('Cart', cartSchema);
