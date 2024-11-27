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
import claussleigh from './assets/claussleigh.gif';
import { HiTrophy, HiOutlineTrophy } from 'react-icons/hi2';

const App: React.FC = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [flashingColor, setFlashingColor] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [showNewRoundButton, setShowNewRoundButton] = useState(false);
  const [showSpinButton, setShowSpinButton] = useState(true);
  const [winnerName, setWinnerName] = useState<string | null>(null);
  const [results, setResults] = useState<{ stage: string; name: string }[]>([]);
  const [simpleResults, setSimpleResults] = useState<string[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [mode, setMode] = useState<'simple' | 'detailed'>('simple');
  const [stage, setStage] = useState<'Quarterfinal' | 'Semifinal' | 'Final'>('Quarterfinal');
  const [quarterfinalWinners, setQuarterfinalWinners] = useState<string[]>([]);
  const [semifinalWinners, setSemifinalWinners] = useState<string[]>([]);
  const [selectedWinners, setSelectedWinners] = useState<string[]>([]);
  const [quarterfinalCount, setQuarterfinalCount] = useState(0);
  const [semifinalCount, setSemifinalCount] = useState(0);
  const [finalComplete, setFinalComplete] = useState(false);
  const [hideWinners, setHideWinners] = useState(false);
  const [showNextRoundButton, setShowNextRoundButton] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const audio = new Audio(hohohoSound);
    setAudio(audio);
  }, []);

  const handleSpinStart = () => {
    setShowForm(false);
    setShowNewRoundButton(false);
    setShowSpinButton(false);
    setWinnerName(null);
    setFlashingColor(null); // Reset flashing color at the start of a spin
  };

  const handleSpinEnd = (winner: Segment) => {
    if (audio) {
      audio.play();
    }

    setFlashingColor(winner.color);
    setSegments([winner]);
    setShowNewRoundButton(true);
    setWinnerName(winner.name);
    setHideWinners(false); // Show the winners list again after the spin has completed

    if (mode === 'detailed') {
      if (stage === 'Quarterfinal') {
        setQuarterfinalWinners((prevWinners) => [...prevWinners, winner.name]);
        setResults((prevResults) => [...prevResults, { stage: 'quarterfinal', name: `Quarter Final ${quarterfinalCount + 1}: ${winner.name}` }]);
        setQuarterfinalCount(quarterfinalCount + 1);
        if (quarterfinalWinners.length + 1 === 4) {
          setStage('Semifinal');
          setSegments([]);
          setShowForm(false);
          setFlashingColor(null); // Reset flashing color when transitioning to semifinals
        }
      } else if (stage === 'Semifinal') {
        setSemifinalWinners((prevWinners) => [...prevWinners, winner.name]);
        setResults((prevResults) => [...prevResults, { stage: 'semifinal', name: `Semi Final ${semifinalCount + 1}: ${winner.name}` }]);
        setSemifinalCount(semifinalCount + 1);
        if (semifinalWinners.length + 1 === 2) {
          setStage('Final');
          setSegments([]);
          setShowForm(false);
          setFlashingColor(null); // Reset flashing color when transitioning to finals
        }
      } else if (stage === 'Final') {
        setResults((prevResults) => [...prevResults, { stage: 'final', name: `Final: ${winner.name}` }]);
        setFinalComplete(true); // Set the flag for final completion
        setStage('Quarterfinal'); // Reset to Quarterfinal after Final
        setQuarterfinalWinners([]);
        setSemifinalWinners([]);
        setSegments([]);
        setShowForm(true);
        setQuarterfinalCount(0); // Reset counts
        setSemifinalCount(0); // Reset counts
        setFlashingColor(null); // Reset flashing color after final
      }
    } else {
      setSimpleResults((prevResults) => [...prevResults, winner.name]);
    }
    setShowNextRoundButton(true); // Show the next round button when a winner is announced
  };

  const handleNewRound = () => {
    setFlashingColor(null); // Reset flashing color when starting a new round
    setShowForm(true);
    setShowNewRoundButton(false);
    setSegments([]);
    setShowSpinButton(true);
    setWinnerName(null);
    if (finalComplete) {
      setResults([]); // Clear the result list only after the final stage
    }
    setFinalComplete(false); // Reset the final completion flag
    setHideWinners(false); // Show the remaining winners again
    setShowNextRoundButton(false); // Hide the next round button
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
        setHideWinners(true); // Hide the remaining winners
        setShowNextRoundButton(false); // Hide the next round button
      }

      // Remove the selected winner from the list of winners of the previous stage
      if (stage === 'Semifinal') {
        setQuarterfinalWinners((prevWinners) => prevWinners.filter((w) => w !== winner));
      } else if (stage === 'Final') {
        setSemifinalWinners((prevWinners) => prevWinners.filter((w) => w !== winner));
      }

      return newSelected;
    });
  };

  const handleStartNextStage = (winners: string[]) => {
    setSegments(winners.map((name) => ({ name, color: getRandomColor() }))); // Assign a random color
    setSelectedWinners([]);
    setShowSpinButton(true);
    setFlashingColor(null); // Reset flashing color when starting the next stage

    if (stage === 'Semifinal') {
      setQuarterfinalWinners((prevWinners) => prevWinners.filter((winner) => !winners.includes(winner)));
    } else if (stage === 'Final') {
      setSemifinalWinners((prevWinners) => prevWinners.filter((winner) => !winners.includes(winner)));
    }
  };

  const winnersLeftToSelect = (stage === 'Semifinal' ? quarterfinalWinners : semifinalWinners).length > 0;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (mode === 'simple') {
      switchToDetailedMode();
    } else {
      switchToSimpleMode();
    }
  };

  return (
    <div className="app-container">
      {mode === 'detailed' && (
        <div className="results-list-container">
          <div className="results-list">
            <h2>Santournament</h2>
            <ul>
              {results.map((result, index) => (
                <li key={index} className={result.stage}>{result.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="app">
        <div className="header-container">
          <img src={mrClaus} alt="Mr. Claus" className="tilting-image" />
          {!winnerName && showSpinButton && <h1>Welcome to the Santa selector!</h1>}
          {winnerName && stage !== 'Final' && <h1>Winner is {winnerName}!</h1>}
          {winnerName && stage === 'Final' && <h1> Winner is {winnerName}!</h1>}
          <img src={mrsClaus} alt="Mrs. Claus" className="tilting-image" />
        </div>
        <div className={`main-content ${finalComplete ? 'final-stage' : ''}`}>
          <div className={`left-column ${menuOpen ? 'hidden' : ''}`}>
            <div className="mode-buttons">
              <button 
                onClick={switchToDetailedMode} 
                className={mode === 'detailed' ? 'active' : ''}>
                TOURNAMENT MODE
              </button>
              <button 
                onClick={switchToSimpleMode} 
                className={mode === 'simple' ? 'active' : ''}>
                SIMPLE MODE
              </button>
            </div>
          </div>
          <div 
            className="menu-toggle" 
            onClick={toggleMenu} 
          >
            {menuOpen ? <HiTrophy /> : <HiOutlineTrophy />}
          </div>
          {!finalComplete && (
            <div className="wheel-and-form">
              <Wheel segments={segments} setFlashingColor={setFlashingColor} onSpinStart={handleSpinStart} onSpinEnd={handleSpinEnd} showSpinButton={showSpinButton} />
              {showForm && mode === 'simple' && <Segments segments={segments} setSegments={setSegments} />}
              {showForm && mode === 'detailed' && stage === 'Quarterfinal' && <Segments segments={segments} setSegments={setSegments} />}
              <SegmentList segments={segments} flashingColor={flashingColor} />
              {mode === 'detailed' && stage !== 'Quarterfinal' && winnersLeftToSelect && !hideWinners && (
                <div className="winner-selection">
                  <h3>Select Winners for {stage}</h3>
                  <ul>
                    {(stage === 'Semifinal' ? quarterfinalWinners : semifinalWinners).map((winner, index) => (
                      <li key={index}>
                        <button onClick={() => handleWinnerSelection(winner)} className={selectedWinners.includes(winner) ? 'selected' : ''} disabled={selectedWinners.length >= 2 && !selectedWinners.includes(winner)}>
                          {winner}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {finalComplete && (
            <div className="final-stage">
              <img src={claussleigh} alt="Final Winner" />
            </div>
          )}
        </div>
        {showNewRoundButton && showNextRoundButton && stage !== 'Final' && stage !== 'Semifinal' && (
          <button className="new-round-button" onClick={handleNewRound}>
            {finalComplete ? 'New Round?' : 'Next Round'}
          </button>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;