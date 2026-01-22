import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { UserSyncProvider } from './context/UserSyncContext';
import App from './App';
import './styles/globals.css';

// Get Clerk publishable key from env
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    console.warn('Missing Clerk Publishable Key - Auth features disabled');
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            appearance={{
                variables: {
                    colorPrimary: '#1a3a3a',
                    colorText: '#333333',
                    colorBackground: '#FAF9F7',
                    colorInputBackground: '#ffffff',
                    colorInputText: '#333333',
                    borderRadius: '0px',
                    fontFamily: '"Cormorant Garamond", serif',
                },
                elements: {
                    formButtonPrimary: 'bg-[#1a3a3a] hover:bg-[#0f2424] text-white font-medium tracking-wider uppercase text-xs py-4',
                    card: 'shadow-xl border border-[#e8e5e0]',
                    headerTitle: 'font-serif italic text-3xl text-[#1a3a3a]',
                    headerSubtitle: 'text-[#666]',
                    socialButtonsBlockButton: 'border-[#e8e5e0] hover:bg-[#f5f5f5]',
                    formFieldInput: 'border-[#e8e5e0] focus:border-[#1a3a3a] focus:ring-[#1a3a3a]',
                    footerActionLink: 'text-[#D4AF37] hover:text-[#1a3a3a]',
                }
            }}
        >
            <UserSyncProvider>
                <WishlistProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </WishlistProvider>
            </UserSyncProvider>
        </ClerkProvider>
    </React.StrictMode>
);
