import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, FileText, Code } from 'lucide-react';
import RippleButton from './RippleButton';

const Hero = () => {
    const roles = ["Full-Stack Dev", "MERN Specialist", "CS Undergrad"];
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter effect
    useEffect(() => {
        let timer;
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = isDeleting ? 30 : 80;

        if (!isDeleting && displayedText === currentRole) {
            timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before starting deletion
        } else if (isDeleting && displayedText === '') {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timer = setTimeout(() => {
                setDisplayedText(prev => 
                    isDeleting 
                        ? currentRole.substring(0, prev.length - 1)
                        : currentRole.substring(0, prev.length + 1)
                );
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentRoleIndex]);

    return (
        <section id="home">
            <div className="hero-container">
                {/* Left side content */}
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="badge-live">
                            <div className="pulse-dot"></div>
                            <span>Software Eng. Intern @ Deloitte</span>
                        </div>
                    </motion.div>

                    <motion.h1 
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        Harsh <span className="gradient-accent">Killedar</span>
                    </motion.h1>

                    <motion.div
                        className="hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)' }}
                    >
                        <span>I am a</span>
                        <span style={{ color: 'var(--primary)', borderRight: '2px solid var(--primary)', paddingRight: '4px', minWidth: '10px' }}>
                            {displayedText}
                        </span>
                    </motion.div>

                    <motion.p 
                        className="hero-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        I build scalable, high-performance web applications and design clean systems. Passionate about writing beautiful frontend logic and robust backend structures.
                    </motion.p>

                    <motion.div 
                        className="button-group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <a href="#projects" className="btn-primary clickable">
                            <span>See Work</span>
                            <ArrowDown size={16} />
                        </a>
                        <a href="#contact" className="btn-secondary clickable">
                            <span>Reach Out</span>
                            <Code size={16} />
                        </a>
                    </motion.div>

                    {/* Inline Stats Row */}
                    <motion.div 
                        className="facts-row"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="fact-item">
                            <span className="fact-num">8.2</span>
                            <span className="fact-label">CGPA Academics</span>
                        </div>
                        <div className="fact-item">
                            <span className="fact-num">4+</span>
                            <span className="fact-label">Completed Projects</span>
                        </div>
                        <div className="fact-item">
                            <span className="fact-num">3+</span>
                            <span className="fact-label">Global Certs</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right side profile frame */}
                <motion.div 
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="profile-frame">
                        <img 
                            src="/profile.jpg" 
                            alt="Harsh Killedar standing in front of car" 
                            className="profile-img" 
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
