import Konva from 'konva';
import React, { useContext } from 'react';

import { HistoryContext } from '@/context';
import { ShapesContext } from '@/context/ShapesContext';

export const Toolbar = () => {
  const {
    redo, undo, canRedo, canUndo,
  } = useContext(HistoryContext);

  const {
    mode,
    addShape, setSelected,
    unselect, unfocus, zoomIn, zoomOut,
    canZoomIn, canZoomOut,
    // setModeToPen, setModeToEraser,
    setWillDrawing,
  } = useContext(ShapesContext);

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
        onClick={() => handleAdd('text')}
      >
        Add Text
      </button>
      <button
        type="button"
        disabled={!canUndo}
        onClick={() => {
          unselect();
          unfocus();
          undo();
        }}
      >
        Undo
      </button>
      <button
        type="button"
        disabled={!canRedo}
        onClick={() => {
          unselect();
          unfocus();
          redo();
        }}
      >
        Redo
      </button>
      <button
        type="button"
        onClick={() => {
          unselect();
          unfocus();
          setWillDrawing(true);
        }}
      >
        Drawing Tool (Mode:
        {` ${mode}`}
        )
      </button>
      {/* <button
        type="button"
        onClick={() => {
          if (mode === 'pen') {
            setModeToEraser();
          } else {
            setModeToPen();
          }
        }}
      >
        Toggle Mode
      </button> */}
      <button
        type="button"
        disabled={!canZoomIn}
        onClick={() => {
          zoomIn();
        }}
      >
        zoom in
      </button>
      <button
        type="button"
        disabled={!canZoomOut}
        onClick={() => {
          zoomOut();
        }}
      >
        zoom out
      </button>
    </div>
  );
};
