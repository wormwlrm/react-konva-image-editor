import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer } from 'react-konva';

import { TransformableCircle, TransformableRect } from '@/components';
import {
  useResizer, WindowSize
} from '@/hooks';
import { ShapesContext } from '@/context';

const Canvas = ({
  width, height,
}: {
    width: WindowSize['width'];
    height: WindowSize['height'];
}) => {
  const size: WindowSize = useResizer({
    width, height,
  });

  const {
    setSelected,
    onDragStart,
    onDragEnd,
    updateShape,
    unselect,
    circles,
    rectangles,
    selected,
  } = useContext(ShapesContext);

  return (
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
            onClick={() => setSelected(shape.id)}
            onDragStart={(e) => onDragStart(e, shape)}
            onDragEnd={(e) => onDragEnd(e)}
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
            onDragStart={(e) => onDragStart(e, shape)}
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
  );
};

export { Canvas };
