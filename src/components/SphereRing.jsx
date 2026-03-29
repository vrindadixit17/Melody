import { useEffect, useRef, useState } from 'react';
import RingCard from './RingCard';

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

const CARDS = [
  { s:130, src: img1  },  // was 160
  { s:60,  src: img2  },  // was 75
  { s:105, src: img3  },  // was 130
  { s:48,  src: img4  },  // was 60
  { s:88,  src: img5  },  // was 110
  { s:68,  src: img6  },  // was 85
  { s:118, src: img7  },  // was 145
  { s:52,  src: img8  },  // was 65
  { s:96,  src: img9  },  // was 120
  { s:44,  src: img10 },  // was 55
  { s:80,  src: img11 },  // was 100
  { s:125, src: img12 },  // was 155
  { s:56,  src: img13 },  // was 70
  { s:92,  src: img14 },  // was 115
  { s:64,  src: img15 },  // was 80
  { s:112, src: img16 },  // was 140
  { s:48,  src: img17 },  // was 60
  { s:76,  src: img18 },  // was 95
  { s:100, src: img19 },  // was 125
  { s:56,  src: img20 },  // was 70
  { s:120, src: img21 },  // was 150
  { s:52,  src: img22 },  // was 65
  { s:88,  src: img23 },  // was 110
  { s:68,  src: img24 },  // was 85
  { s:108, src: img25 },  // was 135
  { s:60,  src: img26 },  // was 75
  { s:96,  src: img27 },  // was 120
  { s:44,  src: img28 },  // was 55
  { s:80,  src: img29 },  // was 100
  { s:116, src: img30 },  // was 145
  { s:56,  src: img31 },  // was 70
  { s:92,  src: img32 },  // was 115
];

const GAP_PX = 0; 

const SphereRing = () => {
  const rotationRef = useRef(0);
  const pausedRef   = useRef(false);
  const rafRef      = useRef(null);
  const [rotation, setRotation] = useState(0);

  // Radius is now DERIVED from card sizes + gap, not hardcoded
  // This means changing GAP_PX naturally expands/contracts the ring
  const circumference = CARDS.reduce((sum, card) => sum + card.s + GAP_PX, 0);
  const RADIUS_PX = circumference / (2 * Math.PI);

  const baseAngles = CARDS.reduce((acc, card, i) => {
    if (i === 0) { acc.push(0); return acc; }
    const prev   = CARDS[i - 1];
    const arcPx  = (prev.s / 2) + GAP_PX + (card.s / 2);
    const arcDeg = (arcPx / RADIUS_PX) * (180 / Math.PI);
    acc.push(acc[i - 1] + arcDeg);
    return acc;
  }, []);

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
      perspectiveOrigin: '50% 20%',
    }}>
      <div style={{
        position: 'absolute',
        top: '38%',
        left: '50%',
        width: 0, height: 0,
        transformStyle: 'preserve-3d',
      }}>
        {CARDS.map((card, i) => (
          <RingCard
            key={i}
            card={card}
            rotateY={baseAngles[i] + rotation}
            onMouseEnter={() => { pausedRef.current = true;  }}
            onMouseLeave={() => { pausedRef.current = false; }}
          />
        ))}
      </div>
    </div>
  );
};

export default SphereRing;