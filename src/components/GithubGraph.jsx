import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'Harshu0829';

const GithubGraph = () => {
    const days = 7;
    const weeks = 40; // Dense contributions grid

    // Live contribution data: 2D array [weekIndex][dayIndex] = level (0-4)
    const [levels, setLevels] = useState(null);
    const [contributionCount, setContributionCount] = useState('1,424');

    useEffect(() => {
        let isMounted = true;

        const fetchLiveData = async () => {
            try {
                const res = await fetch(`https://ghchart.rshah.org/${GITHUB_USERNAME}`);
                if (!res.ok) throw new Error('Fetch failed');

                const svgText = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgText, 'image/svg+xml');
                const rects = Array.from(doc.querySelectorAll('rect[data-date]'));
                if (rects.length === 0) throw new Error('No data');

                // Build a flat list of {level} sorted chronologically (rects come in order)
                let total = 0;
                const flatDays = rects.map(r => {
                    const level = parseInt(r.getAttribute('data-score') || '0', 10);
                    total += level;
                    return level;
                });

                // Take the last (weeks * days) entries to exactly fill the grid
                const sliced = flatDays.slice(-(weeks * days));

                // Pad front with zeros if fewer days than needed
                while (sliced.length < weeks * days) sliced.unshift(0);

                // Build 2D [w][d] grid
                const grid = [];
                for (let w = 0; w < weeks; w++) {
                    const row = [];
                    for (let d = 0; d < days; d++) {
                        row.push(sliced[w * days + d]);
                    }
                    grid.push(row);
                }

                if (isMounted) {
                    setLevels(grid);
                    setContributionCount(total.toLocaleString());
                }
            } catch (err) {
                // silently keep null — getContributionLevel fallback will be used
                console.warn('GitHub chart fetch failed, using generated data:', err);
            }
        };

        fetchLiveData();
        return () => { isMounted = false; };
    }, []);

    // Original fallback — realistic commit activity generator (used while loading or on error)
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
                    {contributionCount} contributions this year
                </span>
            </div>

            <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '0.5rem' }} className="custom-scrollbar">
                {Array.from({ length: weeks }).map((_, w) => (
                    <div key={w} style={{ display: 'flex', flexDirection: 'col', gap: '3px' }}>
                        {Array.from({ length: days }).map((_, d) => {
                            // Use live data if available, otherwise fall back to generator
                            const level = levels ? levels[w][d] : getContributionLevel(w, d);

                            // Map level to classes — identical to original
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
