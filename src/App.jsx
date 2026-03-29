import Navbar from './components/Navbar';
import SphereRing from './components/SphereRing';
import './App.css';

const labelStyle = {
  position: 'absolute', fontSize: 44, fontWeight: 900, color: '#000',
  letterSpacing: '-0.02em', zIndex: 200, pointerEvents: 'none',
  whiteSpace: 'nowrap', top: '50%', transform: 'translateY(-50%)',
};

const App = () => (
  <div style={{ width: '100%', background: '#fff', overflow: 'hidden', position: 'relative', height: '100vh', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
    <Navbar />
    <SphereRing />
    <div style={{ ...labelStyle, left: 28 }}>Frenzy</div>
    <div style={{ ...labelStyle, right: 28 }}>Image</div>
  </div>
);

export default App;