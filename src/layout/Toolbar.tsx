import Konva from 'konva';
import React, { useContext } from 'react';

import { HistoryContext } from '@/context';
import { ShapesContext } from '@/context/ShapesContext';
import { DropImage } from '@/components';
import { useFilter } from '@/hooks';

export const Toolbar = () => {
  const {
    redo, undo, canRedo, canUndo,
  } = useContext(HistoryContext);

  const {
    mode, selected,
    addShape, setSelected,
    unselect, unfocus, zoomIn, zoomOut,
    canZoomIn, canZoomOut,
    // setModeToPen, setModeToEraser,
    toForward, toBackward,
    setWillDrawing,
    getShapeById,
    updateShape,
  } = useContext(ShapesContext);

  const handleAddShape = (configs: {[key: string]: any}) => {
    const shape = addShape({ ...configs });
    setSelected(shape.id);
  };

  const selectedShape = getShapeById(selected);

  const { applyFilter, previewFilter } = useFilter({ selected, updateShape });

  return (
    <>
      <div>
        <h1>Toolbar</h1>
        <button
          type="button"
          onClick={() => handleAddShape({
            type: 'ellipse',
          })}
        >
          Add Circle
        </button>
        <button
          type="button"
          onClick={() => handleAddShape({
            type: 'rect',
          })}
        >
          Add Rect
        </button>
        <button
          type="button"
          onClick={() => handleAddShape({
            type: 'text',
          })}
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

        <button type="button">
          <DropImage
            onBase64ImageLoaded={(image) => {
              handleAddShape({
                type: 'image',
                image,
              });
            }}
          >
            Add Image
          </DropImage>
        </button>
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
        <button
          type="button"
          disabled={!selected}
          onClick={() => {
            toForward(selected);
          }}
        >
          to forward
        </button>
        <button
          type="button"
          disabled={!selected}
          onClick={() => {
            toBackward(selected);
          }}
        >
          to backward
        </button>
      </div>
      <div>
        {selectedShape
        && (
        <>
          <label htmlFor="shadowBlur">Shadow Blur</label>
          <input
            type="range"
            name="shadowBlur"
            value={selectedShape.shadowBlur}
            min="0"
            max="100"
            step="1"
            onMouseUp={applyFilter({ type: 'shadowBlur' })}
            onChange={previewFilter({ type: 'shadowBlur' })}
          />
          <label htmlFor="brightness">brightness</label>
          <input
            type="range"
            name="brightness"
            min="-1"
            max="1"
            step="0.01"
            value={selectedShape.brightness}
            onMouseUp={applyFilter({ type: 'brightness' })}
            onChange={previewFilter({ type: 'brightness' })}
          />
        </>
        )}
      </div>
    </>
  );
};
