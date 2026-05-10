import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function RevealDiv({ children, delay = 0, style = {} }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: 'easeOut' }} style={style}>
      {children}
    </motion.div>
  );
}

const LaunchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
);
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M21 12c-2.5 4-6 6-9 6s-6.5-2-9-6c2.5-4 6-6 9-6s6.5 2 9 6z"/></svg>
);

function ProjectCard({ title, desc, badges = [], tags = [], link = '#', linkLabel = 'Launch App', isEvent = false }) {
  return (
    <div className="pf-project-card">
      <div style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #15151f, #11111a)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(240,165,0,0.07), transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ textAlign: 'center', padding: 20 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, color: '#f0a500', marginBottom: 6, letterSpacing: '0.05em', fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 11, color: '#6e6e80' }}>16:9 image space</div>
        </div>
      </div>
      <div style={{ padding: 26, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {badges.map(b => (
            <span key={b.text} style={{ padding: '5px 11px', borderRadius: 999, fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', background: b.color === 'gold' ? 'rgba(240,165,0,0.12)' : b.color === 'teal' ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.07)', color: b.color === 'gold' ? '#f0a500' : b.color === 'teal' ? '#00d4ff' : '#a0a0b0', border: `1px solid ${b.color === 'gold' ? 'rgba(240,165,0,0.3)' : b.color === 'teal' ? 'rgba(0,212,255,0.25)' : 'rgba(255,255,255,0.16)'}` }}>{b.text}</span>
          ))}
        </div>
        <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.2 }}>{title}</h4>
        <p style={{ fontSize: 14, color: '#a0a0b0', lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          {tags.map(t => <span key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.07)', color: '#a0a0b0', border: '1px solid rgba(255,255,255,0.08)' }}>{t}</span>)}
        </div>
        <div>
          <a href={link} className={isEvent ? 'pf-project-link-gold' : 'pf-project-link-teal'}>
            {linkLabel} {isEvent ? <EyeIcon /> : <LaunchIcon />}
          </a>
        </div>
      </div>
    </div>
  );
}

const aiProjects = [
  { title: 'Smart AI Voice Agent', desc: 'Voice-based reminder and engagement system that calls registered attendees before an event, confirms participation, answers queries, shares joining links and blocks calendars. Replaces the manual telecalling work entirely.', badges: [{ text: 'Built with AI', color: 'gold' }, { text: 'Voice AI', color: 'soft' }], tags: ['No-code stack', 'Voice AI', 'RSVP tracking', 'Calendar sync'] },
  { title: 'AI FaceSync', desc: 'Smart event gallery for large corporate shoots. Attendees upload a selfie, the system scans the entire gallery and surfaces only their photos with a confidence score. Comes with admin dashboard for media uploads, access controls and download permissions.', badges: [{ text: 'Built with AI', color: 'gold' }, { text: 'Computer Vision', color: 'soft' }], tags: ['Face recognition', 'Self-service gallery', 'Admin dashboard', 'No-code'] },
  { title: 'Face Puzzle Arena', desc: 'Browser-based AR gaming platform for live event engagement. No app downloads, no setup. Uses real-time face and hand tracking to turn attendee phones into multiplayer game stations. Includes 5 AR games.', badges: [{ text: 'Built with AI', color: 'gold' }, { text: 'AR Web Games', color: 'soft' }], tags: ['WebAR', 'Face tracking', 'Multiplayer', 'Browser-based'] },
  { title: 'Smart Networking & Meeting Management', desc: 'End-to-end networking platform for corporate events. Handles meeting requests, slot scheduling, table allocation and live coordination. QR-based self-service with real-time ground team view.', badges: [{ text: 'Built with AI', color: 'gold' }, { text: 'Matchmaking', color: 'soft' }], tags: ['QR booking', 'Matchmaking', 'Live coordination', 'No-code'] },
  { title: 'Facility Command Center', desc: 'Office facility and operations platform. Employees scan a QR to report issues with images. Admins assign tasks, supervisors track resolution. Geolocation validates on-site work completion.', badges: [{ text: 'Built with AI', color: 'gold' }, { text: 'Operations', color: 'soft' }], tags: ['QR workflow', 'Geo verification', 'Inventory', 'Attendance'] },
  { title: 'ExpenseSync Dashboard', desc: 'Centralized invoice and expense tracker for an event tech division. Replaces scattered spreadsheets with a single dashboard for subscriptions, vendor payments and ad hoc procurement.', badges: [{ text: 'Built with AI', color: 'gold' }, { text: 'Finance', color: 'soft' }], tags: ['Invoice tracking', 'Vendor management', 'Searchable archive', 'No-code'] },
  { title: 'Nike Run Challenge Leaderboard', desc: 'Real-time leaderboard system for treadmill challenges across Nike retail stores. Store teams capture timings, the leaderboard updates live across categories. Multi-store deployment across North and South India.', badges: [{ text: 'Built with AI', color: 'gold' }, { text: 'Retail Activation', color: 'soft' }], tags: ['Live leaderboard', 'Multi-store', 'Retail engagement', 'No-code'] },
  { title: 'AI Queue & Token Management', desc: 'Smart queue platform built for an AWS VR booth with six headset stations. Attendees scan a QR, get a digital token with wait time and queue position. Three connected interfaces — attendee, public leaderboard and admin control.', badges: [{ text: 'Built with AI', color: 'gold' }, { text: 'Crowd Flow', color: 'soft' }], tags: ['QR check-in', 'Live queue', 'Multi-station', 'Public display'] },
];

const eventProjects = [
  { title: 'Bharat Vyapaar Mahotsav', desc: 'Large-scale expo execution across registration, badge printing, attendee flow and onsite tech operations. Multi-day footfall with live troubleshooting and full vendor coordination.', badges: [{ text: 'Exhibition', color: 'teal' }, { text: 'Large Scale', color: 'soft' }], tags: ['Cvent', 'QR badging', 'Onsite ops', 'Vendor mgmt'] },
  { title: 'Google APAC Partner Events', desc: 'Technical production for 50+ Google APAC partner events as part of the YouTube Partner Experience. RTMP and NDI workflows, encoder configurations and live troubleshooting at up to 20,000 concurrent viewers.', badges: [{ text: 'Corporate', color: 'teal' }, { text: 'Live Broadcast', color: 'soft' }], tags: ['RTMP / NDI', 'vMix / OBS', 'Live broadcast', 'APAC delivery'] },
  { title: 'AWS VR Booth Activation', desc: 'Crowd flow design and queue management for a six-station VR experience at an AWS event. Built the digital token system to remove physical hardware entirely while keeping a live leaderboard.', badges: [{ text: 'Activation', color: 'teal' }, { text: 'Booth Engagement', color: 'soft' }], tags: ['Queue ops', 'QR onboarding', 'Live display', 'Booth tech'] },
  { title: 'Nike Retail Run Challenge', desc: 'Treadmill-based fitness challenge across Nike stores in North and South India. Built and operated the live leaderboard system that turned an in-store activity into a competitive multi-store event.', badges: [{ text: 'Retail Activation', color: 'teal' }, { text: 'Multi-City', color: 'soft' }], tags: ['Retail engagement', 'Live ranking', 'Multi-store', 'Custom build'] },
  { title: 'Enterprise Hybrid Conferences', desc: '450+ virtual and hybrid enterprise events delivered across APAC. Multi-camera studio builds, audio chain setups, lighting and streaming infrastructure across the full event lifecycle.', badges: [{ text: 'Hybrid', color: 'teal' }, { text: 'Enterprise', color: 'soft' }], tags: ['Studio builds', 'Audio chain', 'Streaming', '98% CSAT'] },
];

export default function Work() {
  const [activeTab, setActiveTab] = useState('ai');

  const tabs = [
    { id: 'ai', label: 'AI Web Apps' },
    { id: 'events', label: 'Event Engagement' },
    { id: 'all', label: 'All Work' },
  ];

  const currentProjects = activeTab === 'ai' ? aiProjects : activeTab === 'events' ? eventProjects : [...aiProjects, ...eventProjects];
  const isEvent = (p) => eventProjects.some(e => e.title === p.title);

  return (
    <section id="work" style={{ padding: '120px 0', background: 'linear-gradient(180deg, transparent, rgba(21,21,31,0.8) 30%, rgba(21,21,31,0.8) 70%, transparent)' }}>
      <div className="pf-container">
        <RevealDiv>
          <div className="pf-section-label">Selected Work</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4.8vw, 54px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12 }}>A mix of live event work and AI builds.</h2>
          <p style={{ fontSize: 17, color: '#a0a0b0', maxWidth: 640 }}>Some are corporate event productions, some are tools I built to fix things at work. All are real, all shipped.</p>
        </RevealDiv>

        {/* Tab Switcher */}
        <RevealDiv delay={0.1} style={{ marginTop: 40, marginBottom: 50 }}>
          <div style={{ display: 'flex', gap: 8, padding: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, backdropFilter: 'blur(10px)', width: 'fit-content', flexWrap: 'wrap' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '12px 22px', borderRadius: 10, fontSize: 13, fontWeight: activeTab === t.id ? 600 : 500, color: activeTab === t.id ? '#0a0a0f' : '#a0a0b0', background: activeTab === t.id ? '#f0a500' : 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.25s ease', letterSpacing: '0.04em' }}>
                {t.label}
              </button>
            ))}
          </div>
        </RevealDiv>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <div className="pf-project-grid">
              {currentProjects.map((p, i) => (
                <RevealDiv key={p.title + i} delay={i % 2 * 0.1}>
                  <ProjectCard {...p} isEvent={isEvent(p)} linkLabel={isEvent(p) ? 'View Gallery' : 'Launch App'} />
                </RevealDiv>
              ))}
              <RevealDiv>
                <div style={{ background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 12px, transparent 12px 24px)', border: '1px dashed rgba(255,255,255,0.16)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280, padding: 40, textAlign: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, color: '#f0a500', marginBottom: 8 }}>More Coming Soon</div>
                    <div style={{ fontSize: 14, color: '#a0a0b0' }}>A few more builds are in the works. Will drop them here as they ship.</div>
                  </div>
                </div>
              </RevealDiv>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <RevealDiv delay={0.1} style={{ marginTop: 60 }}>
          <div style={{ padding: '50px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, textAlign: 'center', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700, color: '#fff', marginBottom: 16 }}>Want something built? Let's talk.</h3>
            <p style={{ color: '#a0a0b0', marginBottom: 24 }}>Whether it's an event production, a custom AI tool or a one-off booth activation, I'm happy to chat.</p>
            <a href="#contact" className="pf-btn-primary">
              Start a Conversation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}