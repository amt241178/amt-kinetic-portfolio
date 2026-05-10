import { useEffect, useRef } from 'react';

const jobs = [
  {
    period: 'May 2023 to Present',
    company: 'Vosmos (Kestone Global)',
    role: 'Event Technology and Production Manager',
    desc: 'Own product delivery and direct event ops for an enterprise SaaS platform serving 50+ technology clients. Built registration systems, badge printing ecosystems and streaming workflows for broadcasts up to 50,000 concurrent viewers at 99%+ uptime. Lead a team of 8 across product, engineering and streaming.',
  },
  {
    period: 'May 2022 to Apr 2023',
    company: 'MCI Group',
    role: 'Technical Producer, YouTube Partner Experience (Google APAC)',
    desc: 'End-to-end production for 50+ Google APAC partner events. Ran RTMP and NDI streaming workflows live during high-visibility events with up to 20,000 viewers. Held a 95% technical success rate and 98% on-time delivery across APAC time zones.',
  },
  {
    period: 'Jun 2020 to May 2022',
    company: 'Kestone Global',
    role: 'IT Project and Operations Manager, Virtual & Hybrid Events',
    desc: 'Managed registration, access and attendee comms for 450+ virtual and hybrid enterprise events across APAC at 98% client satisfaction. Built multi-vendor production setups including studio builds, audio chains, lighting and streaming.',
  },
  {
    period: 'Oct 2014 to Jun 2020',
    company: 'VouchPro Services',
    role: 'Webcast and Production Operations Manager',
    desc: 'Led a team of five managing pan-India event ops and webcast delivery for a large enterprise portfolio over six years. Wrote SOPs for event execution, platform setup, pre-event testing and incident response that became team standards.',
  },
  {
    period: 'May 2013 to Sep 2014',
    company: 'Window Techs India',
    role: 'Project Engineer',
    desc: 'Delivered AV and room automation installation projects for hotels and hospitals. System architecture, vendor coordination, install, testing and client sign-off.',
  },
];

export default function ExperienceSection() {
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('amt-visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

    itemRefs.current.forEach((el, i) => {
      if (el) {
        el.dataset.delay = i * 100;
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" style={{ background: '#0a0a0a', padding: '8rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1rem' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', textAlign: 'center', marginBottom: '4rem', color: '#fff', lineHeight: 1 }}>
          Career Timeline
        </h2>

        <div style={{ position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.20)', paddingLeft: '2.5rem' }}>
          {jobs.map((job, i) => (
            <div
              key={job.company}
              ref={el => itemRefs.current[i] = el}
              className="amt-timeline-item"
              style={{ position: 'relative', paddingBottom: i < jobs.length - 1 ? '3rem' : 0 }}
            >
              {/* Dot */}
              <div style={{ position: 'absolute', left: '-2.93rem', top: '0.6rem', width: 10, height: 10, borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />
              <div className="amt-mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '0.75rem' }}>{job.period}</div>
              <div style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.25rem' }}>{job.company}</div>
              <div style={{ fontSize: '1.125rem', color: '#888', marginBottom: '0.875rem', fontWeight: 400 }}>{job.role}</div>
              <p style={{ color: '#d1d1d1', lineHeight: 1.7, fontSize: '1rem', fontWeight: 300 }}>{job.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}