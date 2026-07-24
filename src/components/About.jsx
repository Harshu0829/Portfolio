import React from 'react';
import { motion } from 'framer-motion';
import GithubGraph from './GithubGraph';

const About = () => {
    const marqueeFacts = [
        "Deloitte Technology Simulation",
        "B.Tech CSE Undergrad",
        "8.2 CGPA Academic Excellence",
        "C++ • Python • Java • JavaScript",
        "MERN Stack Developer",
        "AI/ML Integration Enthusiast",
        "UI Craftsmanship First",
        "100% Query Database Integrity",
        "Open-source Contributor"
    ];

    return (
        <section id="about">
            <h2 className="section-title">
                <span className="section-number">01</span> About Me
            </h2>

            <div className="split-grid">
                {/* Left side: narrative */}
                <div className="about-text">
                    <p>
                        I'm a <span className="text-highlight">Computer Science Undergraduate</span> at Dr. A. D. Shinde College of Engineering, with a passion for designing and building polished, high-performance web products.
                    </p>
                    <p>
                        My experience includes completing a technology consulting and software engineering simulation with <span className="text-highlight">Deloitte</span>, which allowed me to understand enterprise architectures and client requirements.
                    </p>
                    <div className="about-quote">
                        "Great software isn't just code that works. It's code that is elegant, maintainable, and built with craftsmanship."
                    </div>
                    <p>
                        I specialize in full-stack JavaScript (the <span className="text-highlight">MERN stack</span>), systems programming in C++ and Java, and exploring AI integration to build smarter interfaces. I love tackling performance bottlenecks, database design, and sub-pixel details.
                    </p>
                </div>

                {/* Right side: specialties / facts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="custom-card">
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>Specialties</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                            {['Full-Stack Development', 'MERN Stack', 'System Architectures', 'AI API Integration', 'Data Structures', 'Git & Docker', 'PostgreSQL & MongoDB'].map((spec) => (
                                <span 
                                    key={spec} 
                                    className="tech-pill"
                                    style={{ background: 'rgba(139, 92, 246, 0.05)', borderColor: 'var(--border)' }}
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="custom-card">
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent)' }}>My Philosophy</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                            I build applications with a strong focus on clean architecture, minimal runtime overhead, and responsive animations. I believe a developer's personality should shine through in their creations.
                        </p>
                    </div>
                </div>
            </div>

            {/* GitHub Graph */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <GithubGraph />
            </motion.div>

            {/* Infinitely Scrolling Fact Marquee */}
            <div className="marquee-container">
                <div className="marquee-content">
                    {/* Double the list to create a seamless loop */}
                    {[...marqueeFacts, ...marqueeFacts].map((fact, idx) => (
                        <div className="marquee-item" key={idx}>
                            <span className="marquee-dot"></span>
                            <span>{fact}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
