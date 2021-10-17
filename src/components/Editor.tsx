import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Stage, Layer, Circle, Rect
} from 'react-konva';
import { InitialSetting } from '@types';
import { ShapeConfig } from 'konva/lib/Shape';
import { KonvaEventObject } from 'konva/lib/Node';

import { Toolbar } from '@/components';
import {
  WindowSize, useResizer, useFocusable, useShapes
} from '@/hooks';

const Editor = ({
  width = window.innerWidth,
  height = 500,
}: InitialSetting = {}) => {
  const size: WindowSize = useResizer({
    width, height,
  });

  const {
    circles, rectangles, updateShape, addShape,
  } = useShapes();

  const { focused, setFocused } = useFocusable();

  const onDragStart = (shape: ShapeConfig) => {
    setFocused(shape.id);
  };

  const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    updateShape({
      id: focused,
      x: e.target.x(),
      y: e.target.y(),
    });
    setFocused(null);
  };

  return (
    <div className="react-konva-image-editor">
      <Toolbar />
      <button
        type="button"
        onClick={() => addShape({
          type: 'circle',
        })}
      >
        Add Circle
      </button>
      <button
        type="button"
        onClick={() => {
          addShape({
            type: 'rect',
          });
        }}
      >
        Add Rect
      </button>
      <Stage width={size.width} height={size.height}>
        <Layer>
          {circles.map((shape) => (
            <Circle
              key={shape.id}
              {...shape}
              onDragStart={() => onDragStart(shape)}
              onDragEnd={(e) => onDragEnd(e)}
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

export default Editor;
