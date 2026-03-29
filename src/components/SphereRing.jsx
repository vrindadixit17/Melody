import { useEffect, useRef, useState } from 'react';
import RingCard from './RingCard';
import { CARDS } from '../data/cards';

const STEP = 13.846;

const SphereRing = () => {
  const rotationRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        rotationRef.current += 0.15;
        setRotation(rotationRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      perspective: '800px',
      perspectiveOrigin: '50% 50%',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 0, height: 0,
        transformStyle: 'preserve-3d',
      }}>
        {CARDS.map((card, i) => (
          <RingCard
            key={i}
            card={card}
            rotateY={i * STEP + rotation}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          />
        ))}
      </div>
    </div>
  );
};

export default SphereRing;