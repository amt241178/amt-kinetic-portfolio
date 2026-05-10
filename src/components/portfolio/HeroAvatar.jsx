import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const SKILLS = [
  'Event Tech Lead', 'AI Builder', 'Production Strategist', 'Web App Creator',
  'Live Streaming Expert', 'No-Code Developer', 'Cvent Certified', 'APAC Specialist',
];

// Primary model; fallback to Model2 if this fails
const AVATAR_URL = 'https://drive.usercontent.google.com/download?id=19JNLJEdbvuogzR_jO_Ohfwax_ERZJsZS&export=download&confirm=t';
const AVATAR_URL_2 = 'https://drive.usercontent.google.com/download?id=1i7ZQ48C1mAIoOzwmgwKTrA53Ih43lyrE&export=download&confirm=t';

function LoadingScreen({ progress, visible }) {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % SKILLS.length); setShow(true); }, 300);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20, background: '#050505',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
      opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none', transition: 'opacity 0.7s ease',
    }}>
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #00e5ff 0%, #006080 60%, transparent 100%)', filter: 'blur(8px)', animation: 'amt-pulse-orb 1.4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 16, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 30px #00e5ff', animation: 'amt-pulse-orb 1.4s ease-in-out infinite' }} />
      </div>
      <div style={{ textAlign: 'center', height: 60, display: 'flex', alignItems: 'center' }}>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #ffffff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>{SKILLS[idx]}</div>
      </div>
      <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #00e5ff, #fff)', width: `${progress}%`, transition: 'width 0.3s ease', boxShadow: '0 0 8px #00e5ff' }} />
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555' }}>
        Loading · {Math.round(progress)}%
      </div>
    </div>
  );
}

const ROLES = ['Event Tech Lead', 'AI Builder', 'Production Strategist', 'Live Streaming Expert'];

function RoleCycler() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('in');

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('out');
      setTimeout(() => { setIdx(i => (i + 1) % ROLES.length); setPhase('in'); }, 400);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', height: 'clamp(2.5rem, 6vw, 5rem)', overflow: 'hidden', width: '100%' }}>
      <div style={{
        position: 'absolute', right: 0, top: 0,
        fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.03em', whiteSpace: 'nowrap', lineHeight: 1.05,
        background: 'linear-gradient(135deg, #ffffff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        opacity: phase === 'in' ? 1 : 0, transform: phase === 'in' ? 'translateY(0)' : 'translateY(-40px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}>{ROLES[idx]}</div>
    </div>
  );
}

function buildScene(renderer) {
  const scene = new THREE.Scene();
  scene.background = null;

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  scene.add(new THREE.AmbientLight(0xffffff, 0.12));

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-3, 4, 3);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0005;
  scene.add(key);

  const rim = new THREE.PointLight(0x00e5ff, 14, 10);
  rim.position.set(0, 2, -3);
  scene.add(rim);

  const fill = new THREE.PointLight(0xffffff, 0.5, 12);
  fill.position.set(4, 0.5, 1);
  scene.add(fill);

  const kicker = new THREE.PointLight(0xff1f71, 1.0, 6);
  kicker.position.set(-2.5, -1, 2);
  scene.add(kicker);

  // Halo plane behind avatar
  const haloMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), haloMat);
  halo.position.set(0, 0.5, -1.8);
  scene.add(halo);

  // Floating orb
  const orbMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 3, toneMapped: false });
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), orbMat);
  orb.position.set(-2.0, 0.5, 0.5);
  scene.add(orb);

  return { scene, rim, halo, haloMat, orb };
}

function loadAvatar(url, fallbackUrl, scene, onProgress, onDone) {
  const loader = new GLTFLoader();
  const group = new THREE.Group();
  scene.add(group);

  function tryLoad(src) {
    loader.load(
      src,
      (gltf) => {
        const mesh = gltf.scene;
        mesh.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) child.material.envMapIntensity = 0.4;
          }
        });
        const box = new THREE.Box3().setFromObject(mesh);
        const size = new THREE.Vector3();
        box.getSize(size);
        const scale = 4.2 / size.y;
        mesh.scale.setScalar(scale);
        box.setFromObject(mesh);
        const center = new THREE.Vector3();
        box.getCenter(center);
        mesh.position.x -= center.x;
        mesh.position.z -= center.z;
        mesh.position.y -= box.min.y + 2.4;
        group.add(mesh);
        onDone(group);
      },
      (xhr) => { if (xhr.total) onProgress(Math.round((xhr.loaded / xhr.total) * 100)); },
      () => {
        if (src === url && fallbackUrl) { tryLoad(fallbackUrl); }
        else { onDone(group); }
      }
    );
  }
  tryLoad(url);
  return group;
}

export default function HeroAvatar() {
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(0, 0.4, 5.0);

    const { scene, rim, haloMat, orb } = buildScene(renderer);

    let avatarGroup = null;
    loadAvatar(
      AVATAR_URL, AVATAR_URL_2, scene,
      (p) => setLoadProgress(p),
      (group) => { avatarGroup = group; setLoadProgress(100); setAvatarLoaded(true); }
    );

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => { mouse.tx = (e.clientX / window.innerWidth) * 2 - 1; mouse.ty = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let rafId;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      if (avatarGroup) {
        avatarGroup.rotation.y += ((mouse.x * Math.PI / 7) - avatarGroup.rotation.y) * 0.06;
        avatarGroup.rotation.x += ((-mouse.y * Math.PI / 14) - avatarGroup.rotation.x) * 0.06;
        avatarGroup.position.y = Math.sin(t * 1.2) * 0.025;
      }

      orb.position.x = -2.0 + Math.sin(t * 0.4) * 0.18;
      orb.position.y = 0.5 + Math.sin(t * 0.6) * 0.15;
      orb.position.z = 0.5 + Math.sin(t * 0.3) * 0.1;
      haloMat.opacity = 0.07 + Math.sin(t * 0.8) * 0.02;
      rim.intensity = 12 + Math.sin(t * 0.5) * 2;

      renderer.render(scene, camera);
    }
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
      renderer.dispose();
    };
  }, []);

  return (
    <section id="home" style={{ position: 'relative', width: '100vw', height: '100vh', minHeight: 700, background: '#050505', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {/* Neon glow BG */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 55% at 50% 70%, rgba(0,229,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '20%', right: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,31,113,0.08), transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      <LoadingScreen progress={loadProgress} visible={!avatarLoaded} />

      {/* Topbar */}
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5%' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 12px #00e5ff', display: 'inline-block' }} />
          A. Mani Tripathi
        </div>
        <nav style={{ display: 'flex', gap: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          {[['#experience', 'Experience'], ['#work', 'Work'], ['#contact', 'Contact']].map(([href, label]) => (
            <a key={label} href={href} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00e5ff'} onMouseLeave={e => e.target.style.color = '#888'}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Left text */}
      <div className="amt-hero-left" style={{ position: 'absolute', left: '6%', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.95rem', color: '#00e5ff', marginBottom: 8, fontWeight: 400, letterSpacing: '0.04em' }}>Hello, I'm</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff', margin: 0, fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
          <span style={{ display: 'block' }}>Abhishek</span>
          <span style={{ display: 'block' }}>Mani</span>
          <span style={{ display: 'block', color: '#00e5ff', textShadow: '0 0 20px rgba(0,229,255,0.5)' }}>Tripathi.</span>
        </h1>
      </div>

      {/* Right text */}
      <div className="amt-hero-right" style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', zIndex: 10, textAlign: 'right', pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.95rem', color: '#d1d1d1', marginBottom: 8, fontWeight: 400, letterSpacing: '0.04em' }}>I am an</p>
        <RoleCycler />
      </div>

      <div className="amt-scroll-cue-purple" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10, color: '#00e5ff' }}>
        Scroll
      </div>
    </section>
  );
}