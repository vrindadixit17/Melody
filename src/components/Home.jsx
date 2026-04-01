import { useState } from 'react';
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

import Aurora from './components/Aurora';

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
  bg:      '#efefef',
  surface: '#ffffff',
  text:    '#242424',
  muted:   '#999',
  radius:  '14px',
  gap:     '6px',
  pad:     '20px',
};

const label = {
  fontWeight: 800, fontSize: '15px', letterSpacing: 0,
  textTransform: 'uppercase', color: C.text, margin: 0,
};

const tiny = {
  fontWeight: 400, fontSize: '9px', color: C.muted, margin: 0,
};

const glass = {
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
  WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
  border: '1px solid rgba(255,255,255,0.45)',
  boxShadow: `
    0 0 0 0.5px rgba(255,255,255,0.3),
    0 8px 40px rgba(0,0,0,0.15),
    0 2px 8px rgba(0,0,0,0.08),
    inset 0 1.5px 0 rgba(255,255,255,1),
    inset 0 -1px 0 rgba(255,255,255,0.15),
    inset 1px 0 0 rgba(255,255,255,0.5),
    inset -1px 0 0 rgba(255,255,255,0.5)
  `,
};

// ── LEFT PANEL ────────────────────────────────────────────────────────────────
const LeftPanel = ({ onSelect, current }) => (
  <div style={{
    width: '210px', flexShrink: 0,
    borderRadius: C.radius,
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
    ...glass,
  }}>
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
              background: active ? 'rgba(0,0,0,0.07)' : 'transparent',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
          >
            <img src={item.src} alt={item.title}
              style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} />
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontWeight: 500, fontSize: '12px', letterSpacing: 0, color: C.text, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
  </div>
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
    <div style={{
      flex: 1, borderRadius: C.radius,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', padding: C.pad,
      ...glass,
    }}>

      {/* Top bar — label + icons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <p style={{ ...label }}>Picked for You</p>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['⊞', '≡', '♡'].map((icon, i) => (
            <button key={i} style={{
              width: '28px', height: '28px',
              borderRadius: '7px',
              border: '1px solid rgba(0,0,0,0.08)',
              background: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: C.text,
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}
            >{icon}</button>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(0,0,0,0.05)',
        borderRadius: '10px',
        padding: '8px 12px',
        marginBottom: '16px',
        border: '1px solid rgba(0,0,0,0.06)',
      }}>
        <span style={{ fontSize: '13px', color: C.muted }}>🔍</span>
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
          <span
            onClick={() => setQuery('')}
            style={{ fontSize: '11px', color: C.muted, cursor: 'pointer' }}
          >✕</span>
        )}
      </div>

      {/* Grid */}
      <div style={{
        flex: 1, overflowY: 'auto', scrollbarWidth: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
        gap: '14px',
        alignContent: 'start',
      }}>
        {filtered.map((item, i) => (
          <div
            key={i}
            onClick={() => onSelect(item)}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{
              overflow: 'hidden', borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.18)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
              }}
            >
              <img
                src={item.src} alt={item.title} draggable={false}
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <p style={{ fontWeight: 600, fontSize: '11px', letterSpacing: 0, color: C.text, margin: '7px 0 1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.title}
            </p>
            <p style={{ ...tiny, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.artist}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0' }}>
            <p style={{ ...tiny, color: '#bbb', fontSize: '11px' }}>No results for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── RIGHT PANEL ───────────────────────────────────────────────────────────────
const RightPanel = ({ current }) => (
  <div style={{
    width: '250px', flexShrink: 0,
    borderRadius: C.radius,
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
    ...glass,
  }}>
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
              borderRadius: '10px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
              position: 'relative', zIndex: 1,
            }} />
          <div style={{
            position: 'absolute', top: '8px', left: '130px',
            width: '95px', height: '95px', borderRadius: '50%',
            background: 'radial-gradient(circle, #555 18%, #111 18%, #111 30%, #2a2a2a 30%, #2a2a2a 32%, #111 32%)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)', zIndex: 0,
          }} />
        </div>

        {/* Title + artist */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: '13px', letterSpacing: 0, color: C.text, margin: 0, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {current.title}
            </p>
            <p style={{ ...tiny, marginTop: '3px', textTransform: 'uppercase' }}>{current.artist}</p>
          </div>
          <span style={{ fontSize: '13px', color: C.muted, cursor: 'pointer', marginLeft: '8px', flexShrink: 0 }}>···</span>
        </div>

        {/* Lyrics Preview */}
        <div style={{
          borderRadius: '10px', background: '#e8174a',
          padding: '14px', cursor: 'pointer', marginBottom: '8px',
          boxShadow: '0 4px 16px rgba(232,23,74,0.35)',
          transition: 'transform 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <p style={{ ...label, color: '#fff' }}>Lyrics Preview</p>
        </div>

        {/* About Artist */}
        <div style={{
          borderRadius: '10px', background: '#242424',
          padding: '14px', display: 'flex', gap: '10px', alignItems: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <p style={{ ...label, color: '#fff', marginBottom: '4px' }}>About the Artist</p>
            <p style={{ ...tiny, color: '#aaa', marginBottom: '4px' }}>115,435,237 monthly listeners</p>
            <p style={{ ...tiny, color: '#777', lineHeight: 1.5 }}>One of the most influential artists of the decade...</p>
          </div>
          <img src={current.src} alt={current.artist}
            style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />
        </div>
      </div>
    ) : (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <span style={{ fontSize: '2rem' }}>🎵</span>
        <p style={{ ...tiny, color: '#bbb' }}>Pick a song to play</p>
      </div>
    )}
  </div>
);

// ── HOME ──────────────────────────────────────────────────────────────────────
const Home = ({ onSelect, current }) => (
  <div style={{
    display: 'flex', flexDirection: 'row',
    height: '100%', width: '100%',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    background: '#0a0a0f',
    padding: C.gap,
    gap: C.gap,
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
  }}>

    {/* Aurora background — absolutely fills the whole panel */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Aurora
        color1='#7c3aed'
        color2='#db2777'
        brightness={1.3}
        speed={0.5}
        bandHeight={0.5}
        bandSpread={1.2}
        scale={1.5}
      />
    </div>

    {/* Panels sit above aurora */}
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'row', width: '100%', gap: C.gap }}>
      <LeftPanel   onSelect={onSelect} current={current} />
      <CenterPanel onSelect={onSelect} />
      <RightPanel  current={current} />
    </div>
  </div>
);

export default Home;