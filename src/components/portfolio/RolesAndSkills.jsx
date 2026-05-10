import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ROLES = [
  'Technical Producer',
  'IT Manager (Virtual and Hybrid Events)',
  'Streaming & Operations Manager',
  'Product & Delivery Manager (Virtual Events and Event Tech)',
];

const SKILLS_BY_CATEGORY = [
  {
    category: 'Registration Platforms',
    icon: '📝',
    skills: ['Cvent (certified)', 'Splash (certified)', 'Attendee Hub', 'Rainfocus', 'Brandlive'],
  },
  {
    category: 'Streaming & AV Protocols',
    icon: '📡',
    skills: ['RTMP', 'NDI', 'SDI', 'HDMI', 'WebRTC', 'HLS', 'H.264/HEVC', 'vMix', 'OBS'],
  },
  {
    category: 'Event Production',
    icon: '🎬',
    skills: ['End-to-end production', 'AV infrastructure', 'Signal flow', 'Power planning', 'Risk assessments'],
  },
  {
    category: 'Attendee Management',
    icon: '👥',
    skills: ['Registration lifecycle', 'QR check-in', 'Badge printing', 'Lead capture', 'Onsite operations'],
  },
  {
    category: 'Integrations & Tech',
    icon: '🔗',
    skills: ['API/webhooks', 'SSO', 'CRM sync', 'Third-party connectors', 'GDPR awareness'],
  },
  {
    category: 'Event Platforms',
    icon: '🖥️',
    skills: ['Zoom Webinar', 'Microsoft Teams', 'Webex', 'YouTube Live', 'LinkedIn Live'],
  },
  {
    category: 'People & Vendors',
    icon: '💼',
    skills: ['Team leadership (8 reports)', 'Vendor sourcing', 'Budget management', 'Freelancers'],
  },
  {
    category: 'Tools & Workflow',
    icon: '⚙️',
    skills: ['Google Suite', 'MS Office', 'Jira', 'Intercom', 'Agile', 'SOP development'],
  },
];

export default function RolesAndSkills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        padding: '8rem 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
        borderTop: '1px solid rgba(0,229,255,0.08)',
        borderBottom: '1px solid rgba(0,229,255,0.08)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', marginBottom: '1rem' }}>
            Professional Background
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, margin: 0 }}>
            Professional Roles
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {ROLES.map((role, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.75rem',
                  background: 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(167,139,250,0.05) 100%)',
                  border: '1px solid rgba(0,229,255,0.2)',
                  borderRadius: 12,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(167,139,250,0.1) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(167,139,250,0.05) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)',
                  opacity: 0.5,
                }} />
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#a78bfa',
                  marginBottom: '0.5rem',
                }}>{`Role ${idx + 1}`}</div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.4,
                  margin: 0,
                }}>
                  {role}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
              Core Competencies
            </h3>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {SKILLS_BY_CATEGORY.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: 8,
                  background: activeCategory === idx
                    ? 'linear-gradient(135deg, #00e5ff, #a78bfa)'
                    : 'rgba(0,229,255,0.08)',
                  color: activeCategory === idx ? '#050505' : '#d1d1d1',
                  border: activeCategory === idx ? 'none' : '1px solid rgba(0,229,255,0.2)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  if (activeCategory !== idx) {
                    e.currentTarget.style.background = 'rgba(0,229,255,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)';
                  }
                }}
                onMouseLeave={e => {
                  if (activeCategory !== idx) {
                    e.currentTarget.style.background = 'rgba(0,229,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)';
                  }
                }}
              >
                <span style={{ marginRight: '0.5rem' }}>{cat.icon}</span>
                {cat.category}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(167,139,250,0.04) 100%)',
              border: '1px solid rgba(0,229,255,0.15)',
              borderRadius: 14,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2rem' }}>{SKILLS_BY_CATEGORY[activeCategory].icon}</span>
              <h4 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                {SKILLS_BY_CATEGORY[activeCategory].category}
              </h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              {SKILLS_BY_CATEGORY[activeCategory].skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  style={{
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(0,229,255,0.08)',
                    border: '1px solid rgba(0,229,255,0.25)',
                    borderRadius: 8,
                    color: '#d1d1d1',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    textAlign: 'center',
                    transition: 'all 0.25s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0,229,255,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)';
                    e.currentTarget.style.color = '#00e5ff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0,229,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)';
                    e.currentTarget.style.color = '#d1d1d1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}