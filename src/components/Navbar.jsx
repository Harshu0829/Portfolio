import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Github, Linkedin, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
        const observers = sections.map(id => {
            const el = document.getElementById(id);
            if (!el) return null;
            
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setActiveSection(id);
                }
            }, {
                rootMargin: '-30% 0px -60% 0px'
            });
            observer.observe(el);
            return { observer, el };
        }).filter(Boolean);

        return () => {
            observers.forEach(obs => obs.observer.unobserve(obs.el));
        };
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    // Close menu on scroll
    useEffect(() => {
        if (menuOpen) {
            const close = () => setMenuOpen(false);
            window.addEventListener('scroll', close, { once: true });
            return () => window.removeEventListener('scroll', close);
        }
    }, [menuOpen]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Skills', href: '#skills', id: 'skills' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    const handleNavClick = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header>
            <nav className={`navbar-pill ${scrolled ? 'scrolled' : ''}`} ref={menuRef}>
                {/* Logo */}
                <a 
                    href="#home" 
                    className="nav-link"
                    style={{ fontStyle: 'italic', fontWeight: 800, color: 'var(--primary)', flexShrink: 0 }}
                >
                    HK.
                </a>

                {/* Desktop nav links */}
                {!isMobile && (
                    <>
                        {navLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.href}
                                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                            >
                                {link.name}
                            </a>
                        ))}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderLeft: '1px solid var(--border)', paddingLeft: '0.75rem' }}>
                            <button 
                                onClick={toggleTheme} 
                                className="clickable"
                                style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}
                            >
                                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                            
                            <a 
                                href="https://github.com/Harshu0829" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="clickable"
                                style={{ color: 'var(--text-secondary)', display: 'flex' }}
                            >
                                <Github size={16} />
                            </a>
                            
                            <a 
                                href="https://www.linkedin.com/in/harsh-killedar-939a1b343" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="clickable"
                                style={{ color: 'var(--text-secondary)', display: 'flex' }}
                            >
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </>
                )}

                {/* Mobile right side — theme toggle + hamburger */}
                {isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
                        <button 
                            onClick={toggleTheme} 
                            className="clickable"
                            style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '0.35rem' }}
                        >
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                        <button
                            onClick={() => setMenuOpen(prev => !prev)}
                            className="clickable"
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.35rem',
                            }}
                            aria-label="Toggle navigation menu"
                        >
                            {menuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                )}
            </nav>

            {/* Mobile dropdown menu */}
            <AnimatePresence>
                {isMobile && menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'fixed',
                            top: '4.25rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'calc(100vw - 2rem)',
                            maxWidth: '420px',
                            background: 'var(--bg-primary)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid var(--border)',
                            borderRadius: '16px',
                            zIndex: 99,
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
                        }}
                    >
                        {navLinks.map((link, idx) => (
                            <motion.a
                                key={link.id}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1rem 1.5rem',
                                    color: activeSection === link.id ? 'var(--primary)' : 'var(--text-secondary)',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    textDecoration: 'none',
                                    borderBottom: idx < navLinks.length - 1 ? '1px solid var(--border)' : 'none',
                                    background: activeSection === link.id ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                                    transition: 'background 0.2s',
                                }}
                            >
                                <span>{link.name}</span>
                                {activeSection === link.id && (
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
                                )}
                            </motion.a>
                        ))}

                        {/* Social row */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            padding: '1rem',
                            borderTop: '1px solid var(--border)',
                        }}>
                            <a 
                                href="https://github.com/Harshu0829" 
                                target="_blank" 
                                rel="noreferrer" 
                                onClick={() => setMenuOpen(false)}
                                style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                            >
                                <Github size={16} /> GitHub
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/harsh-killedar-939a1b343" 
                                target="_blank" 
                                rel="noreferrer"
                                onClick={() => setMenuOpen(false)}
                                style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                            >
                                <Linkedin size={16} /> LinkedIn
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
