import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/portfolio/ProjectCard';
import HeroBackground from '../components/portfolio/HeroBackground';
import SkillCloud from '../components/portfolio/SkillCloud';

// ─── HERO ────────────────────────────────────────────────────────────────────

const ROLES = ['Event Tech Lead', 'AI Builder', 'Product & Project Manager', 'Live Streaming Expert'];
const PHOTO_URL = 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/6ff7494a8_unnamed1.jpg';

function RoleCycler() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('in');
  useEffect(() => {
    const t = setInterval(() => {
      setPhase('out');
      setTimeout(() => { setIdx(i => (i + 1) % ROLES.length); setPhase('in'); }, 400);
    }, 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', height: 'clamp(2.5rem, 6vw, 6rem)', overflow: 'visible', width: '100%' }}>
      <div style={{ position: 'absolute', right: 0, top: 0, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.03em', whiteSpace: 'nowrap', lineHeight: 1.05, background: 'linear-gradient(135deg, #ffffff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: phase === 'in' ? 1 : 0, transform: phase === 'in' ? 'translateY(0)' : 'translateY(-40px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>{ROLES[idx]}</div>
    </div>
  );
}

function PhotoRing() {
  return (
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -62%)',
      zIndex: 10, pointerEvents: 'none',
      width: 320, height: 320,
    }}>
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)', filter: 'blur(55px)', opacity: 0.22 }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)', filter: 'blur(60px)', opacity: 0.15 }} />
      {/* Rotating text ring */}
      <div style={{ position: 'absolute', inset: 0, animation: 'pf-rotating-ring 22s linear infinite' }}>
        <svg viewBox="0 0 320 320" width="320" height="320">
          <defs>
            <path id="circlePath" d="M 160,160 m -140,0 a 140,140 0 1,1 280,0 a 140,140 0 1,1 -280,0" />
          </defs>
          <text fill="#555" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" letterSpacing="0.28em">
            <textPath href="#circlePath" startOffset="0%">
              EVENT TECH • AI BUILDER • LIVE STREAMING • CREATIVE TECHNOLOGY •
            </textPath>
          </text>
        </svg>
      </div>
      {/* Photo circle */}
      <div style={{
        position: 'absolute', inset: 26, borderRadius: '50%', overflow: 'hidden',
        border: '2px solid #00e5ff',
        boxShadow: '0 0 0 8px rgba(0,229,255,0.07), 0 0 50px rgba(0,229,255,0.30), inset 0 0 30px rgba(0,0,0,0.4)',
      }}>
        <img
          src={PHOTO_URL}
          alt="Abhishek Mani Tripathi"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>
    </div>
  );
}

function HeroSection({ mobileMenuOpen, setMobileMenuOpen, theme, toggleTheme }) {
  const isDark = theme === 'dark';
  return (
    <section id="home" style={{ position: 'relative', width: '100vw', height: '100vh', minHeight: 700, background: '#050505', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 55% at 50% 70%, rgba(0,229,255,0.10) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 2 }} />
      <HeroBackground />
      <PhotoRing />
      {/* Topbar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 40, padding: '18px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isDark ? 'rgba(5,5,5,0.6)' : 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderBottom: isDark ? '1px solid rgba(0,229,255,0.12)' : '1px solid rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', color: isDark ? '#00e5ff' : '#1a1a1a', display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600, textShadow: isDark ? '0 0 12px rgba(0,229,255,0.7)' : 'none' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: isDark ? '#00e5ff' : '#1a1a1a', boxShadow: isDark ? '0 0 14px #00e5ff, 0 0 28px #00e5ff' : 'none', display: 'inline-block' }} />
          ABHISHEK M. TRIPATHI
          <a href="https://linkedin.com/in/abhishek-mani-tripathi" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: isDark ? 'rgba(0,229,255,0.12)' : 'rgba(0,0,0,0.1)', border: isDark ? '1px solid rgba(0,229,255,0.3)' : '1px solid rgba(0,0,0,0.2)', color: isDark ? '#00e5ff' : '#1a1a1a', textDecoration: 'none', transition: 'all 0.25s', marginLeft: 8 }}
            onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.25)' : 'rgba(0,0,0,0.15)'; e.currentTarget.style.boxShadow = isDark ? '0 0 12px rgba(0,229,255,0.5)' : 'none'; }}
            onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.12)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          {[['#experience', 'Experience'], ['#work', 'Work'], ['#contact', 'Contact']].map(([href, label]) => (
            <a key={label} href={href} style={{ color: isDark ? '#aaa' : '#666', textDecoration: 'none', transition: 'color 0.2s, text-shadow 0.2s', fontWeight: 500 }}
              onMouseEnter={e => { e.target.style.color = isDark ? '#00e5ff' : '#1a1a1a'; e.target.style.textShadow = isDark ? '0 0 10px rgba(0,229,255,0.7)' : 'none'; }}
              onMouseLeave={e => { e.target.style.color = isDark ? '#aaa' : '#666'; e.target.style.textShadow = 'none'; }}>{label}</a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener" style={{ padding: '7px 18px', borderRadius: 6, border: isDark ? '1.5px solid #00e5ff' : '1.5px solid #1a1a1a', color: isDark ? '#00e5ff' : '#1a1a1a', fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', textDecoration: 'none', background: isDark ? 'rgba(0,229,255,0.06)' : 'rgba(0,0,0,0.05)', boxShadow: isDark ? '0 0 12px rgba(0,229,255,0.2)' : 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = isDark ? '#00e5ff' : '#1a1a1a'; e.currentTarget.style.color = isDark ? '#050505' : '#f5f5f5'; e.currentTarget.style.boxShadow = isDark ? '0 0 24px rgba(0,229,255,0.5)' : 'none'; }}
            onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.06)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = isDark ? '#00e5ff' : '#1a1a1a'; e.currentTarget.style.boxShadow = isDark ? '0 0 12px rgba(0,229,255,0.2)' : 'none'; }}>
            Resume
          </a>
          <button onClick={toggleTheme} style={{ width: 32, height: 32, borderRadius: 6, background: isDark ? 'rgba(0,229,255,0.12)' : 'rgba(0,0,0,0.1)', border: isDark ? '1px solid rgba(0,229,255,0.3)' : '1px solid rgba(0,0,0,0.2)', color: isDark ? '#00e5ff' : '#1a1a1a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s', fontSize: 16 }}
            onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.25)' : 'rgba(0,0,0,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.12)' : 'rgba(0,0,0,0.1)'; }}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </nav>
        {/* Hamburger Button - Mobile Only */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', width: 36, height: 36, background: isDark ? 'rgba(0,229,255,0.12)' : 'rgba(0,0,0,0.1)', border: isDark ? '1px solid rgba(0,229,255,0.3)' : '1px solid rgba(0,0,0,0.2)', borderRadius: 6, color: isDark ? '#00e5ff' : '#1a1a1a', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', gap: 4, flexDirection: 'column', transition: 'all 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.25)' : 'rgba(0,0,0,0.15)'; e.currentTarget.style.boxShadow = isDark ? '0 0 12px rgba(0,229,255,0.3)' : 'none'; }}
          onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.12)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 16, height: 1.5, background: '#00e5ff', borderRadius: 1, transition: 'all 0.3s', transform: mobileMenuOpen ? (i === 0 ? 'rotate(45deg) translateY(8px)' : i === 1 ? 'opacity(0)' : 'rotate(-45deg) translateY(-8px)') : 'none' }} />)}
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: isDark ? 'rgba(5,5,5,0.95)' : 'rgba(255,255,255,0.98)', zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, backdropFilter: 'blur(10px)' }}>
          {[['#experience', 'Experience'], ['#work', 'Work'], ['#contact', 'Contact']].map(([href, label]) => (
            <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: '0.25em', textTransform: 'uppercase', color: isDark ? '#00e5ff' : '#1a1a1a', textDecoration: 'none', transition: 'all 0.2s', textShadow: isDark ? '0 0 10px rgba(0,229,255,0.4)' : 'none' }}
              onMouseEnter={e => { e.target.style.textShadow = isDark ? '0 0 20px rgba(0,229,255,0.7)' : 'none'; }}
              onMouseLeave={e => { e.target.style.textShadow = isDark ? '0 0 10px rgba(0,229,255,0.4)' : 'none'; }}>{label}</a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener" onClick={() => setMobileMenuOpen(false)} style={{ padding: '10px 24px', borderRadius: 6, border: isDark ? '1.5px solid #00e5ff' : '1.5px solid #1a1a1a', color: isDark ? '#00e5ff' : '#1a1a1a', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textDecoration: 'none', background: isDark ? 'rgba(0,229,255,0.06)' : 'rgba(0,0,0,0.05)', boxShadow: isDark ? '0 0 12px rgba(0,229,255,0.2)' : 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = isDark ? '#00e5ff' : '#1a1a1a'; e.currentTarget.style.color = isDark ? '#050505' : '#f5f5f5'; e.currentTarget.style.boxShadow = isDark ? '0 0 24px rgba(0,229,255,0.5)' : 'none'; }}
            onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(0,229,255,0.06)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = isDark ? '#00e5ff' : '#1a1a1a'; e.currentTarget.style.boxShadow = isDark ? '0 0 12px rgba(0,229,255,0.2)' : 'none'; }}>
            Resume
          </a>
        </div>
      )}
      <style>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          button { display: flex !important; }
        }
      `}</style>
      {/* Left text */}
      <div className="amt-hero-left" style={{ position: 'absolute', left: '6%', top: '50%', transform: 'translateY(-50%)', zIndex: 40, pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.95rem', color: '#00e5ff', marginBottom: 8, fontWeight: 400 }}>Hello, I'm</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff', margin: 0, fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
          <span style={{ display: 'block' }}>Abhishek</span>
          <span style={{ display: 'block' }}>Mani</span>
          <span style={{ display: 'block', color: '#00e5ff', textShadow: '0 0 20px rgba(0,229,255,0.5)' }}>Tripathi.</span>
        </h1>
      </div>
      {/* Right text */}
      <div className="amt-hero-right" style={{ position: 'absolute', right: '6%', top: '68%', transform: 'translateY(-50%)', zIndex: 40, textAlign: 'right', pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.95rem', color: '#d1d1d1', marginBottom: 8 }}>I am an</p>
        <RoleCycler />
      </div>
      <div className="amt-scroll-cue-purple" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 40, color: '#00e5ff' }}>Scroll</div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

const jobs = [
  { period: 'May 2023 to Present', company: 'Vosmos (Kestone Global)', role: 'Event Technology and Production Manager', desc: 'I look after product delivery and day-to-day event operations on an enterprise SaaS platform that serves 50+ technology clients. I built the registration systems, badge printing setups and streaming workflows that power broadcasts reaching up to 50,000 viewers at a time with 99%+ uptime. I also lead a team of eight across product, engineering and streaming, while managing the end-to-end delivery of custom white-labeled event apps for enterprise clients, starting from client pitches and solution planning through execution, deployment, and live event support.' },
  { period: 'May 2022 to Apr 2023', company: 'MCI Group', role: 'Technical Producer, YouTube Partner Experience (Google APAC)', desc: 'I ran technical production for 50+ Google APAC partner events from start to finish. This included RTMP and NDI streaming setups, encoder configurations and live troubleshooting during high-visibility sessions with up to 20,000 viewers. I kept a 95% technical success rate and hit on-time delivery on every event across APAC time zones.' },
  { period: 'Jun 2020 to May 2022', company: 'Kestone Global', role: 'IT Project and Operations Manager, Virtual and Hybrid Events', desc: 'I managed registration, access control and attendee communication for 450+ virtual and hybrid enterprise events across APAC, finishing with 98% client satisfaction. I also built multi-vendor production setups covering studio builds, audio chains, lighting rigs and streaming infrastructure.' },
  { period: 'Oct 2014 to Jun 2020', company: 'VouchPro Services', role: 'Webcast and Production Operations Manager', desc: 'I led a team of five handling pan-India event operations and webcast delivery for a large enterprise client portfolio over six years. I wrote the SOPs for event execution, platform setup, pre-event testing and incident response that the team still uses today.' },
  { period: 'May 2013 to Sep 2014', company: 'Window Techs India', role: 'Project Engineer', desc: 'I delivered AV and room automation installation projects for hotels and hospitals, covering system design, vendor coordination, installation, testing and client sign-off.' },
];

function ExperienceSection() {
  const itemRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('amt-visible'), parseInt(entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    itemRefs.current.forEach((el, i) => { if (el) { el.dataset.delay = i * 100; observer.observe(el); } });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" style={{ background: '#080808', padding: '8rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }} style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', textAlign: 'center', marginBottom: '1rem' }}>The Journey</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', textAlign: 'center', marginBottom: '4rem', color: '#fff', lineHeight: 1 }}>Career Timeline</h2>
        <div style={{ position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '2.5rem' }}>
          {jobs.map((job, i) => (
            <div key={job.company} ref={el => itemRefs.current[i] = el} className="amt-timeline-item" style={{ position: 'relative', paddingBottom: i < jobs.length - 1 ? '3rem' : 0 }}>
              <div style={{ position: 'absolute', left: '-2.93rem', top: '0.6rem', width: 10, height: 10, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 12px #00e5ff' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00e5ff', fontWeight: 700, marginBottom: '0.75rem', textShadow: '0 0 10px rgba(0,229,255,0.6)' }}>{job.period}</div>
              <div style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.25rem' }}>{job.company}</div>
              <div style={{ fontSize: '1.125rem', color: '#888', marginBottom: '0.875rem', fontWeight: 400 }}>{job.role}</div>
              <p style={{ color: '#d1d1d1', lineHeight: 1.7, fontSize: '1rem', fontWeight: 300 }}>{job.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

const projects = [
  { label: 'Smart AI Voice Agent', img: 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/d30cd3676_ChatGPTImageMay10202608_59_12PM.png', pills: [['AI Voice', true], ['No-Code', false]], title: 'Smart AI Voice Agent', desc: 'A voice-based reminder system that calls registered attendees, confirms their attendance, answers questions and blocks their calendars automatically. Replaced the manual telecalling work entirely.' },
  { label: 'AI FaceSync', img: 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/948756ce3_ChatGPTImageMay10202608_24_21PM.png', pills: [['Face Recognition', true], ['Smart Gallery', false]], title: 'AI FaceSync', desc: 'A smart event gallery for large corporate photo shoots. Attendees upload a selfie and the system surfaces only their photos with a confidence score. Admins handle uploads and access through a simple dashboard.' },
  { label: 'Face Puzzle Arena', img: 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/10fab4908_ChatGPTImageMay10202609_06_05PM.png', pills: [['WebAR', true], ['Multiplayer', false]], title: 'Face Puzzle Arena', desc: 'A browser-based AR gaming platform built for live event engagement with no app downloads required. Five games including Car Nose Racer, AR Fruit Ninja and Finger Maze Race, all running on face and hand tracking.' },
  { label: 'Smart Networking System', img: 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/fab8508d7_ChatGPTImageMay11202612_12_04AM.png', pills: [['Networking', true], ['QR Booking', false]], title: 'Smart Networking System', desc: 'A networking platform for corporate events and hosted buyer programs. It handles meeting requests, slot scheduling, table allocation and live coordination through a QR self-service interface.' },
  { label: 'Facility Command Center', img: 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/5ccd9f10c_ChatGPTImageMay10202610_49_22PM.png', pills: [['Operations', true], ['Geo Verified', false]], title: 'Facility Command Center', desc: 'An office facility platform where employees scan a QR code to report issues with photos. Admins assign and track tasks. Geolocation confirms that work was done on site.' },
  { label: 'ExpenseSync Dashboard', img: 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/2585d2e3f_ChatGPTImageMay11202612_20_17AM.png', pills: [['Finance Ops', true], ['Vendor Tracking', false]], title: 'ExpenseSync Dashboard', desc: 'A centralised invoice and expense tracker for an event tech division. Replaced scattered spreadsheets with vendor-level tracking, time-stamped uploads and a searchable history of every invoice.' },
  { label: 'Nike Run Challenge Leaderboard', img: 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/1f1edadc5_ChatGPTImageMay10202608_48_52PM.png', pills: [['Retail Activation', true], ['Live Leaderboard', false]], title: 'Nike Run Challenge Leaderboard', desc: 'A real-time leaderboard for treadmill challenges across Nike retail stores. Deployed across North and South India with multiple categories, configurable distances and a live timing display.' },
  { label: 'AI Queue and Token System', img: 'https://media.base44.com/images/public/6a0095ba0fd898883f2ce8d9/90fd304fe_ChatGPTImageMay10202607_51_01PM.png', pills: [['Crowd Flow', true], ['Booth Engagement', false]], title: 'AI Queue and Token System', desc: 'A smart queue built for an AWS VR booth with six headset stations. Attendees scan a QR code, register, and receive a digital token showing their wait time and queue position. No physical tokens needed.' },
  { label: 'Bharat Vyapaar Mahotsav', pills: [['Exhibition', true], ['Large Scale', false]], title: 'Bharat Vyapaar Mahotsav', desc: 'Large-scale expo execution covering registration, badge printing, attendee flow and on-site tech operations across multiple days with live troubleshooting and vendor coordination throughout.' },
  { label: 'Google APAC Partner Events', pills: [['Live Broadcast', true], ['Google APAC', false]], title: 'Google APAC Partner Events', desc: 'Technical production for 50+ Google APAC partner events, running RTMP and NDI workflows, encoder configurations and live troubleshooting for up to 20,000 concurrent viewers.' },
];

function ProjectsSection() {
  const cardRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('amt-visible'), parseInt(entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
    cardRefs.current.forEach((el, i) => { if (el) { el.dataset.delay = (i % 2) * 100; observer.observe(el); } });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" style={{ background: '#0a0a0a', padding: '8rem 2rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8 }} style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', marginBottom: '1rem' }}>Selected Works</div>
          <h2 style={{ fontSize: 'clamp(2.75rem, 9vw, 7rem)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.95, color: '#fff' }}>Things I've Shipped.</h2>
        </div>
        <div className="amt-project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.label} project={p} index={i} cardRef={el => cardRefs.current[i] = el} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" style={{ background: '#080808', padding: '6rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 70% at 50% 50%, rgba(0,229,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }} style={{ position: 'relative', zIndex: 2, maxWidth: '56rem', margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', marginBottom: '1.25rem' }}>Get In Touch</div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>Have an event or an idea? Let's talk.</h3>
        <p style={{ color: '#d1d1d1', fontSize: '1.125rem', fontWeight: 300, marginBottom: '2.5rem', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          Whether it's a stage that needs wiring up or a tool you want built from scratch, send me a note. I usually get back within a day.
        </p>
        <a href="mailto:myselfabhishekmanitripathi@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '1rem 2rem', borderRadius: 999, background: 'transparent', border: '1.5px solid #00e5ff', color: '#00e5ff', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.02em', boxShadow: '0 0 20px rgba(0,229,255,0.25)', transition: 'background 0.25s, box-shadow 0.25s, color 0.25s', textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#00e5ff'; e.currentTarget.style.color = '#050505'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,229,255,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00e5ff'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.25)'; }}>
          Start a Conversation
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#555' }}>
          <a href="mailto:myselfabhishekmanitripathi@gmail.com" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#00e5ff'} onMouseLeave={e => e.target.style.color = '#555'}>myselfabhishekmanitripathi@gmail.com</a>
          <span>·</span>
          <a href="https://linkedin.com/in/abhishek-mani-tripathi" target="_blank" rel="noopener" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#00e5ff'} onMouseLeave={e => e.target.style.color = '#555'}>LinkedIn</a>
          <span>·</span>
          <span>Bengaluru, India</span>
        </div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = documentHeight > 0 ? (scrolled / documentHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      background: theme === 'dark' ? '#050505' : '#f5f5f5',
      color: theme === 'dark' ? '#ededed' : '#1a1a1a',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 400,
      lineHeight: 1.6,
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased',
      transition: 'background 0.3s ease, color 0.3s ease'
    }}>
      <div style={{ position: 'fixed', top: 0, left: 0, height: '2px', background: '#00e5ff', width: `${scrollProgress}%`, zIndex: 100, transition: 'width 0.1s ease', boxShadow: '0 0 12px #00e5ff' }} />
      <HeroSection mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} theme={theme} toggleTheme={toggleTheme} />
      <SkillCloud />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <footer style={{ padding: '3rem 1rem', textAlign: 'center', borderTop: '1px solid rgba(0,229,255,0.12)', background: '#050505' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <a
            href="/resume.pdf"
            download="Abhishek_Mani_Tripathi_Resume.pdf"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 28px', borderRadius: 8, border: '1.5px solid #00e5ff', color: '#00e5ff', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', background: 'rgba(0,229,255,0.06)', boxShadow: '0 0 18px rgba(0,229,255,0.2)', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00e5ff'; e.currentTarget.style.color = '#050505'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.06)'; e.currentTarget.style.color = '#00e5ff'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,229,255,0.2)'; }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: '0.75rem', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 10px #00e5ff', display: 'inline-block' }} />
          ABHISHEK M. TRIPATHI
        </div>
        <p style={{ color: '#555', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em', marginBottom: '0.4rem' }}>© {new Date().getFullYear()} All rights reserved.</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#333' }}>Designed with care</p>
      </footer>
    </div>
  );
}