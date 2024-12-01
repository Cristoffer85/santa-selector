import React, { useState } from 'react';
import './WheelAddSegment.css';
import { Definitions } from '../../Types/Types';
import { getRandomColor } from '../../Utils/RandomColor';

const WheelAddSegment: React.FC<{ segments: Definitions[], setSegments: (segments: Definitions[]) => void }> = ({ segments, setSegments }) => {
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
        <button className="addcontender-button" onClick={handleAddSegment} title='Add Santa Contender!'>- Contender!</button>
      </div>
    </div>
  );
};

export default WheelAddSegment;