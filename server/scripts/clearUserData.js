/**
 * Clear User Data Script
 * Run this to remove all carts and orders from database
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function clearUserData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear all carts
        const Cart = mongoose.model('Cart', new mongoose.Schema({}, { strict: false }));
        const deletedCarts = await Cart.deleteMany({});
        console.log(`🗑️  Deleted ${deletedCarts.deletedCount} carts`);

        // Clear all orders
        const Order = mongoose.model('Order', new mongoose.Schema({}, { strict: false }));
        const deletedOrders = await Order.deleteMany({});
        console.log(`🗑️  Deleted ${deletedOrders.deletedCount} orders`);

        // Clear all wishlists
        const Wishlist = mongoose.model('Wishlist', new mongoose.Schema({}, { strict: false }));
        const deletedWishlists = await Wishlist.deleteMany({});
        console.log(`🗑️  Deleted ${deletedWishlists.deletedCount} wishlists`);

        console.log('\n✅ All user data cleared successfully!');
        console.log('🔄 Your cart, orders, and wishlist are now empty.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

clearUserData();
