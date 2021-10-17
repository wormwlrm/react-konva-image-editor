import Konva from 'konva';
import { useMemo, useState } from 'react';

import { useIdCounter } from './useIdCounter';

export function useShapes() {
  const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);
  const { generateId } = useIdCounter();

  const updateShape = <T extends Konva.ShapeConfig>(
    config: T & { id: string }
  ) => {
    const updated = shapes.map((shape) => {
      if (shape.id === config.id) {
        return {
          ...shape,
          ...config,
        };
      }
      return shape;
    });

    console.log(updated);
    setShapes(updated);
  };

  const addShape = <T extends Konva.ShapeConfig>(shape: T) => {
    let created: Konva.ShapeConfig = {
      id: generateId(),
      draggable: true,
    };

    switch (shape.type) {
      case 'ellipse':
        created = {
          ...created,
          y: Math.random() * 100,
          x: Math.random() * 100,
          rotation: 0,
          radiusX: 50,
          radiusY: 50,
          fill: '#637EF7',
          type: 'ellipse',
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
    () => shapes.filter((shape) => shape.type === 'ellipse'),
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
