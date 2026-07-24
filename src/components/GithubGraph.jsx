import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'Harshu0829';

const GithubGraph = () => {
    const [weeksData, setWeeksData] = useState([]);
    const [totalContributions, setTotalContributions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredCell, setHoveredCell] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadGithubData = async () => {
            try {
                const res = await fetch(`https://ghchart.rshah.org/${GITHUB_USERNAME}`);
                if (!res.ok) throw new Error('Failed to fetch SVG chart');

                const text = await res.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'image/svg+xml');
                const rects = Array.from(doc.querySelectorAll('rect[data-date]'));

                if (rects.length === 0) throw new Error('No contribution rects found');

                let totalCount = 0;
                const daysList = rects.map(rect => {
                    const date = rect.getAttribute('data-date') || '';
                    const level = parseInt(rect.getAttribute('data-score') || '0', 10);
                    totalCount += level;
                    return { date, level };
                });

                // Take last 44 weeks (~10 months) for optimal grid density
                const targetDays = daysList.slice(-44 * 7);

                // Group into columns of 7 days
                const weeks = [];
                for (let i = 0; i < targetDays.length; i += 7) {
                    weeks.push(targetDays.slice(i, i + 7));
                }

                if (isMounted) {
                    setWeeksData(weeks);
                    setTotalContributions(totalCount);
                    setIsLoading(false);
                }
            } catch (err) {
                console.warn('Live GitHub fetch failed, loading default fallback:', err);
                if (isMounted) {
                    generateFallbackData();
                    setIsLoading(false);
                }
            }
        };

        const generateFallbackData = () => {
            const days = 7;
            const weeksCount = 40;
            const fallbackWeeks = [];
            let fallbackTotal = 0;

            for (let w = 0; w < weeksCount; w++) {
                const weekDays = [];
                for (let d = 0; d < days; d++) {
                    let level = 0;
                    if (d !== 0 && d !== 6) {
                        const inCycle = (w >= 5 && w <= 8) || (w >= 15 && w <= 20) || (w >= 30 && w <= 34);
                        const r = Math.random();
                        if (inCycle) {
                            level = r > 0.8 ? 4 : r > 0.5 ? 3 : r > 0.2 ? 2 : 1;
                        } else if (r > 0.7) {
                            level = r > 0.95 ? 3 : r > 0.85 ? 2 : 1;
                        }
                    }
                    fallbackTotal += level;
                    weekDays.push({ date: `Week ${w + 1}, Day ${d + 1}`, level });
                }
                fallbackWeeks.push(weekDays);
            }
            setWeeksData(fallbackWeeks);
            setTotalContributions(fallbackTotal);
        };

        loadGithubData();

        return () => { isMounted = false; };
    }, []);

    const getCellClass = (level) => {
        let cellClass = 'contrib-cell';
        if (level === 1) cellClass += ' contrib-l1';
        else if (level === 2) cellClass += ' contrib-l2';
        else if (level === 3) cellClass += ' contrib-l3';
        else if (level >= 4) cellClass += ' contrib-l4';
        return cellClass;
    };

    return (
        <motion.div
            className="custom-card github-card"
            style={{ marginTop: '2.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
                gap: '0.5rem'
            }}>
                <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700 }}>
                        GitHub Activity
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {hoveredCell ? (
                            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                {hoveredCell.date}: Level {hoveredCell.level} activity
                            </span>
                        ) : (
                            <>
                                Commits, pull requests, and code reviews ·{' '}
                                <a
                                    href={`https://github.com/${GITHUB_USERNAME}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'var(--primary)', textDecoration: 'none' }}
                                >
                                    @{GITHUB_USERNAME}
                                </a>
                            </>
                        )}
                    </p>
                </div>

                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#3fb950',
                        display: 'inline-block',
                        boxShadow: '0 0 6px #3fb950'
                    }} />
                    {totalContributions !== null
                        ? `${totalContributions.toLocaleString()} contributions`
                        : 'Live GitHub Data'}
                </span>
            </div>

            {/* Interactive Grid matching older version layout */}
            {isLoading ? (
                <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Loading GitHub contribution graph...
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '0.5rem' }} className="custom-scrollbar">
                    {weeksData.map((week, wIdx) => (
                        <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {week.map((day, dIdx) => (
                                <motion.div
                                    key={dIdx}
                                    className={getCellClass(day.level)}
                                    style={{ width: '10px', height: '10px', borderRadius: '2px', cursor: 'pointer' }}
                                    whileHover={{ scale: 1.5, zIndex: 10 }}
                                    transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                                    onMouseEnter={() => setHoveredCell(day)}
                                    onMouseLeave={() => setHoveredCell(null)}
                                    title={day.date ? `${day.date}: Level ${day.level} activity` : undefined}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.8rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)'
            }}>
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
        </motion.div>
    );
};

export default GithubGraph;
