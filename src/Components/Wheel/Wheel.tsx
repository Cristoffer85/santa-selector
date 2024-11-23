import React, { useRef } from 'react';
import './Wheel.css';
import arrowImage from '../../assets/wheelarrow.png';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

interface Segment {
  name: string;
  color: string;
}

interface WheelProps {
  segments: Segment[];
  setFlashingColor: React.Dispatch<React.SetStateAction<string | null>>;
  onSpinStart: () => void;
  onSpinEnd: (winner: Segment) => void;
  showSpinButton: boolean;
  winnerName: string | null;
}

const Wheel: React.FC<WheelProps> = ({ segments, setFlashingColor, onSpinStart, onSpinEnd, showSpinButton, winnerName }) => {
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
        onSpinEnd(winner); // Pass the winner to the onSpinEnd callback
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
      {winnerName && (
        <motion.div
          className="winner-sign"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Winner is {winnerName}!
        </motion.div>
      )}
      <img src={arrowImage} alt="Arrow" className="arrow" />
      <div
        className="wheel"
        ref={wheelRef}
        style={{ background: segments.length > 0 ? gradient : 'none' }}
      ></div>
      {showSpinButton && <button className="spin-button" onClick={spinWheel}>Spin!</button>}
    </div>
  );
};

export default Wheel;