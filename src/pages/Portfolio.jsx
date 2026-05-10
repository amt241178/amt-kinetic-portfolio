import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import About from '../components/portfolio/About';
import Work from '../components/portfolio/Work';
import Timeline from '../components/portfolio/Timeline';
import Skills from '../components/portfolio/Skills';
import Resume from '../components/portfolio/Resume';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';

export default function Portfolio() {
  return (
    <div style={{ background: '#0a0a0f', color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1.6, overflowX: 'hidden', minHeight: '100vh' }}>
      {/* Background ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(240,165,0,0.18) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '2%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Work />
        <Timeline />
        <Skills />
        <Resume />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}