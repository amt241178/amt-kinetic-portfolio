import { useState } from 'react';

// ── Animated Icons ────────────────────────────────────────────────────────────

function VoiceAgentIcon() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96" style={{ overflow: 'visible' }}>
      <rect x="46" y="20" width="28" height="48" rx="14" fill="none" stroke="#00e5ff" strokeWidth="2.5">
        <animate attributeName="stroke-opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <path d="M60 80 L60 96" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44 96 L76 96" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 56 Q32 84 60 84 Q88 84 88 56" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <line key={`l${i}`} x1={22 - i * 6} y1="44" x2={22 - i * 6} y2="76" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <animate attributeName="y1" values={`${44 - i * 4};${44 + i * 4};${44 - i * 4}`} dur={`${0.8 + i * 0.15}s`} repeatCount="indefinite" />
          <animate attributeName="y2" values={`${76 - i * 8};${76};${76 - i * 8}`} dur={`${0.8 + i * 0.15}s`} repeatCount="indefinite" />
        </line>
      ))}
      {[0, 1, 2].map((i) => (
        <line key={`r${i}`} x1={98 + i * 6} y1="44" x2={98 + i * 6} y2="76" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <animate attributeName="y1" values={`${44 - i * 4};${44 + i * 4};${44 - i * 4}`} dur={`${0.8 + i * 0.15}s`} repeatCount="indefinite" />
          <animate attributeName="y2" values={`${76 - i * 8};${76};${76 - i * 8}`} dur={`${0.8 + i * 0.15}s`} repeatCount="indefinite" />
        </line>
      ))}
    </svg>
  );
}

function FaceSyncIcon() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="58" rx="30" ry="36" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" from="0 60 58" to="360 60 58" dur="8s" repeatCount="indefinite" />
      </ellipse>
      <line x1="30" y1="40" x2="90" y2="40" stroke="#00e5ff" strokeWidth="1.8" opacity="0.9">
        <animate attributeName="y1" values="24;92;24" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y2" values="24;92;24" dur="2s" repeatCount="indefinite" />
      </line>
      <rect x="30" y="38" width="60" height="4" fill="url(#scanGrad)" opacity="0.4">
        <animate attributeName="y" values="22;90;22" dur="2s" repeatCount="indefinite" />
      </rect>
      {[[30,22,1,-1,1,-1],[90,22,-1,-1,1,-1],[30,94,1,1,-1,1],[90,94,-1,1,-1,1]].map(([x,y,dx1,dy1,dx2,dy2],i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x + dx1 * 12} y2={y} stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
          <line x1={x} y1={y} x2={x} y2={y + dy2 * 12} stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      {[[48,54],[72,54],[60,64],[52,72],[68,72]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#00e5ff">
          <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function ARFaceIcon() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      <ellipse cx="60" cy="56" rx="26" ry="30" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" />
      {[0,1,2,3].map(i => (
        <line key={`h${i}`} x1="34" y1={40 + i * 12} x2="86" y2={40 + i * 12} stroke="#a78bfa" strokeWidth="0.8" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}
      {[0,1,2,3,4].map(i => (
        <line key={`v${i}`} x1={40 + i * 10} y1="28" x2={40 + i * 10} y2="86" stroke="#a78bfa" strokeWidth="0.8" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${1.3 + i * 0.15}s`} repeatCount="indefinite" />
        </line>
      ))}
      <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
      <ellipse cx="70" cy="52" rx="5" ry="3.5" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
      <circle cx="50" cy="52" r="2" fill="#a78bfa"><animate attributeName="r" values="2;2.5;2" dur="1.8s" repeatCount="indefinite" /></circle>
      <circle cx="70" cy="52" r="2" fill="#a78bfa"><animate attributeName="r" values="2;2.5;2" dur="1.8s" repeatCount="indefinite" /></circle>
      <path d="M50 68 Q60 76 70 68" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NetworkingIcon() {
  const nodes = [[60,30],[28,60],[92,60],[44,95],[76,95]];
  const edges = [[0,1],[0,2],[1,3],[2,4],[1,4],[0,3]];
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      {edges.map(([a,b],i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#34d399" strokeWidth="1.2" opacity="0.4">
          <animate attributeName="stroke-dasharray" values="0 60;60 0;0 60" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}
      {nodes.map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#050505" stroke="#34d399" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="3" fill="#34d399"><animate attributeName="r" values="3;4.5;3" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite" /></circle>
          <circle cx={x} cy={y} r="12" fill="none" stroke="#34d399" strokeWidth="0.8" opacity="0">
            <animate attributeName="r" values="8;18;8" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function FacilityIcon() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      {[20,34,48].map((r,i) => (
        <circle key={i} cx="60" cy="60" r={r} fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <line x1="60" y1="60" x2="60" y2="12" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="3s" repeatCount="indefinite" />
      </line>
      <circle cx="60" cy="60" r="4" fill="#f59e0b"><animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" /></circle>
      {[[38,38],[80,50],[55,82]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#f59e0b" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="2;5;2" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function ExpenseIcon() {
  const bars = [40,70,55,85,60,90,45];
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      {bars.map((h,i) => (
        <rect key={i} x={14 + i * 14} y="100" width="10" height="0" rx="2" fill="#60a5fa">
          <animate attributeName="height" values={`0;${h};${h}`} dur="1.5s" begin={`${i * 0.1}s`} fill="freeze" />
          <animate attributeName="y" values={`100;${100 - h};${100 - h}`} dur="1.5s" begin={`${i * 0.1}s`} fill="freeze" />
        </rect>
      ))}
      <polyline points="19,80 33,50 47,65 61,35 75,50 89,20 103,45" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="120" strokeDashoffset="120">
        <animate attributeName="stroke-dashoffset" values="120;0" dur="1.5s" fill="freeze" />
      </polyline>
      <text x="60" y="18" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="700" opacity="0.8">₹</text>
      <line x1="12" y1="102" x2="108" y2="102" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function RunIcon() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      <circle cx="60" cy="60" r="44" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="28" r="7" fill="none" stroke="#f87171" strokeWidth="2" />
      <line x1="60" y1="35" x2="60" y2="60" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="55" x2="50" y2="75" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="-20 60 55" to="20 60 55" dur="0.4s" repeatCount="indefinite" />
      </line>
      <line x1="60" y1="55" x2="70" y2="75" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="20 60 55" to="-20 60 55" dur="0.4s" repeatCount="indefinite" />
      </line>
      <line x1="60" y1="42" x2="46" y2="52" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="30 60 42" to="-30 60 42" dur="0.4s" repeatCount="indefinite" />
      </line>
      <line x1="60" y1="42" x2="74" y2="52" stroke="#f87171" strokeWidth="2" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="-30 60 42" to="30 60 42" dur="0.4s" repeatCount="indefinite" />
      </line>
      {[0,1,2].map(i => (
        <line key={i} x1="16" y1={78 + i * 8} x2={30 - i * 4} y2={78 + i * 8} stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
          <animate attributeName="x1" values="16;8;16" dur="0.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="0.5s" repeatCount="indefinite" />
        </line>
      ))}
      <text x="60" y="106" textAnchor="middle" fill="#f87171" fontSize="10" fontFamily="JetBrains Mono, monospace" opacity="0.8">00:00</text>
    </svg>
  );
}

function QueueIcon() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      <rect x="40" y="20" width="40" height="40" rx="4" fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.6" />
      {[[44,24],[60,24],[44,40]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="10" height="10" rx="1" fill="none" stroke="#00e5ff" strokeWidth="1" opacity="0.6" />
      ))}
      <rect x="52" y="36" width="6" height="6" rx="1" fill="#00e5ff" opacity="0.8" />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <circle cx={14 + i * 20} cy="85" r="9" fill="#050505" stroke="#00e5ff" strokeWidth="1.5">
            <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x={14 + i * 20} y="89" textAnchor="middle" fill="#00e5ff" fontSize="8" fontFamily="JetBrains Mono, monospace">{i + 1}</text>
        </g>
      ))}
      <path d="M20 100 L100 100" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 3" opacity="0.4">
        <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
      </path>
      <polygon points="100,97 108,100 100,103" fill="#00e5ff" opacity="0.6" />
    </svg>
  );
}

function ExpoIcon() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      <path d="M60 14 L76 22 L92 18 L96 34 L108 44 L102 60 L108 76 L96 86 L92 102 L76 98 L60 106 L44 98 L28 102 L24 86 L12 76 L18 60 L12 44 L24 34 L28 18 L44 22 Z"
        fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
      </path>
      <circle cx="60" cy="60" r="22" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.4" />
      <text x="60" y="56" textAnchor="middle" fill="#fbbf24" fontSize="22" opacity="0.9">✦</text>
      <text x="60" y="74" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="2" opacity="0.7">EXPO</text>
      <circle cx="60" cy="60" r="30" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0">
        <animate attributeName="r" values="22;48;22" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function BroadcastIcon() {
  return (
    <svg viewBox="0 0 120 120" width="96" height="96">
      {[16,30,44].map((r,i) => (
        <path key={i} d={`M ${60 - r * 0.7} ${60 - r * 0.7} A ${r} ${r} 0 0 1 ${60 + r * 0.7} ${60 - r * 0.7}`}
          fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="opacity" values={`${1 - i * 0.25};${0.3 + i * 0.1};${1 - i * 0.25}`} dur={`${1.2 + i * 0.4}s`} repeatCount="indefinite" />
        </path>
      ))}
      <rect x="36" y="58" width="40" height="28" rx="5" fill="none" stroke="#4ade80" strokeWidth="2" />
      <path d="M76 68 L90 62 L90 82 L76 76 Z" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="50" cy="72" r="5" fill="#f87171">
        <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <text x="60" y="104" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="3" opacity="0.8">LIVE</text>
    </svg>
  );
}

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP = {
  'Smart AI Voice Agent': VoiceAgentIcon,
  'AI FaceSync': FaceSyncIcon,
  'Face Puzzle Arena': ARFaceIcon,
  'Smart Networking System': NetworkingIcon,
  'Facility Command Center': FacilityIcon,
  'ExpenseSync Dashboard': ExpenseIcon,
  'Nike Run Challenge Leaderboard': RunIcon,
  'AI Queue and Token System': QueueIcon,
  'Bharat Vyapaar Mahotsav': ExpoIcon,
  'Google APAC Partner Events': BroadcastIcon,
};

// ── Card ─────────────────────────────────────────────────────────────────────
export default function ProjectCard({ project, index, cardRef }) {
  const [hovered, setHovered] = useState(false);
  const AnimIcon = ICON_MAP[project.title];

  return (
    <article
      ref={cardRef}
      className="amt-project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top visual area */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', flexShrink: 0 }}>
        <div className="amt-neon-bg" style={{ position: 'absolute', inset: 0 }} />
        {project.img && (
          <img
            src={project.img}
            alt={project.label}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: 'auto',
              transition: 'opacity 0.4s ease, filter 0.4s ease',
              filter: hovered ? 'brightness(0.4) blur(1px)' : 'brightness(0.9)',
            }}
          />
        )}
        {!project.img && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            opacity: hovered ? 0 : 1, transition: 'opacity 0.3s ease',
          }}>
            {project.label}
          </div>
        )}
        {AnimIcon && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1) translateY(0)' : 'scale(0.75) translateY(12px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            zIndex: 3,
            filter: 'drop-shadow(0 0 18px rgba(0,229,255,0.6))',
          }}>
            <AnimIcon />
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
          background: 'linear-gradient(to top, #0d0d0d, transparent)', zIndex: 2,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem 1.75rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
          {project.pills.map(([text, solid]) => (
            <span key={text} style={solid
              ? { padding: '0.25rem 0.7rem', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: '#050505', textTransform: 'uppercase', background: '#00e5ff', borderRadius: 999, boxShadow: '0 0 10px rgba(0,229,255,0.4)' }
              : { padding: '0.25rem 0.7rem', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', color: '#aaa', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 999, background: 'rgba(255,255,255,0.04)' }
            }>{text}</span>
          ))}
        </div>
        <h3 style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 700, letterSpacing: '-0.02em',
          color: hovered ? '#00e5ff' : '#fff', marginBottom: '0.6rem', lineHeight: 1.2,
          transition: 'color 0.3s ease',
        }}>
          {project.title}
        </h3>
        <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.65, fontWeight: 300, flex: 1 }}>
          {project.desc}
        </p>
      </div>
    </article>
  );
}