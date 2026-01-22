import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: {
        type: String, // Clerk user ID
        required: true,
        index: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Index for faster queries
wishlistSchema.index({ user: 1, 'products.productId': 1 });

// Method to add product to wishlist
wishlistSchema.methods.addProduct = function (productId) {
    const exists = this.products.some(
        item => item.productId.toString() === productId.toString()
    );

    if (!exists) {
        this.products.push({ productId });
        return true;
    }
    return false;
};

// Method to remove product from wishlist
wishlistSchema.methods.removeProduct = function (productId) {
    const initialLength = this.products.length;
    this.products = this.products.filter(
        item => item.productId.toString() !== productId.toString()
    );
    return this.products.length < initialLength;
};

// Static method to get or create wishlist for user
wishlistSchema.statics.getOrCreate = async function (userId) {
    let wishlist = await this.findOne({ user: userId });
    if (!wishlist) {
        wishlist = await this.create({ user: userId, products: [] });
    }
    return wishlist;
};

export default mongoose.model('Wishlist', wishlistSchema);
