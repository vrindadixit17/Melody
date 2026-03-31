import { useState, useRef, useEffect } from 'react';

const BottomBar = ({ current, playing, setPlaying }) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    setPlaying(false);
  }, [current]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { clearInterval(intervalRef.current); setPlaying(false); return 100; }
          return p + 0.2;
        });
      }, 100);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  if (!current) return null;

  const fmt = pct => {
    const secs = Math.floor((pct / 100) * 210);
    return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: '72px',
      background: '#fff',
      borderTop: '1px solid #ebebeb',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '20px',
      zIndex: 9999,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
    }}>

      {/* Album art + info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '220px', flexShrink: 0 }}>
        <img
          src={current.src}
          alt={current.title}
          style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '5px', flexShrink: 0 }}
        />
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.82rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {current.title}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: '#999', whiteSpace: 'nowrap' }}>
            {current.artist}
          </p>
        </div>
      </div>

      {/* Controls + progress — center */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setProgress(0)}
            style={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', color: '#bbb', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#111'}
            onMouseLeave={e => e.currentTarget.style.color = '#bbb'}
          >⏮</button>

          <button
            onClick={() => setPlaying(p => !p)}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#111', border: 'none', cursor: 'pointer',
              color: '#fff', fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.15s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {playing ? '⏸' : '▶'}
          </button>

          <button
            onClick={() => setProgress(0)}
            style={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', color: '#bbb', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#111'}
            onMouseLeave={e => e.currentTarget.style.color = '#bbb'}
          >⏭</button>
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '480px' }}>
          <span style={{ fontSize: '0.65rem', color: '#bbb', flexShrink: 0 }}>{fmt(progress)}</span>
          <div
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
            style={{ flex: 1, height: '3px', background: '#eee', borderRadius: '2px', cursor: 'pointer', position: 'relative' }}
          >
            <div style={{ width: `${progress}%`, height: '100%', background: '#111', borderRadius: '2px', transition: 'width 0.1s linear' }} />
          </div>
          <span style={{ fontSize: '0.65rem', color: '#bbb', flexShrink: 0 }}>3:30</span>
        </div>
      </div>

      {/* Volume — right */}
      <div style={{ width: '120px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.9rem' }}>🔈</span>
        <input
          type="range" min="0" max="100" defaultValue="80"
          style={{ width: '80px', accentColor: '#111', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default BottomBar;