import * as React from 'react';
import ReactDOM from 'react-dom';
import {
  Stage, Layer, Rect, Text, Circle, Line, useStrictMode,
} from 'react-konva';
import { InitialSetting } from '@types';

import { Toolbar } from '@/components';
import { WindowSize, useResizer } from '@/hooks';

const Editor = ({ width = 500, height = 500 }: InitialSetting = {}) => {
  const size: WindowSize = useResizer({
    width, height,
  });

  return (
    <div className="react-konva-image-editor">
      <Toolbar />
      <Stage width={size.width} height={size.height}>
        <Layer>
          <Rect width={50} height={50} fill="red" draggable />
          <Rect x={100} y={20} width={50} height={50} fill="green" draggable />
          <Circle x={200} y={200} stroke="black" radius={50} draggable />
        </Layer>
      </Stage>
    </div>
  );
};

export default Editor;
