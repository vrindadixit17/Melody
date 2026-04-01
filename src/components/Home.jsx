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

const ALL = [
  { src: img1,  title: 'Diamond Dogs',        artist: 'David Bowie'       },
  { src: img2,  title: 'APT.',                artist: 'ROSE & Bruno Mars'  },
  { src: img3,  title: 'Songs About Jane',    artist: 'Maroon 5'           },
  { src: img4,  title: 'DUH!',               artist: 'NewJeans'            },
  { src: img5,  title: 'Powerpuff Girls',     artist: 'Soundtrack'         },
  { src: img6,  title: 'Dark Side',           artist: 'Unknown'            },
  { src: img7,  title: 'Frenzy',              artist: 'Various'            },
  { src: img8,  title: 'Graffiti Soul',       artist: 'Simple Minds'       },
  { src: img9,  title: 'Abbey Road',          artist: 'The Beatles'        },
  { src: img10, title: 'Keyboard Cat',        artist: 'Internet Classic'   },
  { src: img11, title: 'Brat',               artist: 'Charli XCX'          },
  { src: img12, title: 'Back to Black',       artist: 'Amy Winehouse'      },
  { src: img13, title: 'Starboy',             artist: 'The Weeknd'         },
  { src: img14, title: 'Lemonade',            artist: 'Beyoncé'            },
  { src: img15, title: 'Gold Dust Woman',     artist: 'Fleetwood Mac'      },
  { src: img16, title: 'Sunflower',           artist: 'Post Malone'        },
  { src: img17, title: 'Blue Face',           artist: 'Unknown'            },
  { src: img18, title: 'Clouds',              artist: 'Various'            },
  { src: img19, title: 'Sour',               artist: 'Olivia Rodrigo'      },
  { src: img20, title: 'Diamond Heart',       artist: 'Unknown'            },
  { src: img21, title: 'Sweetener',           artist: 'Ariana Grande'      },
  { src: img22, title: 'Positions',           artist: 'Ariana Grande'      },
  { src: img23, title: 'Future Nostalgia',    artist: 'Dua Lipa'           },
  { src: img24, title: 'Chromatica',          artist: 'Lady Gaga'          },
];

const RECENTLY_PLAYED = ALL.slice(0, 8);
const PICKED_FOR_YOU  = ALL.slice(8, 24);

// ─── LEFT PANEL — Recently Played ───────────────────────────────────────────
const LeftPanel = ({ onSelect, current }) => (
  <div style={{
    width: '210px',
    flexShrink: 0,
    height: '100%',
    background: '#f5f5f5',
    borderRight: '1px solid #e8e8e8',
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 0 16px',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  }}>
    <p style={{
      padding: '0 20px',
      fontWeight: 800,
      fontSize: '0.72rem',
      color: '#111',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      margin: '0 0 20px',
    }}>
      Recently Played
    </p>
    {RECENTLY_PLAYED.map((item, i) => (
      <div
        key={i}
        onClick={() => onSelect(item)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '11px',
          padding: '8px 16px',
          cursor: 'pointer',
          background: current?.title === item.title ? '#eaeaea' : 'transparent',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (current?.title !== item.title) e.currentTarget.style.background = '#efefef'; }}
        onMouseLeave={e => { if (current?.title !== item.title) e.currentTarget.style.background = 'transparent'; }}
      >
        <img
          src={item.src}
          alt={item.title}
          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }}
        />
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.78rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.title}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: '0.68rem', color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.artist}
          </p>
        </div>
      </div>
    ))}
  </div>
);

// ─── CENTER PANEL — Picked for You ──────────────────────────────────────────
const CenterPanel = ({ onSelect }) => (
  <div style={{
    flex: 1,
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    padding: '28px 28px',
    background: '#fff',
  }}>
    <h2 style={{
      margin: '0 0 20px',
      fontSize: '0.72rem',
      fontWeight: 800,
      color: '#111',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    }}>
      Picked for You
    </h2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '16px',
    }}>
      {PICKED_FOR_YOU.map((item, i) => (
        <div
          key={i}
          onClick={() => onSelect(item)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <div style={{ overflow: 'hidden', borderRadius: '4px' }}>
            <img
              src={item.src}
              alt={item.title}
              draggable={false}
              style={{
                width: '100%', aspectRatio: '1',
                objectFit: 'cover', display: 'block',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <p style={{ margin: '6px 0 1px', fontWeight: 600, fontSize: '0.72rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.title}
          </p>
          <p style={{ margin: 0, fontSize: '0.65rem', color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.artist}
          </p>
        </div>
      ))}
    </div>
  </div>
);

// ─── RIGHT PANEL — Now Playing ───────────────────────────────────────────────
const RightPanel = ({ current }) => (
  <div style={{
    width: '260px',
    flexShrink: 0,
    height: '100%',
    background: '#f5f5f5',
    borderLeft: '1px solid #e8e8e8',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  }}>
    {/* Header */}
    <div style={{ padding: '28px 24px 16px' }}>
      <p style={{
        margin: 0,
        fontWeight: 800,
        fontSize: '1.6rem',
        color: '#111',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
      }}>
        Now<br />Playing
      </p>
    </div>

    {current ? (
      <>
        {/* Track number */}
        <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#111' }}>01.</span>
          <span style={{ fontSize: '1rem', color: '#bbb', cursor: 'pointer' }}>⊕</span>
        </div>

        {/* Album art + vinyl */}
        <div style={{ padding: '0 24px', position: 'relative', marginBottom: '16px' }}>
          <img
            src={current.src}
            alt={current.title}
            style={{
              width: '160px', height: '160px',
              objectFit: 'cover',
              borderRadius: '4px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              position: 'relative', zIndex: 1,
            }}
          />
          {/* Vinyl disc peeking out */}
          <div style={{
            position: 'absolute',
            top: '10px', left: '140px',
            width: '100px', height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #444 18%, #111 18%, #111 30%, #222 30%, #222 32%, #111 32%)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            zIndex: 0,
          }} />
        </div>

        {/* Title + artist */}
        <div style={{ padding: '0 24px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: 0, fontWeight: 800, fontSize: '1rem', color: '#111', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              {current.title}
            </p>
            <p style={{ margin: '3px 0 0', fontSize: '0.72rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {current.artist}
            </p>
          </div>
          <span style={{ fontSize: '0.9rem', color: '#bbb', cursor: 'pointer' }}>···</span>
        </div>

        {/* Lyrics Preview */}
        <div style={{
          margin: '0 24px 12px',
          borderRadius: '8px',
          background: '#e8174a',
          padding: '16px',
          cursor: 'pointer',
        }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.72rem', color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Lyrics Preview
          </p>
        </div>

        {/* About the Artist */}
        <div style={{
          margin: '0 24px 12px',
          borderRadius: '8px',
          background: '#222',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: '0.68rem', color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              About the Artist
            </p>
            <p style={{ margin: '0 0 6px', fontSize: '0.65rem', color: '#aaa' }}>
              115,435,237 monthly listeners
            </p>
            <p style={{ margin: 0, fontSize: '0.62rem', color: '#888', lineHeight: 1.4 }}>
              One of the most influential artists of the decade...
            </p>
          </div>
          <img
            src={current.src}
            alt={current.artist}
            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0 }}
          />
        </div>
      </>
    ) : (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ccc', padding: '24px' }}>
        <p style={{ fontSize: '2.5rem', margin: '0 0 10px' }}>🎵</p>
        <p style={{ fontSize: '0.78rem', fontWeight: 500, color: '#bbb', textAlign: 'center' }}>Pick a song to play</p>
      </div>
    )}
  </div>
);

// ─── HOME ─────────────────────────────────────────────────────────────────────
const Home = ({ onSelect, current }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }}>
    <LeftPanel   onSelect={onSelect} current={current} />
    <CenterPanel onSelect={onSelect} />
    <RightPanel  current={current}   />
  </div>
);

export default Home;