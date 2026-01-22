/**
 * useScrollAnimation - Hook for scroll-triggered animations
 * Uses GSAP ScrollTrigger for effects
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade in on scroll
 * @param {object} options - Animation options
 */
export const useFadeIn = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const config = {
            y: 60,
            duration: 1.2,
            start: 'top 85%',
            ...options,
        };

        gsap.fromTo(
            element,
            { opacity: 0, y: config.y },
            {
                opacity: 1,
                y: 0,
                duration: config.duration,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: config.start,
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll()
                .filter((t) => t.trigger === element)
                .forEach((t) => t.kill());
        };
    }, []);

    return ref;
};

/**
 * Scale in on scroll
 */
export const useScaleIn = (options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const config = {
            scale: 0.9,
            duration: 1,
            start: 'top 85%',
            ...options,
        };

        gsap.fromTo(
            element,
            { opacity: 0, scale: config.scale },
            {
                opacity: 1,
                scale: 1,
                duration: config.duration,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: config.start,
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll()
                .filter((t) => t.trigger === element)
                .forEach((t) => t.kill());
        };
    }, []);

    return ref;
};

/**
 * Slide in from left/right
 * @param {string} direction - 'left' or 'right'
 */
export const useSlideIn = (direction = 'left', options = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xStart = direction === 'left' ? -80 : 80;

        const config = {
            duration: 1.2,
            start: 'top 85%',
            ...options,
        };

        gsap.fromTo(
            element,
            { opacity: 0, x: xStart },
            {
                opacity: 1,
                x: 0,
                duration: config.duration,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: config.start,
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll()
                .filter((t) => t.trigger === element)
                .forEach((t) => t.kill());
        };
    }, [direction]);

    return ref;
};

/**
 * Parallax effect
 * @param {number} speed - Parallax speed (0.1 - 1)
 */
export const useParallax = (speed = 0.3) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.to(element, {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
        });

        return () => {
            ScrollTrigger.getAll()
                .filter((t) => t.trigger === element)
                .forEach((t) => t.kill());
        };
    }, [speed]);

    return ref;
};

export default { useFadeIn, useScaleIn, useSlideIn, useParallax };
