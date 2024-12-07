import { useState, useEffect } from 'react';
import { Definitions } from '../../Types/Types';
import { getRandomColor } from '../../Utils/RandomColor';
import hohohoSound from '../../assets/hohoho.wav';

import { toast } from 'react-toastify';

export const useAppHandlers = (initialState: any) => {
  const switchToSimpleMode = () => setMode('Simple');
  const switchToDetailedMode = () => setMode('Tournament');

  const [results, setResults] = useState<{ stage: string; name: string }[]>(initialState.results);
  const [simpleResults, setSimpleResults] = useState<string[]>(initialState.simpleResults);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(initialState.audio);
  const [mode, setMode] = useState<'Simple' | 'Tournament'>(initialState.mode);

  const [stage, setStage] = useState<'Quarterfinal' | 'Semifinal' | 'Final'>(initialState.stage);
  const [quarterfinalCount, setQuarterfinalCount] = useState(initialState.quarterfinalCount);
  const [quarterfinalWinners, setQuarterfinalWinners] = useState<string[]>(initialState.quarterfinalWinners);
  const [semifinalCount, setSemifinalCount] = useState(initialState.semifinalCount);
  const [semifinalWinners, setSemifinalWinners] = useState<string[]>(initialState.semifinalWinners);

  const [finalComplete, setFinalComplete] = useState(initialState.finalComplete);
  const [menuOpen, setMenuOpen] = useState(initialState.menuOpen);
  const [segments, setSegments] = useState<Definitions[]>(initialState.segments);
  const [showForm, setShowForm] = useState(initialState.showForm);

  const [showSpinButton, setShowSpinButton] = useState(initialState.showSpinButton);
  const [showNewRoundButton, setShowNewRoundButton] = useState(initialState.showNewRoundButton);
  const [showNextRoundButton, setShowNextRoundButton] = useState(initialState.showNextRoundButton);

  const [winnerName, setWinnerName] = useState<string | null>(initialState.winnerName);
  const [hideWinners, setHideWinners] = useState(initialState.hideWinners);
  const [selectedWinners, setSelectedWinners] = useState<string[]>(initialState.selectedWinners);
  const winnersLeftToSelect = (stage === 'Semifinal' ? quarterfinalWinners : semifinalWinners).length > 0;

  useEffect(() => {
    const audio = new Audio(hohohoSound);
    setAudio(audio);
  }, []);

  const handleSpinStart = () => {
    if (segments.length < 2) {
      toast.error('You need to add minimum 2 Santa contenders!');
      return false;
    }
  
    /*if (!segments.some(segment => segment.name === "Lina")) {
      toast.warn("Lina must be present to start Santa Selector.");
      return false;
    }*/

    setShowForm(false);
    setShowNewRoundButton(false);
    setShowSpinButton(false);
    setWinnerName(null);
    return true;
  };

  const handleSpinEnd = (winner: Definitions) => {
    if (audio) {
      audio.play();
    }
  
    setSegments([winner]);
    setShowNewRoundButton(true);
    setWinnerName(winner.name);
    setHideWinners(false);
  
    if (mode === 'Tournament') {
      if (stage === 'Quarterfinal') {
        setQuarterfinalWinners((prevWinners) => [...prevWinners, winner.name]);
        setResults((prevResults) => [...prevResults, { stage: 'quarterfinal', name: `Quarter Final ${quarterfinalCount + 1}: ${winner.name}` }]);
        setQuarterfinalCount(quarterfinalCount + 1);
        if (quarterfinalWinners.length + 1 === 4) {
          setStage('Semifinal');
          setShowForm(false);
          setHideWinners(false);
        }
      } else if (stage === 'Semifinal') {
        setSemifinalWinners((prevWinners) => [...prevWinners, winner.name]);
        setResults((prevResults) => [...prevResults, { stage: 'semifinal', name: `Semi Final ${semifinalCount + 1}: ${winner.name}` }]);
        setSemifinalCount(semifinalCount + 1);
        if (semifinalWinners.length + 1 === 2) {
          setStage('Final');
          setShowForm(false);
          setHideWinners(false);
        }
      } else if (stage === 'Final') {
        setResults((prevResults) => [...prevResults, { stage: 'final', name: `Final: ${winner.name}` }]);
        setFinalComplete(true); 
        setStage('Quarterfinal'); 
        setQuarterfinalWinners([]);
        setSemifinalWinners([]);
        setSegments([]);
        setShowForm(true);
        setQuarterfinalCount(0); 
        setSemifinalCount(0); 
        setHideWinners(false);
      }
    } else {
      setSimpleResults((prevResults) => [...prevResults, winner.name]);
    }
    setShowNextRoundButton(true); 
  };
  
  const handleNewRound = () => {
    setShowForm(true);
    setShowNewRoundButton(false);
    setSegments([]);
    setShowSpinButton(true);
    setWinnerName(null);
    if (finalComplete) {
      setResults([]); 
    }
    setFinalComplete(false); 
    setHideWinners(false); 
    setShowNextRoundButton(false); 
  };

  const handleWinnerSelection = (winner: string) => {
    setSelectedWinners((prevSelected) => {
      const newSelected = prevSelected.includes(winner)
        ? prevSelected.filter((w) => w !== winner)
        : prevSelected.length < 2
        ? [...prevSelected, winner]
        : prevSelected;
  
      if (newSelected.length <= 2) {
        setSegments(newSelected.map((name) => {
          const existingSegment = segments.find(segment => segment.name === name);
          return { name, color: existingSegment ? existingSegment.color : getRandomColor() };
        }));
      }
  
      if (newSelected.length === 2) {
        handleStartNextStage(newSelected);
        setShowNextRoundButton(false);
      }
  
      if (stage === 'Semifinal') {
        setQuarterfinalWinners((prevWinners) => prevWinners.filter((w) => w !== winner));
      } else if (stage === 'Final') {
        setSemifinalWinners((prevWinners) => prevWinners.filter((w) => w !== winner));
      }
  
      return newSelected;
    });
  };
  
  const handleStartNextStage = (winners: string[]) => {
    setSegments(winners.map((name) => {
      const existingSegment = segments.find(segment => segment.name === name);
      return { name, color: existingSegment ? existingSegment.color : getRandomColor() };
    }));
    setSelectedWinners([]);
    setShowSpinButton(true);
    setHideWinners(false);
  
    if (stage === 'Semifinal') {
      setQuarterfinalWinners((prevWinners) => prevWinners.filter((winner) => !winners.includes(winner)));
    } else if (stage === 'Final') {
      setSemifinalWinners((prevWinners) => prevWinners.filter((winner) => !winners.includes(winner)));
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (mode === 'Simple') {
      switchToDetailedMode();
    } else {
      switchToSimpleMode();
    }
  };

  return {
    handleSpinStart,
    handleSpinEnd,
    handleNewRound,
    handleWinnerSelection,
    handleStartNextStage,
    switchToSimpleMode,
    switchToDetailedMode,
    toggleMenu,
    segments,
    showNewRoundButton,
    winnerName,
    hideWinners,
    mode,
    stage,
    quarterfinalWinners,
    semifinalWinners,
    results,
    quarterfinalCount,
    semifinalCount,
    finalComplete,
    simpleResults,
    showNextRoundButton,
    showForm,
    showSpinButton,
    selectedWinners,
    menuOpen,
    setSegments,
    winnersLeftToSelect,
  };
};