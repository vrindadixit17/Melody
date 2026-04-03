import { useState, useCallback } from 'react';
import Aurora from './Aurora';
import img1  from '../assets/images/1.jpg';
import img2  from '../assets/images/2.jpg';
import img3  from '../assets/images/3.jpg';
import img4  from '../assets/images/4.jpg';
import img5  from '../assets/images/5.jpg';
import img6  from '../assets/images/6.jpg';
import img7  from '../assets/images/7.jpg';
import img8  from '../assets/images/8.jpg';
import img9  from '../assets/images/9.jpg';
import img10 from '../assets/images/10.jpg';
import img11 from '../assets/images/11.jpg';
import img12 from '../assets/images/12.jpg';
import img13 from '../assets/images/13.jpg';
import img14 from '../assets/images/14.jpg';
import img15 from '../assets/images/15.jpg';
import img16 from '../assets/images/16.jpg';
import img17 from '../assets/images/17.jpg';
import img18 from '../assets/images/18.jpg';
import img19 from '../assets/images/19.jpg';
import img20 from '../assets/images/20.jpg';
import img21 from '../assets/images/21.jpg';
import img22 from '../assets/images/22.jpg';
import img23 from '../assets/images/23.jpg';
import img24 from '../assets/images/24.jpg';

const ALL = [
  { src: img1,  title: 'Diamond Dogs',      artist: 'David Bowie'      },
  { src: img2,  title: 'APT.',              artist: 'ROSE & Bruno Mars' },
  { src: img3,  title: 'Songs About Jane',  artist: 'Maroon 5'          },
  { src: img4,  title: 'DUH!',             artist: 'NewJeans'           },
  { src: img5,  title: 'Powerpuff Girls',   artist: 'Soundtrack'        },
  { src: img6,  title: 'Dark Side',         artist: 'Unknown'           },
  { src: img7,  title: 'Frenzy',            artist: 'Various'           },
  { src: img8,  title: 'Graffiti Soul',     artist: 'Simple Minds'      },
  { src: img9,  title: 'Abbey Road',        artist: 'The Beatles'       },
  { src: img10, title: 'Keyboard Cat',      artist: 'Internet Classic'  },
  { src: img11, title: 'Brat',             artist: 'Charli XCX'         },
  { src: img12, title: 'Back to Black',     artist: 'Amy Winehouse'     },
  { src: img13, title: 'Starboy',           artist: 'The Weeknd'        },
  { src: img14, title: 'Lemonade',          artist: 'Beyoncé'           },
  { src: img15, title: 'Gold Dust Woman',   artist: 'Fleetwood Mac'     },
  { src: img16, title: 'Sunflower',         artist: 'Post Malone'       },
  { src: img17, title: 'Blue Face',         artist: 'Unknown'           },
  { src: img18, title: 'Clouds',            artist: 'Various'           },
  { src: img19, title: 'Sour',             artist: 'Olivia Rodrigo'     },
  { src: img20, title: 'Diamond Heart',     artist: 'Unknown'           },
  { src: img21, title: 'Sweetener',         artist: 'Ariana Grande'     },
  { src: img22, title: 'Positions',         artist: 'Ariana Grande'     },
  { src: img23, title: 'Future Nostalgia',  artist: 'Dua Lipa'          },
  { src: img24, title: 'Chromatica',        artist: 'Lady Gaga'         },
];

const RECENTLY_PLAYED = ALL.slice(0, 8);
const PICKED_FOR_YOU  = ALL.slice(8, 24);

const C = {
  text:   '#111',
  muted:  '#888',
  radius: '20px',
  gap:    '6px',
  pad:    '20px',
};

const label = {
  fontWeight: 800, fontSize: '15px', letterSpacing: 0,
  textTransform: 'uppercase', color: C.text, margin: 0,
};

const tiny = {
  fontWeight: 400, fontSize: '9px', color: C.muted, margin: 0,
};

const glass = {
  background: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(12px) saturate(150%)',
  WebkitBackdropFilter: 'blur(12px) saturate(150%)',
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow: `
    0 4px 24px rgba(0,0,0,0.06),
    inset 0 1px 0 rgba(255,255,255,0.7),
    inset 0 -1px 0 rgba(255,255,255,0.1)
  `,
};

const Rim = ({ radius = C.radius }) => (
  <div style={{
    position: 'absolute', inset: 0,
    borderRadius: radius,
    background: 'linear-gradient(145deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.0) 50%, rgba(255,255,255,0.05) 100%)',
    pointerEvents: 'none',
    zIndex: 10,
  }} />
);

const GlassPanel = ({ children, style = {} }) => (
  <div style={{ position: 'relative', borderRadius: C.radius, overflow: 'hidden', ...glass, ...style }}>
    <Rim />
    {children}
  </div>
);

// ── COLOR EXTRACTOR ───────────────────────────────────────────────────────────
const useImageColors = () => {
  const getColors = useCallback((src, onColors) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const sample = (x, y, w, h) => {
        const data = ctx.getImageData(x, y, w, h).data;
        let r = 0, g = 0, b = 0;
        const pixels = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        const avg = (r + g + b) / (3 * pixels);
        const boost = 1.8;
        r = Math.min(255, avg + (r / pixels - avg) * boost);
        g = Math.min(255, avg + (g / pixels - avg) * boost);
        b = Math.min(255, avg + (b / pixels - avg) * boost);
        return `#${Math.round(r).toString(16).padStart(2,'0')}${Math.round(g).toString(16).padStart(2,'0')}${Math.round(b).toString(16).padStart(2,'0')}`;
      };

      const w = img.width;
      const h = img.height;
      onColors(
        sample(0, 0, w / 2, h / 2),
        sample(w / 2, h / 2, w / 2, h / 2),
      );
    };
  }, []);

  return getColors;
};

// ── LEFT PANEL ────────────────────────────────────────────────────────────────
const LeftPanel = ({ onSelect, current }) => (
  <GlassPanel style={{ width: '210px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
    <p style={{ ...label, padding: `${C.pad} ${C.pad} 16px` }}>Recently Played</p>
    <div style={{ overflowY: 'auto', scrollbarWidth: 'none', flex: 1 }}>
      {RECENTLY_PLAYED.map((item, i) => {
        const active = current?.title === item.title;
        return (
          <div
            key={i}
            onClick={() => onSelect(item)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '7px 14px', cursor: 'pointer',
              background: active ? 'rgba(255,255,255,0.3)' : 'transparent',
              transition: 'background 0.15s',
              borderRadius: '10px',
              margin: '0 6px',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
          >
            <img src={item.src} alt={item.title}
              style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: 500, fontSize: '12px', color: C.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </p>
              <p style={{ ...tiny, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.artist}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </GlassPanel>
);

// ── CENTER PANEL ──────────────────────────────────────────────────────────────
const CenterPanel = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const filtered = PICKED_FOR_YOU.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <GlassPanel style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: C.pad }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <p style={{ ...label }}>Picked for You</p>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['⊞', '≡', '♡'].map((icon, i) => (
            <button key={i} style={{
              width: '28px', height: '28px', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              cursor: 'pointer', fontSize: '13px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: C.text,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >{icon}</button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '8px 14px',
        marginBottom: '16px',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7)',
      }}>
        <span style={{ fontSize: '12px', color: C.muted }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search albums, artists..."
          style={{
            flex: 1, border: 'none', background: 'transparent',
            outline: 'none', fontSize: '12px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: C.text,
          }}
        />
        {query && (
          <span onClick={() => setQuery('')} style={{ fontSize: '11px', color: C.muted, cursor: 'pointer' }}>✕</span>
        )}
      </div>

      {/* Grid */}
      <div style={{
        flex: 1, overflowY: 'auto', scrollbarWidth: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
        gap: '14px', alignContent: 'start',
      }}>
        {filtered.map((item, i) => (
          <div key={i} onClick={() => onSelect(item)} style={{ cursor: 'pointer', userSelect: 'none' }}>
            <div style={{
              borderRadius: '10px', overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.4)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)';
              }}
            >
              <img src={item.src} alt={item.title} draggable={false}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
            </div>
            <p style={{ fontWeight: 600, fontSize: '11px', color: C.text, margin: '7px 0 1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.title}
            </p>
            <p style={{ ...tiny, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.artist}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0' }}>
            <p style={{ ...tiny, fontSize: '11px', color: '#bbb' }}>No results for "{query}"</p>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

// ── RIGHT PANEL ───────────────────────────────────────────────────────────────
const RightPanel = ({ current }) => (
  <GlassPanel style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
    <div style={{ padding: `${C.pad} ${C.pad} 12px` }}>
      <p style={{
        margin: 0, fontWeight: 400, fontSize: '40px',
        letterSpacing: '-3px', color: C.text,
        lineHeight: 1.05, textTransform: 'uppercase',
      }}>
        Now<br />Playing
      </p>
    </div>

    {current ? (
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: `0 ${C.pad} ${C.pad}` }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 700, fontSize: '13px', color: C.text }}>01.</span>
          <span style={{ fontSize: '16px', color: C.muted, cursor: 'pointer' }}>+</span>
        </div>

        {/* Art + vinyl */}
        <div style={{ position: 'relative', marginBottom: '14px', height: '160px' }}>
          <img src={current.src} alt={current.title}
            style={{
              width: '155px', height: '155px', objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5)',
              position: 'relative', zIndex: 1,
            }} />
          <div style={{
            position: 'absolute', top: '8px', left: '130px',
            width: '95px', height: '95px', borderRadius: '50%',
            background: 'radial-gradient(circle, #555 18%, #111 18%, #111 30%, #2a2a2a 30%, #2a2a2a 32%, #111 32%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 0,
          }} />
        </div>

        {/* Title + artist */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: '13px', color: C.text, margin: 0, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {current.title}
            </p>
            <p style={{ ...tiny, marginTop: '3px', textTransform: 'uppercase' }}>{current.artist}</p>
          </div>
          <span style={{ fontSize: '13px', color: C.muted, cursor: 'pointer', marginLeft: '8px', flexShrink: 0 }}>···</span>
        </div>

        {/* Lyrics Preview */}
        <div style={{
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #6d00ff, #ff0080)',
          padding: '14px', cursor: 'pointer', marginBottom: '8px',
          boxShadow: '0 4px 20px rgba(109,0,255,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
          border: '1px solid rgba(255,255,255,0.2)',
          transition: 'transform 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <p style={{ ...label, color: '#fff' }}>Lyrics Preview</p>
        </div>

        {/* About Artist */}
        <div style={{
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '14px', display: 'flex', gap: '10px', alignItems: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ ...label, marginBottom: '4px' }}>About the Artist</p>
            <p style={{ ...tiny, marginBottom: '4px' }}>115,435,237 monthly listeners</p>
            <p style={{ ...tiny, color: '#aaa', lineHeight: 1.5 }}>One of the most influential artists of the decade...</p>
          </div>
          <img src={current.src} alt={current.artist}
            style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
        </div>
      </div>
    ) : (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <span style={{ fontSize: '2rem' }}>🎵</span>
        <p style={{ ...tiny, color: '#bbb' }}>Pick a song to play</p>
      </div>
    )}
  </GlassPanel>
);

// ── HOME ──────────────────────────────────────────────────────────────────────
const Home = ({ onSelect, current }) => {
  const [auroraColor1, setAuroraColor1] = useState('#f7f7f7');
  const [auroraColor2, setAuroraColor2] = useState('#e100ff');
  const getColors = useImageColors();

  const handleSelect = useCallback((item) => {
    onSelect(item);
    getColors(item.src, (c1, c2) => {
      setAuroraColor1(c1);
      setAuroraColor2(c2);
    });
  }, [onSelect, getColors]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      height: '100%', width: '100%',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: '#ffffff',
      padding: C.gap, gap: C.gap,
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Aurora bg */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Aurora
          color1={auroraColor1}
          color2={auroraColor2}
          brightness={1.2}
          speed={0.6}
          scale={1.5}
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      {/* Panels */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'row', width: '100%', gap: C.gap }}>
        <LeftPanel   onSelect={handleSelect} current={current} />
        <CenterPanel onSelect={handleSelect} />
        <RightPanel  current={current} />
      </div>
    </div>
  );
};

export default Home;