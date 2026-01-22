/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Adachi-inspired dark palette
                primary: {
                    DEFAULT: '#1A4D4D',      // Rich teal
                    dark: '#0A2E2E',          // Deep teal-black (main background)
                    light: '#2A6B6B',         // Lighter teal
                    darker: '#061F1F',        // Darkest teal
                },
                secondary: {
                    DEFAULT: '#D4AF37',       // Antique gold
                    light: '#E5C158',         // Lighter gold
                    dark: '#B8962D',          // Darker gold
                },
                accent: {
                    cream: '#F8F6F0',         // Warm cream (text on dark)
                    beige: '#E8E4DB',         // Light beige
                    sage: '#8B9D83',          // Soft sage green
                },
                neutral: {
                    white: '#FFFFFF',
                    offWhite: '#FAF9F6',
                    charcoal: '#1C1C1C',
                    gray: '#6B6B6B',
                    darkGray: '#2D2D2D',
                },
            },
            fontFamily: {
                display: ['Playfair Display', 'Georgia', 'serif'],
                heading: ['Cinzel', 'Georgia', 'serif'],
                body: ['Montserrat', 'Inter', 'sans-serif'],
                accent: ['Italiana', 'Georgia', 'serif'],
            },
            fontSize: {
                'hero': 'clamp(3.5rem, 8vw, 9rem)',
                'display': 'clamp(2.5rem, 6vw, 6rem)',
                'h1': 'clamp(2rem, 5vw, 4.5rem)',
                'h2': 'clamp(1.75rem, 4vw, 3.5rem)',
                'h3': 'clamp(1.5rem, 3vw, 2.5rem)',
                'body-lg': 'clamp(1.125rem, 2vw, 1.375rem)',
            },
            letterSpacing: {
                'tighter': '-0.02em',
                'wide': '0.05em',
                'wider': '0.1em',
                'widest': '0.15em',
            },
            lineHeight: {
                'tight': '1.1',
                'snug': '1.3',
                'relaxed': '1.75',
                'loose': '2',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
                'slide-in-right': 'slideInRight 0.6s ease-out forwards',
                'scale-in': 'scaleIn 0.4s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'subtle-zoom': 'subtleZoom 20s ease-in-out infinite alternate',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-60px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(60px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                subtleZoom: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
            transitionDuration: {
                'fast': '200ms',
                'base': '400ms',
                'slow': '600ms',
                'slower': '800ms',
                'slowest': '1200ms',
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
                'expo-in': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
                'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
            boxShadow: {
                'soft': '0 4px 24px rgba(0, 0, 0, 0.06)',
                'medium': '0 8px 40px rgba(0, 0, 0, 0.12)',
                'hard': '0 16px 64px rgba(0, 0, 0, 0.18)',
                'glow': '0 0 40px rgba(212, 175, 55, 0.3)',
                'glow-sm': '0 0 20px rgba(212, 175, 55, 0.2)',
            },
            backdropBlur: {
                'xs': '2px',
                'sm': '4px',
                'md': '8px',
                'lg': '16px',
                'xl': '24px',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
                '36': '9rem',
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
        },
    },
    plugins: [],
}
