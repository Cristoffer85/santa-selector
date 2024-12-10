import React, { useState } from 'react';
import './WheelAddSegment.css';
import { Definitions } from '../../../Types/Types';
import { getRandomColor } from '../../../Utils/RandomColor';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface WheelAddSegmentProps {
  segments: Definitions[];
  setSegments: (segments: Definitions[]) => void;
  quarterfinalWinners: string[];
  semifinalWinners: string[];
}

const WheelAddSegment: React.FC<WheelAddSegmentProps> = ({ segments, setSegments, quarterfinalWinners, semifinalWinners }) => {
  const [inputValue, setInputValue] = useState<string>('');
  
      // Uses separate list to check for duplicate values, checks against quarterfinal and semifinal winners
  const [allSegments, setAllSegments] = useState<Definitions[]>([]);

  const handleAddSegment = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {

      // Check if the value is already present in the segments array
      const isDuplicate = allSegments.some(segment => segment.name.toLowerCase() === trimmedValue.toLowerCase()) ||
                          quarterfinalWinners.some(winner => winner.toLowerCase() === trimmedValue.toLowerCase()) ||
                          semifinalWinners.some(winner => winner.toLowerCase() === trimmedValue.toLowerCase());

      if (!isDuplicate) {
        const newSegment = { name: trimmedValue, color: getRandomColor() };
        setSegments([...segments, newSegment]);
        setAllSegments([...allSegments, newSegment]);
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
          placeholder="add .Claus here"
        />
        <button className="addcontender-button" onClick={handleAddSegment} title='Add Santa Contender!'>Add Santa Contender!</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WheelAddSegment;