import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" style={{ background: '#0a0a0a', padding: '6rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative' }}>
      {/* Purple glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 70% at 50% 50%, rgba(124,58,255,0.15), transparent 70%)', pointerEvents: 'none' }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
        style={{ position: 'relative', zIndex: 2, maxWidth: '56rem', margin: '0 auto' }}
      >
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>
          Have an event or an idea? Let's talk.
        </h3>
        <p style={{ color: '#d1d1d1', fontSize: '1.125rem', fontWeight: 300, marginBottom: '2.5rem', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          Whether it's a stage you need wired up or a tool you want built, drop a note. I usually reply within a day.
        </p>
        <a href="mailto:myselfabhishekmanitripathi@gmail.com" style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '1rem 2rem', borderRadius: 999,
          background: 'linear-gradient(135deg, #7c3aff, #5b21b6)',
          color: '#fff', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.02em',
          boxShadow: '0 12px 30px rgba(124,58,255,0.35)',
          transition: 'transform 0.25s, box-shadow 0.25s',
          textDecoration: 'none',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(124,58,255,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 12px 30px rgba(124,58,255,0.35)'; }}>
          Start a Conversation
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#555' }}>
          <a href="mailto:myselfabhishekmanitripathi@gmail.com" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#a78bfa'} onMouseLeave={e => e.target.style.color = '#555'}>
            myselfabhishekmanitripathi@gmail.com
          </a>
          <span>·</span>
          <a href="https://linkedin.com/in/abhishek-mani-tripathi" target="_blank" rel="noopener" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#a78bfa'} onMouseLeave={e => e.target.style.color = '#555'}>
            LinkedIn
          </a>
          <span>·</span>
          <span>Bengaluru, India</span>
        </div>
      </motion.div>
    </section>
  );
}