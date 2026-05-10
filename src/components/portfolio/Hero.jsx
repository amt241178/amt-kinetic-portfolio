import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const phrases = ['Event Engagement Expert', 'AI Web App Builder', 'Creative Strategist', 'Production Lead'];

export default function Hero() {
  const [typeText, setTypeText] = useState('');
  const stateRef = useRef({ phraseIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timer;
    function tick() {
      const { phraseIdx, charIdx, deleting } = stateRef.current;
      const word = phrases[phraseIdx];
      if (!deleting && charIdx < word.length) {
        stateRef.current.charIdx++;
        setTypeText(word.slice(0, stateRef.current.charIdx));
        timer = setTimeout(tick, 80);
      } else if (deleting && charIdx > 0) {
        stateRef.current.charIdx--;
        setTypeText(word.slice(0, stateRef.current.charIdx));
        timer = setTimeout(tick, 40);
      } else if (!deleting) {
        stateRef.current.deleting = true;
        timer = setTimeout(tick, 1600);
      } else {
        stateRef.current.deleting = false;
        stateRef.current.phraseIdx = (phraseIdx + 1) % phrases.length;
        timer = setTimeout(tick, 300);
      }
    }
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' }
  });

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '-80px', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(240,165,0,0.35) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '2%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,212,255,0.22) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="pf-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="pf-hero-grid">
          {/* Text */}
          <div>
            <motion.div {...fadeUp(0.1)} style={{ fontFamily: 'Syne, sans-serif', fontStyle: 'italic', fontWeight: 500, fontSize: 18, color: '#a0a0b0', marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 30, height: 2, background: '#f0a500', display: 'inline-block' }} />
              Hello, I'm
            </motion.div>
            <motion.h1 {...fadeUp(0.2)} style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(52px, 8vw, 96px)', lineHeight: 0.95, marginBottom: 28, letterSpacing: '-0.04em', color: '#fff' }}>
              <span style={{ display: 'block' }}>Abhishek</span>
              <span style={{ display: 'block' }}>Mani</span>
              <span style={{ display: 'block', background: 'linear-gradient(120deg, #f0a500, #ffc25a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Tripathi.</span>
            </motion.h1>
            <motion.div {...fadeUp(0.35)} style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(18px, 2.2vw, 24px)', fontWeight: 500, marginBottom: 32, height: 36, display: 'flex', alignItems: 'center', gap: 0 }}>
              <span style={{ color: '#00d4ff' }}>{typeText}</span>
              <span className="pf-cursor" />
            </motion.div>
            <motion.p {...fadeUp(0.45)} style={{ fontSize: 16, color: '#a0a0b0', maxWidth: 480, marginBottom: 40, lineHeight: 1.7 }}>
              I run live, virtual and hybrid events for global enterprise clients. On the side, I build small AI-powered apps that fix the messy parts of event work nobody else wants to deal with.
            </motion.p>
            <motion.div {...fadeUp(0.55)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#work" className="pf-btn-primary">
                View My Work
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a href="https://media.base44.com/files/public/6a0095ba0fd898883f2ce8d9/1e474ee7c_AMT_Resume.pdf" target="_blank" rel="noopener" className="pf-btn-ghost">
                Download Resume
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
            </motion.div>
          </div>

          {/* Photo Ring */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 340, height: 340 }}>
              {/* Rotating text ring */}
              <div className="pf-rotating-ring" style={{ position: 'absolute', inset: 0 }}>
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                  <defs>
                    <path id="pf-circle" d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0" />
                  </defs>
                  <text fill="#6e6e80" fontFamily="Syne, sans-serif" fontSize="10.5" letterSpacing="0.3em" fontWeight="600">
                    <textPath href="#pf-circle">AI BUILDER  •  EVENT CREATOR  •  STRATEGIST  •  PRODUCER  •  </textPath>
                  </text>
                </svg>
              </div>
              {/* Photo circle */}
              <div style={{
                position: 'absolute', inset: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #15151f, #11111a)',
                border: '2px solid #f0a500',
                boxShadow: '0 0 0 8px rgba(240,165,0,0.1), 0 0 60px rgba(240,165,0,0.4), inset 0 0 40px rgba(0,0,0,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, color: '#f0a500', marginBottom: 6, fontWeight: 700 }}>Add Photo</div>
                  <div style={{ fontSize: 12, color: '#6e6e80', lineHeight: 1.5 }}>Replace with your<br/>professional photo</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}