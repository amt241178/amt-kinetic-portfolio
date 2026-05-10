import { motion } from 'framer-motion';

function RevealDiv({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

function Pill({ label }) {
  return (
    <span className="pf-pill">
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', display: 'inline-block', flexShrink: 0 }} />
      {label}
    </span>
  );
}

function ScrollStrip({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
      <div className={reverse ? 'pf-scroll-track pf-scroll-reverse' : 'pf-scroll-track'} style={{ display: 'flex', gap: 14, width: 'max-content' }}>
        {doubled.map((item, i) => <Pill key={i} label={item} />)}
      </div>
    </div>
  );
}

const rows = [
  {
    label: 'Event & Engagement',
    items: ['Event Strategy', 'Cvent (Certified)', 'Splash (Certified)', 'Attendee Hub', 'Rainfocus', 'Brandlive', 'Onsite Operations', 'QR Badge Printing', 'Stage Production', 'Brand Activations', 'Vendor Management', 'Audience Engagement'],
    reverse: false,
  },
  {
    label: 'Streaming & Broadcast',
    items: ['RTMP', 'NDI', 'SDI', 'WebRTC', 'HLS', 'vMix', 'OBS', 'Zoom Webinar', 'Microsoft Teams', 'Webex', 'YouTube Live', 'LinkedIn Live', 'H.264/HEVC', 'HDMI'],
    reverse: true,
  },
  {
    label: 'Digital & AI Stack',
    items: ['ChatGPT', 'Claude', 'Lovable', 'Base44', 'Cursor', 'n8n', 'Make.com', 'Supabase', 'Zapier', 'Notion', 'Figma', 'Canva', 'Jira', 'Google Suite'],
    reverse: false,
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '120px 0', background: 'linear-gradient(180deg, transparent, rgba(21,21,31,0.8) 30%, rgba(21,21,31,0.8) 70%, transparent)' }}>
      <div className="pf-container">
        <RevealDiv>
          <div className="pf-section-label">My Toolkit</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4.8vw, 54px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>What I work with daily.</h2>
        </RevealDiv>

        <div style={{ marginTop: 50, display: 'flex', flexDirection: 'column', gap: 40 }}>
          {rows.map((row, i) => (
            <RevealDiv key={row.label} delay={i * 0.1}>
              <div style={{ marginBottom: 18, fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a0a0b0', fontFamily: 'Syne, sans-serif' }}>{row.label}</div>
              <ScrollStrip items={row.items} reverse={row.reverse} />
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}