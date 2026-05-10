import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Work', 'Experience', 'Skills', 'Contact'];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '14px 40px' : '18px 40px',
        background: scrolled ? 'rgba(10,10,15,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'all 0.35s ease',
      }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
          <span style={{ width: 9, height: 9, background: '#f0a500', borderRadius: '50%', boxShadow: '0 0 14px #f0a500', display: 'inline-block', flexShrink: 0 }} />
          Abhishek Mani Tripathi
        </div>

        <div className="pf-nav-center">
          <a href="mailto:myselfabhishekmanitripathi@gmail.com" className="pf-email-link">
            myselfabhishekmanitripathi@gmail.com
          </a>
        </div>

        <div className="pf-nav-links">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="pf-nav-link">{l}</a>
          ))}
        </div>

        <button className="pf-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </nav>

      {/* Sidebar Social */}
      <div className="pf-sidebar">
        <a href="https://linkedin.com/in/abhishek-mani-tripathi" target="_blank" rel="noopener" aria-label="LinkedIn" className="pf-social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V8h3v11zM6.5 6.7c-1 0-1.7-.8-1.7-1.7S5.5 3.3 6.5 3.3s1.7.8 1.7 1.7-.7 1.7-1.7 1.7zM20 19h-3v-5.6c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.5V19z"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener" aria-label="Instagram" className="pf-social-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener" aria-label="Twitter/X" className="pf-social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="#" target="_blank" rel="noopener" aria-label="GitHub" className="pf-social-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58 0-.29-.01-1.05-.01-2.06-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.69.83.58A12 12 0 0 0 12 0z"/></svg>
        </a>
        <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.16)', margin: '8px auto 0' }} />
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMenuOpen(false)} />
      )}
      <div style={{
        position: 'fixed', top: 0, right: menuOpen ? 0 : '-100%', width: '80%', maxWidth: 320, height: '100vh',
        background: '#11111a', borderLeft: '1px solid rgba(255,255,255,0.08)',
        zIndex: 200, padding: '80px 28px 28px', display: 'flex', flexDirection: 'column', gap: 8,
        transition: 'right 0.4s ease',
      }}>
        <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 24, right: 24, fontSize: 28, color: '#fff', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>×</button>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, color: '#fff', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#f0a500'} onMouseLeave={e => e.target.style.color = '#fff'}>
            {l}
          </a>
        ))}
      </div>
    </>
  );
}