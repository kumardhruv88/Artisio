/**
 * CustomerLayout - Main layout wrapper with Lenis smooth scroll
 * Includes Header, Footer (homepage only), Cursor, and ScrollProgress
 */

import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from '@components/shared/ScrollProgress';
import PageLoader from '@components/shared/PageLoader';
import { useLenis } from '@/hooks/useLenis';

const CustomerLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    // Show footer only on homepage
    const showFooter = location.pathname === '/';

    // Initialize Lenis smooth scroll
    useLenis();

    // Simulate initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Page Loader */}
            <PageLoader isLoading={isLoading} />

            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Main Layout */}
            <div className="flex flex-col min-h-screen bg-primary-dark">
                <Header />
                <main className="flex-1">
                    <Outlet />
                </main>
                {!location.pathname.startsWith('/account') && <Footer />}
            </div>
        </>
    );
};

export default CustomerLayout;
