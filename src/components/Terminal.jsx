import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: 'Harsh Killedar Portfolio Shell v2.1' },
        { type: 'system', text: 'Type "help" for a list of available commands.' },
    ]);

    const commands = {
        help: () => 'Available commands: about, skills, projects, certs, contact, whoami, clear',
        about: () => 'Software Engineering Intern @ Deloitte | B.Tech CSE Undergrad | CGPA 8.2 | Full-Stack Enthusiast',
        whoami: () => 'guest@harshkilledar.dev - computer science student and software engineer builder.',
        skills: () => 'MERN (MongoDB, Express, React, Node), C++, Python, Java, SQL, REST APIs, Git, Docker, OpenAI API',
        certs: () => 'Verified: 1. CSS Training (95.0%)  2. Java Training (87.5%)  3. HTML Training (90.0%) - IIT Bombay tests.',
        projects: () => '1. Brew & Co Café (React+Supabase+Razorpay)  2. Food Nutrition Analyzer (MERN+AI)  3. Question Randomizer (MERN+TS)  4. Password Analyzer (Node+C++)  5. Study Tracker (Python)  6. Employee Management System (C)',
        contact: () => 'Email: harshskilledar@gmail.com | Phone: +91-9764140255 | GitHub: @Harshu0829',
        clear: () => {
            setHistory([]);
            return '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        setHistory(prev => [...prev, { type: 'user', text: `> ${input}` }]);

        if (commands[cmd]) {
            const output = commands[cmd]();
            if (output) {
                setHistory(prev => [...prev, { type: 'system', text: output }]);
            }
        } else if (cmd) {
            setHistory(prev => [...prev, { type: 'error', text: `shell: command not found: ${cmd}. Type "help" for commands.` }]);
        }

        setInput('');
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="clickable"
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '2rem',
                    padding: '1rem',
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)',
                    zIndex: 90,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <TerminalIcon size={20} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            bottom: '5.5rem',
                            left: '2rem',
                            width: 'min(420px, 90vw)',
                            height: '420px',
                            zIndex: 100,
                            backgroundColor: '#0c0c0e',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Terminal Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.75rem 1rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            borderBottom: '1px solid var(--border)'
                        }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>bash - guest@harshdev</span>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="clickable"
                                style={{ border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Terminal Logs */}
                        <div 
                            style={{
                                flexGrow: 1,
                                overflowY: 'auto',
                                padding: '1rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.8rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.4rem',
                                color: 'var(--text-secondary)'
                            }}
                            className="custom-scrollbar"
                        >
                            {history.map((line, i) => {
                                let color = 'var(--text-secondary)';
                                if (line.type === 'user') color = 'var(--primary)';
                                else if (line.type === 'error') color = 'var(--accent)';
                                
                                return (
                                    <div key={i} style={{ color }}>
                                        {line.text}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Terminal Input Form */}
                        <form 
                            onSubmit={handleSubmit}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1rem',
                                borderTop: '1px solid var(--border)',
                                backgroundColor: 'rgba(255, 255, 255, 0.01)'
                            }}
                        >
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold' }}>$</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a command (help, certs...)"
                                style={{
                                    flexGrow: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-primary)'
                                }}
                                autoFocus
                            />
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Terminal;
