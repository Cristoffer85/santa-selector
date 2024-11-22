import React from 'react';
import Wheel from './Components/Wheel/Wheel';
import Segments from './Components/Segments/Segments';
import SegmentList from './Components/SegmentList/SegmentList';
import useSegments from './Components/Segments/UseSegments/useSegments';
import './App.css';

const App: React.FC = () => {
  const { segments, addSegment } = useSegments(); 
  const [flashingColor, setFlashingColor] = React.useState<string | null>(null);

  return (
    <div className="app">
      <h1>Welcome to the Santa selector!</h1>
      <Wheel segments={segments} setFlashingColor={setFlashingColor} /> 
      <Segments addSegment={addSegment} />
      <SegmentList segments={segments} flashingColor={flashingColor} />  
    </div>
  );
};

export default App;