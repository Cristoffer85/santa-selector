import React from 'react';

const ModeButtons: React.FC<{ mode: string; switchToSimpleMode: () => void; switchToDetailedMode: () => void }> = ({ mode, switchToSimpleMode, switchToDetailedMode }) => (
  <div className="mode-buttons">
    <button onClick={switchToDetailedMode} className={mode === 'Tournament' ? 'active' : ''}>
      TOURNAMENT MODE
    </button>
    <button onClick={switchToSimpleMode} className={mode === 'Simple' ? 'active' : ''}>
      SIMPLE MODE
    </button>
  </div>
);

export default ModeButtons;