import HeroCanvas from '../components/portfolio/HeroCanvas';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';

export default function Portfolio() {
  return (
    <div style={{ background: '#121212', color: '#ededed', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 400, lineHeight: 1.6, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <HeroCanvas />
      <ExperienceSection />
      <ProjectsSection />

      {/* Footer */}
      <footer style={{ padding: '3rem 1rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
          © {new Date().getFullYear()} Abhishek Mani Tripathi. All rights reserved.
        </p>
        <p className="amt-mono" style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#444' }}>
          Bengaluru · myselfabhishekmanitripathi@gmail.com
        </p>
      </footer>
    </div>
  );
}