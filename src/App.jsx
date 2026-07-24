import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import CommandPalette from './components/CommandPalette';

function App() {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Background patterns */}
            <div className="bg-grid-pattern"></div>

            {/* Premium scroll depth indicator */}
            <ScrollProgress />

            {/* Custom premium cursor */}
            <CustomCursor />

            {/* Global keyboard command palette */}
            <CommandPalette />

            {/* Navigation floating pill */}
            <Navbar />

            {/* Core page components */}
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>

            {/* Interactive shell Easter egg */}
            <Terminal />

            {/* Footer */}
            <footer 
                style={{
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    borderTop: '1px solid var(--border)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em'
                }}
            >
                <div>&copy; {new Date().getFullYear()} Harsh Killedar. Built with focus &amp; craftsmanship.</div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.7rem' }}>All rights reserved. Designed to look human-developed.</div>
            </footer>
        </div>
    );
}

export default App;
