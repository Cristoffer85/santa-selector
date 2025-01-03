import React from 'react';
import mrClaus from '../../assets/mrclaus.png';
import mrsClaus from '../../assets/msclaus.png';

const Header: React.FC<{ winnerName: string | null; showSpinButton: boolean; finalComplete: boolean }> = ({ winnerName, showSpinButton, finalComplete }) => (
  <div className="header-container">
    <img src={mrClaus} alt="Mr. Claus" className="tilting-image" />
    {!winnerName && showSpinButton && <h1>Welcome to the Santa selector!</h1>}
    {winnerName && !finalComplete && <h1>Winner is {winnerName}!</h1>}
    {winnerName && finalComplete && <h1>Final Santa is {winnerName}!</h1>}
    <img src={mrsClaus} alt="Mrs. Claus" className="tilting-image" />
  </div>
);

export default Header;