import { useState, useRef, useEffect } from 'react';

const BottomBar = ({ current, playing, setPlaying }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume]     = useState(80);
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
      height: '72px',
      background: '#242424',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: '16px',
      flexShrink: 0,
      borderRadius: '12px',
      margin: '0 6px 6px',
    }}>

      {/* Left — album art + info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '240px', flexShrink: 0 }}>
        <img src={current.src} alt={current.title}
          style={{ width: '46px', height: '46px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '13px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {current.title}
          </p>
          <p style={{ margin: '2px 0 0', fontWeight: 400, fontSize: '11px', color: '#aaa', whiteSpace: 'nowrap', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {current.artist}
          </p>
        </div>
        {/* Add button */}
        <span style={{ fontSize: '18px', color: '#aaa', cursor: 'pointer', flexShrink: 0, marginLeft: '4px', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
        >⊕</span>
      </div>

      {/* Center — controls + progress */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        {/* Control buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {/* Shuffle */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '15px', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >⇄</button>

          {/* Prev */}
          <button onClick={() => setProgress(0)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '15px', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >⏮</button>

          {/* Play/Pause */}
          <button onClick={() => setPlaying(p => !p)}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#fff', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', color: '#242424',
              transition: 'transform 0.15s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {playing ? '⏸' : '▶'}
          </button>

          {/* Next */}
          <button onClick={() => setProgress(0)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '15px', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >⏭</button>

          {/* Repeat */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '15px', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >↺</button>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '500px' }}>
          <span style={{ fontSize: '10px', color: '#aaa', flexShrink: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {fmt(progress)}
          </span>
          <div
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(((e.clientX - rect.left) / rect.width) * 100);
            }}
            style={{ flex: 1, height: '3px', background: '#555', borderRadius: '2px', cursor: 'pointer', position: 'relative' }}
          >
            <div style={{ width: `${progress}%`, height: '100%', background: '#fff', borderRadius: '2px', transition: 'width 0.1s linear' }} />
          </div>
          <span style={{ fontSize: '10px', color: '#aaa', flexShrink: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            3:30
          </span>
        </div>
      </div>

      {/* Right — volume + extra icons */}
      <div style={{ width: '200px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', flexShrink: 0 }}>
        {/* Extra icons */}
        {['✏️', '≡', '⧉', '🔈'].map((icon, i) => (
          <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '13px', padding: 0, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >{icon}</button>
        ))}

        {/* Volume slider */}
        <input
          type="range" min="0" max="100"
          value={volume}
          onChange={e => setVolume(e.target.value)}
          style={{ width: '80px', accentColor: '#fff', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default BottomBar;