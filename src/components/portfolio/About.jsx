import { motion } from 'framer-motion';

function RevealDiv({ children, delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { num: '500+', label: 'Events Delivered' },
  { num: '13+', label: 'Years in Event Tech' },
  { num: '8+', label: 'AI Apps Shipped' },
];

const doItems = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
    title: 'Event Engagement',
    desc: 'Registration platforms, badge printing, streaming setups, onsite ops. The full event tech stack across virtual, hybrid and in-person formats.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    title: 'AI Web Apps',
    desc: 'No-code and low-code apps built with AI assistance. Voice agents, smart galleries, queue systems, dashboards — all built to solve real workflow gaps.',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M12 2L2 7l10 5 10-5-10-5z"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    title: 'Strategy & Consulting',
    desc: 'Platform selection, integration planning, vendor sourcing. Translating messy technical needs into a plan stakeholders can sign off on.',
  },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="pf-container">
        <RevealDiv>
          <div className="pf-section-label">About Me</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4.8vw, 54px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
            I blend live event craft with AI-powered building.
          </h2>
        </RevealDiv>

        <div className="pf-about-grid">
          <RevealDiv delay={0.1}>
            <div style={{ fontSize: 17, color: '#a0a0b0', lineHeight: 1.75 }}>
              <p style={{ marginBottom: 18 }}>I have spent the last 13 years running event technology for global enterprise clients. Registration platforms, streaming infrastructure, onsite badge printing, broadcast workflows — the full stack of what it takes to put thousands of people in a room or in front of a screen without anything breaking.</p>
              <p style={{ marginBottom: 18 }}>About two years ago I started building small no-code AI apps to fix the parts of event work that kept eating my team's time. Things like attendee follow-ups, photo discovery, queue management at booths. Each one started as a personal scratch and ended up running real events.</p>
              <p>I work out of Bengaluru, partner across APAC and EMEA, and ship things that hold up under live pressure.</p>
            </div>
          </RevealDiv>

          <RevealDiv delay={0.2}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
              {stats.map(s => (
                <div key={s.num} className="pf-card pf-stat-card">
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 38, fontWeight: 800, color: '#f0a500', lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: '#a0a0b0', letterSpacing: '0.06em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>

        {/* What I Do */}
        <div style={{ marginTop: 80 }}>
          <RevealDiv>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: 28 }}>What I Do</div>
          </RevealDiv>
          <div className="pf-do-grid">
            {doItems.map((item, i) => (
              <RevealDiv key={item.title} delay={i * 0.1}>
                <div className="pf-card pf-do-card">
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(240,165,0,0.12)', border: '1px solid rgba(240,165,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f0a500', marginBottom: 22 }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: 19, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: '#a0a0b0', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}