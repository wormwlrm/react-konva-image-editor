import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Stage, Layer, Rect
} from 'react-konva';
import { InitialSetting } from '@types';

import { Toolbar } from './Toolbar';

import {
  WindowSize, useResizer, useShapes, useDraggable, useHistory
} from '@/hooks';
import { TransformableCircle, TransformableRect } from '@/components';
import { HistoryContext } from '@/context';

export const Editor = ({
  width = window.innerWidth,
  height = 500,
}: InitialSetting = {}) => {
  const size: WindowSize = useResizer({
    width, height,
  });

  const {
    history, historyIndex, undo, redo, canRedo, canUndo, saveHistory,
  } = useHistory();

  const {
    shapes, circles, rectangles, updateShape, addShape,
  } = useShapes({ saveHistory, history, historyIndex });

  const {
    selected, onDragStart, onDragEnd, unselect, setSelected, isSelected,
  } = useDraggable({
    updateShape,
  });

  return (
    <HistoryContext.Provider value={{
      history,
      index: historyIndex,
      redo: () => {
        redo();
      },
      undo: () => {
        undo();
      },
    }}
    >
      <div className="react-konva-image-editor">
        <Toolbar
          addShape={addShape}
          setSelected={setSelected}
          canRedo={canRedo()}
          canUndo={canUndo()}
        />

        <Stage
          width={size.width}
          height={size.height}
          onMouseDown={unselect}
          onTouchStart={unselect}
        >
          <Layer>
            {circles.map((shape) => (
              <TransformableCircle
                key={shape.id}
                {...shape}
                radiusX={shape.radiusX}
                radiusY={shape.radiusY}
                isSelected={selected === shape.id}
                onSelect={() => setSelected(shape.id)}
                onDragStart={() => onDragStart(shape)}
                onDragEnd={(e) => onDragEnd(e)}
                onClick={() => setSelected(shape.id)}
                onTransform={(updated) => updateShape({
                  ...updated,
                  id: shape.id,
                })}
              />
            ))}
            {rectangles.map((shape) => (
              <TransformableRect
                key={shape.id}
                {...shape}
                isSelected={selected === shape.id}
                onSelect={() => setSelected(shape.id)}
                onDragStart={() => onDragStart(shape)}
                onDragEnd={(e) => onDragEnd(e)}
                onClick={() => setSelected(shape.id)}
                onTransform={(updated) => updateShape({
                  ...updated,
                  id: shape.id,
                })}
              />
            ))}
          </Layer>
          <Layer name="top-layer" />
        </Stage>

      </div>
    </HistoryContext.Provider>

  );
};
