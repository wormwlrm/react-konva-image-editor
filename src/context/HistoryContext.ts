import { ShapesHistory } from '@types';
import { createContext } from 'react';

interface IHistoryContext {
  history: ShapesHistory[];
  index: number | null;
  redo: () => void;
  undo: () => void;
}

const HistoryContext = createContext<IHistoryContext>({
  history: [],
  index: null,
  redo: () => {},
  undo: () => {},
});

export { HistoryContext };
