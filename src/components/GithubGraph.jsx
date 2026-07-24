import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'Harshu0829';

const GithubGraph = () => {
    const [imgError, setImgError] = useState(false);

    // Two different chart services as fallback
    const primarySrc = `https://ghchart.rshah.org/${GITHUB_USERNAME}`;
    const fallbackSrc = `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=github-compact&hide_border=true&bg_color=00000000&color=58a6ff&line=58a6ff&point=58a6ff&area=true&area_color=58a6ff`;

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
                        Real contribution data · <a
                            href={`https://github.com/${GITHUB_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary)', textDecoration: 'none' }}
                        >
                            @{GITHUB_USERNAME}
                        </a>
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
                    {/* Green live dot */}
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#3fb950',
                        display: 'inline-block',
                        boxShadow: '0 0 6px #3fb950'
                    }} />
                    Live data
                </span>
            </div>

            {/* Chart */}
            {!imgError ? (
                <div style={{
                    width: '100%',
                    overflowX: 'auto',
                    borderRadius: '8px',
                    padding: '0.5rem 0',
                }}>
                    <img
                        src={primarySrc}
                        alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
                        onError={() => setImgError(true)}
                        style={{
                            width: '100%',
                            minWidth: '300px',
                            display: 'block',
                            // Invert to match dark theme — ghchart returns a light SVG
                            filter: 'invert(1) hue-rotate(180deg) brightness(0.9)',
                            borderRadius: '6px',
                        }}
                    />
                </div>
            ) : (
                /* Fallback: activity graph with dark theme */
                <div style={{ width: '100%', overflowX: 'auto', borderRadius: '8px' }}>
                    <img
                        src={fallbackSrc}
                        alt={`${GITHUB_USERNAME}'s GitHub activity graph`}
                        style={{
                            width: '100%',
                            minWidth: '300px',
                            display: 'block',
                            borderRadius: '6px',
                        }}
                    />
                </div>
            )}

            {/* Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '0.75rem',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                gap: '0.5rem',
                alignItems: 'center'
            }}>
                <span>Less</span>
                {['#161b22', '#0e4429', '#006d32', '#26a641', '#3fb950'].map((color, i) => (
                    <div key={i} style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '2px',
                        background: color,
                        border: '1px solid rgba(255,255,255,0.08)'
                    }} />
                ))}
                <span>More</span>
            </div>
        </motion.div>
    );
};

export default GithubGraph;
