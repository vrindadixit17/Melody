import { useState } from 'react';
import Hero from './components/Hero';
import Home from './components/Home';
import BottomBar from './components/BottomBar';

const App = () => {
  const [page, setPage]       = useState('hero');
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {page === 'hero' && (
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Hero onEnter={() => setPage('home')} />
        </div>
      )}

      {page === 'home' && (
        <>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Home onSelect={setCurrent} current={current} onBack={() => setPage('hero')} />
          </div>
          <BottomBar current={current} playing={playing} setPlaying={setPlaying} />
        </>
      )}

    </div>
  );
};

export default App;