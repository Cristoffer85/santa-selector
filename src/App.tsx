import React, { useState } from 'react';
import Wheel from './Components/Wheel/Wheel';
import Segments, { Segment } from './Components/Contenders/Contenders';
import SegmentList from './Components/ContenderList/ContenderList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [flashingColor, setFlashingColor] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [showNewRoundButton, setShowNewRoundButton] = useState(false);
  const [showSpinButton, setShowSpinButton] = useState(true);
  const [winnerName, setWinnerName] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [showArrow, setShowArrow] = useState(false);

  const handleSpinStart = () => {
    setShowForm(false);
    setShowNewRoundButton(false);
    setShowSpinButton(false);
    setWinnerName(null);
    setShowArrow(true); // Show the arrow when the spin starts
  };

  const handleSpinEnd = (winner: Segment) => {
    setFlashingColor(winner.color);
    setSegments([winner]); // Keep only the winner in the segments list
    setShowNewRoundButton(true);
    setWinnerName(winner.name);
    setResults((prevResults) => [...prevResults, winner.name]); // Save the winner of the round
  };

  const handleNewRound = () => {
    setFlashingColor(null);
    setShowForm(true);
    setShowNewRoundButton(false);
    setSegments([]);
    setShowSpinButton(true);
    setWinnerName(null);
    setShowArrow(false); // Hide the arrow when starting a new round
  };

  return (
    <div className="app">
      <h1>Welcome to the Santa selector!</h1>
      <div className="main-content">
        <div className="results-list">
          <h2>Previous Winners</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
        <Wheel segments={segments} setFlashingColor={setFlashingColor} onSpinStart={handleSpinStart} onSpinEnd={handleSpinEnd} showSpinButton={showSpinButton} winnerName={winnerName} showArrow={showArrow} />
      </div>
      {showForm && <Segments segments={segments} setSegments={setSegments} />}
      <SegmentList segments={segments} flashingColor={flashingColor} />
      {showNewRoundButton && <button className="new-round-button" onClick={handleNewRound}>New Round?</button>}
      <ToastContainer />
    </div>
  );
};

export default App;