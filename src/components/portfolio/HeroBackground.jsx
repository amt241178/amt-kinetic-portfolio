import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Skill nodes: geometry type, color, label, position
const SKILL_NODES = [
  { type: 'icosahedron', color: 0x00e5ff, emissive: 0x006080, label: 'AI Builder',        pos: [-3.2, 1.5, -2.5],  size: 0.52 },
  { type: 'torusknot',   color: 0xa78bfa, emissive: 0x4c1d95, label: 'No-Code Dev',       pos: [3.0, 2.2, -3.0],   size: 0.38 },
  { type: 'torus',       color: 0x00e5ff, emissive: 0x003344, label: 'Live Streaming',    pos: [-2.4, -1.2, -2.0], size: 0.44 },
  { type: 'octahedron',  color: 0xf59e0b, emissive: 0x78350f, label: 'Event Tech',        pos: [2.6, -0.8, -2.5],  size: 0.50 },
  { type: 'dodecahedron',color: 0x34d399, emissive: 0x064e3b, label: 'Production',        pos: [-1.0, 2.8, -3.5],  size: 0.42 },
  { type: 'icosahedron', color: 0xf87171, emissive: 0x7f1d1d, label: 'Operations',        pos: [1.2, -2.4, -2.8],  size: 0.36 },
  { type: 'torus',       color: 0x60a5fa, emissive: 0x1e3a8a, label: 'APAC Specialist',   pos: [4.0, 0.4, -4.0],   size: 0.32 },
  { type: 'tetrahedron', color: 0xfbbf24, emissive: 0x92400e, label: 'Cvent Certified',   pos: [-4.0, 0.8, -3.5],  size: 0.46 },
  { type: 'octahedron',  color: 0xa78bfa, emissive: 0x4c1d95, label: 'Web App Creator',   pos: [0.5, 3.2, -4.5],   size: 0.38 },
  { type: 'icosahedron', color: 0x00e5ff, emissive: 0x006080, label: 'Strategy',          pos: [-3.8, -2.0, -4.0], size: 0.30 },
  { type: 'torusknot',   color: 0x34d399, emissive: 0x064e3b, label: 'SaaS Platforms',    pos: [3.5, -2.5, -5.0],  size: 0.28 },
  { type: 'dodecahedron',color: 0xf87171, emissive: 0x7f1d1d, label: 'Badge Printing',    pos: [-1.8, -3.2, -4.5], size: 0.34 },
];

function buildGeometry(type, size) {
  switch (type) {
    case 'icosahedron':  return new THREE.IcosahedronGeometry(size, 0);
    case 'torusknot':    return new THREE.TorusKnotGeometry(size * 0.7, size * 0.25, 64, 8);
    case 'torus':        return new THREE.TorusGeometry(size, size * 0.32, 12, 32);
    case 'octahedron':   return new THREE.OctahedronGeometry(size, 0);
    case 'dodecahedron': return new THREE.DodecahedronGeometry(size, 0);
    case 'tetrahedron':  return new THREE.TetrahedronGeometry(size, 0);
    default:             return new THREE.IcosahedronGeometry(size, 0);
  }
}

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 30);
    camera.position.set(0, 0, 5);

    // Ambient + point lights for glow
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const light1 = new THREE.PointLight(0x00e5ff, 2.5, 20);
    light1.position.set(-4, 3, 2);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xa78bfa, 1.8, 20);
    light2.position.set(4, -2, 1);
    scene.add(light2);

    // Build mesh + wireframe pairs
    const nodes = SKILL_NODES.map((node, i) => {
      const geo = buildGeometry(node.type, node.size);
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.emissive,
        emissiveIntensity: 0.6,
        metalness: 0.3,
        roughness: 0.4,
        transparent: true,
        opacity: 0.75,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...node.pos);

      // Wireframe overlay
      const wireMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const wire = new THREE.Mesh(geo, wireMat);
      mesh.add(wire);

      // Outer glow ring for some
      if (i % 3 === 0) {
        const glowGeo = buildGeometry(node.type, node.size * 1.18);
        const glowMat = new THREE.MeshBasicMaterial({ color: node.color, transparent: true, opacity: 0.07, side: THREE.BackSide });
        mesh.add(new THREE.Mesh(glowGeo, glowMat));
      }

      scene.add(mesh);
      return {
        mesh,
        wireMat,
        basePos: new THREE.Vector3(...node.pos),
        speed: 0.3 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        rotAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        floatAmp: 0.08 + Math.random() * 0.12,
      };
    });

    // Particle field
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 14;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.035, transparent: true, opacity: 0.4 });
    scene.add(new THREE.Points(pGeo, pMat));

    // Mouse tracking
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const clock = new THREE.Clock();
    let raf;

    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Parallax camera drift
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      nodes.forEach((n) => {
        const s = t * n.speed + n.offset;
        // Float up/down
        n.mesh.position.y = n.basePos.y + Math.sin(s) * n.floatAmp;
        // Slight x sway
        n.mesh.position.x = n.basePos.x + Math.cos(s * 0.7) * n.floatAmp * 0.6;
        // Rotate
        n.mesh.rotateOnAxis(n.rotAxis, 0.004);

        // Pulse emissive
        n.mesh.material.emissiveIntensity = 0.5 + Math.sin(s * 1.3) * 0.25;
        // Pulse wireframe opacity
        n.wireMat.opacity = 0.18 + Math.sin(s * 0.9) * 0.12;

        // Mouse repel / attract subtle effect
        const dx = mouse.x * 3 - n.mesh.position.x;
        const dy = -mouse.y * 2 - n.mesh.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2.5) {
          n.mesh.material.emissiveIntensity = Math.min(1.4, 0.9 + (2.5 - dist) * 0.4);
          n.mesh.material.opacity = Math.min(1, 0.75 + (2.5 - dist) * 0.1);
        }
      });

      // Slow particle drift
      pMat.opacity = 0.3 + Math.sin(t * 0.4) * 0.1;

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
      window.removeEventListener('mousemove', onMouseMove);
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