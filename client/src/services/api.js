/**
 * API Service for Artisio
 * Connects frontend to backend API
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch all products from the API
 */
export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data.data || data; // Handle both { data: [...] } and [...] formats
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

/**
 * Fetch a single product by slug
 */
export const fetchProductBySlug = async (slug) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${slug}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(category)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

/**
 * Get API categories (from backend product categories)
 */
export const API_CATEGORIES = [
    'All',
    'Coffee',
    'Chocolate',
    'Honey & Preserves',
    'Oils & Vinegars',
    'Tea',
    'Spices',
    'Cheese',
    'Bakery',
    'Nuts & Snacks',
    'Pasta & Grains',
    'Condiments',
    'Beverages'
];

export default {
    fetchProducts,
    fetchProductBySlug,
    fetchProductsByCategory,
    API_CATEGORIES
};
