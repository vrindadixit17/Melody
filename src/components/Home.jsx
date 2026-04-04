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
const PICKED          = ALL.slice(8, 24);

const C = {
  text:   '#111',
  muted:  '#888',
  radius: '16px',
  gap:    '6px',
  pad:    '20px',
};

const glass = {
  background: 'rgba(255,255,255,0.18)',
  backdropFilter: 'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
  border: '1px solid rgba(255,255,255,0.45)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.75)',
};

const useImageColors = () => {
  const getColors = useCallback((src, onColors) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const sample = (x, y, w, h) => {
        const data = ctx.getImageData(x, y, w, h).data;
        let r = 0, g = 0, b = 0;
        const px = data.length / 4;
        for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i+1]; b += data[i+2]; }
        const avg = (r+g+b)/(3*px), boost = 1.8;
        r = Math.min(255, avg+(r/px-avg)*boost);
        g = Math.min(255, avg+(g/px-avg)*boost);
        b = Math.min(255, avg+(b/px-avg)*boost);
        return `#${Math.round(r).toString(16).padStart(2,'0')}${Math.round(g).toString(16).padStart(2,'0')}${Math.round(b).toString(16).padStart(2,'0')}`;
      };
      onColors(sample(0,0,img.width/2,img.height/2), sample(img.width/2,img.height/2,img.width/2,img.height/2));
    };
  }, []);
  return getColors;
};

// ── LEFT PANEL ────────────────────────────────────────────────────────────────
const LeftPanel = ({ onSelect, current }) => (
  <div style={{
    width: '200px', flexShrink: 0,
    borderRadius: C.radius, overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
    ...glass,
  }}>
    <p style={{
      fontWeight: 900, fontSize: '28px', letterSpacing: '-1px',
      lineHeight: 1, textTransform: 'uppercase',
      color: C.text, margin: 0,
      padding: '20px 20px 16px',
    }}>
      Recently<br />Played
    </p>
    <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
      {RECENTLY_PLAYED.map((item, i) => {
        const active = current?.title === item.title;
        return (
          <div
            key={i} onClick={() => onSelect(item)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '7px 14px', cursor: 'pointer',
              background: active ? 'rgba(255,255,255,0.3)' : 'transparent',
              transition: 'background 0.15s',
              borderRadius: '10px', margin: '0 6px',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
          >
            <img src={item.src} alt={item.title}
              style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }} />
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: 600, fontSize: '11px', color: C.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </p>
              <p style={{ fontWeight: 400, fontSize: '9px', color: C.muted, margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.artist}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ── CENTER PANEL ──────────────────────────────────────────────────────────────

// Masonry layout — varied sizes like the reference
const SIZES = [
  'tall', 'normal', 'normal', 'normal', 'normal', 'wide',
  'normal', 'label', 'normal', 'normal', 'normal', 'normal',
  'normal', 'normal', 'normal', 'label2',
];

const CenterPanel = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const filtered = PICKED.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      flex: 1, borderRadius: C.radius, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      ...glass,
    }}>
      {/* Search bar */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '50px',
          padding: '10px 18px',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        }}>
          <span style={{ fontSize: '13px', color: C.muted }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="what do you want to play?"
            style={{
              flex: 1, border: 'none', background: 'transparent',
              outline: 'none', fontSize: '13px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: C.text,
            }}
          />
          {query && <span onClick={() => setQuery('')} style={{ fontSize: '11px', color: C.muted, cursor: 'pointer' }}>✕</span>}
        </div>
      </div>

      {/* Masonry grid */}
      <div style={{
        flex: 1, overflowY: 'auto', scrollbarWidth: 'none',
        padding: '12px',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridAutoRows: '90px',
        gap: '6px',
        alignContent: 'start',
      }}>
        {filtered.map((item, i) => {
          const size = SIZES[i % SIZES.length];

          if (size === 'label') return (
            <div key={i} style={{
              gridColumn: 'span 2', gridRow: 'span 1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontWeight: 900, fontSize: '18px', color: C.text, textTransform: 'uppercase', letterSpacing: '-0.5px', textAlign: 'center', lineHeight: 1.2 }}>
                Picked for<br />You ♡
              </p>
            </div>
          );

          if (size === 'label2') return (
            <div key={i} style={{
              gridColumn: 'span 2', gridRow: 'span 2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontWeight: 900, fontSize: '18px', color: C.text, textTransform: 'uppercase', letterSpacing: '-0.5px', textAlign: 'center', lineHeight: 1.3 }}>
                Know more<br />of what you<br />listen to
              </p>
            </div>
          );

          const colSpan = size === 'wide' ? 2 : 1;
          const rowSpan = size === 'tall' ? 2 : size === 'wide' ? 1 : 1;

          return (
            <div
              key={i}
              onClick={() => onSelect(item)}
              style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
                borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}
            >
              <img src={item.src} alt={item.title} draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── RIGHT PANEL ───────────────────────────────────────────────────────────────
const RightPanel = ({ current }) => (
  <div style={{
    width: '250px', flexShrink: 0,
    borderRadius: C.radius, overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
    ...glass,
  }}>
    {/* Big NOW PLAYING header */}
    <div style={{ padding: '20px 20px 12px' }}>
      <p style={{
        margin: 0, fontWeight: 900, fontSize: '32px',
        letterSpacing: '-1.5px', color: C.text,
        lineHeight: 1.05, textTransform: 'uppercase',
      }}>
        Now<br />Playing
      </p>
    </div>

    {current ? (
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '0 20px 20px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 800, fontSize: '14px', color: C.text }}>01.</span>
          <span style={{ fontSize: '18px', color: C.muted, cursor: 'pointer', lineHeight: 1 }}>⊕</span>
        </div>

        {/* Art + vinyl */}
        <div style={{ position: 'relative', marginBottom: '14px', height: '160px' }}>
          <img src={current.src} alt={current.title}
            style={{
              width: '155px', height: '155px', objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
              position: 'relative', zIndex: 1,
            }} />
          <div style={{
            position: 'absolute', top: '8px', left: '128px',
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'radial-gradient(circle, #555 18%, #111 18%, #111 30%, #2a2a2a 30%, #2a2a2a 32%, #111 32%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)', zIndex: 0,
          }} />
        </div>

        {/* Title + artist */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontWeight: 800, fontSize: '14px', color: C.text, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {current.title}
            </p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: C.muted, margin: '3px 0 0', textTransform: 'uppercase' }}>
              {current.artist}
            </p>
          </div>
          <span style={{ fontSize: '13px', color: C.muted, cursor: 'pointer', marginLeft: '8px', flexShrink: 0 }}>···</span>
        </div>

        {/* Lyrics Preview */}
        <div style={{
          borderRadius: '10px', background: '#e8174a',
          padding: '16px', cursor: 'pointer', marginBottom: '8px',
          boxShadow: '0 4px 20px rgba(232,23,74,0.3)',
          transition: 'transform 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <p style={{ fontWeight: 800, fontSize: '13px', letterSpacing: 0, color: '#fff', margin: 0, textTransform: 'uppercase' }}>
            Lyrics Preview
          </p>
        </div>

        {/* About Artist */}
        <div style={{
          borderRadius: '10px', background: '#1a1a1a',
          padding: '14px', display: 'flex', gap: '10px', alignItems: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontWeight: 800, fontSize: '11px', color: '#fff', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 0 }}>
              About the Artist
            </p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: '#aaa', margin: '0 0 4px' }}>115,435,237 monthly listeners</p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: '#777', margin: 0, lineHeight: 1.5 }}>
              One of the most influential artists of the decade...
            </p>
          </div>
          <img src={current.src} alt={current.artist}
            style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />
        </div>
      </div>
    ) : (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <span style={{ fontSize: '2rem' }}>🎵</span>
        <p style={{ fontWeight: 400, fontSize: '9px', color: '#bbb' }}>Pick a song to play</p>
      </div>
    )}
  </div>
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

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'row', width: '100%', gap: C.gap }}>
        <LeftPanel   onSelect={handleSelect} current={current} />
        <CenterPanel onSelect={handleSelect} />
        <RightPanel  current={current} />
      </div>
    </div>
  );
};

export default Home;