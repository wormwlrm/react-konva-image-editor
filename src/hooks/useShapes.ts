import Konva from 'konva';
import React, {
  useContext, useEffect, useMemo, useState
} from 'react';
import { EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { RectConfig } from 'konva/lib/shapes/Rect';

import { useIdCounter } from './useIdCounter';

import { HistoryContext } from '@/context';

export function useShapes() {
  const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);

  const { generateId } = useIdCounter();

  const {
    saveHistory,
    history,
    index: historyIndex,
  } = useContext(HistoryContext);

  const updateShape = <T extends Konva.ShapeConfig>(
    config: T & { id: string }
  ) => {
    console.log('onUpdateShapeStart');

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
    saveHistory(updated);

    return updated;
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
    saveHistory(shapes.concat(created));

    return created;
  };

  // HistoryIndex 변하면 history 번째 인덱스꺼 가져와서 변화시키기
  useEffect(() => {
    console.log(historyIndex);

    setShapes(history[historyIndex]);
  }, [historyIndex]);

  const circles: EllipseConfig[] = useMemo(
    () => shapes.filter((shape) => shape.type === 'ellipse') as EllipseConfig[],
    [shapes]
  );

  const rectangles: RectConfig[] = useMemo(
    () => shapes.filter((shape) => shape.type === 'rectangle') as RectConfig[],
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
