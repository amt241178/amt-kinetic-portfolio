import HeroAvatar from '../components/portfolio/HeroAvatar';
import ExperienceSection from '../components/portfolio/ExperienceSection.jsx';
import ProjectsSection from '../components/portfolio/ProjectsSection.jsx';
import ContactSection from '../components/portfolio/ContactSection.jsx';

export default function Portfolio() {
  return (
    <div style={{ background: '#050505', color: '#ededed', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 400, lineHeight: 1.6, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <HeroAvatar />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <footer style={{ padding: '3rem 1rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#050505' }}>
        <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          © {new Date().getFullYear()} Abhishek Mani Tripathi. All rights reserved.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#333' }}>
          Built with Three.js · Designed with care
        </p>
      </footer>
    </div>
  );
}