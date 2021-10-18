import React, { createContext, ReactNode } from 'react';
import { ShapesHistory } from '@types';

import { useHistory } from '@/hooks';

interface IHistoryContext {
  history: ShapesHistory[];
  index: number | null;
  canRedo: boolean;
  canUndo: boolean;
  redo: () => void;
  undo: () => void;
  saveHistory: (state) => void;
}

const HistoryContext = createContext<IHistoryContext>({
  history: [],
  index: 0,
  canRedo: false,
  canUndo: false,
  redo: () => {},
  undo: () => {},
  saveHistory: (_state: ShapesHistory) => {},
});

const HistoryProvider = ({ children }: {children: ReactNode}) => {
  const {
    history, historyIndex, redo, undo, saveHistory, canRedo, canUndo,
  } = useHistory();

  const initialState: IHistoryContext = {
    history,
    index: historyIndex,
    canRedo,
    canUndo,
    redo,
    undo,
    saveHistory,
  };

  return (
    <HistoryContext.Provider value={initialState}>
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryContext, HistoryProvider };
