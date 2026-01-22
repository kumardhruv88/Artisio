/**
 * Stripe Configuration
 */
import { loadStripe } from '@stripe/stripe-js';

// Use Vite environment variable
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
    console.warn('Stripe publishable key not found. Add VITE_STRIPE_PUBLISHABLE_KEY to your .env file.');
}

export const stripePromise = loadStripe(stripePublishableKey || '');
