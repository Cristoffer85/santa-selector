import initialState from './States/UseInitialState';
import { useAppHandlers } from './Hooks/UseAppHandlers/UseAppHandlers';

import Header from './Components/Header/Header';
import ModeButtons from './Components/Modes/ModeButtons';
import ResultsList from './Components/ResultsList/ResultsList';
import WheelContainer from './Components/Wheel/Container/WheelContainer';

import { ToastContainer } from 'react-toastify';
import { HiTrophy, HiOutlineTrophy } from 'react-icons/hi2';
import claussleigh from './assets/claussleigh.gif';
import sleighbells from './assets/sleighbells.wav';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const {
    handleSpinStart,
    handleSpinEnd,
    handleWinnerSelection,
    switchToSimpleMode,
    switchToDetailedMode,
    toggleMenu,
    segments,
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
    setSegments,
    winnersLeftToSelect,
    handleNewRound,
  } = useAppHandlers(initialState);

  const wheelContainerProps = {
    segments,
    handleSpinStart,
    handleSpinEnd,
    showSpinButton,
    showForm,
    mode,
    stage,
    winnersLeftToSelect,
    hideWinners,
    quarterfinalWinners,
    semifinalWinners,
    handleWinnerSelection,
    selectedWinners,
    setSegments,
    showNextRoundButton,
    handleNewRound,
    finalComplete,
  };

  return (
    <div className="app-container">
      {mode === 'Tournament' && <ResultsList results={results} />}
      <div className="app">
        <Header winnerName={winnerName} showSpinButton={showSpinButton} finalComplete={finalComplete} />
        <div className={`main-content ${finalComplete ? 'final-stage' : ''}`}>
          <div className={`left-column ${menuOpen ? 'hidden' : ''}`}>
            <ModeButtons mode={mode} switchToSimpleMode={switchToSimpleMode} switchToDetailedMode={switchToDetailedMode} />
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <HiOutlineTrophy /> : <HiTrophy />}
          </div>
          {!finalComplete && <WheelContainer {...wheelContainerProps} />}
          {finalComplete && (
            <div className="final-stage">
              <img src={claussleigh} alt="Final Winner" onLoad={() => {
                const sleighbellsAudio = new Audio(sleighbells);
                sleighbellsAudio.play();
              }} />
              <button onClick={handleNewRound} className="new-round-button">
                New Round?
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;