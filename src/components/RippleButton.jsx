import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RippleButton = ({ children, onClick, className, style }) => {
    const [ripples, setRipples] = useState([]);

    const createRipple = (event) => {
        const button = event.currentTarget.getBoundingClientRect();
        const size = button.width > button.height ? button.width : button.height;
        const x = event.clientX - button.left - size / 2;
        const y = event.clientY - button.top - size / 2;

        const newRipple = {
            x,
            y,
            size,
            id: Date.now(),
        };

        setRipples([...ripples, newRipple]);
        if (onClick) onClick(event);
    };

    const removeRipple = (id) => {
        setRipples(ripples.filter((ripple) => ripple.id !== id));
    };

    return (
        <button
            className={`relative overflow-hidden ${className}`}
            onClick={createRipple}
            style={{ ...style }}
        >
            <span className="relative z-10">{children}</span>
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    onAnimationComplete={() => removeRipple(ripple.id)}
                    style={{
                        position: 'absolute',
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        pointerEvents: 'none',
                    }}
                />
            ))}
        </button>
    );
};

export default RippleButton;
