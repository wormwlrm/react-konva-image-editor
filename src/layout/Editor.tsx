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
      }}
    >
      <HistoryProvider>
        <ShapesProvider>
          <Toolbar />
          <div
            style={{
              width: `${size.width}px`,
              height: `${size.height}px`,
              lineHeight: `${size.height}px`,
              overflow: 'auto',
              textAlign: 'center',
              boxSizing: 'border-box',
              boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 18px -6px inset',
              backgroundColor: '#ffffff',
              backgroundImage: 'repeating-linear-gradient(45deg, #E3E3E3 25%, transparent 25%, transparent 75%, #E3E3E3 75%, #E3E3E3), repeating-linear-gradient(45deg, #E3E3E3 25%, #ffffff 25%, #ffffff 75%, #E3E3E3 75%, #E3E3E3)',
              backgroundPosition: '0 0, 9px 9px',
              backgroundSize: '18px 18px',
            }}
          >
            <Canvas width={size.width} height={size.height} />
          </div>
        </ShapesProvider>
      </HistoryProvider>
    </div>
  );
};
