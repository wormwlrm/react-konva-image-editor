import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Stage, Layer, Rect, Text, Circle, Line,
} from 'react-konva';
import { InitialSetting } from '@types';
import { ShapeConfig } from 'konva/lib/Shape';
import { KonvaEventObject } from 'konva/lib/Node';

import { Toolbar } from '@/components';
import {
  WindowSize, useResizer, useCircles, useSelectedId,
} from '@/hooks';

const Editor = ({ width = window.innerWidth, height = 500 }: InitialSetting = {}) => {
  const size: WindowSize = useResizer({
    width, height,
  });

  const { circles, addCircle, updateCircle } = useCircles();

  const { selectedId, setSelectedId } = useSelectedId();

  const onDragStart = (shape: ShapeConfig) => {
    setSelectedId(shape.id);
  };

  const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    updateCircle(selectedId, {
      x: e.target.x(),
      y: e.target.y(),
    });
    setSelectedId(null);
  };

  return (
    <div className="react-konva-image-editor">
      <Toolbar />
      <button type="button" onClick={addCircle}>Add Circle</button>
      <Stage width={size.width} height={size.height}>
        <Layer>
          {circles.map((circle) => (
            <Circle
              key={circle.id}
              {...circle}
              onDragStart={() => onDragStart(circle)}
              onDragEnd={(e) => onDragEnd(e)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Editor;
