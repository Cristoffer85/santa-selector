import React, { useState, useRef, useEffect } from 'react';
import './Wheel.css';

interface Segment {
  name: string;
  color: string;
}

interface WheelProps {
  segments: Segment[];
  setFlashingColor: React.Dispatch<React.SetStateAction<string | null>>;
}

const Wheel: React.FC<WheelProps> = ({ segments, setFlashingColor }) => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [flashingColor, setFlashingColorState] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    const baseSpin = Math.floor(500 + Math.random() * 2000);
    const additionalSpins = Math.floor(3 + Math.random() * 5) * 360; 
    const randomSpin = baseSpin + additionalSpins; 
  
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 4s ease-out';
      wheelRef.current.style.transform = `rotate(${randomSpin}deg)`; 
  
      setTimeout(() => {
        const winningAngle = randomSpin % 360;
        const selectedIndex = Math.floor(
          (segments.length - winningAngle / (360 / segments.length)) % segments.length
        );
        const winner = segments[selectedIndex];
        setSelectedSegment(winner.name);
        setFlashingColor(winner.color);
      }, 4000); 
    }
  };
  
  const gradient = `conic-gradient(${segments
    .map((segment, index) => {
      const angle = 360 / segments.length;
      const startAngle = angle * index;
      const endAngle = angle * (index + 1);
      return `${segment.color} ${startAngle}deg ${endAngle}deg`;
    })
    .join(', ')})`;

  useEffect(() => {
    if (flashingColor) {
      const timer = setTimeout(() => setFlashingColor(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [flashingColor]);

  return (
    <div className="wheel-container">
      <div className="arrow"></div>

      <div
        className={`wheel ${flashingColor ? 'flashing' : ''}`}
        ref={wheelRef}
        style={{ background: gradient }}
      ></div>

      <button onClick={spinWheel}>Spin the wheel!</button>
    </div>
  );
};

export default Wheel;
