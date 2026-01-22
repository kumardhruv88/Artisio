import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

/**
 * AccountLayout - Account pages wrapper with footer
 */
const AccountLayout = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/account';

    return (
        <div className="min-h-screen flex flex-col" style={{ background: isDashboard ? 'transparent' : 'linear-gradient(180deg, #fafaf8 0%, #ffffff 100%)' }}>
            {/* Breadcrumb - only show on sub-pages, not dashboard */}
            {!isDashboard && (
                <div className="bg-[#fafaf8] border-b border-[rgba(0,0,0,0.06)]">
                    <div className="max-w-6xl mx-auto px-6 py-3">
                        <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6b7280' }}>
                            <Link to="/" className="hover:text-[#1a3a3a] transition-colors">Home</Link>
                            <span style={{ color: 'rgba(107,114,128,0.4)' }}>/</span>
                            <Link to="/account" className="hover:text-[#1a3a3a] transition-colors">My Account</Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
                {isDashboard ? (
                    <Outlet />
                ) : (
                    <main className="max-w-6xl mx-auto px-6 py-8">
                        <Outlet />
                    </main>
                )}
            </div>

            {/* FOOTER - Gradient teal with gold accents */}
            <footer style={{ background: 'linear-gradient(135deg, #1a3a3a 0%, #2d5555 100%)', padding: '80px 120px 40px' }}>
                <div className="max-w-[1440px] mx-auto">
                    {/* Upper Footer Grid */}
                    <div className="grid gap-16 mb-16 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr' }}>
                        {/* Brand Section */}
                        <div>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', color: '#d4af37', letterSpacing: '3px', marginBottom: '20px' }}>
                                Artisio
                            </h2>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(248,246,240,0.7)', lineHeight: 1.7, maxWidth: '320px', marginBottom: '24px' }}>
                                Curating the finest artisan goods from master craftspeople around the world.
                            </p>
                            <div className="flex gap-4">
                                {['facebook', 'instagram', 'twitter'].map((social) => (
                                    <button
                                        key={social}
                                        className="transition-all duration-300 hover:bg-[#d4af37] hover:text-[#1a3a3a]"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgba(248,246,240,0.1)',
                                            color: 'rgba(248,246,240,0.7)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {social[0].toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Link Columns */}
                        {[
                            { title: 'Shop', links: ['Coffee & Tea', 'Chocolates', 'Honey', 'Oils & Vinegars'] },
                            { title: 'Account', links: ['Dashboard', 'Orders', 'Wishlist', 'Rewards'] },
                            { title: 'Support', links: ['Contact', 'Shipping', 'Returns', 'FAQ'] },
                        ].map((column) => (
                            <div key={column.title}>
                                <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>
                                    {column.title}
                                </h4>
                                <nav className="space-y-2">
                                    {column.links.map((link) => (
                                        <Link
                                            key={link}
                                            to="#"
                                            className="block transition-all duration-300 hover:text-[#d4af37] hover:pl-1"
                                            style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(248,246,240,0.7)', lineHeight: 2.2 }}
                                        >
                                            {link}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        ))}

                        {/* Newsletter */}
                        <div>
                            <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: '#f8f6f0', marginBottom: '12px' }}>
                                Stay Updated
                            </h4>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(248,246,240,0.7)' }}>
                                Get exclusive offers and artisan stories.
                            </p>
                            <div className="flex gap-2 mt-4">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 focus:border-[#d4af37] focus:bg-[rgba(248,246,240,0.15)] transition-all duration-300 outline-none"
                                    style={{
                                        padding: '12px 16px',
                                        backgroundColor: 'rgba(248,246,240,0.1)',
                                        border: '1px solid rgba(248,246,240,0.2)',
                                        borderRadius: '8px',
                                        color: '#f8f6f0',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '14px',
                                    }}
                                />
                                <button
                                    className="transition-all duration-300 hover:bg-[#e5c158] hover:scale-[1.02]"
                                    style={{
                                        padding: '12px 24px',
                                        backgroundColor: '#d4af37',
                                        color: '#1a3a3a',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Lower Footer */}
                    <div
                        className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
                        style={{ borderTop: '1px solid rgba(248,246,240,0.1)' }}
                    >
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,240,0.5)' }}>
                            © 2026 Artisio. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
                                <Link
                                    key={link}
                                    to="#"
                                    className="transition-colors duration-300 hover:text-[#d4af37]"
                                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,240,0.5)' }}
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Address & Hours */}
                    <p className="text-center mt-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,240,0.6)' }}>
                        123 Artisan Way | San Francisco, CA 94102 | Sunday - Thursday: 11:30AM - 11PM
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AccountLayout;
