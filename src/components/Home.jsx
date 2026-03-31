import { useState, useRef } from 'react';
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
import img25 from '../assets/images/25.jpg';
import img26 from '../assets/images/26.jpg';
import img27 from '../assets/images/27.jpg';
import img28 from '../assets/images/28.jpg';
import img29 from '../assets/images/29.jpg';
import img30 from '../assets/images/30.jpg';
import img31 from '../assets/images/31.jpg';
import img32 from '../assets/images/32.jpg';

const ALL = [
  { src: img1,  title: 'Diamond Dogs',        artist: 'David Bowie'        },
  { src: img2,  title: 'APT.',                artist: 'ROSE & Bruno Mars'   },
  { src: img3,  title: 'Songs About Jane',    artist: 'Maroon 5'            },
  { src: img4,  title: 'DUH!',               artist: 'NewJeans'             },
  { src: img5,  title: 'Powerpuff Girls',     artist: 'Soundtrack'          },
  { src: img6,  title: 'Dark Side',           artist: 'Unknown'             },
  { src: img7,  title: 'Frenzy',              artist: 'Various'             },
  { src: img8,  title: 'Graffiti Soul',       artist: 'Simple Minds'        },
  { src: img9,  title: 'Abbey Road',          artist: 'The Beatles'         },
  { src: img10, title: 'Keyboard Cat',        artist: 'Internet Classic'    },
  { src: img11, title: 'Brat',               artist: 'Charli XCX'           },
  { src: img12, title: 'Back to Black',       artist: 'Amy Winehouse'       },
  { src: img13, title: 'Starboy',             artist: 'The Weeknd'          },
  { src: img14, title: 'Lemonade',            artist: 'Beyoncé'             },
  { src: img15, title: 'Gold Dust Woman',     artist: 'Fleetwood Mac'       },
  { src: img16, title: 'Sunflower',           artist: 'Post Malone'         },
  { src: img17, title: 'Blue Face',           artist: 'Unknown'             },
  { src: img18, title: 'Clouds',              artist: 'Various'             },
  { src: img19, title: 'Sour',               artist: 'Olivia Rodrigo'       },
  { src: img20, title: 'Diamond Heart',       artist: 'Unknown'             },
  { src: img21, title: 'Sweetener',           artist: 'Ariana Grande'       },
  { src: img22, title: 'Positions',           artist: 'Ariana Grande'       },
  { src: img23, title: 'Future Nostalgia',    artist: 'Dua Lipa'            },
  { src: img24, title: 'Chromatica',          artist: 'Lady Gaga'           },
  { src: img25, title: 'Folklore',            artist: 'Taylor Swift'        },
  { src: img26, title: 'Evermore',            artist: 'Taylor Swift'        },
  { src: img27, title: 'Happier Than Ever',   artist: 'Billie Eilish'       },
  { src: img28, title: 'Justice',             artist: 'Justin Bieber'       },
  { src: img29, title: 'Certified Lover Boy', artist: 'Drake'               },
  { src: img30, title: 'Donda',              artist: 'Kanye West'            },
  { src: img31, title: 'Planet Her',          artist: 'Doja Cat'            },
  { src: img32, title: 'Dangerous Woman',     artist: 'Ariana Grande'       },
];

const RECENTLY_PLAYED = ALL.slice(0, 8);
const SECTIONS = [
  { title: 'Picked for You',  items: ALL.slice(8, 16)  },
  { title: 'New Releases',    items: ALL.slice(16, 24) },
];

// Drag scroll
const useDrag = () => {
  const onMouseDown = e => {
    const el = e.currentTarget;
    el.style.cursor = 'grabbing';
    const startX     = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;
    const onMove = ev => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX); };
    const onUp   = () => {
      el.style.cursor = 'grab';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };
  return onMouseDown;
};

// ─── LEFT PANEL — Recently Played ───────────────────────────────────────────
const LeftPanel = ({ onSelect, current }) => (
  <div style={{
    width: '240px',
    flexShrink: 0,
    height: '100%',
    background: '#f0f0f0',
    borderRight: '1px solid #e5e5e5',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  }}>
    <p style={{ padding: '0 20px', fontWeight: 700, fontSize: '0.8rem', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px' }}>
      Recently Played
    </p>
    {RECENTLY_PLAYED.map((item, i) => (
      <div
        key={i}
        onClick={() => onSelect(item)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 20px',
          cursor: 'pointer',
          background: current?.title === item.title ? '#e2e2e2' : 'transparent',
          transition: 'background 0.2s',
          borderRadius: '6px',
          margin: '0 8px',
        }}
        onMouseEnter={e => { if (current?.title !== item.title) e.currentTarget.style.background = '#e8e8e8'; }}
        onMouseLeave={e => { if (current?.title !== item.title) e.currentTarget.style.background = 'transparent'; }}
      >
        <img src={item.src} alt={item.title} style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.82rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
          <p style={{ margin: 0, fontSize: '0.72rem', color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.artist}</p>
        </div>
      </div>
    ))}
  </div>
);

// ─── CENTER PANEL — Sections ─────────────────────────────────────────────────
const SmallCard = ({ item, onSelect }) => (
  <div
    onClick={() => onSelect(item)}
    style={{ flexShrink: 0, width: '120px', cursor: 'pointer', userSelect: 'none' }}
  >
    <div style={{ overflow: 'hidden', borderRadius: '6px' }}>
      <img
        src={item.src}
        alt={item.title}
        draggable={false}
        style={{ width: '120px', height: '120px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
    <p style={{ margin: '7px 0 2px', fontWeight: 600, fontSize: '0.78rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
    <p style={{ margin: 0, fontSize: '0.7rem', color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.artist}</p>
  </div>
);

const CenterPanel = ({ onSelect }) => {
  const drag = useDrag();
  return (
    <div style={{
      flex: 1,
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollbarWidth: 'none',
      padding: '28px 32px',
      background: '#fff',
    }}>
      {SECTIONS.map((section, i) => (
        <div key={i} style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#111' }}>{section.title}</h2>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#bbb', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}
              onMouseEnter={e => e.currentTarget.style.color = '#111'}
              onMouseLeave={e => e.currentTarget.style.color = '#bbb'}
            >Show all</span>
          </div>
          <div
            onMouseDown={drag}
            style={{ display: 'flex', gap: '14px', overflowX: 'scroll', paddingBottom: '4px', cursor: 'grab', scrollbarWidth: 'none' }}
          >
            {section.items.map((item, j) => <SmallCard key={j} item={item} onSelect={onSelect} />)}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── RIGHT PANEL — Now Playing ───────────────────────────────────────────────
const RightPanel = ({ current }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(32);
  const [liked, setLiked] = useState(false);
  const intervalRef = useRef(null);

  const togglePlay = () => {
    setPlaying(p => {
      if (!p) {
        intervalRef.current = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) { clearInterval(intervalRef.current); return 100; }
            return prev + 0.3;
          });
        }, 100);
      } else {
        clearInterval(intervalRef.current);
      }
      return !p;
    });
  };

  const fmt = pct => {
    const total = 210;
    const secs  = Math.floor((pct / 100) * total);
    return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  };

  return (
    <div style={{
      width: '260px',
      flexShrink: 0,
      height: '100%',
      background: '#f7f7f7',
      borderLeft: '1px solid #e5e5e5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
      gap: '20px',
    }}>
      {current ? (
        <>
          {/* Album Art */}
          <img
            src={current.src}
            alt={current.title}
            style={{
              width: '180px', height: '180px', objectFit: 'cover',
              borderRadius: '10px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              transform: playing ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
          />

          {/* Title + Like */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{current.title}</p>
              <p style={{ margin: '3px 0 0', fontSize: '0.78rem', color: '#999' }}>{current.artist}</p>
            </div>
            <div onClick={() => setLiked(l => !l)} style={{ cursor: 'pointer', fontSize: '1.2rem', flexShrink: 0, marginLeft: '10px' }}>
              {liked ? '❤️' : '🤍'}
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%' }}>
            <div
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}
              style={{ width: '100%', height: '4px', background: '#ddd', borderRadius: '2px', cursor: 'pointer', position: 'relative' }}
            >
              <div style={{ width: `${progress}%`, height: '100%', background: '#111', borderRadius: '2px', transition: 'width 0.1s linear' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '0.68rem', color: '#aaa' }}>{fmt(progress)}</span>
              <span style={{ fontSize: '0.68rem', color: '#aaa' }}>3:30</span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button onClick={() => setProgress(0)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#aaa' }}>⏮</button>
            <button
              onClick={togglePlay}
              style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: '#111', border: 'none', cursor: 'pointer',
                fontSize: '1.1rem', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {playing ? '⏸' : '▶'}
            </button>
            <button onClick={() => setProgress(0)} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#aaa' }}>⏭</button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: '#ccc' }}>
          <p style={{ fontSize: '2rem', margin: '0 0 10px' }}>🎵</p>
          <p style={{ fontSize: '0.82rem', fontWeight: 500 }}>Pick a song to play</p>
        </div>
      )}
    </div>
  );
};

// ─── HOME ────────────────────────────────────────────────────────────────────
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
    <RightPanel  current={current} />
  </div>
);

export default Home;