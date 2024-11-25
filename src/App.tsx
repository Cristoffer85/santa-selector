import React, { useState, useEffect } from 'react';
import Wheel from './Components/Wheel/Wheel';
import Segments, { Segment } from './Components/Contenders/Contenders';
import SegmentList from './Components/ContenderList/ContenderList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import hohohoSound from './assets/hohoho.wav';
import mrClaus from './assets/mrclaus.png';
import mrsClaus from './assets/msclaus.png';

const App: React.FC = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [flashingColor, setFlashingColor] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [showNewRoundButton, setShowNewRoundButton] = useState(false);
  const [showSpinButton, setShowSpinButton] = useState(true);
  const [winnerName, setWinnerName] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [mode, setMode] = useState<'simple' | 'detailed'>('simple'); // New state for mode

  useEffect(() => {
    const audio = new Audio(hohohoSound);
    setAudio(audio);
  }, []);

  const handleSpinStart = () => {
    setShowForm(false);
    setShowNewRoundButton(false);
    setShowSpinButton(false);
    setWinnerName(null);
  };

  const handleSpinEnd = (winner: Segment) => {
    if (audio) {
      audio.play();
    }

    setFlashingColor(winner.color);
    setSegments([winner]);
    setShowNewRoundButton(true);
    setWinnerName(winner.name);
    setResults((prevResults) => [...prevResults, winner.name]);
  };

  const handleNewRound = () => {
    setFlashingColor(null);
    setShowForm(true);
    setShowNewRoundButton(false);
    setSegments([]);
    setShowSpinButton(true);
    setWinnerName(null);
  };

  const switchToSimpleMode = () => setMode('simple');
  const switchToDetailedMode = () => setMode('detailed');

  return (
    <div className="app-container">
      {mode === 'detailed' && (
        <div className="results-list-container">
          <div className="results-list">
            <h2>Previous Champions</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="app">
        <div className="header-container">
          <img src={mrClaus} alt="Mr. Claus" className="tilting-image" />
          {!winnerName && showSpinButton && <h1>Welcome to the Santa selector!</h1>}
          {winnerName && <h1>Winner is {winnerName}!</h1>}
          <img src={mrsClaus} alt="Mrs. Claus" className="tilting-image" />
        </div>
        <div className="main-content">
          <div className="left-column">
            <div className="mode-buttons">
            <button onClick={switchToDetailedMode}>TOURNAMENT MODE</button>
              <button onClick={switchToSimpleMode}>SIMPLE MODE</button>
            </div>
          </div>
          <div className="wheel-and-form">
            <Wheel segments={segments} setFlashingColor={setFlashingColor} onSpinStart={handleSpinStart} onSpinEnd={handleSpinEnd} showSpinButton={showSpinButton} />
            {showForm && <Segments segments={segments} setSegments={setSegments} />}
            <SegmentList segments={segments} flashingColor={flashingColor} />
          </div>
        </div>
        {showNewRoundButton && <button className="new-round-button" onClick={handleNewRound}>New Round?</button>}
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;