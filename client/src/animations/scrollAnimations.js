/**
 * GSAP Scroll Animations - Adachi-inspired effects
 * Provides reusable scroll-triggered animations
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize fade-in animation on scroll
 * @param {string} selector - CSS selector for elements
 * @param {object} options - Animation options
 */
export const initFadeIn = (selector, options = {}) => {
    const defaults = {
        y: 60,
        duration: 1.2,
        stagger: 0.15,
        start: 'top 85%',
    };

    const config = { ...defaults, ...options };

    gsap.utils.toArray(selector).forEach((element) => {
        gsap.fromTo(
            element,
            {
                opacity: 0,
                y: config.y,
            },
            {
                opacity: 1,
                y: 0,
                duration: config.duration,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: config.start,
                    end: 'top 65%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
};

/**
 * Initialize parallax effect
 * @param {string} selector - CSS selector for elements
 * @param {number} speed - Parallax speed (0.1 - 1)
 */
export const initParallax = (selector, speed = 0.3) => {
    gsap.utils.toArray(selector).forEach((element) => {
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
    });
};

/**
 * Initialize image reveal with mask
 * @param {string} selector - CSS selector for image containers
 */
export const initImageReveal = (selector) => {
    gsap.utils.toArray(selector).forEach((container) => {
        const mask = container.querySelector('.image-mask');
        const image = container.querySelector('img');

        if (!mask || !image) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });

        tl.fromTo(
            mask,
            { scaleY: 1, transformOrigin: 'top' },
            { scaleY: 0, duration: 1.2, ease: 'power3.inOut' }
        ).fromTo(
            image,
            { scale: 1.3 },
            { scale: 1, duration: 1.2, ease: 'power3.inOut' },
            0
        );
    });
};

/**
 * Initialize staggered text reveal
 * @param {string} selector - CSS selector for text elements
 */
export const initTextReveal = (selector) => {
    gsap.utils.toArray(selector).forEach((text) => {
        // Split text into words
        const words = text.textContent.split(' ');
        text.innerHTML = words
            .map((word) => `<span class="word" style="display: inline-block; overflow: hidden;"><span class="word-inner" style="display: inline-block;">${word}</span></span>`)
            .join(' ');

        const wordInners = text.querySelectorAll('.word-inner');

        gsap.fromTo(
            wordInners,
            { y: '100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                stagger: 0.05,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
};

/**
 * Initialize horizontal scroll section
 * @param {string} containerSelector - Container element selector
 * @param {string} trackSelector - Scrolling track selector
 */
export const initHorizontalScroll = (containerSelector, trackSelector) => {
    const container = document.querySelector(containerSelector);
    const track = document.querySelector(trackSelector);

    if (!container || !track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        },
    });
};

/**
 * Initialize scale-in animation
 * @param {string} selector - CSS selector for elements
 */
export const initScaleIn = (selector) => {
    gsap.utils.toArray(selector).forEach((element) => {
        gsap.fromTo(
            element,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
};

/**
 * Initialize slide-in from side
 * @param {string} selector - CSS selector
 * @param {string} direction - 'left' or 'right'
 */
export const initSlideIn = (selector, direction = 'left') => {
    const xStart = direction === 'left' ? -80 : 80;

    gsap.utils.toArray(selector).forEach((element) => {
        gsap.fromTo(
            element,
            { opacity: 0, x: xStart },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );
    });
};

/**
 * Initialize counter animation
 * @param {string} selector - CSS selector for number elements
 */
export const initCounter = (selector) => {
    gsap.utils.toArray(selector).forEach((element) => {
        const target = parseInt(element.textContent.replace(/,/g, ''), 10);

        gsap.fromTo(
            element,
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                onUpdate: function () {
                    element.textContent = Math.round(this.targets()[0].textContent).toLocaleString();
                },
            }
        );
    });
};

/**
 * Cleanup all ScrollTrigger instances
 */
export const cleanupScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

/**
 * Refresh ScrollTrigger (call after DOM updates)
 */
export const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger };
