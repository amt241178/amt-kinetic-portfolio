import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Spread across all four quadrants of the viewport
const NODES = [
  // TOP-LEFT
  { type: 'icosahedron',  color: 0x00e5ff, emissive: 0x003344, size: 0.50, pos: [-7.0,  4.5, -3.0], speed: 0.28 },
  { type: 'torus',        color: 0xf87171, emissive: 0x7f1d1d, size: 0.38, pos: [-5.5,  3.0, -2.5], speed: 0.32 },
  { type: 'cylinder',     color: 0x00e5ff, emissive: 0x004455, size: 0.36, pos: [-8.5,  1.5, -3.5], speed: 0.26 },
  { type: 'cone',         color: 0xf59e0b, emissive: 0x78350f, size: 0.40, pos: [-6.0, -0.5, -2.0], speed: 0.30 },
  { type: 'box',          color: 0x60a5fa, emissive: 0x1e3a8a, size: 0.44, pos: [-9.0,  3.8, -4.0], speed: 0.20 },
  // TOP-RIGHT
  { type: 'torusknot',    color: 0xa78bfa, emissive: 0x2e1065, size: 0.32, pos: [ 6.0,  4.5, -3.0], speed: 0.22 },
  { type: 'dodecahedron', color: 0x34d399, emissive: 0x064e3b, size: 0.42, pos: [ 8.0,  2.5, -3.5], speed: 0.35 },
  { type: 'octahedron',   color: 0xfbbf24, emissive: 0x78350f, size: 0.38, pos: [ 5.0,  2.0, -2.5], speed: 0.18 },
  { type: 'sphere',       color: 0xff4444, emissive: 0x7f0000, size: 0.22, pos: [ 9.5,  4.0, -4.0], speed: 0.50 },
  { type: 'box',          color: 0xa78bfa, emissive: 0x3b0764, size: 0.30, pos: [ 7.5,  0.5, -2.0], speed: 0.36 },
  // BOTTOM-LEFT
  { type: 'octahedron',   color: 0xf59e0b, emissive: 0x78350f, size: 0.48, pos: [-7.5, -3.5, -3.0], speed: 0.24 },
  { type: 'box',          color: 0x34d399, emissive: 0x064e3b, size: 0.36, pos: [-5.0, -4.5, -2.5], speed: 0.24 },
  { type: 'icosahedron',  color: 0xfbbf24, emissive: 0x451a03, size: 0.24, pos: [-9.0, -2.0, -3.5], speed: 0.38 },
  { type: 'torus',        color: 0x60a5fa, emissive: 0x1e3a8a, size: 0.30, pos: [-6.5, -1.0, -2.0], speed: 0.25 },
  { type: 'cone',         color: 0xf87171, emissive: 0x7f1d1d, size: 0.28, pos: [-8.0, -4.5, -4.0], speed: 0.30 },
  // BOTTOM-RIGHT
  { type: 'torusknot',    color: 0x4ade80, emissive: 0x052e16, size: 0.28, pos: [ 5.5, -4.0, -3.0], speed: 0.42 },
  { type: 'dodecahedron', color: 0xa78bfa, emissive: 0x3b0764, size: 0.32, pos: [ 8.5, -2.5, -3.5], speed: 0.32 },
  { type: 'cylinder',     color: 0x34d399, emissive: 0x064e3b, size: 0.26, pos: [ 6.5, -1.5, -2.0], speed: 0.20 },
  { type: 'box',          color: 0x00e5ff, emissive: 0x003344, size: 0.32, pos: [ 9.0, -4.5, -4.0], speed: 0.28 },
  { type: 'icosahedron',  color: 0xf87171, emissive: 0x7f1d1d, size: 0.22, pos: [ 7.0, -3.0, -2.5], speed: 0.40 },
  // CENTER (sparse)
  { type: 'octahedron',   color: 0x00e5ff, emissive: 0x003344, size: 0.26, pos: [-2.0,  1.5, -2.5], speed: 0.22 },
  { type: 'sphere',       color: 0xa78bfa, emissive: 0x2e1065, size: 0.18, pos: [ 2.5, -1.0, -2.5], speed: 0.34 },
  { type: 'torusknot',    color: 0xfbbf24, emissive: 0x78350f, size: 0.22, pos: [ 0.5,  3.0, -3.0], speed: 0.28 },
];

function makeGeo(type, s) {
  switch (type) {
    case 'icosahedron':  return new THREE.IcosahedronGeometry(s, 0);
    case 'torusknot':    return new THREE.TorusKnotGeometry(s * 0.7, s * 0.26, 64, 8);
    case 'torus':        return new THREE.TorusGeometry(s, s * 0.30, 10, 28);
    case 'octahedron':   return new THREE.OctahedronGeometry(s, 0);
    case 'dodecahedron': return new THREE.DodecahedronGeometry(s, 0);
    case 'box':          return new THREE.BoxGeometry(s * 0.7, s, s * 0.14);
    case 'cylinder':     return new THREE.CylinderGeometry(s * 0.45, s * 0.55, s * 1.4, 10);
    case 'cone':         return new THREE.ConeGeometry(s * 0.4, s * 1.6, 8);
    case 'sphere':       return new THREE.SphereGeometry(s, 14, 14);
    default:             return new THREE.IcosahedronGeometry(s, 0);
  }
}

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    // Wide FOV so corners are fully visible
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 30);
    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight(0xffffff, 0.18));
    const l1 = new THREE.PointLight(0x00e5ff, 3.0, 28); l1.position.set(-5, 4, 3); scene.add(l1);
    const l2 = new THREE.PointLight(0xa78bfa, 2.2, 28); l2.position.set(5, -3, 2); scene.add(l2);
    const l3 = new THREE.PointLight(0xf59e0b, 1.5, 20); l3.position.set(0, -5, 1); scene.add(l3);

    // Particle field
    const pCount = 200;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 26;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.04, transparent: true, opacity: 0.35 });
    scene.add(new THREE.Points(pGeo, pMat));

    const nodes = NODES.map((n, i) => {
      const geo = makeGeo(n.type, n.size);
      const mat = new THREE.MeshStandardMaterial({
        color: n.color, emissive: n.emissive, emissiveIntensity: 0.55,
        metalness: 0.25, roughness: 0.45, transparent: true, opacity: 0.80,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...n.pos);

      const wireMat = new THREE.MeshBasicMaterial({ color: n.color, wireframe: true, transparent: true, opacity: 0.22 });
      mesh.add(new THREE.Mesh(geo, wireMat));

      if (i % 4 === 0) {
        const shellGeo = makeGeo(n.type, n.size * 1.20);
        mesh.add(new THREE.Mesh(shellGeo, new THREE.MeshBasicMaterial({ color: n.color, transparent: true, opacity: 0.05, side: THREE.BackSide })));
      }

      scene.add(mesh);
      return {
        mesh, mat, wireMat,
        basePos: new THREE.Vector3(...n.pos),
        speed: n.speed,
        offset: Math.random() * Math.PI * 2,
        rotAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        floatAmp: 0.07 + Math.random() * 0.10,
      };
    });

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMM = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMM);

    const clock = new THREE.Clock();
    let raf;

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // Subtle parallax — keep objects in corners
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 0.35 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -1);

      nodes.forEach((n) => {
        const s = t * n.speed + n.offset;
        n.mesh.position.y = n.basePos.y + Math.sin(s) * n.floatAmp;
        n.mesh.position.x = n.basePos.x + Math.cos(s * 0.65) * n.floatAmp * 0.5;
        n.mesh.rotateOnAxis(n.rotAxis, 0.003);
        n.mat.emissiveIntensity = 0.45 + Math.sin(s * 1.1) * 0.22;
        n.wireMat.opacity = 0.15 + Math.sin(s * 0.85) * 0.10;

        const mx = mouse.x * 5, my = -mouse.y * 4;
        const dx = mx - n.mesh.position.x, dy = my - n.mesh.position.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 3) {
          n.mat.emissiveIntensity = Math.min(1.6, 0.9 + (3 - d) * 0.35);
          n.mat.opacity = Math.min(1, 0.80 + (3 - d) * 0.08);
        }
      });

      pMat.opacity = 0.28 + Math.sin(t * 0.3) * 0.08;
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
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMM);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', zIndex: 1 }}
    />
  );
}