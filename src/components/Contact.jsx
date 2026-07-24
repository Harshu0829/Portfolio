import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "harshskilledar@gmail.com";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        {
            name: "GitHub",
            handle: "@Harshu0829",
            url: "https://github.com/Harshu0829",
            icon: <Github size={20} />
        },
        {
            name: "LinkedIn",
            handle: "Harsh Killedar",
            url: "https://www.linkedin.com/in/harsh-killedar-939a1b343",
            icon: <Linkedin size={20} />
        }
    ];

    return (
        <section id="contact" style={{ paddingBottom: '12rem' }}>
            <h2 className="section-title">
                <span className="section-number">05</span> Contact
            </h2>

            <div className="contact-grid">
                {/* Left side info */}
                <div>
                    <h3 className="contact-headline">Let's build <br />something great.</h3>
                    <p className="contact-description">
                        I am currently available for software engineering internships, entry-level developer positions, and collaborative open-source projects. Feel free to reach out.
                    </p>

                    {/* Email Copy Box */}
                    <div 
                        className="email-copy-wrapper clickable" 
                        onClick={copyToClipboard}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Mail size={18} style={{ color: 'var(--primary)' }} />
                            <span className="email-val">{email}</span>
                        </div>
                        
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.div 
                                    key="copied"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="copy-hint"
                                    style={{ color: '#10b981' }}
                                >
                                    <Check size={14} style={{ marginRight: '2px', display: 'inline-block', verticalAlign: 'middle' }} />
                                    <span>Copied</span>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="copy"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="copy-hint"
                                >
                                    <Copy size={14} style={{ marginRight: '2px', display: 'inline-block', verticalAlign: 'middle' }} />
                                    <span>Copy</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Phone & Location details */}
                    <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                            <Phone size={18} />
                            <span style={{ fontFamily: 'var(--font-mono)' }}>+91-9764140255</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                            <MapPin size={18} />
                            <span>Kolhapur, Maharashtra, India</span>
                        </div>
                    </div>
                </div>

                {/* Right side socials */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>Connect on Socials</h4>
                    <div className="socials-grid">
                        {socials.map((social) => (
                            <a 
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="custom-card social-card clickable"
                            >
                                <div style={{ color: 'var(--primary)' }}>{social.icon}</div>
                                <div className="social-info">
                                    <span className="social-name">{social.name}</span>
                                    <span className="social-handle">{social.handle}</span>
                                </div>
                                <ArrowUpRight size={14} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
