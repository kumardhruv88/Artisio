/**
 * Cursor - Custom magnetic cursor component
 * Desktop only - hidden on touch devices
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if device supports hover (not touch)
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (!hasHover) return;

        setIsVisible(true);
    }, []);

    // Separate useEffect for GSAP animations - only runs when refs are available
    useEffect(() => {
        if (!isVisible) return;

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Safety check - don't run if refs are null
        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instant cursor update
            if (cursor) {
                gsap.to(cursor, {
                    x: mouseX,
                    y: mouseY,
                    duration: 0.1,
                    ease: 'power2.out',
                });
            }
        };

        // Follower animation loop
        const tickerCallback = () => {
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            if (follower) {
                gsap.set(follower, {
                    x: followerX,
                    y: followerY,
                });
            }
        };
        gsap.ticker.add(tickerCallback);

        // Interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, input, textarea, select, [data-cursor="pointer"]'
        );

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Add mouse move listener
        window.addEventListener('mousemove', handleMouseMove);

        // Handle mouse enter/leave window
        const handleDocMouseEnter = () => {
            if (cursor && follower) {
                gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
            }
        };

        const handleDocMouseLeave = () => {
            if (cursor && follower) {
                gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
            }
        };

        document.addEventListener('mouseenter', handleDocMouseEnter);
        document.addEventListener('mouseleave', handleDocMouseLeave);

        return () => {
            gsap.ticker.remove(tickerCallback);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleDocMouseEnter);
            document.removeEventListener('mouseleave', handleDocMouseLeave);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className={`
          fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]
          mix-blend-difference
          transition-all duration-300
          ${isHovering
                        ? 'w-16 h-16 bg-secondary/20'
                        : 'bg-secondary'
                    }
        `}
                style={{ transform: 'translate(-50%, -50%)' }}
            />

            {/* Follower ring */}
            <div
                ref={followerRef}
                className={`
          fixed top-0 left-0 rounded-full pointer-events-none z-[9998]
          border border-secondary
          transition-all duration-300
          ${isHovering
                        ? 'w-20 h-20 opacity-30'
                        : 'w-10 h-10 opacity-50'
                    }
        `}
                style={{ transform: 'translate(-50%, -50%)' }}
            />
        </>
    );
};

export default Cursor;
