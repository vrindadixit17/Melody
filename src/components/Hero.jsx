import SphereRing from './SphereRing';

const Hero = () => (
  <div style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
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
    }}>
      <div style={{ display: 'flex', gap: '32px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>Discover</span>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>Charts</span>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>Artists</span>
      </div>

      <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>melody</span>

      <div style={{ display: 'flex', gap: '32px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>Library</span>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>Premium</span>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>Sign in</span>
      </div>
    </nav>

    {/* Ring */}
    <div style={{ flex: 1, position: 'relative' }}>
      <SphereRing />
    </div>
  </div>
);

export default Hero;