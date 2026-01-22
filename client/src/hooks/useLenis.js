/**
 * useLenis - Smooth scroll hook using Lenis
 * Provides butter-smooth scrolling like Adachi website
 */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize Lenis smooth scroll
 * @param {object} options - Lenis options
 * @returns {object} - lenis instance ref
 */
export const useLenis = (options = {}) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            ...options,
        });

        lenisRef.current = lenis;

        // Sync with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // RAF loop
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Add lenis class to html
        document.documentElement.classList.add('lenis');

        // Cleanup
        return () => {
            lenis.destroy();
            document.documentElement.classList.remove('lenis');
        };
    }, []);

    return lenisRef;
};

/**
 * Scroll to element or position
 * @param {object} lenisRef - Lenis ref from useLenis
 */
export const useScrollTo = (lenisRef) => {
    const scrollTo = (target, options = {}) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target, {
                offset: 0,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                ...options,
            });
        }
    };

    return scrollTo;
};

export default useLenis;
