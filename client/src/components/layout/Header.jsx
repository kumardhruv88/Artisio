/**
 * Header - Premium Artisio Header
 * Lumière-inspired thin elegant typography + hamburger on left
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { wishlistCount } = useWishlist();
    const { itemCount: cartItemsCount } = useCart();
    const location = useLocation();

    const navigation = [
        { name: 'ABOUT', href: '/about' },
        { name: 'SHOP', href: '/products' },
        { name: 'ARTISANS', href: '/artisans' },
        { name: 'SUBSCRIPTIONS', href: '/subscription' },
        { name: 'GIFT CARDS', href: '/gift-cards' },
        { name: 'CONTACT', href: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 10);

            if (currentScrollY < 100) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => setIsMenuOpen(false), [location]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    return (
        <>
            <motion.header
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -80 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`
                    fixed top-0 left-0 right-0 z-50
                    bg-[#1e3939]
                    ${isScrolled ? 'shadow-lg' : ''}
                    transition-shadow duration-300
                `}
            >
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                    <div className="flex items-center h-[52px] lg:h-[56px]">

                        {/* Left: Hamburger Menu (Always visible) */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-2 -ml-2 text-[#e8e4dc] hover:text-[#D4AF37] transition-colors mr-4"
                            aria-label="Menu"
                        >
                            <div className="flex flex-col gap-[5px]">
                                <span className="w-5 h-[1.5px] bg-current" />
                                <span className="w-5 h-[1.5px] bg-current" />
                                <span className="w-5 h-[1.5px] bg-current" />
                            </div>
                        </button>

                        {/* Logo - Thin elegant italic */}
                        <Link to="/" className="group mr-auto lg:mr-0">
                            <span
                                className="text-[#e8e4dc] group-hover:text-[#D4AF37] transition-colors duration-300"
                                style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontSize: '20px',
                                    fontWeight: 300,
                                    fontStyle: 'italic',
                                    letterSpacing: '0.35em',
                                }}
                            >
                                ARTISIO
                            </span>
                        </Link>

                        {/* Center: Navigation - Thin light typography */}
                        <nav className="hidden lg:flex items-center justify-center flex-1 gap-8 px-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="relative group"
                                >
                                    <span
                                        className="text-[#c5c0b8] group-hover:text-[#D4AF37] transition-colors duration-300"
                                        style={{
                                            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                                            fontSize: '11px',
                                            fontWeight: 400,
                                            letterSpacing: '0.14em',
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <button className="p-2 text-[#c5c0b8] hover:text-[#D4AF37] transition-colors">
                                <Search className="w-4 h-4" strokeWidth={1.5} />
                            </button>

                            {/* Wishlist */}
                            <Link to="/wishlist" className="relative p-2 text-[#c5c0b8] hover:text-[#D4AF37] transition-colors">
                                <Heart className="w-4 h-4" strokeWidth={1.5} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                                        {wishlistCount > 9 ? '9+' : wishlistCount}
                                    </span>
                                )}
                            </Link>

                            {/* Auth */}
                            <SignedIn>
                                <UserButton
                                    afterSignOutUrl="/"
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-7 h-7',
                                            userButtonPopoverCard: 'shadow-2xl border border-[#eee] rounded-xl mt-3 min-w-[220px]',
                                            userButtonPopoverActionButton: 'hover:bg-[#f8f8f8] text-sm',
                                            userButtonPopoverFooter: 'hidden',
                                        }
                                    }}
                                >
                                    <UserButton.MenuItems>
                                        {/* Quick Access Links */}
                                        <UserButton.Link
                                            label="My Orders"
                                            labelIcon={<span className="text-sm">📦</span>}
                                            href="/account/orders"
                                        />
                                        {/* Account Settings */}
                                        <UserButton.Link
                                            label="Account Settings"
                                            labelIcon={<span className="text-sm">⚙️</span>}
                                            href="/account"
                                        />
                                    </UserButton.MenuItems>
                                </UserButton>
                            </SignedIn>
                            <SignedOut>
                                <Link
                                    to="/login"
                                    className="hidden sm:block px-3 py-1 text-[#c5c0b8] hover:text-[#D4AF37] transition-colors"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '11px',
                                        fontWeight: 400,
                                        letterSpacing: '0.1em',
                                    }}
                                >
                                    SIGN IN
                                </Link>
                            </SignedOut>

                            {/* Cart */}
                            <Link to="/cart" className="relative p-2 text-[#c5c0b8] hover:text-[#D4AF37] transition-colors">
                                <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                                {cartItemsCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 bg-[#D4AF37] text-[#1e3939] text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div >
            </motion.header >

            {/* Full-screen Menu Overlay */}
            < AnimatePresence >
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="fixed inset-0 bg-[#1e3939] z-[100]"
                        >
                            {/* Menu Header */}
                            <div className="flex items-center justify-between px-4 lg:px-8 h-[52px] lg:h-[56px] border-b border-white/5">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 -ml-2 text-[#e8e4dc] hover:text-[#D4AF37] transition-colors"
                                >
                                    <X className="w-5 h-5" strokeWidth={1.5} />
                                </button>

                                <span
                                    className="text-[#e8e4dc]"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        fontSize: '20px',
                                        fontWeight: 300,
                                        fontStyle: 'italic',
                                        letterSpacing: '0.35em',
                                    }}
                                >
                                    ARTISIO
                                </span>

                                <div className="w-9" /> {/* Spacer */}
                            </div>

                            {/* Menu Content */}
                            <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] pb-20">
                                {navigation.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <Link
                                            to={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block py-4 text-[#c5c0b8] hover:text-[#D4AF37] transition-colors text-center"
                                            style={{
                                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                                fontSize: '28px',
                                                fontWeight: 300,
                                                letterSpacing: '0.15em',
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Auth in menu */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-8 pt-8 border-t border-white/10"
                                >
                                    <SignedOut>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1e3939] transition-all"
                                            style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                letterSpacing: '0.2em',
                                            }}
                                        >
                                            SIGN IN
                                        </Link>
                                    </SignedOut>
                                    <SignedIn>
                                        <Link
                                            to="/account"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1e3939] transition-all"
                                            style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                letterSpacing: '0.2em',
                                            }}
                                        >
                                            MY ACCOUNT
                                        </Link>
                                    </SignedIn>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence >
        </>
    );
};

export default Header;
