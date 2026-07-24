import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Database, Users } from 'lucide-react';

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
            description: "A comprehensive MERN stack web application integrated with OpenAI API and Computer Vision models. It performs visual food recognition and outputs highly granular nutritional values, tracking logs, and historical macro breakdowns for health-conscious users.",
            category: "web",
            metrics: [
                { value: "85% Accuracy", label: "Recognition" },
                { value: "<500ms Response", label: "Latency" },
            ],
            tech: ["MongoDB", "Express.js", "React.js", "Node.js", "OpenAI Vision API", "CSS Grid"],
            github: "https://github.com/Harshu0829",
            live: "https://apex-fitforge.vercel.app/",
            featured: true,
        },
        {
            title: "Employee CRUD Database",
            description: "A low-level C-based management application utilizing raw data structures and custom index systems to optimize record-keeping. Integrates direct SQL operations for highly efficient query processing, securing absolute transactional durability.",
            category: "systems",
            metrics: [
                { value: "<10ms Query", label: "Read/Write" },
                { value: "100% Integrity", label: "Durability" },
            ],
            tech: ["C Language", "SQLite", "Data Structures", "Pointers"],
            github: "https://github.com/Harshu0829",
            live: "#",
            featured: false,
        },
        {
            title: "Python Study Tracker",
            description: "A graphical desktop utility written in Python using Tkinter and SQLite. Provides dynamic graphs to log study hours, categorize topics, and analyze productivity metrics over time. Uses custom canvas animations to keep layout feeling human.",
            category: "systems",
            metrics: [
                { value: "30+ Hours Logged", label: "Tracking Capacity" },
                { value: "Zero Memory Leak", label: "Optimization" },
            ],
            tech: ["Python", "Tkinter", "SQLite DB", "Matplotlib"],
            github: "https://github.com/Harshu0829",
            live: "#",
            featured: false,
        },
    ];

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

                {/* Secondary Cards Grid */}
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
                                        {p.category === 'systems' ? <Database size={24} /> : <Users size={24} />}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <a href={p.github} target="_blank" rel="noreferrer" className="clickable" style={{ color: 'var(--text-secondary)' }}><Github size={16} /></a>
                                        <a href={p.live} className="clickable" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={16} /></a>
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
            </div>
        </section>
    );
};

export default Projects;
