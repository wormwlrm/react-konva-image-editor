import React from 'react';
import { InitialSetting } from '@types';

import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';

import { HistoryProvider } from '@/context';
import { useDraggable, useShapes } from '@/hooks';
import { ShapesProvider } from '@/context/ShapesContext';

export const Editor = ({
  width = window.innerWidth,
  height = 500,
}: InitialSetting = {}) => (

  <div className="react-konva-image-editor">
    <HistoryProvider>
      <ShapesProvider>
        <Toolbar />
        <Canvas width={width} height={height} />
      </ShapesProvider>
    </HistoryProvider>
  </div>
);
