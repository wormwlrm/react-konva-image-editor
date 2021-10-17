import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Stage, Layer, Rect
} from 'react-konva';
import { InitialSetting } from '@types';

import { Toolbar } from './Toolbar';

import {
  WindowSize, useResizer, useShapes, useSelectable, useDraggable
} from '@/hooks';
import { TransformableCircle } from '@/components';

export const Editor = ({
  width = window.innerWidth,
  height = 500,
}: InitialSetting = {}) => {
  const size: WindowSize = useResizer({
    width, height,
  });

  const {
    circles, rectangles, updateShape, addShape,
  } = useShapes();

  const {
    selected, setSelected, isSelected, unselect,
  } = useSelectable();

  const { onDragStart, onDragEnd, isFocused } = useDraggable({
    selected,

    setSelected,
    unselect,
    updateShape,
  });

  return (
    <div className="react-konva-image-editor">
      <Toolbar />
      <button
        type="button"
        onClick={() => {
          const shape = addShape({
            type: 'circle',
          });
          setSelected(shape.id);
        }}
      >
        Add Circle
      </button>
      <button
        type="button"
        onClick={() => {
          const shape = addShape({
            type: 'rect',
          });
          setSelected(shape.id);
        }}
      >
        Add Rect
      </button>
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
              isFocused={isFocused(shape.id)}
              isSelected={isSelected(shape.id)}
              onSelect={() => setSelected(shape.id)}
              onDragStart={() => onDragStart(shape)}
              onDragEnd={(e) => onDragEnd(e)}
              onChange={(e) => updateShape({
                ...e,
                id: shape.id,
              })}
            />
          ))}
          {rectangles.map((shape) => (
            <Rect
              key={shape.id}
              {...shape}
              onDragStart={() => onDragStart(shape)}
              onDragEnd={(e) => onDragEnd(e)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
