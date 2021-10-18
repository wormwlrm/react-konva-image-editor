import React from 'react';
import { InitialSetting } from '@types';

import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';

import { HistoryProvider } from '@/context';
import { ShapesProvider } from '@/context/ShapesContext';
import { TextareaPortal } from '@/portals';

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
    <div id="react-konva-image-editor-textarea" />
  </div>
);
