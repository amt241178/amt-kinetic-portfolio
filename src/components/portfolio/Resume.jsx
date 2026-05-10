import { motion } from 'framer-motion';

function RevealDiv({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

const RESUME_URL = 'https://media.base44.com/files/public/6a0095ba0fd898883f2ce8d9/1e474ee7c_AMT_Resume.pdf';

export default function Resume() {
  return (
    <section id="resume" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="pf-container">
        <RevealDiv>
          <div className="pf-section-label">Resume</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4.8vw, 54px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>The full story on one page.</h2>
        </RevealDiv>

        <div className="pf-resume-grid">
          {/* Thumbnail */}
          <RevealDiv delay={0.1}>
            <div className="pf-card" style={{ aspectRatio: '8.5 / 11', padding: 26, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.4s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = '#f0a500'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: 'radial-gradient(circle, #f0a500, transparent 70%)', opacity: 0.2, filter: 'blur(20px)', pointerEvents: 'none' }} />
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, letterSpacing: '0.2em', color: '#f0a500', marginBottom: 18, fontWeight: 700 }}>ABHISHEK MANI TRIPATHI</div>
              {[['100%'], ['80%'], ['60%']].map((ws, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? 8 : 0 }}><div style={{ height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.16)', width: ws[0] }} /></div>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '18px 0' }} />
              {[['100%'], ['100%'], ['80%'], ['100%'], ['60%']].map((ws, i) => (
                <div key={i} style={{ marginBottom: i < 4 ? 8 : 0 }}><div style={{ height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.16)', width: ws[0] }} /></div>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '18px 0' }} />
              {[['80%'], ['100%'], ['60%'], ['100%']].map((ws, i) => (
                <div key={i} style={{ marginBottom: i < 3 ? 8 : 0 }}><div style={{ height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.16)', width: ws[0] }} /></div>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '18px 0' }} />
              {[['100%'], ['80%']].map((ws, i) => (
                <div key={i} style={{ marginBottom: i < 1 ? 8 : 0 }}><div style={{ height: 7, borderRadius: 3, background: 'rgba(255,255,255,0.16)', width: ws[0] }} /></div>
              ))}
            </div>
          </RevealDiv>

          {/* Info */}
          <RevealDiv delay={0.2}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px, 3.4vw, 38px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>13 years, 500+ events, one PDF.</h3>
            <p style={{ color: '#a0a0b0', fontSize: 16, marginBottom: 30, maxWidth: 480, lineHeight: 1.7 }}>
              Cvent certified across Event Management, Virtual Events and Splash. Comfortable across APAC and EMEA. The full work history, certifications and tech stack live in the PDF.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href={RESUME_URL} target="_blank" rel="noopener" className="pf-btn-primary">
                Download Resume (PDF)
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </a>
              <a href="#experience" className="pf-btn-ghost">
                View Experience
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}