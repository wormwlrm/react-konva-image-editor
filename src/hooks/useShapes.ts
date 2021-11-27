import Konva from 'konva';
import React, {
  useContext, useEffect, useMemo,
  useState
} from 'react';
import { EllipseConfig } from 'konva/lib/shapes/Ellipse';
import { RectConfig } from 'konva/lib/shapes/Rect';
import { TextConfig } from 'konva/lib/shapes/Text';
import { LineConfig } from 'konva/lib/shapes/Line';

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
    const updated = shapes.map((shape) => {
      if (shape.id === config.id) {
        return {
          ...shape,
          ...config,
        };
      }
      return shape;
    });

    console.log('updateShape');

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

      case 'text':
        created = {
          ...created,
          y: Math.random() * 100,
          x: Math.random() * 100,
          rotation: 0,
          fill: '#637EF7',
          type: 'text',
          text: 'Double click to edit',
          fontSize: 28,
          fontStyle: 'normal',
          align: 'left',
          wrap: 'word',
          ...shape,
        };
        break;

      case 'line':
        created = {
          ...created,
          ...shape,
        };
        break;

      default:
        break;
    }

    console.log('setShape');

    setShapes(shapes.concat(created));
    saveHistory(shapes.concat(created));

    return created;
  };

  // HistoryIndex 변하면 history 번째 인덱스꺼 가져와서 변화시키기
  useEffect(() => {
    setShapes(history[historyIndex]);
  }, [historyIndex]);

  const circles: (EllipseConfig & { id: string })[] = useMemo(
    () =>
      shapes.filter((shape) => shape.type === 'ellipse') as (EllipseConfig & {
        id: string;
      })[],
    [shapes]
  );

  const rectangles: (RectConfig & { id: string })[] = useMemo(
    () =>
      shapes.filter((shape) => shape.type === 'rectangle') as (RectConfig & {
        id: string;
      })[],
    [shapes]
  );

  const texts: (TextConfig & { id: string })[] = useMemo(
    () =>
      shapes.filter((shape) => shape.type === 'text') as (TextConfig & {
        id: string;
      })[],
    [shapes]
  );

  const lines: (LineConfig & { id: string })[] = useMemo(
    () =>
      shapes.filter((shape) => shape.type === 'line') as (LineConfig & {
        id: string;
      })[],
    [shapes]
  );

  return {
    shapes,
    circles,
    rectangles,
    texts,
    lines,

    setShapes,
    updateShape,
    addShape,
  };
}
