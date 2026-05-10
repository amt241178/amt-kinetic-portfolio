import { useState } from 'react';
import { motion } from 'framer-motion';

function RevealDiv({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

const inputStyle = {
  width: '100%', padding: '14px 16px', borderRadius: 10,
  background: '#15151f', border: '1px solid rgba(255,255,255,0.08)',
  color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14.5,
  transition: 'all 0.25s ease', outline: 'none',
};

export default function Contact() {
  const [note, setNote] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.cname.value;
    const email = e.target.cemail.value;
    const msg = e.target.cmsg.value;
    const subject = encodeURIComponent(`Hi from your portfolio: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:myselfabhishekmanitripathi@gmail.com?subject=${subject}&body=${body}`;
    setNote('Opening your email client…');
  }

  const contactLinks = [
    { href: 'mailto:myselfabhishekmanitripathi@gmail.com', text: 'myselfabhishekmanitripathi@gmail.com', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
    { href: 'tel:+918750745850', text: '+91 8750745850', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg> },
    { href: 'https://linkedin.com/in/abhishek-mani-tripathi', text: 'linkedin.com/in/abhishek-mani-tripathi', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
    { href: null, text: 'Bengaluru, India', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  ];

  return (
    <section id="contact" style={{ padding: '120px 0', background: 'linear-gradient(180deg, transparent, rgba(21,21,31,0.8) 30%, rgba(21,21,31,0.8) 70%, transparent)' }}>
      <div className="pf-container">
        <RevealDiv>
          <div className="pf-section-label">Get in Touch</div>
        </RevealDiv>
        <div className="pf-contact-grid">
          <RevealDiv delay={0.1}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(34px, 4.4vw, 52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 22 }}>
              Let's build something worth talking about.
            </h3>
            <p style={{ color: '#a0a0b0', fontSize: 17, marginBottom: 30, maxWidth: 420 }}>
              If you have an event coming up, an idea you want built, or just want to compare notes on event tech, drop a message.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 30 }}>
              {contactLinks.map(l => (
                l.href
                  ? <a key={l.text} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#f0a500'} onMouseLeave={e => e.currentTarget.style.color = '#fff'}>
                    <span style={{ color: '#f0a500', flexShrink: 0 }}>{l.icon}</span>{l.text}
                  </a>
                  : <div key={l.text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#a0a0b0' }}>
                    <span style={{ color: '#f0a500', flexShrink: 0 }}>{l.icon}</span>{l.text}
                  </div>
              ))}
            </div>
          </RevealDiv>

          <RevealDiv delay={0.2}>
            <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 38, backdropFilter: 'blur(10px)' }}>
              {[
                { label: 'Your Name', name: 'cname', type: 'text', placeholder: 'Jane Doe' },
                { label: 'Email', name: 'cemail', type: 'email', placeholder: 'jane@company.com' },
              ].map(f => (
                <div key={f.name} style={{ marginBottom: 22 }}>
                  <label style={{ display: 'block', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a0a0b0', marginBottom: 8, fontWeight: 500 }}>{f.label}</label>
                  <input name={f.name} type={f.type} required placeholder={f.placeholder} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#f0a500'; e.target.style.background = '#11111a'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = '#15151f'; }} />
                </div>
              ))}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a0a0b0', marginBottom: 8, fontWeight: 500 }}>Message</label>
                <textarea name="cmsg" required placeholder="Tell me about your event or idea..." rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  onFocus={e => { e.target.style.borderColor = '#f0a500'; e.target.style.background = '#11111a'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = '#15151f'; }} />
              </div>
              <button type="submit" className="pf-btn-primary" style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                Send Message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
              {note && <p style={{ fontSize: 12, color: '#6e6e80', marginTop: 14, textAlign: 'center' }}>{note}</p>}
              {!note && <p style={{ fontSize: 12, color: '#6e6e80', marginTop: 14, textAlign: 'center' }}>This opens your email client. To wire up a live endpoint, plug in Resend or Formspree.</p>}
            </form>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}