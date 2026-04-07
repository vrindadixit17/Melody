import SphereRing from './SphereRing';

const Hero = ({ onEnter }) => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    background: '#fff',
  }}>
    {/* Navbar */}
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      height: '60px',
      flexShrink: 0,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', gap: '32px' }}>
        {['Discover', 'Charts', 'Artists'].map(item => (
          <span key={item} style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>{item}</span>
        ))}
      </div>
      <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>melody</span>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {['Library', 'Premium'].map(item => (
          <span key={item} style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>{item}</span>
        ))}
        {/* Enter button */}
        <button
          onClick={onEnter}
          style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: '#242424',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '8px 20px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            transition: 'background 0.2s ease, transform 0.15s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#444';
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#242424';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Sign in →
        </button>
      </div>
    </nav>

    {/* Ring */}
    <div style={{ flex: 1, position: 'relative' }}>
      <SphereRing />
    </div>
  </div>
);

export default Hero;