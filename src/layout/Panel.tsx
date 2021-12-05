import React from 'react';

import { useFilter, useShapesContext } from '@/hooks';

export const Panel = () => {
  const { selected } = useShapesContext();

  const {
    getShapeById,
    updateShape,
  } = useShapesContext();

  const selectedShape = getShapeById(selected);

  const { applyFilter, previewFilter } = useFilter({ selected, updateShape });

  return (
    <div>
      {selectedShape
        && (
        <>
          <label htmlFor="shadowBlur">
            Shadow Blur
            <input
              type="range"
              name="shadowBlur"
              value={selectedShape.shadowBlur}
              min="0"
              max="100"
              step="1"
              onMouseUp={applyFilter({ type: 'shadowBlur' })}
              onChange={previewFilter({ type: 'shadowBlur' })}
            />
          </label>
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
        </>
        )}
    </div>
  );
};
