import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// ─── MODELS ───────────────────────────────────────────────────────────────────

const MODELS = [
  '/model_0.glb',
  '/model_1.glb',
  '/model_2.glb',
  '/model_3.glb',
  '/model_4.glb',
  '/model_5.glb',
];

// ─── POSE FIX ────────────────────────────────────────────────────────────────

function poseArmsDown(scene) {
  const armBones = [];
  scene.traverse(obj => {
    if (!obj.isBone && obj.type !== 'Bone') return;
    const n = obj.name.toLowerCase();
    const isUpperArm = (
      n.includes('arm') || n.includes('shoulder') || n.includes('upperarm') || n.includes('upper_arm') || n.includes('clavicle')
    ) && !n.includes('fore') && !n.includes('lower') && !n.includes('hand') && !n.includes('finger') && !n.includes('twist') && !n.includes('roll');
    if (isUpperArm) armBones.push(obj);
  });

  armBones.forEach(obj => {
    const n = obj.name.toLowerCase();
    const isLeft = n.includes('left') || n.includes('_l') || n.endsWith('.l') || n.startsWith('l_') || n.startsWith('l.');
    const isRight = n.includes('right') || n.includes('_r') || n.endsWith('.r') || n.startsWith('r_') || n.startsWith('r.');

    if (isLeft) { obj.rotation.z = -1.4; obj.rotation.x = 0; }
    else if (isRight) { obj.rotation.z = 1.4; obj.rotation.x = 0; }
    else {
      // Fallback: use world-space X position to determine side
      const wp = new THREE.Vector3();
      obj.getWorldPosition(wp);
      if (wp.x < 0) { obj.rotation.z = -1.4; obj.rotation.x = 0; }
      else { obj.rotation.z = 1.4; obj.rotation.x = 0; }
    }
  });
}

// ─── HERO ────────────────────────────────────────────────────────────────────

const SKILLS = ['Event Tech Lead', 'AI Builder', 'Production Strategist', 'Web App Creator', 'Live Streaming Expert', 'No-Code Developer', 'Cvent Certified', 'APAC Specialist'];
const ROLES  = ['Event Tech Lead', 'AI Builder', 'Production Strategist', 'Live Streaming Expert'];

function LoadingScreen({ progress, visible }) {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % SKILLS.length); setShow(true); }, 300);
    }, 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: '#050505', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none', transition: 'opacity 0.7s ease' }}>
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #00e5ff 0%, #006080 60%, transparent 100%)', filter: 'blur(8px)', animation: 'amt-pulse-orb 1.4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 16, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 30px #00e5ff', animation: 'amt-pulse-orb 1.4s ease-in-out infinite' }} />
      </div>
      <div style={{ textAlign: 'center', height: 60, display: 'flex', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #ffffff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>{SKILLS[idx]}</div>
      </div>
      <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #00e5ff, #fff)', width: `${progress}%`, transition: 'width 0.3s ease', boxShadow: '0 0 8px #00e5ff' }} />
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555' }}>Loading · {Math.round(progress)}%</div>
    </div>
  );
}

function RoleCycler() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('in');
  useEffect(() => {
    const t = setInterval(() => {
      setPhase('out');
      setTimeout(() => { setIdx(i => (i + 1) % ROLES.length); setPhase('in'); }, 400);
    }, 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ position: 'relative', height: 'clamp(2.5rem, 6vw, 6rem)', overflow: 'visible', width: '100%' }}>
      <div style={{ position: 'absolute', right: 0, top: 0, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 900, letterSpacing: '-0.03em', whiteSpace: 'nowrap', lineHeight: 1.05, background: 'linear-gradient(135deg, #ffffff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: phase === 'in' ? 1 : 0, transform: phase === 'in' ? 'translateY(0)' : 'translateY(-40px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>{ROLES[idx]}</div>
    </div>
  );
}

function HeroSection({ modelUrl }) {
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const sceneRef = useRef(null);
  const avatarGroupRef = useRef(null);
  const fadingRef = useRef(false);

  // Cross-fade to new model when modelUrl changes (after initial mount)
  const initialMountRef = useRef(true);
  useEffect(() => {
    if (initialMountRef.current) { initialMountRef.current = false; return; }
    if (!sceneRef.current || !modelUrl || fadingRef.current) return;
    const scene = sceneRef.current;
    const oldGroup = avatarGroupRef.current;
    if (!oldGroup) return;

    fadingRef.current = true;
    let opacity = 1;
    const fadeOut = setInterval(() => {
      opacity -= 0.1;
      oldGroup.traverse(c => { if (c.isMesh && c.material) { c.material.transparent = true; c.material.opacity = Math.max(0, opacity); } });
      if (opacity <= 0) {
        clearInterval(fadeOut);
        scene.remove(oldGroup);
        avatarGroupRef.current = null;
        const loader = new GLTFLoader();
        loader.setCrossOrigin('anonymous');
        const newGroup = new THREE.Group();
        scene.add(newGroup);
        loader.load(modelUrl, (gltf) => {
          const mesh = gltf.scene;
          mesh.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; c.material.transparent = true; c.material.opacity = 0; } });
          const box = new THREE.Box3().setFromObject(mesh);
          const size = new THREE.Vector3();
          box.getSize(size);
          mesh.scale.setScalar(4.2 / size.y);
          box.setFromObject(mesh);
          const center = new THREE.Vector3();
          box.getCenter(center);
          mesh.position.x -= center.x;
          mesh.position.z -= center.z;
          mesh.position.y -= box.min.y;
          poseArmsDown(mesh);
          newGroup.add(mesh);
          avatarGroupRef.current = newGroup;
          let inOpacity = 0;
          const fadeIn = setInterval(() => {
            inOpacity += 0.1;
            newGroup.traverse(c => { if (c.isMesh && c.material) c.material.opacity = Math.min(1, inOpacity); });
            if (inOpacity >= 1) { clearInterval(fadeIn); fadingRef.current = false; }
          }, 16);
        }, null, () => { fadingRef.current = false; });
      }
    }, 16);
  }, [modelUrl]);

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

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(0, 2.1, 5.5);
    camera.lookAt(0, 2.1, 0);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(-3, 4, 3);
    key.castShadow = true;
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

    const haloMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), haloMat);
    halo.position.set(0, 0.5, -1.8);
    scene.add(halo);

    const orbMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 3, toneMapped: false });
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), orbMat);
    orb.position.set(-2.0, 0.5, 0.5);
    scene.add(orb);

    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);
    avatarGroupRef.current = avatarGroup;

    const loader = new GLTFLoader();
    loader.setCrossOrigin('anonymous');
    function tryLoad(url, fallback) {
      loader.load(url, (gltf) => {
        const mesh = gltf.scene;
        mesh.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
        const box = new THREE.Box3().setFromObject(mesh);
        const size = new THREE.Vector3();
        box.getSize(size);
        mesh.scale.setScalar(4.2 / size.y);
        box.setFromObject(mesh);
        const center = new THREE.Vector3();
        box.getCenter(center);
        mesh.position.x -= center.x;
        mesh.position.z -= center.z;
        mesh.position.y -= box.min.y;
        poseArmsDown(mesh);
        avatarGroup.add(mesh);
        setLoadProgress(100);
        setAvatarLoaded(true);
      }, (xhr) => { if (xhr.total) setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100)); },
      () => { if (fallback) tryLoad(fallback, null); else setAvatarLoaded(true); });
    }
    tryLoad(modelUrl || MODELS[0], MODELS[0]);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMM = (e) => { mouse.tx = (e.clientX / window.innerWidth) * 2 - 1; mouse.ty = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener('mousemove', onMM);

    const clock = new THREE.Clock();
    let raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const ag = avatarGroupRef.current;
      if (ag && ag.children.length) {
        ag.rotation.y += ((mouse.x * Math.PI / 7) - ag.rotation.y) * 0.06;
        ag.rotation.x += ((-mouse.y * Math.PI / 14) - ag.rotation.x) * 0.06;
        ag.position.y = Math.sin(t * 1.2) * 0.025;
      }
      orb.position.x = -2.0 + Math.sin(t * 0.4) * 0.18;
      orb.position.y = 0.5 + Math.sin(t * 0.6) * 0.15;
      haloMat.opacity = 0.07 + Math.sin(t * 0.8) * 0.02;
      rim.intensity = 12 + Math.sin(t * 0.5) * 2;
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMM); window.removeEventListener('resize', onResize); renderer.dispose(); };
  }, []);

  return (
    <section id="home" style={{ position: 'relative', width: '100vw', height: '100vh', minHeight: 700, background: '#050505', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 55% at 50% 70%, rgba(0,229,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      <LoadingScreen progress={loadProgress} visible={!avatarLoaded} />
      <div style={{ position: 'absolute', top: 28, left: 0, right: 0, zIndex: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5%' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#888', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 12px #00e5ff', display: 'inline-block' }} />
          A. Mani Tripathi
        </div>
        <nav style={{ display: 'flex', gap: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          {[['#experience', 'Experience'], ['#work', 'Work'], ['#contact', 'Contact']].map(([href, label]) => (
            <a key={label} href={href} style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00e5ff'} onMouseLeave={e => e.target.style.color = '#888'}>{label}</a>
          ))}
        </nav>
      </div>
      <div className="amt-hero-left" style={{ position: 'absolute', left: '6%', top: '50%', transform: 'translateY(-50%)', zIndex: 40, pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.95rem', color: '#00e5ff', marginBottom: 8, fontWeight: 400 }}>Hello, I'm</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#fff', margin: 0, fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
          <span style={{ display: 'block' }}>Abhishek</span>
          <span style={{ display: 'block' }}>Mani</span>
          <span style={{ display: 'block', color: '#00e5ff', textShadow: '0 0 20px rgba(0,229,255,0.5)' }}>Tripathi.</span>
        </h1>
      </div>
      <div className="amt-hero-right" style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', zIndex: 40, textAlign: 'right', pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.95rem', color: '#d1d1d1', marginBottom: 8 }}>I am an</p>
        <RoleCycler />
      </div>
      <div className="amt-scroll-cue-purple" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 40, color: '#00e5ff' }}>Scroll</div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

const jobs = [
  { period: 'May 2023 to Present', company: 'Vosmos (Kestone Global)', role: 'Event Technology and Production Manager', desc: 'I look after product delivery and day-to-day event operations on an enterprise SaaS platform that serves 50+ technology clients. I built the registration systems, badge printing setups and streaming workflows that power broadcasts reaching up to 50,000 viewers at a time with 99%+ uptime. I also lead a team of eight across product, engineering and streaming.' },
  { period: 'May 2022 to Apr 2023', company: 'MCI Group', role: 'Technical Producer, YouTube Partner Experience (Google APAC)', desc: 'I ran technical production for 50+ Google APAC partner events from start to finish. This included RTMP and NDI streaming setups, encoder configurations and live troubleshooting during high-visibility sessions with up to 20,000 viewers. I kept a 95% technical success rate and hit on-time delivery on every event across APAC time zones.' },
  { period: 'Jun 2020 to May 2022', company: 'Kestone Global', role: 'IT Project and Operations Manager, Virtual and Hybrid Events', desc: 'I managed registration, access control and attendee communication for 450+ virtual and hybrid enterprise events across APAC, finishing with 98% client satisfaction. I also built multi-vendor production setups covering studio builds, audio chains, lighting rigs and streaming infrastructure.' },
  { period: 'Oct 2014 to Jun 2020', company: 'VouchPro Services', role: 'Webcast and Production Operations Manager', desc: 'I led a team of five handling pan-India event operations and webcast delivery for a large enterprise client portfolio over six years. I wrote the SOPs for event execution, platform setup, pre-event testing and incident response that the team still uses today.' },
  { period: 'May 2013 to Sep 2014', company: 'Window Techs India', role: 'Project Engineer', desc: 'I delivered AV and room automation installation projects for hotels and hospitals, covering system design, vendor coordination, installation, testing and client sign-off.' },
];

function ExperienceSection() {
  const itemRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('amt-visible'), parseInt(entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    itemRefs.current.forEach((el, i) => { if (el) { el.dataset.delay = i * 100; observer.observe(el); } });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" style={{ background: '#080808', padding: '8rem 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', textAlign: 'center', marginBottom: '1rem' }}>The Journey</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', textAlign: 'center', marginBottom: '4rem', color: '#fff', lineHeight: 1 }}>Career Timeline</h2>
        <div style={{ position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '2.5rem' }}>
          {jobs.map((job, i) => (
            <div key={job.company} ref={el => itemRefs.current[i] = el} className="amt-timeline-item" style={{ position: 'relative', paddingBottom: i < jobs.length - 1 ? '3rem' : 0 }}>
              <div style={{ position: 'absolute', left: '-2.93rem', top: '0.6rem', width: 10, height: 10, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 12px #00e5ff' }} />
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '0.75rem' }}>{job.period}</div>
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

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

const projects = [
  { label: 'Smart AI Voice Agent', pills: [['AI Voice', true], ['No-Code', false]], title: 'Smart AI Voice Agent', desc: 'A voice-based reminder system that calls registered attendees, confirms their attendance, answers questions and blocks their calendars automatically. Replaced the manual telecalling work entirely.' },
  { label: 'AI FaceSync', pills: [['Face Recognition', true], ['Smart Gallery', false]], title: 'AI FaceSync', desc: 'A smart event gallery for large corporate photo shoots. Attendees upload a selfie and the system surfaces only their photos with a confidence score. Admins handle uploads and access through a simple dashboard.' },
  { label: 'Face Puzzle Arena', pills: [['WebAR', true], ['Multiplayer', false]], title: 'Face Puzzle Arena', desc: 'A browser-based AR gaming platform built for live event engagement with no app downloads required. Five games including Car Nose Racer, AR Fruit Ninja and Finger Maze Race, all running on face and hand tracking.' },
  { label: 'Smart Networking System', pills: [['Networking', true], ['QR Booking', false]], title: 'Smart Networking System', desc: 'A networking platform for corporate events and hosted buyer programs. It handles meeting requests, slot scheduling, table allocation and live coordination through a QR self-service interface.' },
  { label: 'Facility Command Center', pills: [['Operations', true], ['Geo Verified', false]], title: 'Facility Command Center', desc: 'An office facility platform where employees scan a QR code to report issues with photos. Admins assign and track tasks. Geolocation confirms that work was done on site.' },
  { label: 'ExpenseSync Dashboard', pills: [['Finance Ops', true], ['Vendor Tracking', false]], title: 'ExpenseSync Dashboard', desc: 'A centralised invoice and expense tracker for an event tech division. Replaced scattered spreadsheets with vendor-level tracking, time-stamped uploads and a searchable history of every invoice.' },
  { label: 'Nike Run Challenge Leaderboard', pills: [['Retail Activation', true], ['Live Leaderboard', false]], title: 'Nike Run Challenge Leaderboard', desc: 'A real-time leaderboard for treadmill challenges across Nike retail stores. Deployed across North and South India with multiple categories, configurable distances and a live timing display.' },
  { label: 'AI Queue and Token System', pills: [['Crowd Flow', true], ['Booth Engagement', false]], title: 'AI Queue and Token System', desc: 'A smart queue built for an AWS VR booth with six headset stations. Attendees scan a QR code, register, and receive a digital token showing their wait time and queue position. No physical tokens needed.' },
  { label: 'Bharat Vyapaar Mahotsav', pills: [['Exhibition', true], ['Large Scale', false]], title: 'Bharat Vyapaar Mahotsav', desc: 'Large-scale expo execution covering registration, badge printing, attendee flow and on-site tech operations across multiple days with live troubleshooting and vendor coordination throughout.' },
  { label: 'Google APAC Partner Events', pills: [['Live Broadcast', true], ['Google APAC', false]], title: 'Google APAC Partner Events', desc: 'Technical production for 50+ Google APAC partner events, running RTMP and NDI workflows, encoder configurations and live troubleshooting for up to 20,000 concurrent viewers.' },
];

function ProjectsSection() {
  const cardRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('amt-visible'), parseInt(entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
    cardRefs.current.forEach((el, i) => { if (el) { el.dataset.delay = (i % 2) * 100; observer.observe(el); } });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" style={{ background: '#0a0a0a', padding: '8rem 2rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', marginBottom: '1rem' }}>Selected Works</div>
          <h2 style={{ fontSize: 'clamp(2.75rem, 9vw, 7rem)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.95, color: '#fff' }}>Things I've Shipped.</h2>
        </div>
        <div className="amt-project-grid">
          {projects.map((p, i) => (
            <article key={p.label} ref={el => cardRefs.current[i] = el} className="amt-project-card">
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
                <div className="amt-img-slot" data-label={`16:9 — ${p.label}`} />
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.8) 50%, transparent 100%)', zIndex: 1 }} />
              <div className="amt-project-content">
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {p.pills.map(([text, solid]) => (
                    <span key={text} style={solid
                      ? { padding: '0.3rem 0.75rem', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: '#050505', textTransform: 'uppercase', background: '#00e5ff', borderRadius: 999, boxShadow: '0 0 12px rgba(0,229,255,0.5)' }
                      : { padding: '0.3rem 0.75rem', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', color: '#fff', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 999, background: 'rgba(255,255,255,0.05)' }
                    }>{text}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}>{p.title}</h3>
                <p style={{ color: '#e5e5e5', fontSize: '1rem', lineHeight: 1.65, fontWeight: 300 }}>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" style={{ background: '#080808', padding: '6rem 2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 70% at 50% 50%, rgba(0,229,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }} style={{ position: 'relative', zIndex: 2, maxWidth: '56rem', margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#00e5ff', marginBottom: '1.25rem' }}>Get In Touch</div>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff' }}>Have an event or an idea? Let's talk.</h3>
        <p style={{ color: '#d1d1d1', fontSize: '1.125rem', fontWeight: 300, marginBottom: '2.5rem', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          Whether it's a stage that needs wiring up or a tool you want built from scratch, send me a note. I usually get back within a day.
        </p>
        <a href="mailto:myselfabhishekmanitripathi@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '1rem 2rem', borderRadius: 999, background: 'transparent', border: '1.5px solid #00e5ff', color: '#00e5ff', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.02em', boxShadow: '0 0 20px rgba(0,229,255,0.25)', transition: 'background 0.25s, box-shadow 0.25s, color 0.25s', textDecoration: 'none' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#00e5ff'; e.currentTarget.style.color = '#050505'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,229,255,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00e5ff'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.25)'; }}>
          Start a Conversation
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <div style={{ marginTop: '2.5rem', display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#555' }}>
          <a href="mailto:myselfabhishekmanitripathi@gmail.com" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#00e5ff'} onMouseLeave={e => e.target.style.color = '#555'}>myselfabhishekmanitripathi@gmail.com</a>
          <span>·</span>
          <a href="https://linkedin.com/in/abhishek-mani-tripathi" target="_blank" rel="noopener" style={{ textDecoration: 'none', color: '#555', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#00e5ff'} onMouseLeave={e => e.target.style.color = '#555'}>LinkedIn</a>
          <span>·</span>
          <span>Bengaluru, India</span>
        </div>
      </motion.div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [currentModelUrl, setCurrentModelUrl] = useState(MODELS[0]);
  const lastIndexRef = useRef(0);
  const cooldownRef = useRef(false);

  const switchModel = () => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    let newIndex;
    do { newIndex = Math.floor(Math.random() * MODELS.length); } while (newIndex === lastIndexRef.current && MODELS.length > 1);
    lastIndexRef.current = newIndex;
    setCurrentModelUrl(MODELS[newIndex]);
    setTimeout(() => { cooldownRef.current = false; }, 1500);
  };

  useEffect(() => {
    // Switch on scroll
    const onScroll = () => switchModel();
    window.addEventListener('scroll', onScroll, { passive: true });
    // Switch on click anywhere
    const onClick = () => switchModel();
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div style={{ background: '#050505', color: '#ededed', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontWeight: 400, lineHeight: 1.6, overflowX: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <HeroSection modelUrl={currentModelUrl} />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <footer style={{ padding: '3rem 1rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#050505' }}>
        <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '0.5rem' }}>© {new Date().getFullYear()} Abhishek Mani Tripathi. All rights reserved.</p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#333' }}>Built with Three.js · Designed with care</p>
      </footer>
    </div>
  );
}