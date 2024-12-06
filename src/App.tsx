import { ToastContainer } from 'react-toastify';
import { HiTrophy, HiOutlineTrophy } from 'react-icons/hi2';
import Header from './Components/Header/Header';
import ModeButtons from './Components/ModeButtons/ModeButtons';
import ResultsList from './Components/ResultsList/ResultsList';
import WheelContainer from './Components/Wheel/Container/WheelContainer';
import claussleigh from './assets/claussleigh.gif';
import { useAppHandlers } from './Hooks/UseAppHandlers/UseAppHandlers';
import initialState from './States/UseInitialState';

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
    flashingColor,
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
    setFlashingColor,
    setSegments,
    winnersLeftToSelect,
    handleNewRound,
  } = useAppHandlers(initialState);

  const wheelContainerProps = {
    segments,
    setFlashingColor,
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
    flashingColor,
    showNextRoundButton, 
    handleNewRound,
    finalComplete,
  };

  return (
    <div className="app-container">
      {mode === 'Tournament' && <ResultsList results={results} />}
      <div className="app">
        <Header winnerName={winnerName} stage={stage} showSpinButton={showSpinButton} />
        <div className={`main-content ${finalComplete ? 'final-stage' : ''}`}>
          <div className={`left-column ${menuOpen ? 'hidden' : ''}`}>
            <ModeButtons mode={mode} switchToSimpleMode={switchToSimpleMode} switchToDetailedMode={switchToDetailedMode} />
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <HiTrophy /> : <HiOutlineTrophy />}
          </div>
          {!finalComplete && <WheelContainer {...wheelContainerProps} />}
          {finalComplete && (
            <div className="final-stage">
              <img src={claussleigh} alt="Final Winner" />
              <button onClick={handleNewRound} className="new-round-button">
                Next Round
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