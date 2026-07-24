import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Github, Linkedin } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                rootMargin: '-30% 0px -60% 0px' // Adjust thresholds so active changes nicely as we scroll
            });
            observer.observe(el);
            return { observer, el };
        }).filter(Boolean);

        return () => {
            observers.forEach(obs => obs.observer.unobserve(obs.el));
        };
    }, []);

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

    return (
        <header>
            <nav className={`navbar-pill ${scrolled ? 'scrolled' : ''}`}>
                <a 
                    href="#home" 
                    className="nav-link"
                    style={{ fontStyle: 'italic', fontWeight: 800, color: 'var(--primary)' }}
                >
                    HK.
                </a>

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
            </nav>
        </header>
    );
};

export default Navbar;
