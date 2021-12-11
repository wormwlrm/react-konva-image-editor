import React from 'react';
import { Input, Slider } from '@mui/material';

import { useFilter } from '@/hooks';
import { useShapesContext } from '@/context';

export const Panel = ({
  canvasSize,
  setCanvasSize,
}: {
  canvasSize: { width: number; height: number };
  setCanvasSize: (size: { width: number; height: number }) => void;
}) => {
  const minValue = 0;
  const maxValue = 5000;

  const { selected, getShapeById, updateShape } = useShapesContext();

  const selectedShape = getShapeById(selected);

  const { applyFilter, previewFilter } = useFilter({ selected, updateShape });

  const filterNumber = (value) => {
    let filtered = (parseInt(value.replace(/[^0-9]/g, ''), 10) || 0);
    filtered = Math.max(minValue, filtered);
    filtered = Math.min(maxValue, filtered);
    return filtered;
  };

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
              onChangeCommitted={(_e, value) => {
                applyFilter({ type: 'shadowBlur' })(value);
              }}
              onChange={(_e, value) => {
                previewFilter({ type: 'shadowBlur' })(value);
              }}
            />
          </label>
          {selectedShape.type === 'line' ? (
            <label htmlFor="stroke">
              color
              <Input
                fullWidth
                type="color"
                name="stroke"
                value={selectedShape.stroke}
                onBlur={(e) => {
                  applyFilter({ type: 'stroke' })(e.target.value);
                }}
                onChange={(e) => {
                  previewFilter({ type: 'stroke' })(e.target.value);
                }}
              />
            </label>
          ) : selectedShape.type !== 'image' && (
            <label htmlFor="fill">
              color
              <Input
                fullWidth
                type="color"
                name="fill"
                value={selectedShape.fill}
                onBlur={(e) => {
                  applyFilter({ type: 'fill' })(e.target.value);
                }}
                onChange={(e) => {
                  previewFilter({ type: 'fill' })(e.target.value);
                }}
              />
            </label>
          )}
          {selectedShape.filters.find((filter) => filter.name === 'Brightness')
            && (
            <label htmlFor="brightness">
              brightness
              <Slider
                name="brightness"
                value={selectedShape.brightness}
                min={-1}
                max={1}
                step={0.01}
                onChangeCommitted={(_e, value) => {
                  applyFilter({ type: 'brightness' })(value);
                }}
                onChange={(_e, value) => {
                  previewFilter({ type: 'brightness' })(value);
                }}
              />
            </label>
            )}
          {selectedShape.filters.find((filter) => filter.name === 'Contrast')
            && (
            <label htmlFor="contrast">
              contrast
              <Slider
                name="contrast"
                value={selectedShape.contrast}
                min={-100}
                max={100}
                step={1}
                onChangeCommitted={(_e, value) => {
                  applyFilter({ type: 'contrast' })(value);
                }}
                onChange={(_e, value) => {
                  previewFilter({ type: 'contrast' })(value);
                }}
              />
            </label>
            )}
          {selectedShape.filters.find((filter) => filter.name === 'Pixelate')
            && (
            <label htmlFor="pixelSize">
              pixelSize
              <Slider
                name="pixelSize"
                value={selectedShape.pixelSize}
                min={0}
                max={20}
                step={1}
                onChangeCommitted={(_e, value) => {
                  applyFilter({ type: 'pixelSize' })(value);
                }}
                onChange={(_e, value) => {
                  previewFilter({ type: 'pixelSize' })(value);
                }}
              />
            </label>
            )}
        </>
      ) : (
        <>
          <label htmlFor="canvasWidth">
            canvas width
            <Input
              fullWidth
              type="number"
              name="canvasWidth"
              inputProps={{
                min: minValue,
                max: maxValue,
              }}
              value={canvasSize.width}
              onChange={(e) => {
                setCanvasSize({
                  ...canvasSize,
                  width: filterNumber(e.target.value),
                });
              }}
            />
          </label>
          <label htmlFor="canvasHeight">
            canvas height
            <Input
              fullWidth
              type="number"
              inputProps={{
                min: minValue,
                max: maxValue,
              }}
              name="canvasHeight"
              value={canvasSize.height}
              onChange={(e) => {
                setCanvasSize({
                  ...canvasSize,
                  height: filterNumber(e.target.value),
                });
              }}
            />
          </label>
        </>
      )}
    </div>
  );
};
