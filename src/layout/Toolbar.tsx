import Konva from 'konva';
import React, { useContext } from 'react';

import { HistoryContext } from '@/context';

export const Toolbar = ({
  addShape,
  setSelected,
  canUndo,
  canRedo,
}: {
  addShape: ({ type }: { type: string }) => Konva.ShapeConfig;
  setSelected: (selected: string) => void;
  canUndo: boolean;
  canRedo: boolean;
}) => {
  const {
    redo, undo,
  } = useContext(HistoryContext);

  const handleAdd = (type: string) => {
    const shape = addShape({ type });
    setSelected(shape.id);
  };

  return (
    <div>
      <h1>Toolbar</h1>
      <button
        type="button"
        onClick={() => handleAdd('ellipse')}
      >
        Add Circle
      </button>
      <button
        type="button"
        onClick={() => handleAdd('rect')}
      >
        Add Rect
      </button>
      <button
        type="button"
        disabled={!canUndo}
        onClick={undo}
      >
        Undo
      </button>
      <button
        type="button"
        disabled={!canRedo}
        onClick={redo}
      >
        Redo
      </button>
    </div>
  );
};
