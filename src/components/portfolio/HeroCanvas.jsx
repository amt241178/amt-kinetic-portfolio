import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const ov1Ref = useRef(null);
  const ov2Ref = useRef(null);
  const ov3Ref = useRef(null);
  const scrollCueRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ rotation: 0, smoothProgress: 0, scrollProgress: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const ctx = canvas.getContext('2d');

    let W = 0, H = 0, dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Build sphere points
    const POINTS = [];
    const RINGS = 22, PER_RING = 36;
    for (let i = 1; i < RINGS; i++) {
      const phi = Math.PI * (i / RINGS);
      for (let j = 0; j < PER_RING; j++) {
        const theta = (Math.PI * 2 * j) / PER_RING;
        POINTS.push({
          x: Math.sin(phi) * Math.cos(theta),
          y: Math.cos(phi),
          z: Math.sin(phi) * Math.sin(theta)
        });
      }
    }

    const PARTICLES = Array.from({ length: 60 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 1.4 + Math.random() * 0.5,
      s: 0.3 + Math.random() * 0.6,
      o: 0.2 + Math.random() * 0.5,
    }));

    function getScrollProgress() {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      return Math.max(0, Math.min(1, -rect.top / total));
    }

    function project(pt, radius) {
      const { rotation } = stateRef.current;
      const cosY = Math.cos(rotation), sinY = Math.sin(rotation);
      const x1 = pt.x * cosY - pt.z * sinY;
      const z1 = pt.x * sinY + pt.z * cosY;
      const y1 = pt.y;
      const f = 2.2 / (2.2 + z1);
      return { x: W / 2 + x1 * radius * f, y: H / 2 + y1 * radius * f, s: f };
    }

    function rangeOpacity(p, start, end) {
      if (p < start || p > end) return 0;
      const local = (p - start) / (end - start);
      if (local < 0.25) return local / 0.25;
      if (local > 0.75) return (1 - local) / 0.25;
      return 1;
    }
    function rangeShift(p, start, end) {
      if (p < start || p > end) return 0;
      const local = (p - start) / (end - start);
      return -50 + local * 100;
    }

    function applyOverlays(p) {
      const overlays = [
        { el: ov1Ref.current, s: 0.05, e: 0.25 },
        { el: ov2Ref.current, s: 0.30, e: 0.50 },
        { el: ov3Ref.current, s: 0.55, e: 0.75 },
      ];
      overlays.forEach(({ el, s, e }) => {
        if (!el) return;
        const o = rangeOpacity(p, s, e);
        const sh = rangeShift(p, s, e);
        el.style.opacity = o;
        el.style.transform = `translateY(calc(-50% + ${sh}px))`;
      });
      if (scrollCueRef.current) {
        scrollCueRef.current.style.opacity = p > 0.05 ? 0 : 1;
      }
    }

    function draw() {
      const state = stateRef.current;
      state.smoothProgress += (state.scrollProgress - state.smoothProgress) * 0.08;
      state.rotation += 0.002 + state.smoothProgress * 0.006;

      ctx.clearRect(0, 0, W, H);

      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.6);
      grad.addColorStop(0, 'rgba(40,40,50,0.4)');
      grad.addColorStop(1, 'rgba(18,18,18,1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      const baseRadius = Math.min(W, H) * 0.22;
      const radius = baseRadius * (1 + state.smoothProgress * 1.4);

      PARTICLES.forEach(p => {
        const pa = p.a + state.smoothProgress * 0.5;
        const px = W / 2 + Math.cos(pa) * radius * p.r;
        const py = H / 2 + Math.sin(pa * 0.7) * radius * p.r * 0.4;
        ctx.beginPath();
        ctx.arc(px, py, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o * (0.5 + state.smoothProgress * 0.5)})`;
        ctx.fill();
      });

      const projected = POINTS.map(p => project(p, radius));

      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        if (a.s < 0.4) continue;
        for (let j = i + 1; j < Math.min(i + 4, projected.length); j++) {
          const b = projected[j];
          if (b.s < 0.4) continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 90) * Math.min(a.s, b.s) * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      projected.forEach(p => {
        if (p.s < 0.3) return;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 * p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + p.s * 0.5})`;
        ctx.fill();
      });

      if (state.smoothProgress > 0.6) {
        const intensity = (state.smoothProgress - 0.6) / 0.4;
        const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, radius * 0.4);
        glow.addColorStop(0, `rgba(255,255,255,${0.08 * intensity})`);
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
      }
    }

    function tick() {
      stateRef.current.scrollProgress = getScrollProgress();
      applyOverlays(stateRef.current.scrollProgress);
      draw();
      rafRef.current = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const overlayBase = {
    position: 'absolute', width: '100%', padding: '0 24px',
    opacity: 0, pointerEvents: 'none', transition: 'opacity 0.1s linear, transform 0.1s linear',
  };

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '500vh' }} id="home">
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', background: '#121212' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(18,18,18,0.6) 100%)', pointerEvents: 'none' }} />

        {/* Overlay 1 — center */}
        <div ref={ov1Ref} style={{ ...overlayBase, top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
          <h1 className="amt-h-display">Abhishek Mani Tripathi.</h1>
          <p className="amt-h-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>Event Technology Lead. AI Builder.</p>
        </div>

        {/* Overlay 2 — left */}
        <div ref={ov2Ref} style={{ ...overlayBase, top: '50%', transform: 'translateY(-50%)', textAlign: 'left', paddingLeft: '8%' }}>
          <h2 className="amt-h-display">13+ Years in Production.</h2>
          <p className="amt-h-sub">Live, virtual, hybrid. 500+ events shipped under live pressure.</p>
        </div>

        {/* Overlay 3 — right */}
        <div ref={ov3Ref} style={{ ...overlayBase, top: '50%', transform: 'translateY(-50%)', textAlign: 'right', paddingRight: '8%' }}>
          <h2 className="amt-h-display">Building with AI.</h2>
          <p className="amt-h-sub" style={{ marginLeft: 'auto' }}>No-code apps that fix the messy parts of event work.</p>
        </div>

        {/* Scroll cue */}
        <div ref={scrollCueRef} className="amt-scroll-cue">Scroll</div>
      </div>
    </section>
  );
}