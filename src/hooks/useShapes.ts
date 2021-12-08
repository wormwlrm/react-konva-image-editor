import Konva from 'konva';
import React, {
  useContext, useEffect, useState
} from 'react';

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

  const getShapeById = (id: string) => shapes.find((shape) => shape.id === id);

  const updateShape = <T extends Konva.ShapeConfig>(
    config: T & { id: string },
    options: {
      saveHistory: boolean;
    } = {
      saveHistory: true,
    }
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

    setShapes(updated);

    if (options.saveHistory) {
      saveHistory(updated);
    }

    return updated;
  };

  const addShape = <T extends Konva.ShapeConfig>(shape: T) => {
    let created: Konva.ShapeConfig = {
      id: generateId(),
      draggable: true,
      shadowBlur: 0,
      brightness: 0,
      blur: 0,
      contrast: 0,
      pixelSize: 1,
      filters: [
        Konva.Filters.Blur,
        ...(shape.type !== 'text' && [
          Konva.Filters.Brighten,
          Konva.Filters.Contrast,
          Konva.Filters.Pixelate,
        ]),
      ],
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

      case 'image':
        created = {
          ...created,
          y: Math.random() * 100,
          x: Math.random() * 100,
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

  const toForward = (id: string) => {
    const shape = shapes.find((item) => item.id === id);
    if (!shape) return;
    const result = shapes.filter((item) => item.id !== id).concat([shape]);
    setShapes(result);
    saveHistory(result);
  };

  const toBackward = (id: string) => {
    const shape = shapes.find((item) => item.id === id);
    if (!shape) return;
    const result = [shape].concat(shapes.filter((item) => item.id !== id));
    setShapes(result);
    saveHistory(result);
  };

  const removeShape = (id: string) => {
    const shape = shapes.find((item) => item.id === id);
    if (!shape) return;
    const result = shapes.filter((item) => item.id !== id);
    setShapes(result);
    saveHistory(result);
  };

  const duplicateShape = (id: string): Konva.ShapeConfig => {
    const shape = shapes.find((item) => item.id === id);
    const created = {
      ...shape,
      id: generateId(),
      x: shape.x + 10,
      y: shape.y + 10,
    };

    const result = shapes.concat([created]);
    setShapes(result);
    saveHistory(result);

    return created;
  };

  return {
    shapes,

    getShapeById,
    duplicateShape,

    setShapes,
    updateShape,
    addShape,
    removeShape,

    toForward,
    toBackward,
  };
}
