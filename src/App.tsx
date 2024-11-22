import React, { useState } from 'react';
import Wheel from './Components/Wheel/Wheel';

const App: React.FC = () => {
  const [segments, setSegments] = useState<{ name: string; color: string }[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [flashingIndex, setFlashingIndex] = useState<number | null>(null); // Track the winning segment

  // Add a new segment to the wheel
  const handleAddSegment = () => {
    if (inputValue.trim()) {
      setSegments([...segments, { name: inputValue.trim(), color: getRandomColor() }]);
      setInputValue(''); // Clear input after adding
    }
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Handle flashing after the winner is determined
  const handleWinner = (index: number) => {
    setFlashingIndex(index);
    setTimeout(() => {
      setFlashingIndex(null); // Stop flashing after a short time
    }, 1000); // Flashing duration
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
      <Wheel segments={segments} onWinner={handleWinner} flashingIndex={flashingIndex} />

      {/* List below the wheel */}
      <div className="segments-list">
        <h2>Segments</h2>
        <ul>
          {segments.map((segment, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                animation: flashingIndex === index ? 'flash 0.5s alternate infinite' : 'none',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: segment.color,
                  marginRight: '10px',
                  borderRadius: '50%',
                  animation: flashingIndex === index ? 'flash 0.5s alternate infinite' : 'none',
                }}
              ></div>
              <span>{segment.name}</span>
            </li>
          ))}
        </ul>
      </div>

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
        .segments-list {
          margin-top: 20px;
        }
        .segments-list ul {
          list-style: none;
          padding: 0;
        }
        .segments-list li {
          font-size: 16px;
          margin-bottom: 10px;
        }
        /* Flashing animation */
        @keyframes flash {
          0% {
            background-color: transparent;
          }
          50% {
            background-color: white; /* You can change this color to something else if you prefer */
          }
          100% {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
