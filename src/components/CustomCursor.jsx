import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/* Run the mobile check synchronously so the very first render is correct. */
const detectMobile = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return /android|ipad|iphone|ipod/i.test(ua) || window.innerWidth < 768;
};

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(detectMobile);   // ← no longer starts as `true`

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    /* Re-check on window resize (e.g. DevTools open/close) */
    useEffect(() => {
        const handleResize = () => setIsMobile(detectMobile());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /* Cursor tracking — only on non-mobile */
    useEffect(() => {
        if (isMobile) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (!target) return;

            const isInteractive =
                target.tagName === 'A'          ||
                target.tagName === 'BUTTON'     ||
                target.closest('a')             ||
                target.closest('button')        ||
                target.closest('.interactive')  ||
                target.closest('.custom-card')  ||
                target.closest('.profile-frame')||
                target.closest('.featured-card')||
                target.classList.contains('clickable');

            setIsHovering(!!isInteractive);
        };

        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isMobile, cursorX, cursorY]);

    if (isMobile) return null;

    return (
        <>
            {/* Outer Ring */}
            <motion.div
                className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: springX,
                    top: springY,
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="custom-cursor-dot"
                style={{
                    left: cursorX,
                    top: cursorY,
                }}
            />
        </>
    );
};

export default CustomCursor;
