import { ShapeConfig } from 'konva/lib/Shape';
import { useMemo, useState } from 'react';

import { useIdCounter } from './useIdCounter';

export function useShapes() {
  const [shapes, setShapes] = useState<ShapeConfig[]>([]);
  const { generateId } = useIdCounter();

  const updateShape = <T extends ShapeConfig>(config: T & { id: string }) => {
    const updated = shapes.map((shape) => {
      if (shape.id === config.id) {
        return {
          ...shape,
          ...config,
        };
      }
      return shape;
    });

    setShapes(updated);
  };

  const addShape = <T extends ShapeConfig>(shape: T) => {
    let created: ShapeConfig = {
      id: generateId(),
      draggable: true,
    };
    switch (shape.type) {
      case 'circle':
        created = {
          ...created,
          y: Math.random() * 100,
          x: Math.random() * 100,
          radius: 50,
          fill: '#637EF7',
          type: 'circle',
          id: generateId(),
          draggable: true,
          ...shape,
        };
        break;

      case 'rect':
        created = {
          ...created,
          y: Math.random() * 100,
          x: Math.random() * 100,
          width: 50,
          height: 50,
          fill: '#637EF7',
          type: 'rectangle',
        };
        break;
      default:
        break;
    }

    setShapes(shapes.concat(created));

    return created;
  };

  const circles = useMemo(
    () => shapes.filter((shape) => shape.type === 'circle'),
    [shapes]
  );

  const rectangles = useMemo(
    () => shapes.filter((shape) => shape.type === 'rectangle'),
    [shapes]
  );

  return {
    shapes,
    circles,
    rectangles,

    setShapes,
    updateShape,
    addShape,
  };
}
