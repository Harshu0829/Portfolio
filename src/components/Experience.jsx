import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            company: "Deloitte",
            role: "Technology Job Simulation Intern",
            period: "June - Dec 2025",
            icon: <Briefcase size={18} />,
            description: "Completed an immersive simulation of technology consulting roles. Focused on translating business problems into technological requirements, optimizing relational database architectures, mapping microservice communication workflows, and developing scalable MERN REST endpoints.",
            skills: ["Enterprise Architecture", "Consulting Principles", "RESTful Workflows", "Team Collaboration"]
        },
        {
            company: "Dr. A. D. Shinde College of Engg",
            role: "B.Tech Computer Science Undergraduate",
            period: "2024 - 2028",
            icon: <GraduationCap size={18} />,
            description: "Deep dive into core Computer Science paradigms. Actively studying data structures, object-oriented concepts, runtime analysis, and compiler design. Achieving academic excellence with a CGPA of 8.2.",
            skills: ["Data Structures", "Algorithms", "Relational Databases", "Systems Programming"]
        }
    ];

    const certifications = [
        {
            title: "CSS Training Certification",
            issuer: "EduPyramids, SINE, IIT Bombay",
            date: "April 2026",
            score: "Score: 95.00%",
            id: "4537473AFO"
        },
        {
            title: "Java Training Certification",
            issuer: "EduPyramids, SINE, IIT Bombay",
            date: "April 2026",
            score: "Score: 87.50%",
            id: "45374733RF"
        },
        {
            title: "HTML Training Certification",
            issuer: "EduPyramids, SINE, IIT Bombay",
            date: "December 2025",
            score: "Score: 90.00%",
            id: "4537473W3K"
        }
    ];

    return (
        <section id="experience">
            <div className="journey-container">
                {/* Timeline Section */}
                <div>
                    <h2 className="section-title">
                        <span className="section-number">04</span> Career Journey
                    </h2>

                    <div className="timeline-new">
                        {experiences.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                className="timeline-item-new"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                            >
                                <div className="timeline-dot-new"></div>
                                
                                <div className="timeline-header">
                                    <div>
                                        <span className="timeline-company">{exp.company}</span>
                                        <div className="timeline-role" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            {exp.icon}
                                            <span>{exp.role}</span>
                                        </div>
                                    </div>
                                    <span className="timeline-period">{exp.period}</span>
                                </div>

                                <p className="timeline-desc">{exp.description}</p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
                                    {exp.skills.map(skill => (
                                        <span key={skill} className="tech-pill">{skill}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certifications Sub-Section */}
                <div className="certs-section">
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <Award size={24} style={{ color: 'var(--accent)' }} />
                        <span>Academic Certifications</span>
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Verified credentials from EduPyramids, SINE, IIT Bombay simulations.</p>

                    <div className="certs-grid">
                        {certifications.map((cert, idx) => (
                            <motion.div
                                key={cert.id}
                                className="custom-card cert-card"
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                            >
                                <h4 className="cert-title">{cert.title}</h4>
                                <div className="cert-details">
                                    <p>{cert.issuer}</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>Issued: {cert.date} • ID: {cert.id}</p>
                                </div>
                                <span className="cert-score">{cert.score}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
