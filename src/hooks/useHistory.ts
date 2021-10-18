import { ShapesHistory } from '@types';
import { useMemo, useState } from 'react';

const useHistory = () => {
  const [history, setHistory] = useState<ShapesHistory[]>([[]]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const saveHistory = (state: ShapesHistory) => {
    console.log('SaveHistorySTart');

    setHistory([...history.slice(0, historyIndex + 1), state]);

    setHistoryIndex(historyIndex + 1);
  };

  const canUndo = useMemo(
    () => history.length > 0 && historyIndex > 0,
    [history, historyIndex]
  );

  const canRedo = useMemo(
    () => history.length > 0 && historyIndex < history.length - 1,
    [history, historyIndex]
  );

  const currentHistory = useMemo(
    () => history[historyIndex],
    [history, historyIndex]
  );

  const undo = () => {
    if (!canUndo) {
      return;
    }

    if (historyIndex === 0) {
      return;
    }

    setHistoryIndex(historyIndex - 1);
  };

  const redo = () => {
    if (!canRedo) {
      return;
    }
    if (historyIndex === history.length - 1) {
      return;
    }

    setHistoryIndex(historyIndex + 1);
  };

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
