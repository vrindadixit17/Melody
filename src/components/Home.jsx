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
  { src: img1,  title: 'Diamond Dogs',      artist: 'David Bowie',      lyrics: 'Putting out fire with gasoline...'        },
  { src: img2,  title: 'APT.',              artist: 'ROSE & Bruno Mars', lyrics: 'You and I, we got a good thing...'        },
  { src: img3,  title: 'Songs About Jane',  artist: 'Maroon 5',          lyrics: 'It was always you, falling for me...'    },
  { src: img4,  title: 'DUH!',             artist: 'NewJeans',           lyrics: 'Duh, duh, duh, you know what it is...'   },
  { src: img5,  title: 'Powerpuff Girls',   artist: 'Soundtrack',        lyrics: 'Fighting crime, trying to save the world...' },
  { src: img6,  title: 'Dark Side',         artist: 'Unknown',           lyrics: 'Welcome to the dark side...'             },
  { src: img7,  title: 'Frenzy',            artist: 'Various',           lyrics: 'Lost in the frenzy of your love...'      },
  { src: img8,  title: 'Graffiti Soul',     artist: 'Simple Minds',      lyrics: 'Written on the walls, our story...'      },
  { src: img9,  title: 'Abbey Road',        artist: 'The Beatles',       lyrics: 'Here comes the sun, little darling...'   },
  { src: img10, title: 'Keyboard Cat',      artist: 'Internet Classic',  lyrics: 'Play him off, keyboard cat...'           },
  { src: img11, title: 'Brat',             artist: 'Charli XCX',         lyrics: 'I\'m so brat, brat, brat...'             },
  { src: img12, title: 'Back to Black',     artist: 'Amy Winehouse',     lyrics: 'We only said goodbye with words...'      },
  { src: img13, title: 'Starboy',           artist: 'The Weeknd',        lyrics: 'I\'m tryna put you in the worst mood...' },
  { src: img14, title: 'Lemonade',          artist: 'Beyoncé',           lyrics: 'I came to slay, okay...'                 },
  { src: img15, title: 'Gold Dust Woman',   artist: 'Fleetwood Mac',     lyrics: 'Rock on ancient queen...'                },
  { src: img16, title: 'Sunflower',         artist: 'Post Malone',       lyrics: 'Needless to say, I keep her in check...' },
  { src: img17, title: 'Blue Face',         artist: 'Unknown',           lyrics: 'Blue face, hundred dollar bills...'      },
  { src: img18, title: 'Clouds',            artist: 'Various',           lyrics: 'Drifting through the clouds...'          },
  { src: img19, title: 'Sour',             artist: 'Olivia Rodrigo',     lyrics: 'I\'m so sick of seventeen...'            },
  { src: img20, title: 'Diamond Heart',     artist: 'Unknown',           lyrics: 'Diamond heart, shining bright...'        },
  { src: img21, title: 'Sweetener',         artist: 'Ariana Grande',     lyrics: 'God is a woman...'                       },
  { src: img22, title: 'Positions',         artist: 'Ariana Grande',     lyrics: 'Switching positions for you...'          },
  { src: img23, title: 'Future Nostalgia',  artist: 'Dua Lipa',          lyrics: 'I know you ain\'t used to a female alpha...' },
  { src: img24, title: 'Chromatica',        artist: 'Lady Gaga',         lyrics: 'I\'ll never talk again, oh boy...'       },
];

const RECENTLY_PLAYED = ALL.slice(0, 8);
const PICKED          = ALL.slice(8, 24);

const GRID = [
  0,    null, 1,    2,    null, 3,
  null, 4,    null, 5,    6,    null,
  7,    'txt',8,    null, 9,    10,
  null, 11,   12,   null, 13,   null,
  14,   null, null, 15,   null, null,
  null, null, null, null, null, null,
];

const C = {
  text:   '#242424',
  muted:  '#999',
  radius: '14px',
  gap:    '6px',
};

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
      const avg=(r+g+b)/(3*px), boost=2.2;
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
const LeftPanel = ({ onSelect, current, query, setQuery }) => {
  return (
    <div style={{
      width: '220px', height: '500px', flexShrink: 0,
      borderRadius: C.radius,
      background: 'rgba(255,255,255,0.6)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.7)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 10px', flexShrink: 0 }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '26px', letterSpacing: '-1px', lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>Recently</p>
        <p style={{ margin: 0, fontWeight: 600, fontSize: '26px', letterSpacing: '-1px', lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>Played</p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '50px', padding: '6px 10px', marginTop: '10px',
          border: '1px solid rgba(200,200,200,0.4)',
        }}>
          <span style={{ fontSize: '10px', color: C.muted }}>🔍</span>
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="what do you want to play?"
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '10px', fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.text }}
          />
          {query && <span onClick={() => setQuery('')} style={{ fontSize: '9px', color: C.muted, cursor: 'pointer' }}>✕</span>}
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 8px 10px' }}>
        {RECENTLY_PLAYED.map((item, i) => {
          const active = current?.title === item.title;
          return (
            <div
              key={i} onClick={() => onSelect(item)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                padding: '0 8px', cursor: 'pointer', borderRadius: '8px',
                background: active ? 'rgba(36,36,36,0.07)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(36,36,36,0.04)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <img src={item.src} alt={item.title}
                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0, boxShadow: '0 1px 4px rgba(36,36,36,0.15)' }} />
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontWeight: 600, fontSize: '11px', color: C.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
};

// ── CENTER PANEL ──────────────────────────────────────────────────────────────
const CenterPanel = ({ onSelect, query }) => {
  const filtered = PICKED.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.artist.toLowerCase().includes(query.toLowerCase())
  );

  const grid = query
    ? [...filtered.slice(0, 36).map(item => ({ type: 'img', item })), ...Array(36).fill({ type: 'empty' })].slice(0, 36)
    : GRID.map(cell => {
        if (cell === null) return { type: 'empty' };
        if (cell === 'txt') return { type: 'txt' };
        return { type: 'img', item: PICKED[cell] };
      });

  return (
    <div style={{
      flex: 1,
      height: '500px',
      maxHeight: '500px',
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridAutoRows: '1fr',
      aspectRatio: '1 / 1',
      gap: '5px',
      overflow: 'hidden',
    }}>
      {grid.map((cell, i) => {
        if (cell.type === 'empty') return (
          <div key={i} style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }} />
        );

        if (cell.type === 'txt') return (
          <div key={i} style={{
            width: '100%', height: '100%', minWidth: 0, minHeight: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <p style={{
              fontWeight: 600, fontSize: '13px', color: C.text,
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
              width: '100%',
              height: '100%',
              minWidth: 0,
              minHeight: 0,
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              aspectRatio: '1 / 1', 
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 2px 8px rgba(36,36,36,0.1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(36,36,36,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(36,36,36,0.1)';
            }}
          >
            <img
              src={cell.item.src}
              alt={cell.item.title}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        );
      })}
    </div>
  );
};

// ── RIGHT PANEL ───────────────────────────────────────────────────────────────
const RightPanel = ({ current, accentColor }) => (
  <div style={{
    width: '280px', height: '500px', flexShrink: 0,
    borderRadius: C.radius,
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.7)',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
  }}>
    <div style={{ padding: '16px 20px 10px', flexShrink: 0 }}>
      <p style={{ margin: 0, fontWeight: 600, fontSize: '26px', letterSpacing: '-1px', lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>Now</p>
      <p style={{ margin: 0, fontWeight: 600, fontSize: '26px', letterSpacing: '-1px', lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>Playing</p>
    </div>

    {current ? (
      <div style={{ flex: 1, overflow: 'hidden', padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '13px', color: C.text }}>01.</span>
          <span style={{ fontSize: '16px', color: C.muted, cursor: 'pointer' }}>⊕</span>
        </div>

        <div style={{ position: 'relative', height: '150px', flexShrink: 0 }}>
          <div style={{
            position: 'absolute',
            top: '0px', left: '90px',
            width: '150px', height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center, #666 10%, #242424 10%, #242424 26%, #383838 26%, #383838 28%, #242424 28%, #242424 44%, #383838 44%, #383838 46%, #242424 46%)',
            boxShadow: '0 6px 24px rgba(36,36,36,0.4)',
            zIndex: 0,
          }} />
          <img src={current.src} alt={current.title}
            style={{
              width: '150px', height: '150px', objectFit: 'cover',
              borderRadius: '6px',
              boxShadow: '0 8px 24px rgba(36,36,36,0.25)',
              position: 'absolute', top: 0, left: 0,
              zIndex: 1,
              transform: 'rotate(-3deg)',
              transformOrigin: 'bottom left',
            }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: '13px', color: C.text, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {current.title}
            </p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: C.muted, margin: '2px 0 0', textTransform: 'uppercase' }}>
              {current.artist}
            </p>
          </div>
          <span style={{ fontSize: '12px', color: C.muted, cursor: 'pointer', marginLeft: '8px', flexShrink: 0 }}>···</span>
        </div>

        <div style={{
          borderRadius: '8px',
          background: accentColor,
          padding: '12px 14px', cursor: 'pointer',
          transition: 'filter 0.2s ease',
          flexShrink: 0,
        }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
        >
          <p style={{ fontWeight: 600, fontSize: '10px', color: 'rgba(255,255,255,0.7)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Lyrics Preview
          </p>
          <p style={{ fontWeight: 400, fontSize: '12px', color: '#fff', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
            "{current.lyrics}"
          </p>
        </div>

        <div style={{
          borderRadius: '8px', background: '#242424',
          padding: '10px 12px', display: 'flex', gap: '10px', alignItems: 'center',
          flexShrink: 0,
        }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontWeight: 600, fontSize: '10px', color: '#fff', margin: '0 0 2px', textTransform: 'uppercase' }}>
              About the Artist
            </p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: '#aaa', margin: '0 0 2px' }}>
              115,435,237 monthly listeners
            </p>
            <p style={{ fontWeight: 400, fontSize: '9px', color: '#666', margin: 0, lineHeight: 1.4 }}>
              One of the most influential artists of the decade...
            </p>
          </div>
          <img src={current.src} alt={current.artist}
            style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }} />
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
const Home = ({ onSelect, current, onBack }) => {
  const [auroraColor1, setAuroraColor1] = useState('#f7f7f7');
  const [auroraColor2, setAuroraColor2] = useState('#e100ff');
  const [accentColor,  setAccentColor]  = useState('#e8174a');
  const [query,        setQuery]        = useState('');
  const getColors = useImageColors();

  const handleSelect = useCallback((item) => {
    onSelect(item);
    getColors(item.src, (c1, c2) => {
      setAuroraColor1(c1);
      setAuroraColor2(c2);
      setAccentColor(c1);
    });
  }, [onSelect, getColors]);

  return (
    <div style={{
      width: '100%', height: '100%',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: '#fafafa',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Aurora
          color1={auroraColor1} color2={auroraColor2}
          brightness={1.2} speed={0.6} scale={1.5}
          noiseFrequency={2.5} noiseAmplitude={1.0}
          bandHeight={0.5} bandSpread={1.0}
          octaveDecay={0.1} layerOffset={0}
          colorSpeed={1.0} enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%', height: '100%',
        padding: '12px 12px 0 12px',
        gap: C.gap,
        boxSizing: 'border-box',
      }}>
        <LeftPanel   onSelect={handleSelect} current={current} query={query} setQuery={setQuery} />
        <CenterPanel onSelect={handleSelect} query={query} />
        <RightPanel  current={current} accentColor={accentColor} />
      </div>
    </div>
  );
};

export default Home;