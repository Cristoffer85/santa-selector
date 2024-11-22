import React, { useState, useRef } from 'react';

type WheelProps = {
  segments: { name: string, color: string }[];  // Change segments to include colors
};

const Wheel: React.FC<WheelProps> = ({ segments }) => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    const randomSpin = Math.floor(500 + Math.random() * 1000); // Spin angle
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${randomSpin}deg)`;

      // Determine winning segment
      setTimeout(() => {
        const winningAngle = randomSpin % 360;
        const selectedIndex = Math.floor(
          (segments.length - winningAngle / (360 / segments.length)) % segments.length
        );
        setSelectedSegment(segments[selectedIndex].name);
      }, 4000); // Sync with animation time
    }
  };

  // Generate conic gradient dynamically based on segments
  const gradient = `conic-gradient(${segments
    .map((segment, index) => {
      const angle = 360 / segments.length;
      const startAngle = angle * index;
      const endAngle = angle * (index + 1);
      return `${segment.color} ${startAngle}deg ${endAngle}deg`;
    })
    .join(', ')})`;

  return (
    <div className="wheel-container">
      {/* Arrow */}
      <div className="arrow"></div>

      {/* Wheel */}
      <div className="wheel" ref={wheelRef} style={{ background: gradient }}>
        {/* Render the segment names evenly spaced around the wheel */}
        {segments.map((segment, index) => {
          const angle = (360 / segments.length) * index;
          const labelAngle = angle + (360 / segments.length) / 2; // Center the text in the segment
          const offset = 120; // Radius offset for text placement

          // Calculate x and y positions for each segment's text
          const x = offset * Math.cos((labelAngle * Math.PI) / 180); // X position based on angle
          const y = offset * Math.sin((labelAngle * Math.PI) / 180); // Y position based on angle

          return (
            <div
              key={segment.name}
              className="segment-name"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                transformOrigin: 'center',
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                pointerEvents: 'none',
                width: '60px',  // Adjust to fit your text size
              }}
            >
              {segment.name}
            </div>
          );
        })}
      </div>

      <button onClick={spinWheel}>Spin the Wheel</button>
      {selectedSegment && <p>Winner: {selectedSegment}</p>}

      <style>{`
        .wheel-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .wheel {
          width: 300px;
          height: 300px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          border: 5px solid #333;
          transition: transform 4s ease-out;
        }
        .arrow {
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 20px solid red;
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
        }
        .segment-name {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: center;
          font-size: 14px;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Wheel;
