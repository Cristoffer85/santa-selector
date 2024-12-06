import React, { useState } from 'react';
import './WheelAddSegment.css';
import { Definitions } from '../../../Types/Types';
import { getRandomColor } from '../../../Utils/RandomColor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WheelAddSegment: React.FC<{ segments: Definitions[], setSegments: (segments: Definitions[]) => void }> = ({ segments, setSegments }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddSegment = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      if (!segments.some(segment => segment.name.toLowerCase() === trimmedValue.toLowerCase())) {
        const newSegment = { name: trimmedValue, color: getRandomColor() };
        setSegments([...segments, newSegment]);
        setInputValue('');
      } else {
        toast.error('Santa Contender value must be unique!');
      }
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
      <ToastContainer />
    </div>
  );
};

export default WheelAddSegment;