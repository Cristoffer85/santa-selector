import { useState, useEffect } from 'react';
import { Segment } from '../../Types/Types';
import { getRandomColor } from '../../Utils/RandomColor';
import hohohoSound from '../../assets/hohoho.wav';

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
  const [flashingColor, setFlashingColor] = useState<string | null>(initialState.flashingColor);
  const [segments, setSegments] = useState<Segment[]>(initialState.segments);
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
    setShowForm(false);
    setShowNewRoundButton(false);
    setShowSpinButton(false);
    setWinnerName(null);
    setFlashingColor(null);
  };

  const handleSpinEnd = (winner: Segment) => {
    if (audio) {
      audio.play();
    }

    setFlashingColor(winner.color);
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
          setSegments([]);
          setShowForm(false);
          setFlashingColor(null); 
        }
      } else if (stage === 'Semifinal') {
        setSemifinalWinners((prevWinners) => [...prevWinners, winner.name]);
        setResults((prevResults) => [...prevResults, { stage: 'semifinal', name: `Semi Final ${semifinalCount + 1}: ${winner.name}` }]);
        setSemifinalCount(semifinalCount + 1);
        if (semifinalWinners.length + 1 === 2) {
          setStage('Final');
          setSegments([]);
          setShowForm(false);
          setFlashingColor(null); 
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
        setFlashingColor(null); 
      }
    } else {
      setSimpleResults((prevResults) => [...prevResults, winner.name]);
    }
    setShowNextRoundButton(true); 
  };

  const handleNewRound = () => {
    setFlashingColor(null); 
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
        setSegments(newSelected.map((name) => ({ name, color: getRandomColor() })));
      }

      if (newSelected.length === 2) {
        handleStartNextStage(newSelected);
        setHideWinners(true);
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
    setSegments(winners.map((name) => ({ name, color: getRandomColor() }))); 
    setSelectedWinners([]);
    setShowSpinButton(true);
    setFlashingColor(null); 

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
    quarterfinalCount,
    semifinalCount,
    finalComplete,
    simpleResults,
    showNextRoundButton,
    showForm,
    showSpinButton,
    selectedWinners,
    menuOpen,
    setFlashingColor,
    setSegments,
    winnersLeftToSelect,
  };
};