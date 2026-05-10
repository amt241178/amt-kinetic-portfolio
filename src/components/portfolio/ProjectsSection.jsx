import { useEffect, useRef } from 'react';

const projects = [
  { label: 'Smart AI Voice Agent', pills: [['AI Voice', true], ['No-Code', false]], title: 'Smart AI Voice Agent', desc: 'Voice-based reminder system that calls registered attendees, confirms participation, answers queries and blocks calendars. Replaces the manual telecalling work entirely.' },
  { label: 'AI FaceSync', pills: [['Face Recognition', true], ['Smart Gallery', false]], title: 'AI FaceSync', desc: 'Smart event gallery for large corporate shoots. Attendees upload a selfie, the system surfaces only their photos with a confidence score. Admin dashboard handles uploads and access.' },
  { label: 'Face Puzzle Arena', pills: [['WebAR', true], ['Multiplayer', false]], title: 'Face Puzzle Arena', desc: 'Browser-based AR gaming platform for live event engagement. No app downloads. Five games including Car Nose Racer, AR Fruit Ninja and Finger Maze Race, all powered by face and hand tracking.' },
  { label: 'Smart Networking System', pills: [['Networking', true], ['QR Booking', false]], title: 'Smart Networking System', desc: 'End-to-end networking platform for corporate events and hosted buyer programs. Handles meeting requests, slot scheduling, table allocation and live coordination through a QR self-service interface.' },
  { label: 'Facility Command Center', pills: [['Operations', true], ['Geo Verified', false]], title: 'Facility Command Center', desc: 'Office facility platform. Employees scan a QR to report issues with images. Admins assign and track. Geolocation validates that work was actually done on site. Covers attendance and inventory too.' },
  { label: 'ExpenseSync Dashboard', pills: [['Finance Ops', true], ['Vendor Tracking', false]], title: 'ExpenseSync Dashboard', desc: 'Centralised invoice and expense tracker for an event tech division. Replaces scattered spreadsheets with vendor-level tracking, time-stamped uploads and a searchable history of every invoice.' },
  { label: 'Nike Run Challenge Leaderboard', pills: [['Retail Activation', true], ['Live Leaderboard', false]], title: 'Nike Run Challenge Leaderboard', desc: 'Real-time leaderboard for treadmill challenges across Nike retail stores. Multi-store deployment across North and South India. Categories, configurable distances, live timing display.' },
  { label: 'AI Queue & Token System', pills: [['Crowd Flow', true], ['Booth Engagement', false]], title: 'AI Queue & Token System', desc: 'Smart queue for an AWS VR booth with six headset stations. Attendees scan a QR, register, get a digital token with wait time and queue position. No physical token hardware needed.' },
  { label: 'Bharat Vyapaar Mahotsav', pills: [['Exhibition', true], ['Large Scale', false]], title: 'Bharat Vyapaar Mahotsav', desc: 'Large-scale expo execution covering registration, badge printing, attendee flow and onsite tech operations. Multi-day footfall with live troubleshooting and vendor coordination.' },
  { label: 'Google APAC Partner Events', pills: [['Live Broadcast', true], ['Google APAC', false]], title: 'Google APAC Partner Events', desc: 'Technical production for 50+ Google APAC partner events. RTMP and NDI workflows, encoder configurations and live troubleshooting at up to 20,000 concurrent viewers.' },
];

function ProjectCard({ project, cardRef }) {
  return (
    <article
      ref={cardRef}
      className="amt-project-card"
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <div className="amt-img-slot" data-label={`16:9 — ${project.label}`} />
      </div>
      {/* Overlay gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #121212 0%, rgba(18,18,18,0.8) 50%, transparent 100%)', zIndex: 1 }} />
      {/* Content */}
      <div className="amt-project-content">
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {project.pills.map(([text, solid]) => (
            <span key={text} style={solid ? { padding: '0.3rem 0.75rem', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', color: '#050505', textTransform: 'uppercase', background: 'linear-gradient(135deg, #ededed, #ffffff)', borderRadius: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.5)' } : { padding: '0.3rem 0.75rem', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase', border: '1px solid rgba(167,139,250,0.4)', borderRadius: 999, backdropFilter: 'blur(8px)', background: 'rgba(124,58,255,0.08)' }}>{text}</span>
          ))}
        </div>
        <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>
          {project.title}
        </h3>
        <p style={{ color: '#e5e5e5', fontSize: '1rem', lineHeight: 1.65, fontWeight: 300, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
          {project.desc}
        </p>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('amt-visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    cardRefs.current.forEach((el, i) => {
      if (el) {
        el.dataset.delay = (i % 2) * 100;
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" style={{ background: '#121212', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div className="amt-mono" style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '1rem' }}>Selected Works</div>
          <h2 style={{ fontSize: 'clamp(2.75rem, 9vw, 7rem)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.95, color: '#fff' }}>Things I've Shipped.</h2>
        </div>
        <div className="amt-project-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.label} project={p} cardRef={el => cardRefs.current[i] = el} />
          ))}
        </div>
      </div>
    </section>
  );
}