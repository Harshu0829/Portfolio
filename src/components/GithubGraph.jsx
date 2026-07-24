import React from 'react';
import { motion } from 'framer-motion';

const GithubGraph = () => {
    const days = 7;
    const weeks = 40; // Dense contributions grid

    // realistic commit activity generator
    const getContributionLevel = (weekIndex, dayIndex) => {
        // Weekends have fewer commits generally (Saturday = 6, Sunday = 0)
        if (dayIndex === 0 || dayIndex === 6) {
            if (Math.random() > 0.8) return 1;
            return 0;
        }

        // Intense project cycles (e.g. week 5-8, 15-20, 30-35)
        const inCycle = (weekIndex >= 5 && weekIndex <= 8) || 
                        (weekIndex >= 15 && weekIndex <= 20) || 
                        (weekIndex >= 30 && weekIndex <= 34);

        if (inCycle) {
            const r = Math.random();
            if (r > 0.9) return 4;
            if (r > 0.6) return 3;
            if (r > 0.3) return 2;
            return 1;
        }

        // Standard coding week
        const r = Math.random();
        if (r > 0.95) return 3;
        if (r > 0.8) return 2;
        if (r > 0.4) return 1;
        return 0;
    };

    return (
        <div className="custom-card github-card" style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700 }}>GitHub Activity</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Commits, pull requests, and code reviews</p>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                    1,424 contributions this year
                </span>
            </div>
            
            <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '0.5rem' }} className="custom-scrollbar">
                {Array.from({ length: weeks }).map((_, w) => (
                    <div key={w} style={{ display: 'flex', flexDirection: 'col', gap: '3px' }}>
                        {Array.from({ length: days }).map((_, d) => {
                            const level = getContributionLevel(w, d);
                            
                            // Map level to classes
                            let cellClass = 'contrib-cell';
                            if (level === 1) cellClass += ' contrib-l1';
                            else if (level === 2) cellClass += ' contrib-l2';
                            else if (level === 3) cellClass += ' contrib-l3';
                            else if (level === 4) cellClass += ' contrib-l4';

                            return (
                                <motion.div
                                    key={d}
                                    className={cellClass}
                                    style={{ width: '9px', height: '9px' }}
                                    whileHover={{ scale: 1.4, zIndex: 5 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>Less</span>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <div className="contrib-cell" style={{ width: '9px', height: '9px' }}></div>
                    <div className="contrib-cell contrib-l1" style={{ width: '9px', height: '9px' }}></div>
                    <div className="contrib-cell contrib-l2" style={{ width: '9px', height: '9px' }}></div>
                    <div className="contrib-cell contrib-l3" style={{ width: '9px', height: '9px' }}></div>
                    <div className="contrib-cell contrib-l4" style={{ width: '9px', height: '9px' }}></div>
                    <span style={{ marginLeft: '4px' }}>More</span>
                </div>
            </div>
        </div>
    );
};

export default GithubGraph;
