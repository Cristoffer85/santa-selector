import { useAppHandlers } from './Hooks/UseAppHandlers/UseAppHandlers';
import initialState from './States/UseInitialState';

import WheelAddSegment from './Components/WheelAddSegment/WheelAddSegment';
import WheelSpin from './Components/WheelSpin/WheelSpin';
import ContenderList from './Components/ContenderList/ContenderList';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import mrClaus from './assets/mrclaus.png';
import mrsClaus from './assets/msclaus.png';
import claussleigh from './assets/claussleigh.gif';

import { HiTrophy, HiOutlineTrophy } from 'react-icons/hi2';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const {
    handleSpinStart,
    handleSpinEnd,
    handleNewRound,
    handleWinnerSelection,
    switchToSimpleMode,
    switchToDetailedMode,
    toggleMenu,
    flashingColor,
    segments,
    showNewRoundButton,
    winnerName,
    hideWinners,
    mode,
    stage,
    quarterfinalWinners,
    semifinalWinners,
    results,
    finalComplete,
    showNextRoundButton,
    showForm,
    showSpinButton,
    selectedWinners,
    menuOpen,
    setFlashingColor,
    setSegments,
    winnersLeftToSelect,
  } = useAppHandlers(initialState);

  return (
    <div className="app-container">
      {mode === 'Tournament' && (
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
                className={mode === 'Tournament' ? 'active' : ''}>
                TOURNAMENT MODE
              </button>
              <button 
                onClick={switchToSimpleMode} 
                className={mode === 'Simple' ? 'active' : ''}>
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
              <WheelSpin segments={segments} setFlashingColor={setFlashingColor} onSpinStart={handleSpinStart} onSpinEnd={handleSpinEnd} showSpinButton={showSpinButton} />
              {showForm && mode === 'Simple' && <WheelAddSegment segments={segments} setSegments={setSegments} />}
              {showForm && mode === 'Tournament' && stage === 'Quarterfinal' && <WheelAddSegment segments={segments} setSegments={setSegments} />}
              <ContenderList segments={segments} flashingColor={flashingColor} />
              {mode === 'Tournament' && stage !== 'Quarterfinal' && winnersLeftToSelect && !hideWinners && (
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