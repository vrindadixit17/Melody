import { useEffect, useRef, useState } from 'react';
import RingCard from './RingCard';

// Drop your album covers into src/assets/images/ named 1.jpg–26.jpg
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

// s = size in px — all squares, different sizes
const CARDS = [
  { s:80,  src: img1  },
  { s:120, src: img2  },
  { s:95,  src: img3  },
  { s:145, src: img4  },
  { s:100, src: img5  },
  { s:70,  src: img6  },
  { s:130, src: img7  },
  { s:85,  src: img8  },
  { s:160, src: img9  },
  { s:105, src: img10 },
  { s:75,  src: img11 },
  { s:125, src: img12 },
  { s:90,  src: img13 },
  { s:140, src: img14 },
  { s:80,  src: img15 },
  { s:110, src: img16 },
  { s:65,  src: img17 },
  { s:135, src: img18 },
  { s:95,  src: img19 },
  { s:120, src: img20 },
  { s:150, src: img21 },
  { s:85,  src: img22 },
  { s:105, src: img23 },
  { s:70,  src: img24 },
  { s:125, src: img25 },
  { s:90,  src: img26 },
];

const STEP = 13.846;
const GAP_DEG = 1.0;

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
      perspectiveOrigin: '50% 38%',
    }}>
      <div style={{
        position: 'absolute',
        top: '48%', left: '50%',
        width: 0, height: 0,
        transformStyle: 'preserve-3d',
      }}>
        {CARDS.map((card, i) => (
          <RingCard
            key={i}
            card={card}
            rotateY={i * (STEP + GAP_DEG) + rotation}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          />
        ))}
      </div>
    </div>
  );
};

export default SphereRing;