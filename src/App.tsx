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

  const handleSpinStart = () => {
    setShowForm(false);
    setShowNewRoundButton(false);
    setShowSpinButton(false);
    setWinnerName(null);
  };

  const handleSpinEnd = (winner: Segment) => {
    setFlashingColor(winner.color);
    setSegments([winner]); // Keep only the winner in the segments list
    setShowNewRoundButton(true);
    setWinnerName(winner.name);
  };

  const handleNewRound = () => {
    setFlashingColor(null);
    setShowForm(true);
    setShowNewRoundButton(false);
    setSegments([]);
    setShowSpinButton(true);
    setWinnerName(null);
  };

  return (
    <div className="app">
      <h1>Welcome to the Santa selector!</h1>
      <Wheel segments={segments} setFlashingColor={setFlashingColor} onSpinStart={handleSpinStart} onSpinEnd={handleSpinEnd} showSpinButton={showSpinButton} winnerName={winnerName} />
      {showForm && <Segments segments={segments} setSegments={setSegments} />}
      <SegmentList segments={segments} flashingColor={flashingColor} />
      {showNewRoundButton && <button className="new-round-button" onClick={handleNewRound}>New Round?</button>}
      <ToastContainer />
    </div>
  );
};

export default App;