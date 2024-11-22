import React, { useState } from 'react';
import './Segments.css';

interface SegmentsProps {
  addSegment: (name: string) => void;
}

const Segments: React.FC<SegmentsProps> = ({ addSegment }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddSegment = () => {
    addSegment(inputValue);
    setInputValue('');
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
        <button onClick={handleAddSegment}>Add Santa Contender!</button>
      </div>
    </div>
  );
};

export default Segments;
