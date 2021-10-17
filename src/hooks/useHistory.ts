import { ShapesHistory } from '@types';
import { useState } from 'react';

const useHistory = () => {
  const [history, setHistory] = useState<ShapesHistory[]>([[]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const saveHistory = (state: ShapesHistory) => {
    console.log('SaveHistorySTart');

    setHistory([...history.slice(0, historyIndex + 1), state]);

    setHistoryIndex(historyIndex + 1);
  };

  const undo = () => {
    if (historyIndex === 0) {
      return;
    }

    setHistoryIndex(historyIndex - 1);
  };

  const redo = () => {
    if (historyIndex === history.length - 1) {
      return;
    }

    setHistoryIndex(historyIndex + 1);
  };

  const canUndo = () => history.length > 0 && historyIndex > 0;

  const canRedo = () => history.length > 0 && historyIndex < history.length - 1;

  const currentHistory = () => history[historyIndex];

  return {
    history,
    historyIndex,
    currentHistory,
    saveHistory,
    setHistoryIndex,
    setHistory,
    canUndo,
    canRedo,
    undo,
    redo,
  };
};

export { useHistory };
