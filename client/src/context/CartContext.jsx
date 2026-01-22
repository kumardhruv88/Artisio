/**
 * CartContext - Real-time API integration with local fallback
 * Works for both guests and authenticated users
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { cartAPI } from '../services/cartAPI';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Calculate totals locally from cart items
// This is a fallback - API totals should be preferred
const calculateLocalTotals = (items, existingDiscount = 0) => {
    const subtotal = items.reduce((sum, item) => {
        const price = item.price || item.product?.salePrice || item.product?.price || 0;
        return sum + (price * item.quantity);
    }, 0);

    // Preserve existing discount (from promo code)
    const discount = existingDiscount || 0;
    const taxableAmount = subtotal - discount;
    const tax = Math.round(taxableAmount * 0.08 * 100) / 100;
    const shipping = taxableAmount >= 50 ? 0 : 15;
    const total = Math.round((subtotal - discount + tax + shipping) * 100) / 100;

    return { subtotal, discount, tax, shipping, total };
};

export const CartProvider = ({ children }) => {
    const { isSignedIn, user } = useUser();
    const [cart, setCart] = useState([]);
    const [cartTotals, setCartTotals] = useState({
        subtotal: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
        total: 0
    });
    const [promoCode, setPromoCode] = useState(null);
    const [loading, setLoading] = useState(true);

    // Save Clerk user ID to localStorage
    useEffect(() => {
        if (isSignedIn && user) {
            localStorage.setItem('clerkUserId', user.id);
            // Merge guest cart with user cart
            const guestSessionId = localStorage.getItem('guestSessionId');
            if (guestSessionId) {
                mergeGuestCart(guestSessionId);
            }
        }
    }, [isSignedIn, user]);

    // Merge guest cart with user cart
    const mergeGuestCart = async (sessionId) => {
        try {
            await cartAPI.mergeCart(sessionId);
            localStorage.removeItem('guestSessionId');
            loadCart();
        } catch (error) {
            console.error('Error merging cart:', error);
        }
    };

    // Update totals whenever cart changes (but preserve discount from promo)
    useEffect(() => {
        const totals = calculateLocalTotals(cart, cartTotals.discount);
        setCartTotals(prev => ({
            ...prev,
            ...totals,
            // Preserve the discount from API/promo
            discount: prev.discount || 0
        }));
    }, [cart]);

    // Load cart from backend
    const loadCart = async () => {
        setLoading(true);
        try {
            const response = await cartAPI.getCart();
            if (response.success) {
                const items = response.data.items || [];
                setCart(items);
                setCartTotals({
                    subtotal: response.data.subtotal || 0,
                    discount: response.data.discount || 0,
                    tax: response.data.tax || 0,
                    shipping: response.data.shipping || 0,
                    total: response.data.total || 0
                });
                setPromoCode(response.data.promoCode || null);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            // Load from localStorage as fallback
            const savedCart = localStorage.getItem('localCart');
            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);
                    setCart(parsedCart);
                } catch (e) {
                    setCart([]);
                }
            }
        }
        setLoading(false);
    };

    // Save cart to localStorage as backup
    const saveCartLocally = (items) => {
        try {
            localStorage.setItem('localCart', JSON.stringify(items));
        } catch (e) {
            console.error('Error saving cart locally:', e);
        }
    };

    // Load cart on mount and when user signs in/out
    useEffect(() => {
        loadCart();
    }, [isSignedIn]);

    const addToCart = useCallback(async (product, quantity = 1, variant = null) => {
        const productId = product._id || product.id;
        const price = product.salePrice || product.price;

        // Create the new item
        const newItem = {
            _id: `local_${Date.now()}`,
            product: {
                _id: productId,
                name: product.name,
                slug: product.slug,
                price: product.price,
                salePrice: product.salePrice,
                images: product.images || [product.image],
                stock: product.stock
            },
            quantity,
            variant,
            price
        };

        // Check if item already exists
        const existingIndex = cart.findIndex(
            item => (item.product?._id === productId || item.product === productId) && item.variant === variant
        );

        let updatedCart;
        if (existingIndex >= 0) {
            // Update quantity
            updatedCart = cart.map((item, idx) =>
                idx === existingIndex
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            // Add new item
            updatedCart = [...cart, newItem];
        }

        // Update state immediately (optimistic)
        setCart(updatedCart);
        saveCartLocally(updatedCart);

        // Try API call in background
        try {
            const response = await cartAPI.addToCart(productId, quantity, variant);
            if (response.success && response.data?.items) {
                setCart(response.data.items);
                setCartTotals({
                    subtotal: response.data.subtotal || 0,
                    discount: response.data.discount || 0,
                    tax: response.data.tax || 0,
                    shipping: response.data.shipping || 0,
                    total: response.data.total || 0
                });
            }
        } catch (error) {
            // Keep local cart, just log error
            console.error('API error (using local cart):', error);
        }

        return true;
    }, [cart]);

    const updateQuantity = useCallback(async (itemId, quantity) => {
        if (quantity < 1) {
            return removeFromCart(itemId);
        }

        // Optimistic update
        const updatedCart = cart.map(item =>
            item._id === itemId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        saveCartLocally(updatedCart);

        // Try API call
        try {
            const response = await cartAPI.updateCartItem(itemId, quantity);
            if (response.success && response.data?.items) {
                setCart(response.data.items);
                setCartTotals({
                    subtotal: response.data.subtotal || 0,
                    discount: response.data.discount || 0,
                    tax: response.data.tax || 0,
                    shipping: response.data.shipping || 0,
                    total: response.data.total || 0
                });
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }, [cart]);

    const removeFromCart = useCallback(async (itemId) => {
        // Optimistic update
        const updatedCart = cart.filter(item => item._id !== itemId);
        setCart(updatedCart);
        saveCartLocally(updatedCart);

        // Try API call
        try {
            const response = await cartAPI.removeFromCart(itemId);
            if (response.success && response.data?.items) {
                setCart(response.data.items);
                setCartTotals({
                    subtotal: response.data.subtotal || 0,
                    discount: response.data.discount || 0,
                    tax: response.data.tax || 0,
                    shipping: response.data.shipping || 0,
                    total: response.data.total || 0
                });
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    }, [cart]);

    const clearCart = useCallback(async () => {
        setCart([]);
        setCartTotals({
            subtotal: 0,
            discount: 0,
            tax: 0,
            shipping: 0,
            total: 0
        });
        setPromoCode(null);
        localStorage.removeItem('localCart');

        try {
            await cartAPI.clearCart();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }, []);

    const applyPromoCode = useCallback(async (code) => {
        try {
            const response = await cartAPI.applyPromoCode(code);
            if (response.success) {
                setPromoCode(response.data.promoCode);
                setCartTotals({
                    subtotal: response.data.subtotal,
                    discount: response.data.discount,
                    tax: response.data.tax,
                    shipping: response.data.shipping,
                    total: response.data.total
                });
                return { success: true, message: response.message };
            }
            return { success: false, message: response.message || 'Invalid promo code' };
        } catch (error) {
            console.error('Error applying promo code:', error);
            return { success: false, message: error.message || 'Invalid promo code' };
        }
    }, []);

    const removePromoCode = useCallback(async () => {
        try {
            const response = await cartAPI.removePromoCode();
            if (response.success) {
                setPromoCode(null);
                setCartTotals({
                    subtotal: response.data.subtotal,
                    discount: response.data.discount,
                    tax: response.data.tax,
                    shipping: response.data.shipping,
                    total: response.data.total
                });
            }
        } catch (error) {
            console.error('Error removing promo code:', error);
        }
    }, []);

    const getCartItemCount = useCallback(() => {
        return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    }, [cart]);

    // Check if product is in cart
    const isInCart = useCallback((productId) => {
        return cart.some(item => {
            const itemProductId = item.product?._id || item.product?.id || item.product;
            return itemProductId === productId || item._id === productId;
        });
    }, [cart]);

    // Use useMemo-like pattern for itemCount
    const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    const value = {
        cart,
        cartTotals,
        promoCode,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromoCode,
        removePromoCode,
        isInCart,
        cartCount: getCartItemCount(),
        itemCount,
        refresh: loadCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
