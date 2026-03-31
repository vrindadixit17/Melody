import { useRef } from 'react';
import Navbar from './components/Navbar';
import SphereRing from './components/SphereRing';
import Home from './components/Home';

const App = () => {
  const containerRef = useRef(null);

  // Mouse wheel → horizontal scroll
  const onWheel = e => {
    e.preventDefault();
    containerRef.current.scrollLeft += e.deltaY;
  };

  // Drag → horizontal scroll
  const onMouseDown = e => {
    const el = containerRef.current;
    el.style.cursor = 'grabbing';
    const startX     = e.pageX - el.offsetLeft;
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
      ref={containerRef}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '100vh',
        overflowX: 'scroll',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        cursor: 'grab',
      }}
    >
      {/* Panel 1 — Ring Hero */}
      <div style={{
        flexShrink: 0,
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}>
        <Navbar />   
        <SphereRing />
      </div>

      {/* Panel 2 — Home Screen */}
      <div style={{
        flexShrink: 0,
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',        // vertical scroll inside home panel
        scrollbarWidth: 'none',
      }}>
        <Home />
      </div>
    </div>
  );
};

export default App;