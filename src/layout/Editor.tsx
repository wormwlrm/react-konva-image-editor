import React from 'react';
import { InitialSetting } from '@types';

import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';

import { HistoryProvider, ShapesProvider } from '@/context';

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
