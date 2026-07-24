import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CornerDownLeft, Command, User, Cpu, Layers, Briefcase, Mail, Copy, Sparkles } from 'lucide-react';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const boxRef = useRef(null);

    const items = [
        { id: 'about', label: 'Go to About Me', icon: <User size={16} />, action: () => scrollToSection('about') },
        { id: 'skills', label: 'Go to Skills & Toolkit', icon: <Cpu size={16} />, action: () => scrollToSection('skills') },
        { id: 'projects', label: 'Go to Featured Projects', icon: <Layers size={16} />, action: () => scrollToSection('projects') },
        { id: 'experience', label: 'Go to Career Journey', icon: <Briefcase size={16} />, action: () => scrollToSection('experience') },
        { id: 'contact', label: 'Go to Contact', icon: <Mail size={16} />, action: () => scrollToSection('contact') },
        { 
            id: 'email', 
            label: 'Copy Email Address', 
            icon: <Copy size={16} />, 
            action: () => {
                navigator.clipboard.writeText("harshskilledar@gmail.com");
                alert("Email copied to clipboard!");
            } 
        },
        {
            id: 'theme',
            label: 'Toggle Dark/Light Theme',
            icon: <Sparkles size={16} />,
            action: () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.body.className = nextTheme === 'dark' ? 'dark-theme' : 'light-theme';
                document.documentElement.setAttribute('data-theme', nextTheme);
                localStorage.setItem('theme', nextTheme);
            }
        }
    ];

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Toggle on Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Filtered items based on search input
    const filteredItems = items.filter(item => 
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    // Keyboard navigation within list
    useEffect(() => {
        if (!isOpen) return;

        const handleNav = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    filteredItems[selectedIndex].action();
                    setIsOpen(false);
                    setSearch('');
                }
            }
        };

        window.addEventListener('keydown', handleNav);
        return () => window.removeEventListener('keydown', handleNav);
    }, [isOpen, filteredItems, selectedIndex]);

    // Reset selection index when search matches change
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    // Handle clicks outside the box to close
    const handleOverlayClick = (e) => {
        if (boxRef.current && !boxRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Global keyboard trigger floating hint bottom right */}
            <div 
                onClick={() => setIsOpen(true)}
                className="custom-card clickable command-palette-hint-wrapper"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    padding: '0.6rem 1rem',
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    zIndex: 90,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)'
                }}
            >
                <Command size={12} />
                <span>+ K</span>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="command-palette-overlay" onClick={handleOverlayClick}>
                        <div className="command-palette-box" ref={boxRef}>
                            {/* Input Area */}
                            <div className="command-input-wrapper">
                                <Search size={18} style={{ color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Type a command or search..."
                                    className="command-input"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoFocus
                                />
                                <span className="command-badge">ESC</span>
                            </div>

                            {/* Results list */}
                            <div className="command-results custom-scrollbar">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className={`command-item clickable ${selectedIndex === idx ? 'selected' : ''}`}
                                            onClick={() => {
                                                item.action();
                                                setIsOpen(false);
                                                setSearch('');
                                            }}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                        >
                                            <div className="command-item-left">
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </div>
                                            {selectedIndex === idx && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                                                    <span>Select</span>
                                                    <CornerDownLeft size={10} />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        No matching commands found.
                                    </div>
                                )}
                            </div>

                            {/* Footer hint info */}
                            <div className="command-footer">
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <span>↑↓ Navigate</span>
                                    <span>Enter Select</span>
                                </div>
                                <span>Press Ctrl+K to close</span>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CommandPalette;
