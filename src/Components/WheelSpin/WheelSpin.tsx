import React, { useRef } from 'react';
import './WheelSpin.css';
import arrowImage from '../../assets/wheelarrow.png';
import { toast } from 'react-toastify';
import { Definitions } from '../../Types/Types';

interface WheelProps {
  segments: Definitions[];
  setFlashingColor: React.Dispatch<React.SetStateAction<string | null>>;
  onSpinStart: () => void;
  onSpinEnd: (winner: Definitions) => void;
  showSpinButton: boolean;
}

const Wheel: React.FC<WheelProps> = ({ segments, setFlashingColor, onSpinStart, onSpinEnd, showSpinButton }) => {
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (segments.length < 2) {
      toast.error('You need to add minimum 2 Santa contenders!');
      return;
    }

    onSpinStart();

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
        onSpinEnd(winner);
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

  return (
    <div className="wheel-container">
      <img src={arrowImage} alt="Arrow" className="arrow" />
      <div
        className="wheel"
        ref={wheelRef}
        style={{ background: segments.length > 0 ? gradient : 'none' }}
      ></div>
      <div className="spin-button-container">
        {showSpinButton ? (
          <button className="spin-button" onClick={spinWheel}>Spin!</button>
        ) : (
          <div style={{ width: '150px' }}></div>
        )}
      </div>
    </div>
  );
};

export default Wheel;