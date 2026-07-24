import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Database, Users, ShieldCheck, KeyRound, Clock, Code2 } from 'lucide-react';

const previewImages = {
    "Brew & Co Café": "/preview-brew-hero.png",
    "Food Nutrition Analyzer": "/preview-fitforge-hero.png",
};

const featuredMeta = {
    "Brew & Co Café": "Full-Stack · Live on Vercel",
    "Food Nutrition Analyzer": "MERN Stack · AI Vision · Live on Vercel",
};

const Projects = () => {
    const categories = ['all', 'web', 'systems'];
    const [filter, setFilter] = useState('all');

    const projects = [
        {
            title: "Brew & Co Café",
            description: "A full-stack café management platform featuring online ordering, table reservation slots, and a loyalty points system. Engineered secure RESTful APIs with Razorpay SDK for transactional checkout, Helmet headers, CORS, and strict rate-limiting (10 req/min). Implements role-based access control (RBAC) for customers, staff, and owners using Supabase Auth JWTs, Zustand for global state, and a real-time Kitchen Display System (KDS) backed by PostgreSQL Row-Level Security (RLS) and automated SQL triggers.",
            category: "web",
            metrics: [
                { value: "3-Role RBAC", label: "Access Control" },
                { value: "Real-Time KDS", label: "Kitchen Display" },
                { value: "10 req/min", label: "Rate Limiting" },
            ],
            tech: ["React.js", "Vite", "Node.js", "Express.js", "Supabase", "PostgreSQL", "Razorpay", "Zustand", "Vercel"],
            github: "https://github.com/Harshu0829",
            live: "https://brew-co-cafe.vercel.app/",
            featured: true,
        },
        {
            title: "Food Nutrition Analyzer",
            description: "A comprehensive MERN stack web application that estimates nutritional values from food images using AI-based image analysis. Built RESTful APIs with Node.js & Express.js for food processing and user session management with modular architecture. Features an interactive React.js calorie dashboard, food search, and persistent MongoDB storage.",
            category: "web",
            metrics: [
                { value: "AI Vision", label: "Image Recognition" },
                { value: "<500ms Response", label: "API Latency" },
            ],
            tech: ["MongoDB", "Express.js", "React.js", "Node.js", "OpenAI Vision API", "CSS Grid", "Vercel"],
            github: "https://github.com/Harshu0829",
            live: "https://apex-fitforge.vercel.app/",
            featured: true,
        },
        {
            title: "Question Randomizer",
            description: "A full-stack web application that uniquely shuffles MCQ options and question order per student on every attempt, preventing academic dishonesty for classrooms with 30+ concurrent users. Built with stateless, horizontally scalable randomization logic using Node.js and Express.js RESTful APIs, paired with a React.js + TypeScript frontend and MongoDB storage.",
            category: "web",
            iconType: "shield",
            metrics: [
                { value: "30+ Users", label: "Concurrent Classroom" },
                { value: "Stateless", label: "Randomization Logic" },
            ],
            tech: ["MongoDB", "Express.js", "React.js", "Node.js", "TypeScript", "REST API"],
            github: "https://github.com/Harshu0829",
            live: "https://github.com/Harshu0829",
            featured: false,
        },
        {
            title: "Password Analyzer",
            description: "A web-based password strength analysis tool evaluating security in real time using a Node.js + Express.js backend with RESTful API endpoints achieving sub-100ms response latency. Integrated a C++ brute-force estimation module invoked via child process from Node.js to achieve ~10x faster crack-time calculation than pure JS.",
            category: "systems",
            iconType: "key",
            metrics: [
                { value: "~10x Faster", label: "C++ Child Process" },
                { value: "<100ms", label: "Response Latency" },
            ],
            tech: ["Node.js", "Express.js", "C++", "JavaScript", "HTML5", "CSS3"],
            github: "https://github.com/Harshu0829",
            live: "https://github.com/Harshu0829",
            featured: false,
        },
        {
            title: "Study Tracker",
            description: "A session-based study tracking application built to manage subjects and study durations with persistent JSON-based storage. Implements structured data-handling and problem-solving patterns to analyze productivity over time.",
            category: "systems",
            iconType: "clock",
            metrics: [
                { value: "Persistent JSON", label: "Data Storage" },
                { value: "Session Based", label: "Time Tracking" },
            ],
            tech: ["Python", "JSON File Storage", "Data Structures"],
            github: "https://github.com/Harshu0829",
            live: "https://github.com/Harshu0829",
            featured: false,
        },
        {
            title: "Employee Management System",
            description: "A modular, file-based employee management system developed in C with full CRUD operations, persistent file storage, custom data structures, and structured low-level programming practices.",
            category: "systems",
            iconType: "database",
            metrics: [
                { value: "Full CRUD", label: "File Operations" },
                { value: "Structured C", label: "Low-Level I/O" },
            ],
            tech: ["C Language", "File I/O", "Data Structures", "Pointers"],
            github: "https://github.com/Harshu0829",
            live: "https://github.com/Harshu0829",
            featured: false,
        },
    ];

    const getIcon = (iconType, category) => {
        switch (iconType) {
            case 'shield': return <ShieldCheck size={24} />;
            case 'key': return <KeyRound size={24} />;
            case 'clock': return <Clock size={24} />;
            case 'database': return <Database size={24} />;
            default:
                return category === 'systems' ? <Code2 size={24} /> : <Users size={24} />;
        }
    };

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const featuredProjects = filteredProjects.filter(p => p.featured);
    const nonFeaturedProjects = filteredProjects.filter(p => !p.featured);

    return (
        <section id="projects">
            <h2 className="section-title">
                <span className="section-number">03</span> Featured Work
            </h2>

            <div className="project-filter-bar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`project-filter-btn clickable ${filter === cat ? 'active' : ''}`}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="projects-layout">

                {/* Featured Cards — 2-column grid */}
                {featuredProjects.length > 0 && (
                    <div className="featured-grid">
                        <AnimatePresence>
                            {featuredProjects.map((p, idx) => (
                                <motion.div
                                    key={p.title}
                                    layout
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                                    className="featured-card"
                                >
                                    {/* ── Screenshot Banner ── */}
                                    {previewImages[p.title] && (
                                        <div className="featured-banner">
                                            <img
                                                src={previewImages[p.title]}
                                                alt={p.title + ' preview'}
                                            />
                                        </div>
                                    )}

                                    {/* ── Card Body ── */}
                                    <div className="featured-body">
                                        <div className="project-meta">{featuredMeta[p.title] ?? 'Featured Project'}</div>
                                        <h3 className="featured-title">{p.title}</h3>
                                        <p className="featured-desc">{p.description}</p>

                                        {/* Metrics */}
                                        <div className="featured-metrics">
                                            {p.metrics.map((m, i) => (
                                                <div className="featured-metric-item" key={i}>
                                                    <span className="spec-val">{m.value}</span>
                                                    <span className="spec-lbl">{m.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Pills */}
                                        <div className="project-tech-pills">
                                            {p.tech.map(t => (
                                                <span className="tech-pill" key={t}>{t}</span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="featured-actions">
                                            <a href={p.github} target="_blank" rel="noreferrer"
                                                className="btn-secondary clickable"
                                                style={{ padding: '0.55rem 1.1rem', fontSize: '0.82rem' }}>
                                                <Github size={14} /><span>Code</span>
                                            </a>
                                            <a href={p.live} target="_blank" rel="noreferrer"
                                                className="btn-primary clickable"
                                                style={{ padding: '0.55rem 1.1rem', fontSize: '0.82rem' }}>
                                                <ExternalLink size={14} /><span>Live Preview</span>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Secondary Cards Grid */}
                {nonFeaturedProjects.length > 0 && (
                    <motion.div layout className="projects-secondary-grid">
                        <AnimatePresence>
                            {nonFeaturedProjects.map((p, idx) => (
                                <motion.div
                                    key={p.title}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    className="custom-card project-card-small"
                                    style={{ display: 'flex', flexDirection: 'column' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div style={{ color: 'var(--primary)' }}>
                                            {getIcon(p.iconType, p.category)}
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <a href={p.github} target="_blank" rel="noreferrer" className="clickable" style={{ color: 'var(--text-secondary)' }}><Github size={16} /></a>
                                            {p.live && p.live !== '#' && (
                                                <a href={p.live} target="_blank" rel="noreferrer" className="clickable" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={16} /></a>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="project-title-small">{p.title}</h3>
                                    <p className="project-description-small">{p.description}</p>
                                    <div className="project-specs" style={{ marginBottom: '1.25rem', border: 'none', padding: '0' }}>
                                        {p.metrics.map((m, i) => (
                                            <div className="project-spec-item" key={i} style={{ marginRight: '1.5rem' }}>
                                                <span className="spec-val" style={{ fontSize: '1.05rem' }}>{m.value}</span>
                                                <span className="spec-lbl" style={{ fontSize: '0.65rem' }}>{m.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="project-tech-pills" style={{ marginBottom: '0', marginTop: 'auto' }}>
                                        {p.tech.map(t => (
                                            <span className="tech-pill" key={t}>{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
