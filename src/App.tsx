import React, { useState } from 'react';
import Wheel from './Components/Wheel/Wheel';
import Segments, { Segment } from './Components/Segments/Segments';
import SegmentList from './Components/SegmentList/SegmentList';
import './App.css';

const App: React.FC = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [flashingColor, setFlashingColor] = useState<string | null>(null);

  return (
    <div className="app">
      <h1>Welcome to the Santa selector!</h1>
      <Wheel segments={segments} setFlashingColor={setFlashingColor} /> 
      <Segments segments={segments} setSegments={setSegments} />
      <SegmentList segments={segments} flashingColor={flashingColor} />  
    </div>
  );
};

export default App;