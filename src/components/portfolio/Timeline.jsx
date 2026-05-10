import { motion } from 'framer-motion';

function RevealDiv({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

const jobs = [
  {
    role: 'Event Technology and Production Manager',
    date: 'May 2023 — Present',
    company: 'Vosmos (Kestone Global), Bengaluru',
    points: [
      'Own product delivery and direct event ops for an enterprise SaaS platform serving 50+ technology clients across virtual, hybrid and in-person formats.',
      'Built registration websites, mobile event apps, onsite badge printing ecosystems and streaming workflows handling up to 50,000 concurrent viewers at 99%+ uptime.',
      'Lead a cross-functional team of 8 across product, engineering and streaming. Delivered 15 platform features that lifted engagement by 40%.',
      'Applying AI tools to automate registration workflows, improve attendee data quality, and personalise event communications.',
    ],
  },
  {
    role: 'Technical Producer, YouTube Partner Experience (Google APAC)',
    date: 'May 2022 — Apr 2023',
    company: 'MCI Group, Bengaluru',
    points: [
      'End-to-end production for 50+ Google APAC partner events from technical site assessment through post-event delivery.',
      'Ran RTMP and NDI streaming workflows, fixed encoder failures, multicast issues and network bottlenecks live during events with up to 20,000 concurrent viewers.',
      '95% technical success rate and 98% on-time delivery across APAC time zones.',
    ],
  },
  {
    role: 'IT Project and Operations Manager, Virtual & Hybrid Events',
    date: 'Jun 2020 — May 2022',
    company: 'Kestone Global, Bengaluru',
    points: [
      'Managed registration, access and attendee comms for 450+ virtual and hybrid enterprise events across APAC at 98% client satisfaction.',
      'Built multi-vendor production setups including studio builds, audio chains, lighting and streaming.',
      'Designed event tech stacks integrating registration platforms, streaming tools and engagement systems for large enterprise events.',
    ],
  },
  {
    role: 'Webcast and Production Operations Manager',
    date: 'Oct 2014 — Jun 2020',
    company: 'VouchPro Services, Noida',
    points: [
      'Led a team of five managing pan-India event ops and webcast delivery for a large enterprise portfolio over six years.',
      'Owned streaming setup, AV, attendee management, vendor relationships, equipment and budgets across concurrent accounts.',
      'Wrote SOPs for event execution, platform setup, pre-event testing and incident response that became team standards.',
    ],
  },
  {
    role: 'Project Engineer',
    date: 'May 2013 — Sep 2014',
    company: 'Window Techs India, New Delhi',
    points: [
      'Delivered AV and room automation installation projects for hotels and hospitals — system architecture, vendor coordination, install, testing and client sign-off.',
    ],
  },
];

const eduItems = [
  { title: 'Cvent — Event Management & Virtual Events Certification', detail: 'Valid Jan 2026 to Jan 2028' },
  { title: 'Cvent Splash Certification, Event-Led Growth', detail: 'Valid Jan 2026 to Jan 2028' },
  { title: 'B.Tech, Electrical & Electronics Engineering', detail: 'Gautam Buddh Technical University, Noida · 2009–2013' },
];

export default function Timeline() {
  return (
    <section id="experience" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="pf-container">
        <RevealDiv>
          <div className="pf-section-label">Experience</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4.8vw, 54px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            13 years across event tech and production.
          </h2>
        </RevealDiv>

        <div style={{ position: 'relative', marginTop: 60, paddingLeft: 30 }}>
          <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, #f0a500, transparent)', opacity: 0.4 }} />

          {jobs.map((job, i) => (
            <RevealDiv key={job.role} delay={i * 0.08}>
              <div style={{ position: 'relative', paddingBottom: i < jobs.length - 1 ? 50 : 0 }}>
                <div style={{ position: 'absolute', left: -30, top: 8, width: 18, height: 18, borderRadius: '50%', background: '#f0a500', border: '4px solid #0a0a0f', boxShadow: '0 0 0 2px #f0a500, 0 0 20px #f0a500' }} />
                <div className="pf-card pf-timeline-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 700, color: '#fff' }}>{job.role}</div>
                    <div style={{ fontSize: 12, color: '#f0a500', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>{job.date}</div>
                  </div>
                  <div style={{ fontSize: 13, color: '#00d4ff', marginBottom: 14, fontWeight: 500 }}>{job.company}</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {job.points.map((pt, j) => (
                      <li key={j} style={{ fontSize: 14, color: '#a0a0b0', marginBottom: 8, paddingLeft: 20, position: 'relative', lineHeight: 1.6 }}>
                        <span style={{ position: 'absolute', left: 0, top: 9, width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', display: 'inline-block' }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.1}>
          <div style={{ marginTop: 60, padding: '32px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>Education &amp; Certifications</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {eduItems.map(e => (
                <div key={e.title} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: 14, color: '#fff', fontWeight: 500 }}>{e.title}</span>
                  <span style={{ fontSize: 13, color: '#a0a0b0' }}>{e.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}