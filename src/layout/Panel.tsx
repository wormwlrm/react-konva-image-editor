import React from 'react';
import { Slider } from '@mui/material';

import { useFilter, useShapesContext } from '@/hooks';

export const Panel = ({
  canvasSize,
  setCanvasSize,
}: {
  canvasSize: { width: number; height: number };
  setCanvasSize: (size: { width: number; height: number }) => void;
}) => {
  const { selected } = useShapesContext();

  const { getShapeById, updateShape } = useShapesContext();

  const selectedShape = getShapeById(selected);

  const { applyFilter, previewFilter } = useFilter({ selected, updateShape });

  const filterNumber = (value) =>
    parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;

  return (
    <div>
      {selectedShape ? (
        <>
          <label htmlFor="shadowBlur">
            Shadow Blur
            <Slider
              name="shadowBlur"
              value={selectedShape.shadowBlur}
              min={0}
              max={100}
              step={1}
              onMouseUp={applyFilter({ type: 'shadowBlur' })}
              onChange={previewFilter({ type: 'shadowBlur' })}
            />
          </label>
          {selectedShape.type !== 'text' && (
            <label htmlFor="brightness">
              brightness
              <input
                type="range"
                name="brightness"
                min="-1"
                max="1"
                step="0.01"
                value={selectedShape.brightness}
                onMouseUp={applyFilter({ type: 'brightness' })}
                onChange={previewFilter({ type: 'brightness' })}
              />
            </label>
          )}

        </>
      ) : (
        <>
          <label htmlFor="canvasWidth">
            canvas width
            <input
              type="number"
              min="10"
              name="canvasWidth"
              value={canvasSize.width}
              onChange={(e) => {
                const width = filterNumber(e.target.value);
                setCanvasSize({
                  ...canvasSize,
                  width,
                });
              }}
            />
          </label>
          <label htmlFor="canvasHeight">
            canvas height
            <input
              type="number"
              name="canvasHeight"
              min="10"
              value={canvasSize.height}
              onChange={(e) => {
                const height = filterNumber(e.target.value);
                setCanvasSize({
                  ...canvasSize,
                  height,
                });
              }}
            />
          </label>
        </>
      )}
    </div>
  );
};
