import React, { useState, useRef } from 'react';

type WheelProps = {
  segments: string[];
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
        setSelectedSegment(segments[selectedIndex]);
      }, 4000); // Sync with animation time
    }
  };

  return (
    <div className="wheel-container">
      {/* Arrow */}
      <div className="arrow"></div>

      {/* Wheel */}
      <div className="wheel" ref={wheelRef}>
        {segments.map((segment, index) => (
          <div
            key={index}
            className="segment"
            style={{
              transform: `rotate(${(index * 360) / segments.length}deg)`,
              backgroundColor: index % 2 === 0 ? '#f3a' : '#3af',
            }}
          >
            {segment}
          </div>
        ))}
      </div>

      <button onClick={spinWheel}>Spin the Wheel</button>
      {selectedSegment && <p>Winner: {selectedSegment}</p>}

      <style jsx>{`
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
        }
        .segment {
          width: 50%;
          height: 50%;
          position: absolute;
          top: 0;
          left: 50%;
          transform-origin: 0% 100%;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-weight: bold;
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
      `}</style>
    </div>
  );
};

export default Wheel;
