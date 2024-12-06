import React from 'react';
import WheelSpin from '../Spin/WheelSpin';
import WheelAddSegment from '../AddSegment/WheelAddSegment';
import ContenderList from '../../ContenderList/ContenderList';
import WinnerSelection from '../WinnerSelection/WinnerSelection';
import { Definitions } from '../../../Types/Types';

interface WheelContainerProps {
  segments: Definitions[];
  handleSpinStart: () => boolean;
  handleSpinEnd: (winner: Definitions) => void;
  showSpinButton: boolean;
  showForm: boolean;
  mode: string;
  stage: string;
  winnersLeftToSelect: boolean;
  hideWinners: boolean;
  quarterfinalWinners: string[];
  semifinalWinners: string[];
  handleWinnerSelection: (winner: string) => void;
  selectedWinners: string[];
  setSegments: (segments: Definitions[]) => void;
  showNextRoundButton: boolean;
  handleNewRound: () => void;
  finalComplete: boolean;
}

const WheelContainer: React.FC<WheelContainerProps> = ({
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
}) => {
  const buttonText = mode === 'Simple' ? 'New Round?' : 'Next Round';

  return (
    <div className="wheel-and-form">
    <WheelSpin
      segments={segments}
      onSpinStart={handleSpinStart}
      onSpinEnd={handleSpinEnd}
      showSpinButton={showSpinButton}
    />
    {showForm && <WheelAddSegment segments={segments} setSegments={setSegments} />}
    <ContenderList segments={segments} />
    {mode === 'Tournament' && stage !== 'Quarterfinal' && winnersLeftToSelect && !hideWinners && (
      <WinnerSelection
        stage={stage}
        quarterfinalWinners={quarterfinalWinners}
        semifinalWinners={semifinalWinners}
        handleWinnerSelection={handleWinnerSelection}
        selectedWinners={selectedWinners}
      />
    )}
    {showNextRoundButton && !winnersLeftToSelect && !finalComplete && (
      <button onClick={handleNewRound} className="new-round-button">
        {buttonText}
      </button>
    )}
    {finalComplete && (
      <button onClick={handleNewRound} className="new-round-button">
        {buttonText}
      </button>
    )}
  </div>
);
};

export default WheelContainer;