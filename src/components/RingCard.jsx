const RingCard = ({ card, rotateY, onMouseEnter, onMouseLeave }) => {
  const wPx = window.innerWidth * (card.w / 100);
  const hPx = window.innerHeight * (card.h / 100);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        width: wPx,
        height: hPx,
        left: -wPx / 2,
        top: -hPx / 2,
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
};

export default RingCard;