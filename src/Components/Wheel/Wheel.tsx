import React, { useRef, useEffect } from 'react';
import './Wheel.css';
import arrowImage from '../../assets/wheelarrow.png';

interface Segment {
  name: string;
  color: string;
}

interface WheelProps {
  segments: Segment[];
  setFlashingColor: React.Dispatch<React.SetStateAction<string | null>>;
}

const Wheel: React.FC<WheelProps> = ({ segments, setFlashingColor }) => {
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
    if (setFlashingColor) {
      const timer = setTimeout(() => setFlashingColor(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [setFlashingColor]);

  return (
    <div className="wheel-container">
      <img src={arrowImage} alt="Arrow" className="arrow" />
      <div
        className="wheel"
        ref={wheelRef}
        style={{ background: gradient }}
      ></div>
      <button className="spin-button" onClick={spinWheel}>Spin!</button>
    </div>
  );
};

export default Wheel;