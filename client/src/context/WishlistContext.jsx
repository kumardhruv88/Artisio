/**
 * WishlistContext - Real-time API integration
 * Syncs with backend for authenticated users
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { wishlistAPI } from '../services/wishlistAPI';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const { isSignedIn, user } = useUser();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Save Clerk user ID to localStorage when signed in
    useEffect(() => {
        if (isSignedIn && user) {
            localStorage.setItem('clerkUserId', user.id);
        } else {
            localStorage.removeItem('clerkUserId');
        }
    }, [isSignedIn, user]);

    // Load wishlist from backend
    const loadWishlist = async () => {
        if (!isSignedIn) {
            setWishlist([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await wishlistAPI.getWishlist();
            if (response.success) {
                // Transform API response to match frontend structure
                const items = response.data.products.map(item => ({
                    _id: item.productId._id,
                    id: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    salePrice: item.productId.salePrice,
                    image: item.productId.images?.[0],
                    images: item.productId.images,
                    slug: item.productId.slug,
                    rating: item.productId.rating,
                    stock: item.productId.stock,
                    addedAt: item.addedAt
                }));
                setWishlist(items);
            }
        } catch (error) {
            console.error('Error loading wishlist:', error);
            setWishlist([]);
        }
        setLoading(false);
    };

    // Load wishlist when user signs in/out
    useEffect(() => {
        loadWishlist();
    }, [isSignedIn]);

    const addToWishlist = useCallback(async (product) => {
        if (!isSignedIn) {
            alert('Please sign in to add items to your wishlist');
            return false;
        }

        try {
            const productId = product._id || product.id;

            // Optimistic update
            const newItem = {
                _id: productId,
                id: productId,
                name: product.name,
                price: product.price,
                salePrice: product.salePrice,
                image: product.image || product.images?.[0],
                images: product.images,
                slug: product.slug,
                rating: product.rating,
                stock: product.stock,
                addedAt: new Date().toISOString()
            };
            setWishlist(prev => [...prev, newItem]);

            // Call API
            const response = await wishlistAPI.addToWishlist(productId);

            if (!response.success) {
                // Revert on failure
                setWishlist(prev => prev.filter(item => item._id !== productId));
                throw new Error(response.message);
            }

            return true;
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert(error.message || 'Failed to add to wishlist');
            return false;
        }
    }, [isSignedIn]);

    const removeFromWishlist = useCallback(async (productId) => {
        if (!isSignedIn) return;

        try {
            // Optimistic update
            const previousWishlist = wishlist;
            setWishlist(prev => prev.filter(item => item._id !== productId));

            // Call API
            const response = await wishlistAPI.removeFromWishlist(productId);

            if (!response.success) {
                // Revert on failure
                setWishlist(previousWishlist);
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    }, [isSignedIn, wishlist]);

    const toggleWishlist = useCallback(async (product) => {
        const productId = product._id || product.id;
        const exists = wishlist.some(item => item._id === productId);

        if (exists) {
            await removeFromWishlist(productId);
            return false; // Removed
        } else {
            const added = await addToWishlist(product);
            return added; // Added
        }
    }, [wishlist, addToWishlist, removeFromWishlist]);

    const isInWishlist = useCallback((productId) => {
        return wishlist.some(item => item._id === productId || item.id === productId);
    }, [wishlist]);

    const clearWishlist = useCallback(async () => {
        if (!isSignedIn) return;

        try {
            const response = await wishlistAPI.clearWishlist();
            if (response.success) {
                setWishlist([]);
            }
        } catch (error) {
            console.error('Error clearing wishlist:', error);
        }
    }, [isSignedIn]);

    const value = {
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
        refresh: loadWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
