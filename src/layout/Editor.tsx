import React, { useRef } from 'react';
import { InitialSetting } from '@types';

import { Toolbar } from './Toolbar';
import { Canvas } from './Canvas';

import { HistoryProvider, ShapesProvider } from '@/context';
import { useResizer, WindowSize } from '@/hooks';

export const Editor = ({
  width = window.innerWidth,
  height = 500,
  responsive = false,
  aspectRatio = 1,
}: InitialSetting = {}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const size: WindowSize = useResizer({
    width,
    height,
    ref: wrapperRef,
    responsive,
    aspectRatio,
  });

  return (
    <div
      className="react-konva-image-editor"
      ref={wrapperRef}
      style={{
        width: responsive ? '100%' : size.width,
        height: responsive ? width * aspectRatio : size.height,
        backgroundColor: '#ebebeb',
      }}
    >
      <HistoryProvider>
        <ShapesProvider>
          <Toolbar />
          <div
            style={{
              width: `${size.width - 22}px`,
              height: `${size.height - 22}px`,
              lineHeight: `${size.height - 22}px`,
              overflow: 'auto',
              margin: '10px',
              border: '1px solid grey',
              backgroundColor: 'lightgrey',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            <Canvas width={size.width} height={size.height} />
          </div>
        </ShapesProvider>
      </HistoryProvider>
    </div>
  );
};
