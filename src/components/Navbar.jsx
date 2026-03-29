const LINK = {
  fontSize: 13,
  fontWeight: 600,
  color: '#000',
  textDecoration: 'none',
  letterSpacing: '0.02em',
};

const Navbar = () => (
  <nav style={{
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 36px', background: '#fff',
  }}>
    <div style={{ display: 'flex', gap: 36 }}>
      {['Discover', 'Charts', 'Artists'].map(l => (
        <a key={l} href="#" style={LINK}>{l}</a>
      ))}
    </div>
    <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em' }}>
      melody
    </div>
    <div style={{ display: 'flex', gap: 36 }}>
      {['Library', 'Premium', 'Sign in'].map(l => (
        <a key={l} href="#" style={LINK}>{l}</a>
      ))}
    </div>
  </nav>
);

export default Navbar;