const COLOR_SCHEMES = [
  { id: 'purple', label: 'Neon Purple', rim: '#7c3aff', key: '#fff8f0', fill: '#c4b5fd', halo: '#5b21b6', orb: '#9b6dff' },
  { id: 'blue', label: 'Ocean Blue', rim: '#1d4ed8', key: '#e0f2fe', fill: '#93c5fd', halo: '#1e3a8a', orb: '#60a5fa' },
  { id: 'gold', label: 'Warm Gold', rim: '#d97706', key: '#fef3c7', fill: '#fcd34d', halo: '#92400e', orb: '#f59e0b' },
  { id: 'teal', label: 'Cyber Teal', rim: '#0d9488', key: '#f0fdfa', fill: '#5eead4', halo: '#134e4a', orb: '#14b8a6' },
];

const ANIM_MODES = [
  { id: 'idle', label: 'Idle', icon: '🧍', desc: 'Gentle breathing' },
  { id: 'greeting', label: 'Greeting', icon: '👋', desc: 'Wave hello' },
  { id: 'thinking', label: 'Thinking', icon: '🤔', desc: 'Head tilt' },
];

export default function AvatarControls({ colorScheme, onColorScheme, animMode, onAnimMode }) {
  return (
    <div style={{
      position: 'absolute', bottom: 80, right: 24, zIndex: 30,
      display: 'flex', flexDirection: 'column', gap: 12,
      alignItems: 'flex-end',
    }}>
      {/* Color Scheme Panel */}
      <div style={{
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.10)', borderRadius: 14,
        padding: '14px 16px', minWidth: 200,
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#555', marginBottom: 10 }}>Scene Mood</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {COLOR_SCHEMES.map(s => (
            <button key={s.id} onClick={() => onColorScheme(s.id)}
              title={s.label}
              style={{
                width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: s.rim,
                boxShadow: colorScheme === s.id ? `0 0 0 2px #fff, 0 0 12px ${s.rim}` : `0 0 8px ${s.rim}55`,
                transform: colorScheme === s.id ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }} />
          ))}
        </div>
        <div style={{ marginTop: 8, fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#666' }}>
          {COLOR_SCHEMES.find(s => s.id === colorScheme)?.label}
        </div>
      </div>

      {/* Animation Panel */}
      <div style={{
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.10)', borderRadius: 14,
        padding: '14px 16px', minWidth: 200,
      }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#555', marginBottom: 10 }}>Animation</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ANIM_MODES.map(m => (
            <button key={m.id} onClick={() => onAnimMode(m.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: animMode === m.id ? 'rgba(255,255,255,0.1)' : 'transparent',
              outline: animMode === m.id ? '1px solid rgba(255,255,255,0.2)' : 'none',
              color: '#fff', textAlign: 'left', transition: 'all 0.2s ease',
            }}>
              <span style={{ fontSize: 16 }}>{m.icon}</span>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: animMode === m.id ? '#fff' : '#888' }}>{m.label}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#555' }}>{m.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Avatar tip */}
      <div style={{
        background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
        padding: '8px 12px', maxWidth: 200,
      }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#555', lineHeight: 1.5 }}>
          💡 To add your 3D avatar, upload a <code style={{ color: '#a78bfa' }}>avatar.glb</code> and update the URL in <code style={{ color: '#a78bfa' }}>HeroAvatar.jsx</code>. Use <a href="https://readyplayer.me" target="_blank" rel="noopener" style={{ color: '#7c3aff' }}>Ready Player Me</a> to generate one from your photos.
        </div>
      </div>
    </div>
  );
}

export { COLOR_SCHEMES };