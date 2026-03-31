import { useState } from 'react';

const RingCard = ({ card, rotateY, radius, onMouseEnter, onMouseLeave }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => { setHovered(true); onMouseEnter(); }}
      onMouseLeave={() => { setHovered(false); onMouseLeave(); }}
      style={{
        position: 'absolute',
        width: card.s,
        height: card.s,
        left: -card.s / 2,
        top: -card.s / 2,
        cursor: 'pointer',
        lineHeight: 0,
        transformStyle: 'preserve-3d',
        transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
      }}
    >
      <img
        src={card.src}
        loading="lazy"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          borderRadius: 0,
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: hovered ? 999 : 'auto',
        }}
      />
    </div>
  );
};

export default RingCard;