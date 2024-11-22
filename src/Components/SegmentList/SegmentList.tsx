import React, { useEffect, useState } from 'react';
import './SegmentList.css'; 

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
        const timer = setTimeout(() => setFlashingSegment(null), 2000); 
        return () => clearTimeout(timer);
      }
    }
  }, [flashingColor, segments]);

  return (
    <div className="segment-list">
      <h2>List of Contenders</h2>
      <ul>
        {segments.map((segment, index) => (
          <li
            key={index}
            style={{
              backgroundColor: segment.color,
              animation: flashingSegment === segment.name ? 'flashColor 1s infinite' : 'none',
            }}
          >
            {segment.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SegmentList;
