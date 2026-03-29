const LINK = { fontSize: 13, fontWeight: 700, color: '#000', textDecoration: 'none' };

const Navbar = () => (
  <nav style={{
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 36px', background: '#fff',
  }}>
    <div style={{ display: 'flex', gap: 36 }}>
      {['Frenzy Global', 'Frenzy Paris', 'Frenzy Films'].map(l => (
        <a key={l} href="#" style={LINK}>{l}</a>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 36 }}>
      {['Creatives', 'Archives', 'About'].map(l => (
        <a key={l} href="#" style={LINK}>{l}</a>
      ))}
    </div>
  </nav>
);

export default Navbar;