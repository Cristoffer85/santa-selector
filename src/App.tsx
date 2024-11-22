import React, { useState } from 'react';
import Wheel from './Components/Wheel/Wheel';

const App: React.FC = () => {
  const [segments, setSegments] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // Add a new segment to the wheel
  const handleAddSegment = () => {
    if (inputValue.trim()) {
      setSegments([...segments, inputValue.trim()]);
      setInputValue(''); // Clear input after adding
    }
  };

  return (
    <div className="app">
      <h1>Wheel of Fortune</h1>

      {/* Input field to add new segments */}
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a segment"
        />
        <button onClick={handleAddSegment}>Add Segment</button>
      </div>

      {/* Display the wheel with the dynamic segments */}
      <Wheel segments={segments} />

      <style>{`
        .app {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        .input-container {
          display: flex;
          gap: 10px;
          margin: 20px 0;
        }
        input {
          padding: 8px;
          font-size: 16px;
          width: 200px;
        }
        button {
          padding: 8px 12px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default App;
