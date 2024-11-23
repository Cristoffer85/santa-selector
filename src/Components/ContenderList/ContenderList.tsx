import React, { useEffect, useState } from 'react';
import './ContenderList.css'; 

interface Segment {
  name: string;
  color: string;
}

interface SegmentListProps {
  segments: Segment[];
  flashingColor: string | null;
}

const SegmentList: React.FC<SegmentListProps> = ({ segments, flashingColor }) => {
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

export default SegmentList;