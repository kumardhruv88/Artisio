import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#1a3a3a] text-white py-16 px-4 md:px-8 relative overflow-hidden">
            {/* Texture Overlay (Optional, for grain effect) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Logo */}
                <div className="text-center mb-16">
                    <h1 className="font-serif italic text-6xl md:text-8xl tracking-tight text-[#f8f6f0]">
                        Artisio
                    </h1>
                </div>

                {/* divider line */}
                <div className="w-full h-px bg-white/10 mb-10"></div>

                {/* First Row: Nav Links */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16">
                    {['HOME', 'ABOUT', 'SHOP', 'GIFT CARDS', 'SUBSCRIPTIONS', 'ORDER', 'CONTACT'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="text-xs md:text-sm font-medium tracking-[0.15em] hover:text-[#d4af37] transition-colors text-white/90"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Second Row: Address & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
                    {/* Left: Address */}
                    <div className="text-xs tracking-widest text-white/70 text-center md:text-left">
                        123 ARTISAN WAY | SAN FRANCISCO, CA 94102 | COPYRIGHT 2026
                    </div>

                    {/* Right: Buttons */}
                    <div className="flex gap-6">
                        <button className="px-8 py-3 border border-white/20 text-xs tracking-[0.15em] hover:bg-white hover:text-[#1a3a3a] transition-all uppercase">
                            Order
                        </button>
                        <button className="px-8 py-3 border border-white/20 text-xs tracking-[0.15em] hover:bg-white hover:text-[#1a3a3a] transition-all uppercase">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Bottom: Hours */}
                <div className="text-center space-y-3">
                    <p className="text-[10px] md:text-xs tracking-[0.1em] text-white/60">
                        SUNDAY - THURSDAY: 11:30AM - 11PM | FRIDAY & SATURDAY: 11:30AM - 12AM
                    </p>
                    <p className="text-[10px] md:text-xs tracking-[0.1em] text-white/60">
                        CHRISTMAS EVE: 11:30AM - 5PM
                    </p>
                    <p className="text-[10px] md:text-xs tracking-[0.1em] text-white/60">
                        CHRISTMAS DAY: CLOSED | NEW YEAR'S DAY: CLOSED
                    </p>
                    <p className="text-[10px] md:text-xs tracking-[0.1em] text-white/40 mt-8">
                        COPYRIGHT 2026 | DEVELOPED BY ARTISIO TEAM
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
