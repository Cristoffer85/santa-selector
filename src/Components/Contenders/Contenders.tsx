import React, { useState } from 'react';
import './Contenders.css';

export interface Segment {
  name: string;
  color: string;
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Segments: React.FC<{ segments: Segment[], setSegments: (segments: Segment[]) => void }> = ({ segments, setSegments }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddSegment = () => {
    if (inputValue.trim()) {
      const newSegment = { name: inputValue.trim(), color: getRandomColor() };
      setSegments([...segments, newSegment]);
      setInputValue('');
    }
  };

  return (
    <div className="segments-container">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="add .Claus"
        />
        <button className="addcontender-button" onClick={handleAddSegment}>Add Contender!</button>
      </div>
    </div>
  );
};

export default Segments;