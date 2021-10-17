import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Stage, Layer, Rect
} from 'react-konva';
import { InitialSetting } from '@types';

import { Toolbar } from './Toolbar';

import {
  WindowSize, useResizer, useShapes, useDraggable
} from '@/hooks';
import { TransformableCircle, TransformableRect } from '@/components';

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
    selected, onDragStart, onDragEnd, unselect, setSelected, isSelected,
  } = useDraggable({
    updateShape,
  });

  return (
    <div className="react-konva-image-editor">
      <Toolbar />
      <button
        type="button"
        onClick={() => {
          const shape = addShape({
            type: 'ellipse',
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
  );
};
