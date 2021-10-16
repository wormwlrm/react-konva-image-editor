import { CircleConfig } from 'konva/lib/shapes/Circle';
import { useState } from 'react';

import { useIdCounter } from './useIdCounter';
import { useSelectedId } from './useSelectedId';

export function useCircles() {
  const [circles, setCircles] = useState<CircleConfig[]>([]);

  const { selectedId, setSelectedId, isSelected } = useSelectedId();
  const { generateId } = useIdCounter();

  const addCircle = () => {
    setCircles([
      ...circles,
      {
        y: Math.random() * 100,
        x: Math.random() * 100,
        radius: 50,
        fill: '#637EF7',
        type: 'circle',
        id: generateId(),
        draggable: true,
        scale: { x: isSelected ? 1.5 : 1, y: isSelected ? 1.5 : 1 },
      },
    ]);
  };

  const updateCircle = (id: string, config: CircleConfig) => {
    setCircles(
      circles.map((circle) => {
        if (circle.id === id) {
          return { ...circle, ...config };
        }
        return circle;
      })
    );
  };

  return { circles, updateCircle, addCircle };
}
