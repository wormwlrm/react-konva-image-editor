import React, { createContext, ReactNode } from 'react';
import Konva from 'konva';

import { useDraggable, useShapes, useFocusable } from '@/hooks';

interface IShapesContext {
  shapes: Konva.ShapeConfig[];
  selected: null | string;
  focused: null | string;
  updateShape: <T extends Konva.ShapeConfig>(config: T & { id: string; })
    => Konva.ShapeConfig[];
  addShape: (config: Konva.ShapeConfig) => Konva.ShapeConfig;
  onDragStart: (e, shape: Konva.ShapeConfig) => void;
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
  unselect: () => void;
  setSelected: (id: string) => void;
  setFocused: (id: string) => void;

  circles: (Konva.EllipseConfig& {id: string})[];
  rectangles: (Konva.RectConfig& {id: string})[];
  texts: (Konva.TextConfig& {id: string})[] ;
}

const ShapesContext = createContext<IShapesContext>({
  shapes: [],
  selected: null,
  focused: null,
  updateShape: () => [],
  addShape: () => { return { x: 0, y: 0 }; },
  onDragStart: () => { },
  onDragEnd: () => { },
  unselect: () => { },
  setSelected: () => { },
  setFocused: () => {},
  circles: [],
  rectangles: [],
  texts: [],
});

const ShapesProvider = ({ children }: {children: ReactNode}) => {
  const {
    shapes, circles, rectangles, texts, updateShape, addShape,
  } = useShapes();

  const {
    selected, onDragStart, onDragEnd, unselect, setSelected,
  } = useDraggable({
    updateShape,
  });

  const { focused, setFocused } = useFocusable();

  const initialState: IShapesContext = {
    shapes,
    selected,
    focused,
    setFocused,
    updateShape,
    addShape,
    onDragStart,
    onDragEnd,
    unselect,
    setSelected,

    circles,
    rectangles,
    texts,
  };

  return (
    <ShapesContext.Provider value={initialState}>
      {children}
    </ShapesContext.Provider>
  );
};

export { ShapesContext, ShapesProvider };
