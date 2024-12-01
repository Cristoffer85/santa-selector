import React, { useEffect, useState } from 'react';
import './ContenderList.css'; 
import { Definitions } from '../../Types/Types';

interface ContenderListProps {
  segments: Definitions[];
  flashingColor: string | null;
}

const ContenderList: React.FC<ContenderListProps> = ({ segments, flashingColor }) => {
  const [flashingSegment, setFlashingSegment] = useState<string | null>(null);

  useEffect(() => {
    if (flashingColor) {
      const winnerSegment = segments.find((segment) => segment.color === flashingColor);
      if (winnerSegment) {
        setFlashingSegment(winnerSegment.name);
        const timer = setTimeout(() => setFlashingSegment(null), 3000); 
        return () => clearTimeout(timer);
      }
    }
  }, [flashingColor, segments]);

  return (
    <div className="segment-list">
      <ul>
        {segments.map((segment, index) => (
          <li
            key={index}
            className={flashingSegment === segment.name ? 'flashing' : ''}
            style={{ backgroundColor: segment.color }}
          >
            {segment.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContenderList;