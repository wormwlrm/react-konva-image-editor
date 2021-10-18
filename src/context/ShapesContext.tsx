import React, { createContext, ReactNode } from 'react';
import Konva from 'konva';

import { useDraggable, useShapes } from '@/hooks';

interface IShapesContext {
  shapes: Konva.ShapeConfig[];
  selected: null | string;
  updateShape: <T extends Konva.ShapeConfig>(config: T & { id: string; })
    => Konva.ShapeConfig[];
  addShape: (config: Konva.ShapeConfig) => Konva.ShapeConfig;
  onDragStart: (e, shape: Konva.ShapeConfig) => void;
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
  unselect: () => void;
  setSelected: (id: string) => void;

  circles: Konva.EllipseConfig[];
  rectangles: Konva.RectConfig[];
}

const ShapesContext = createContext<IShapesContext>({
  shapes: [],
  selected: null,
  updateShape: () => [],
  addShape: () => { return { x: 0, y: 0 }; },
  onDragStart: () => { },
  onDragEnd: () => { },
  unselect: () => { },
  setSelected: () => { },
  circles: [],
  rectangles: [],
});

const ShapesProvider = ({ children }: {children: ReactNode}) => {
  const {
    shapes, circles, rectangles, updateShape, addShape,
  } = useShapes();

  const {
    selected, onDragStart, onDragEnd, unselect, setSelected,
  } = useDraggable({
    updateShape,
  });

  const initialState: IShapesContext = {
    shapes,
    selected,
    updateShape,
    addShape,
    onDragStart,
    onDragEnd,
    unselect,
    setSelected,

    circles,
    rectangles,
  };

  return (
    <ShapesContext.Provider value={initialState}>
      {children}
    </ShapesContext.Provider>
  );
};

export { ShapesContext, ShapesProvider };
