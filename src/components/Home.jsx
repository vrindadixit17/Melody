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

// Grid layout — 5 cols x 5 rows = 25 cells, some empty, some filled
// null = empty cell, number = index into PICKED
const GRID = [
  0,    1,    2,    3,    null,
  null, 4,    5,    6,    7,
  8,    'txt',null, 9,    10,
  11,   12,   null, 13,   null,
  null, 14,   15,   null, null,
];

const C = {
  text:   '#242424',
  muted:  '#999',
  radius: '14px',
  gap:    '6px',
};

// Color extractor
const useImageColors = () => useCallback((src, onColors) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width; canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const sample = (x, y, w, h) => {
      const d = ctx.getImageData(x, y, w, h).data;
      let r=0,g=0,b=0; const px=d.length/4;
      for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];}
      const avg=(r+g+b)/(3*px), boost=2.0;
      r=Math.min(255,avg+(r/px-avg)*boost);
      g=Math.min(255,avg+(g/px-avg)*boost);
      b=Math.min(255,avg+(b/px-avg)*boost);
      return `#${Math.round(r).toString(16).padStart(2,'0')}${Math.round(g).toString(16).padStart(2,'0')}${Math.round(b).toString(16).padStart(2,'0')}`;
    };
    onColors(
      sample(0,0,img.width/2,img.height/2),
      sample(img.width/2,img.height/2,img.width/2,img.height/2),
    );
  };
}, []);

// ── LEFT PANEL ────────────────────────────────────────────────────────────────
const LeftPanel = ({ onSelect, current, query, setQuery }) => (
  <div style={{
    width: '220px', height: '500px', flexShrink: 0,
    borderRadius: C.radius,
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border: '1px solid rgba(255,255,255,0.6)',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
  }}>

    {/* RECENTLY PLAYED — two separate blocks, tight spacing */}
    <div style={{ padding: '18px 18px 14px', flexShrink: 0 }}>
      <p style={{ margin: 0, fontWeight: 600, fontSize: '28px', letterSpacing: '-1px', lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>
        Recently
      </p>
      <p style={{ margin: 0, fontWeight: 600, fontSize: '28px', letterSpacing: '-1px', lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>
        Played
      </p>

      {/* Search bar below header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        background: 'rgba(255,255,255,0.7)',
        borderRadius: '50px',
        padding: '7px 12px',
        marginTop: '12px',
        border: '1px solid rgba(200,200,200,0.5)',
      }}>
        <span style={{ fontSize: '11px', color: C.muted }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="what do you want to play?"
          style={{
            flex: 1, border: 'none', background: 'transparent',
            outline: 'none', fontSize: '11px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: C.text,
          }}
        />
        {query && <span onClick={() => setQuery('')} style={{ fontSize: '10px', color: C.muted, cursor: 'pointer' }}>✕</span>}
      </div>
    </div>

    {/* List */}
    <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>
      {RECENTLY_PLAYED.map((item, i) => {
        const active = current?.title === item.title;
        return (
          <div
            key={i} onClick={() => onSelect(item)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '7px 14px', cursor: 'pointer',
              background: active ? 'rgba(255,255,255,0.5)' : 'transparent',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
          >
            <img src={item.src} alt={item.title}
              style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: 600, fontSize: '12px', color: C.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </p>
              <p style={{ fontWeight: 400, fontSize: '9px', color: C.muted, margin: '1px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
const CenterPanel = ({ onSelect, query }) => {
  const filtered = PICKED.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase())
  );

  // Build grid — map PICKED indices to filtered or null
  const grid = query
    ? filtered.slice(0, 25).map((item, i) => ({ type: 'img', item }))
    : GRID.map(cell => {
        if (cell === null) return { type: 'empty' };
        if (cell === 'txt') return { type: 'txt' };
        return { type: 'img', item: PICKED[cell] };
      });

  return (
    <div style={{
      flex: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gridTemplateRows: 'repeat(5, 1fr)',
      gap: '6px',
      overflow: 'hidden',
    }}>
      {grid.map((cell, i) => {
        if (cell.type === 'empty') return <div key={i} />;

        if (cell.type === 'txt') return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '8px',
          }}>
            <p style={{
              fontWeight: 600, fontSize: '20px', color: C.text,
              textTransform: 'uppercase', letterSpacing: '-0.5px',
              lineHeight: 1.2, textAlign: 'center', margin: 0,
            }}>
              Picked<br />for you ♡
            </p>
          </div>
        );

        return (
          <div
            key={i}
            onClick={() => onSelect(cell.item)}
            style={{
              borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
              aspectRatio: '1',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 2px 8px rgba(36,36,36,0.1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(36,36,36,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(36,36,36,0.1)';
            }}
          >
            <img src={cell.item.src} alt={cell.item.title} draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        );
      })}
    </div>
  );
};

// ── RIGHT PANEL ───────────────────────────────────────────────────────────────
const RightPanel = ({ current, accentColor }) => (
  <div style={{
    width: '240px', height: '500px', flexShrink: 0,
    borderRadius: C.radius,
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border: '1px solid rgba(255,255,255,0.6)',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
  }}>
    {/* NOW PLAYING — two tight blocks */}
    <div style={{ padding: '18px 18px 12px', flexShrink: 0 }}>
      <p style={{ margin: 0, fontWeight: 600, fontSize: '28px', letterSpacing: '-1px', lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>
        Now
      </p>
      <p style={{ margin: 0, fontWeight: 600, fontSize: '28px', letterSpacing: '-1px', lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>
        Playing
      </p>
    </div>

    {current ? (
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '0 18px 18px' }}>

        {/* Track no + add */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 600, fontSize: '14px', color: C.text }}>01.</span>
          <span style={{ fontSize: '18px', color: C.muted, cursor: 'pointer', lineHeight: 1 }}>⊕</span>
        </div>

        {/* Album art + disc */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          {/* Disc — same size as album, peeking right, slightly behind */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '155px',           // album is 160px wide, disc peeks out
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, #555 12%, #242424 12%, #242424 28%, #3a3a3a 28%, #3a3a3a 30%, #242424 30%, #242424 46%, #3a3a3a 46%, #3a3a3a 48%, #242424 48%)',
            boxShadow: '0 4px 20px rgba(36,36,36,0.35)',
            zIndex: 0,
          }} />
          {/* Album — slightly tilted */}
          <img src={current.src} alt={current.title}
            style={{
              width: '160px', height: '160px', objectFit: 'cover',
              borderRadius: '6px',
              boxShadow: '0 10px 28px rgba(36,36,36,0.2)',
              position: 'relative', zIndex: 1,
              transform: 'rotate(-3deg)',
              transformOrigin: 'bottom left',
            }} />
        </div>

        {/* Title + dots */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: '14px', color: C.text, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {current.title}
            </p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: C.muted, margin: '3px 0 0', textTransform: 'uppercase' }}>
              {current.artist}
            </p>
          </div>
          <span style={{ fontSize: '13px', color: C.muted, cursor: 'pointer', marginLeft: '8px', flexShrink: 0 }}>···</span>
        </div>

        {/* Lyrics Preview — accent color */}
        <div style={{
          borderRadius: '10px',
          background: accentColor,
          padding: '14px 16px', cursor: 'pointer', marginBottom: '8px',
          transition: 'transform 0.2s ease, filter 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
        >
          <p style={{ fontWeight: 600, fontSize: '13px', color: '#fff', margin: 0, textTransform: 'uppercase', letterSpacing: 0 }}>
            Lyrics Preview
          </p>
        </div>

        {/* About Artist */}
        <div style={{
          borderRadius: '10px', background: '#242424',
          padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'center',
        }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: '11px', color: '#fff', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: 0 }}>
              About the Artist
            </p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: '#aaa', margin: '0 0 3px' }}>
              115,435,237 monthly listeners
            </p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: '#777', margin: 0, lineHeight: 1.5 }}>
              One of the most influential artists of the decade...
            </p>
          </div>
          <img src={current.src} alt={current.artist}
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }} />
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
  const [accentColor,  setAccentColor]  = useState('#e8174a');
  const [query, setQuery] = useState('');
  const getColors = useImageColors();

  const handleSelect = useCallback((item) => {
    onSelect(item);
    getColors(item.src, (c1, c2) => {
      setAuroraColor1(c1);
      setAuroraColor2(c2);
      setAccentColor(c1); // dominant color for lyrics preview
    });
  }, [onSelect, getColors]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'row',
      alignItems: 'flex-start',
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
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'row',
        width: '100%', height: '100%',
        gap: C.gap, alignItems: 'flex-start',
      }}>
        <LeftPanel  onSelect={handleSelect} current={current} query={query} setQuery={setQuery} />
        <CenterPanel onSelect={handleSelect} query={query} />
        <RightPanel current={current} accentColor={accentColor} />
      </div>
    </div>
  );
};

export default Home;