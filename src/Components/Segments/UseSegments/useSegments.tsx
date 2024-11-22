import { useState } from 'react';

interface Segment {
  name: string;
  color: string;
}

const useSegments = () => {
  const [segments, setSegments] = useState<Segment[]>([]);

  const addSegment = (name: string) => {
    if (name.trim()) {
      const newSegment = { name: name.trim(), color: getRandomColor() };
      setSegments((prevSegments) => [...prevSegments, newSegment]);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return { segments, addSegment };
};

export default useSegments;
