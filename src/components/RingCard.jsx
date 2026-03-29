const RingCard = ({ card, rotateY, onMouseEnter, onMouseLeave }) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{
      position: 'absolute',
      width: card.s,
      height: card.s,
      left: -card.s / 2,
      top: -card.s / 2,
      cursor: 'pointer',
      lineHeight: 0,
      transformStyle: 'preserve-3d',
      transform: `rotateY(${rotateY}deg) translateZ(40vw)`,
    }}
  >
    <img
      src={card.src}
      loading="lazy"
      alt=""
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
    />
  </div>
);

export default RingCard;