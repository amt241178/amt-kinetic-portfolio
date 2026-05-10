import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// ---- Loading screen: cycles through skills while avatar loads ----
const SKILLS = [
  'Event Tech Lead',
  'AI Builder',
  'Production Strategist',
  'Web App Creator',
  'Live Streaming Expert',
  'No-Code Developer',
  'Cvent Certified',
  'APAC Specialist',
];

function LoadingScreen({ progress, visible }) {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % SKILLS.length);
        setShow(true);
      }, 300);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      background: '#050505',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.7s ease',
    }}>
      {/* Animated purple orb */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(circle, #7c3aff 0%, #5b21b6 60%, transparent 100%)',
          filter: 'blur(8px)', animation: 'amt-pulse-orb 1.4s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 16, borderRadius: '50%',
          background: '#7c3aff',
          boxShadow: '0 0 30px #7c3aff',
          animation: 'amt-pulse-orb 1.4s ease-in-out infinite',
        }} />
      </div>

      {/* Cycling skill text */}
      <div style={{ textAlign: 'center', height: 60, display: 'flex', alignItems: 'center' }}>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 700,
          fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
          {SKILLS[idx]}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2,
          background: 'linear-gradient(90deg, #7c3aff, #a78bfa)',
          width: `${progress}%`,
          transition: 'width 0.3s ease',
          boxShadow: '0 0 8px #7c3aff',
        }} />
      </div>

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555' }}>
        Loading Avatar · {Math.round(progress)}%
      </div>
    </div>
  );
}

// ---- Role cycling ----
const ROLES = ['Event Tech Lead', 'AI Builder', 'Production Strategist', 'Web App Creator'];

function RoleCycler() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('in'); // 'in' | 'out'

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('out');
      setTimeout(() => {
        setIdx(i => (i + 1) % ROLES.length);
        setPhase('in');
      }, 400);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', height: 'clamp(2.5rem, 6vw, 5rem)', overflow: 'hidden', width: '100%' }}>
      <div style={{
        position: 'absolute', right: 0, top: 0,
        fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
        fontWeight: 900, letterSpacing: '-0.03em', whiteSpace: 'nowrap', lineHeight: 1.05,
        background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        opacity: phase === 'in' ? 1 : 0,
        transform: phase === 'in' ? 'translateY(0)' : phase === 'out' ? 'translateY(-40px)' : 'translateY(40px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}>
        {ROLES[idx]}
      </div>
    </div>
  );
}

// ---- Main Hero ----
export default function HeroAvatar() {
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(0, 0.4, 5.0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const key = new THREE.DirectionalLight(0xfff8f0, 1.4);
    key.position.set(-3, 4, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0005;
    scene.add(key);

    const rim = new THREE.PointLight(0x7c3aff, 12, 10);
    rim.position.set(0, 2, -3);
    scene.add(rim);
    scene.add(Object.assign(new THREE.PointLight(0xc4b5fd, 0.6, 12), { position: new THREE.Vector3(4, 0.5, 1) }));
    scene.add(Object.assign(new THREE.PointLight(0x6d28d9, 1.2, 6), { position: new THREE.Vector3(-2.5, -1, 2) }));

    // Halo
    const haloMat = new THREE.MeshBasicMaterial({ color: 0x5b21b6, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), haloMat);
    halo.position.set(0, 0.5, -1.8);
    scene.add(halo);

    // Floating orb
    const orbMat = new THREE.MeshStandardMaterial({ color: 0x9b6dff, emissive: 0x7c3aff, emissiveIntensity: 3, toneMapped: false });
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 32), orbMat);
    orb.position.set(-2.0, 0.5, 0.5);
    scene.add(orb);

    // Orb glow sprite
    const glowC = document.createElement('canvas');
    glowC.width = glowC.height = 256;
    const gc = glowC.getContext('2d');
    const gg = gc.createRadialGradient(128, 128, 0, 128, 128, 128);
    gg.addColorStop(0, 'rgba(155,109,255,0.9)'); gg.addColorStop(0.4, 'rgba(124,58,255,0.4)'); gg.addColorStop(1, 'rgba(124,58,255,0)');
    gc.fillStyle = gg; gc.fillRect(0, 0, 256, 256);
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(glowC), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    glowSprite.scale.set(1.4, 1.4, 1);
    orb.add(glowSprite);

    // Contact shadow
    const shadowC = document.createElement('canvas');
    shadowC.width = shadowC.height = 256;
    const sc = shadowC.getContext('2d');
    const sg = sc.createRadialGradient(128, 128, 0, 128, 128, 128);
    sg.addColorStop(0, 'rgba(76,29,149,0.55)'); sg.addColorStop(0.5, 'rgba(20,10,40,0.25)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
    sc.fillStyle = sg; sc.fillRect(0, 0, 256, 256);
    const groundShadow = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowC), transparent: true, depthWrite: false }));
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.set(0, -2.45, 0);
    scene.add(groundShadow);

    // Avatar group
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // Load GLB — replace URL below with your actual avatar GLB URL
    const AVATAR_URL = 'https://media.base44.com/files/public/6a0095ba0fd898883f2ce8d9/avatar.glb';

    let avatarMesh = null;
    const loader = new GLTFLoader();
    loader.load(
      AVATAR_URL,
      (gltf) => {
        avatarMesh = gltf.scene;
        avatarMesh.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) child.material.envMapIntensity = 0.5;
          }
        });
        const box = new THREE.Box3().setFromObject(avatarMesh);
        const size = new THREE.Vector3();
        box.getSize(size);
        const scale = 4.2 / size.y;
        avatarMesh.scale.setScalar(scale);
        box.setFromObject(avatarMesh);
        const center = new THREE.Vector3();
        box.getCenter(center);
        avatarMesh.position.x -= center.x;
        avatarMesh.position.z -= center.z;
        avatarMesh.position.y -= box.min.y + 2.4;
        avatarGroup.add(avatarMesh);
        setLoadProgress(100);
        setAvatarLoaded(true);
      },
      (xhr) => { if (xhr.total) setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100)); },
      (err) => { console.error('GLB load failed:', err); setAvatarFailed(true); setAvatarLoaded(true); }
    );

    // Mouse
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => { mouse.tx = (e.clientX / window.innerWidth) * 2 - 1; mouse.ty = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener('mousemove', onMouseMove);

    const isTouch = 'ontouchstart' in window;
    const clock = new THREE.Clock();
    let rafId;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      if (avatarMesh) {
        if (isTouch) {
          avatarGroup.rotation.y = Math.sin(t * 0.4) * 0.25;
          avatarGroup.rotation.x = Math.sin(t * 0.3) * 0.04;
        } else {
          avatarGroup.rotation.y += ((mouse.x * Math.PI / 7) - avatarGroup.rotation.y) * 0.06;
          avatarGroup.rotation.x += ((-mouse.y * Math.PI / 14) - avatarGroup.rotation.x) * 0.06;
        }
        avatarGroup.position.y = Math.sin(t * 1.2) * 0.025;
      }
      orb.position.x = -2.0 + Math.sin(t * 0.4) * 0.18;
      orb.position.y = 0.5 + Math.sin(t * 0.6) * 0.15;
      orb.position.z = 0.5 + Math.sin(t * 0.3) * 0.1;
      haloMat.opacity = 0.16 + Math.sin(t * 0.8) * 0.04;
      rim.intensity = 11 + Math.sin(t * 0.5) * 1.5;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
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
      {/* Purple glow bg */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 70%, rgba(124,58,255,0.20) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

      {/* Three.js canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* Noise overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' /%3E%3C/svg%3E\")" }} />

      {/* Loading Screen */}
      <LoadingScreen progress={loadProgress} visible={!avatarLoaded} />

      {/* Topbar */}
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5%' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aff', boxShadow: '0 0 12px #7c3aff', display: 'inline-block' }} />
          A. Mani Tripathi
        </div>
        <nav style={{ display: 'flex', gap: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          {[['#experience', 'Experience'], ['#work', 'Work'], ['#contact', 'Contact']].map(([href, label]) => (
            <a key={label} href={href} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#a78bfa'} onMouseLeave={e => e.target.style.color = '#888'}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Left text */}
      <div className="amt-hero-left" style={{ position: 'absolute', left: '6%', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.95rem', color: '#a78bfa', marginBottom: 8, fontWeight: 400, letterSpacing: '0.04em' }}>Hello, I'm</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff', margin: 0, fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
          <span style={{ display: 'block' }}>Abhishek</span>
          <span style={{ display: 'block' }}>Mani</span>
          <span style={{ display: 'block', color: '#a78bfa' }}>Tripathi.</span>
        </h1>
      </div>

      {/* Right text */}
      <div className="amt-hero-right" style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', zIndex: 10, textAlign: 'right', pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.95rem', color: '#d1d1d1', marginBottom: 8, fontWeight: 400, letterSpacing: '0.04em' }}>I am an</p>
        <RoleCycler />
      </div>

      {/* Scroll cue */}
      <div className="amt-scroll-cue-purple" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        Scroll
      </div>
    </section>
  );
}