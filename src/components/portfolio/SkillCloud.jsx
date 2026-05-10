import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SKILLS = [
  { name: 'AI & ML', color: 0x00e5ff },
  { name: 'Event Tech', color: 0xa78bfa },
  { name: 'Live Streaming', color: 0x4ade80 },
  { name: 'Web Dev', color: 0xf59e0b },
  { name: 'No-Code', color: 0xf87171 },
  { name: 'Cloud Infra', color: 0x60a5fa },
  { name: 'Automation', color: 0x34d399 },
  { name: 'Analytics', color: 0xfbbf24 },
  { name: 'API Design', color: 0xec4899 },
  { name: 'DevOps', color: 0x10b981 },
];

export default function SkillCloud() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const sceneRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);

    if (!isVisible) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    camera.position.z = 50;
    sceneRef.current = scene;

    const light = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(light);

    const particles = [];

    SKILLS.forEach((skill, idx) => {
      const count = 15;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 15 + Math.random() * 25;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const z = (Math.random() - 0.5) * 40;

        const geometry = new THREE.SphereGeometry(0.5, 8, 8);
        const material = new THREE.MeshStandardMaterial({
          color: skill.color,
          emissive: skill.color,
          emissiveIntensity: 0.4,
          metalness: 0.3,
          roughness: 0.7,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);

        scene.add(mesh);
        particles.push({
          mesh,
          basePos: { x, y, z },
          skill: skill.name,
          velocity: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
          },
          material,
        });
      }
    });

    particlesRef.current = particles;

    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let rafId;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      particles.forEach((p, idx) => {
        const baseX = p.basePos.x + Math.sin(elapsed * 0.3 + idx) * 3;
        const baseY = p.basePos.y + Math.cos(elapsed * 0.4 + idx) * 3;
        const baseZ = p.basePos.z + Math.sin(elapsed * 0.2 + idx * 0.5) * 2;

        const dx = mouseRef.current.x * 30 - baseX;
        const dy = mouseRef.current.y * 20 - baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 15) {
          const force = (1 - dist / 15) * 0.15;
          p.mesh.position.x = baseX - dx * force;
          p.mesh.position.y = baseY - dy * force;
        } else {
          p.mesh.position.x = baseX;
          p.mesh.position.y = baseY;
        }

        p.mesh.position.z = baseZ;

        p.mesh.rotation.x += 0.003;
        p.mesh.rotation.y += 0.005;

        p.material.emissiveIntensity = 0.4 + Math.sin(elapsed * 2 + idx) * 0.2;
      });

      camera.position.x = Math.sin(elapsed * 0.1) * 5;
      camera.position.y = Math.cos(elapsed * 0.08) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      renderer.dispose();
    };
  }, [isVisible]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '120vh',
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0,229,255,0.08)',
        borderBottom: '1px solid rgba(0,229,255,0.08)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', marginBottom: '1rem' }}>
          Technical Arsenal
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: '1.5rem', maxWidth: 600, lineHeight: 1 }}>
          Technical Expertise
        </h2>
        <p style={{ fontSize: '1rem', color: '#d1d1d1', maxWidth: 500, lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
          Move your cursor around to interact. I have built expertise across AI, streaming, event tech, and cloud infrastructure.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', opacity: 0.8 }}>
          {SKILLS.map(skill => (
            <span
              key={skill.name}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 999,
                background: `rgba(${(skill.color >> 16) & 255}, ${(skill.color >> 8) & 255}, ${skill.color & 255}, 0.15)`,
                border: `1px solid rgba(${(skill.color >> 16) & 255}, ${(skill.color >> 8) & 255}, ${skill.color & 255}, 0.4)`,
                color: `rgb(${(skill.color >> 16) & 255}, ${(skill.color >> 8) & 255}, ${skill.color & 255})`,
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}