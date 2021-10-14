
import React from 'react';
import ReactDOM from 'react-dom';

import { Stage, Layer, Rect, Text, Circle, Line, useStrictMode } from 'react-konva';


const KonvaImageEditor = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={50} height={50} fill="red" />
        <Rect x={100} y={20} width={50} height={50} fill="green" />
        <Circle x={200} y={200} stroke="black" radius={50} />
      </Layer>
    </Stage>
  );
};      

export default KonvaImageEditor