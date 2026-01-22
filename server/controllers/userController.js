/**
 * User Controller - Handles user operations
 */

import User from '../models/User.js';

// @desc    Get current user profile
// @route   GET /api/users/me
export const getMe = async (req, res) => {
    try {
        const { clerkId } = req.auth;

        let user = await User.findOne({ clerkId }).populate('wishlist');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create or update user from Clerk webhook
// @route   POST /api/users/sync
export const syncUser = async (req, res) => {
    try {
        const { id, email_addresses, first_name, last_name, image_url, phone_numbers } = req.body.data;

        const email = email_addresses?.[0]?.email_address;
        const phone = phone_numbers?.[0]?.phone_number;

        const userData = {
            clerkId: id,
            email,
            firstName: first_name || '',
            lastName: last_name || '',
            avatar: image_url || '',
            phone: phone || '',
            lastLoginAt: new Date()
        };

        const user = await User.findOneAndUpdate(
            { clerkId: id },
            { $set: userData },
            { upsert: true, new: true }
        );

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/me
export const updateProfile = async (req, res) => {
    try {
        const { clerkId } = req.auth;
        const updates = req.body;

        // Prevent updating sensitive fields
        delete updates.clerkId;
        delete updates.email;
        delete updates.loyaltyPoints;
        delete updates.totalOrders;
        delete updates.totalSpent;

        const user = await User.findOneAndUpdate(
            { clerkId },
            { $set: updates },
            { new: true }
        );

        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add address
// @route   POST /api/users/me/addresses
export const addAddress = async (req, res) => {
    try {
        const { clerkId } = req.auth;
        const address = req.body;

        const user = await User.findOne({ clerkId });

        // If setting as default, unset others
        if (address.isDefault) {
            user.addresses.forEach(a => a.isDefault = false);
        }

        user.addresses.push(address);
        await user.save();

        res.json({ success: true, data: user.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete address
// @route   DELETE /api/users/me/addresses/:id
export const deleteAddress = async (req, res) => {
    try {
        const { clerkId } = req.auth;
        const { id } = req.params;

        const user = await User.findOneAndUpdate(
            { clerkId },
            { $pull: { addresses: { _id: id } } },
            { new: true }
        );

        res.json({ success: true, data: user.addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add to wishlist
// @route   POST /api/users/me/wishlist/:productId
export const addToWishlist = async (req, res) => {
    try {
        const { clerkId } = req.auth;
        const { productId } = req.params;

        const user = await User.findOneAndUpdate(
            { clerkId },
            { $addToSet: { wishlist: productId } },
            { new: true }
        ).populate('wishlist');

        res.json({ success: true, data: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Remove from wishlist
// @route   DELETE /api/users/me/wishlist/:productId
export const removeFromWishlist = async (req, res) => {
    try {
        const { clerkId } = req.auth;
        const { productId } = req.params;

        const user = await User.findOneAndUpdate(
            { clerkId },
            { $pull: { wishlist: productId } },
            { new: true }
        ).populate('wishlist');

        res.json({ success: true, data: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get wishlist
// @route   GET /api/users/me/wishlist
export const getWishlist = async (req, res) => {
    try {
        const { clerkId } = req.auth;

        const user = await User.findOne({ clerkId }).populate('wishlist');

        res.json({ success: true, data: user?.wishlist || [] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
