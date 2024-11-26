import React, { useState, useEffect } from 'react';
import Wheel from './Components/Wheel/Wheel';
import Segments, { Segment, getRandomColor } from './Components/Contenders/Contenders';
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
  const [simpleResults, setSimpleResults] = useState<string[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [mode, setMode] = useState<'simple' | 'detailed'>('simple');
  const [stage, setStage] = useState<'Quarterfinal' | 'Semifinal' | 'Final'>('Quarterfinal'); // New state for tournament stage
  const [quarterfinalWinners, setQuarterfinalWinners] = useState<string[]>([]);
  const [semifinalWinners, setSemifinalWinners] = useState<string[]>([]);
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]); // New state for selected winners
  const [quarterfinalCount, setQuarterfinalCount] = useState(0); // Count for quarterfinals
  const [semifinalCount, setSemifinalCount] = useState(0); // Count for semifinals

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

    if (mode === 'detailed') {
      if (stage === 'Quarterfinal') {
        setQuarterfinalWinners((prevWinners) => [...prevWinners, winner.name]);
        setResults((prevResults) => [...prevResults, `Quarter Final ${quarterfinalCount + 1}: ${winner.name}`]);
        setQuarterfinalCount(quarterfinalCount + 1);
        if (quarterfinalWinners.length + 1 === 4) {
          setStage('Semifinal');
          setSegments([]);
          setShowForm(false);
        }
      } else if (stage === 'Semifinal') {
        setSemifinalWinners((prevWinners) => [...prevWinners, winner.name]);
        setResults((prevResults) => [...prevResults, `Semi Final ${semifinalCount + 1}: ${winner.name}`]);
        setSemifinalCount(semifinalCount + 1);
        if (semifinalWinners.length + 1 === 2) {
          setStage('Final');
          setSegments([]);
          setShowForm(false);
        }
      } else if (stage === 'Final') {
        setResults((prevResults) => [...prevResults, `Final: ${winner.name}`]);
        setStage('Quarterfinal'); // Reset to Quarterfinal after Final
        setQuarterfinalWinners([]);
        setSemifinalWinners([]);
        setSegments([]);
        setShowForm(true);
        setQuarterfinalCount(0); // Reset counts
        setSemifinalCount(0); // Reset counts
      }
    } else {
      setSimpleResults((prevResults) => [...prevResults, winner.name]);
    }
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

  const handleWinnerSelection = (winner: string) => {
    setSelectedWinners((prevSelected) => {
      const newSelected = prevSelected.includes(winner)
        ? prevSelected.filter((w) => w !== winner)
        : prevSelected.length < 2
        ? [...prevSelected, winner]
        : prevSelected;

      if (newSelected.length <= 2) {
        setSegments(newSelected.map((name) => ({ name, color: getRandomColor() })));
      }

      if (newSelected.length === 2) {
        handleStartNextStage(newSelected);
      }

      return newSelected;
    });
  };

  const handleStartNextStage = (winners: string[]) => {
    setSegments(winners.map((name) => ({ name, color: getRandomColor() }))); // Assign a random color
    setSelectedWinners([]);
    setShowSpinButton(true);

    if (stage === 'Semifinal') {
      setQuarterfinalWinners((prevWinners) => prevWinners.filter((winner) => !winners.includes(winner)));
    } else if (stage === 'Final') {
      setSemifinalWinners((prevWinners) => prevWinners.filter((winner) => !winners.includes(winner)));
    }
  };

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
              <button 
                onClick={switchToDetailedMode} 
                className={mode === 'detailed' ? 'active' : ''}
              >
                TOURNAMENT MODE
              </button>
              <button 
                onClick={switchToSimpleMode} 
                className={mode === 'simple' ? 'active' : ''}
              >
                SIMPLE MODE
              </button>
            </div>
          </div>
          <div className="wheel-and-form">
            <Wheel segments={segments} setFlashingColor={setFlashingColor} onSpinStart={handleSpinStart} onSpinEnd={handleSpinEnd} showSpinButton={showSpinButton} />
            {showForm && mode === 'simple' && <Segments segments={segments} setSegments={setSegments} />}
            {showForm && mode === 'detailed' && stage === 'Quarterfinal' && <Segments segments={segments} setSegments={setSegments} />}
            <SegmentList segments={segments} flashingColor={flashingColor} />
            {mode === 'detailed' && stage !== 'Quarterfinal' && (
              <div className="winner-selection">
                <h3>Select Winners for {stage}</h3>
                <ul>
                  {(stage === 'Semifinal' ? quarterfinalWinners : semifinalWinners).map((winner, index) => (
                    <li key={index}>
                      <button onClick={() => handleWinnerSelection(winner)} className={selectedWinners.includes(winner) ? 'selected' : ''}>
                        {winner}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {showNewRoundButton && stage === 'Quarterfinal' && <button className="new-round-button" onClick={handleNewRound}>New Round?</button>}
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;