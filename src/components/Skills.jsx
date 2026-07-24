import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Layout, Server, Terminal, Cpu, Database, 
    GitBranch, Cloud, Brain, Code2, Sparkles, BarChart3, Shield
} from 'lucide-react';

const Skills = () => {
    const categories = [
        { id: 'languages', name: 'Languages' },
        { id: 'frontend', name: 'Frontend' },
        { id: 'backend', name: 'Backend' },
        { id: 'tools', name: 'Tools & DevOps' },
        { id: 'ai', name: 'AI/ML' }
    ];

    const [activeTab, setActiveTab] = useState('languages');

    const skillsData = {
        languages: [
            { name: 'C++', icon: <Code2 size={24} />, level: 'Advanced / DS & Alg' },
            { name: 'Python', icon: <Terminal size={24} />, level: 'Proficient / Scripting' },
            { name: 'Java', icon: <Cpu size={24} />, level: 'Proficient / OOP' },
            { name: 'JavaScript', icon: <Terminal size={24} />, level: 'Advanced / ES6+' },
            { name: 'SQL', icon: <Database size={24} />, level: 'Proficient' }
        ],
        frontend: [
            { name: 'React.js', icon: <Layout size={24} />, level: 'Advanced' },
            { name: 'JavaScript (DOM)', icon: <Terminal size={24} />, level: 'Advanced' },
            { name: 'CSS3 / Vanilla CSS', icon: <Layout size={24} />, level: 'Advanced' },
            { name: 'Tailwind CSS', icon: <Layout size={24} />, level: 'Proficient' },
            { name: 'Framer Motion', icon: <Sparkles size={24} />, level: 'Proficient / UI' }
        ],
        backend: [
            { name: 'Node.js', icon: <Server size={24} />, level: 'Proficient' },
            { name: 'Express.js', icon: <Cpu size={24} />, level: 'Proficient' },
            { name: 'MongoDB', icon: <Database size={24} />, level: 'Proficient / Document Store' },
            { name: 'PostgreSQL', icon: <Database size={24} />, level: 'Proficient / Relational' },
            { name: 'SQLite', icon: <Database size={24} />, level: 'Proficient' }
        ],
        tools: [
            { name: 'Git & GitHub', icon: <GitBranch size={24} />, level: 'Advanced' },
            { name: 'Docker', icon: <Cpu size={24} />, level: 'Familiar' },
            { name: 'AWS Cloud', icon: <Cloud size={24} />, level: 'Familiar' },
            { name: 'REST APIs', icon: <Server size={24} />, level: 'Advanced' }
        ],
        ai: [
            { name: 'OpenAI API Integration', icon: <Brain size={24} />, level: 'Proficient / LLMs' },
            { name: 'TensorFlow', icon: <Cpu size={24} />, level: 'Familiar / Deep Learning' },
            { name: 'Data Analysis', icon: <BarChart3 size={24} />, level: 'Proficient / Pandas' },
            { name: 'Model Deployment', icon: <Cloud size={24} />, level: 'Familiar' }
        ]
    };

    return (
        <section id="skills">
            <h2 className="section-title">
                <span className="section-number">02</span> Skills & Toolkit
            </h2>

            {/* Category Tabs */}
            <div className="skills-tab-bar">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`skill-tab-btn clickable ${activeTab === cat.id ? 'active' : ''}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Tab Content Panels */}
            <div style={{ minHeight: '280px' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="skills-grid"
                    >
                        {skillsData[activeTab].map((skill, idx) => (
                            <motion.div
                                key={skill.name}
                                className="custom-card skill-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: idx * 0.05 }}
                            >
                                <div className="skill-icon-wrapper">
                                    {skill.icon}
                                </div>
                                <div className="skill-info">
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-level">{skill.level}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Skills;
