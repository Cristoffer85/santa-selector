import React from 'react';

interface WinnerSelectionProps {
  stage: string;
  quarterfinalWinners: string[];
  semifinalWinners: string[];
  handleWinnerSelection: (winner: string) => void;
  selectedWinners: string[];
}

const WinnerSelection: React.FC<WinnerSelectionProps> = ({
  stage,
  quarterfinalWinners,
  semifinalWinners,
  handleWinnerSelection,
  selectedWinners,
}) => (
  <div className="winner-selection">
    <h3>Select Winners for {stage}</h3>
    <ul>
      {(stage === 'Semifinal' ? quarterfinalWinners : semifinalWinners).map((winner, index) => (
        <li key={index}>
          <button
            onClick={() => handleWinnerSelection(winner)}
            className={selectedWinners.includes(winner) ? 'selected' : ''}
            disabled={selectedWinners.length >= 2 && !selectedWinners.includes(winner)}
          >
            {winner}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default WinnerSelection;