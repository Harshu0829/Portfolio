import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Detect if mobile device
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const mobile = /android|ipad|iphone|ipod/i.test(userAgent) || window.innerWidth < 768;
        setIsMobile(mobile);
        if (mobile) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (!target) return;
            
            const isInteractive = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                target.closest('.interactive') ||
                target.classList.contains('clickable');
            
            setIsHovering(!!isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

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
