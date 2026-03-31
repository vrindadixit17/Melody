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

const SECTIONS = [
  { title: 'Recently Played', items: ALL.slice(0, 12)  },
  { title: 'Picked for You',  items: ALL.slice(10, 22) },
  { title: 'New Releases',    items: ALL.slice(20, 32) },
];

const Card = ({ item }) => (
  <div style={{ flexShrink: 0, width: '148px', userSelect: 'none' }}>
    <div style={{ overflow: 'hidden', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <img
        src={item.src}
        alt={item.title}
        draggable={false}
        style={{
          width: '148px',
          height: '148px',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      fontSize: '0.83rem',
      margin: '9px 0 3px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: '#111',
    }}>{item.title}</p>
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.73rem',
      color: '#999',
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}>{item.artist}</p>
  </div>
);

const ScrollRow = ({ items }) => {
  const onMouseDown = e => {
    const el = e.currentTarget;
    el.style.cursor = 'grabbing';
    const startX    = e.pageX - el.offsetLeft;
    const scrollLeft = el.scrollLeft;
    const onMove = ev => {
      el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX);
    };
    const onUp = () => {
      el.style.cursor = 'grab';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'scroll',
        paddingBottom: '6px',
        cursor: 'grab',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {items.map((item, i) => <Card key={i} item={item} />)}
    </div>
  );
};

const Home = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{
      background: '#f7f7f7',
      minHeight: '100vh',
      padding: '52px 44px',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Greeting */}
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 800,
        color: '#111',
        margin: '0 0 48px',
        letterSpacing: '-0.02em',
      }}>
        {greeting}
      </h1>

      {/* Sections */}
      {SECTIONS.map((section, i) => (
        <div key={i} style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '18px',
          }}>
            <h2 style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#111',
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              {section.title}
            </h2>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#aaa',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#111'}
              onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
            >
              Show all
            </span>
          </div>
          <ScrollRow items={section.items} />

          {/* Divider between sections */}
          {i < SECTIONS.length - 1 && (
            <div style={{ height: '1px', background: '#ebebeb', margin: '48px 0 0' }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;