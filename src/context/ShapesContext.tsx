import React, { createContext, ReactNode } from 'react';
import Konva from 'konva';

import {
  useDraggable, useShapes, useFocusable, useZoom, useDrawing
} from '@/hooks';

interface IShapesContext {
  shapes: Konva.ShapeConfig[];
  selected: null | string;
  focused: null | string;
  draggable: boolean;
  setDraggable: (draggable: boolean) => void;
  updateShape: <T extends Konva.ShapeConfig>(config: T & { id: string; })
    => Konva.ShapeConfig[];
  addShape: (config: Konva.ShapeConfig) => Konva.ShapeConfig;
  onDragStart: (e, shape: Konva.ShapeConfig) => void;
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
  unselect: (e?) => void;
  unfocus: (e?) => void;
  setSelected: (id: string) => void;
  setFocused: (id: string) => void;

  circles: (Konva.EllipseConfig& {id: string})[];
  rectangles: (Konva.RectConfig& {id: string})[];
  texts: (Konva.TextConfig& {id: string})[];
  lines: (Konva.LineConfig& {id: string})[];
  images: (Konva.ImageConfig& {id: string})[];

  zoom: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  zoomIn: (e?) => void;
  zoomOut: (e?) => void;

  // setModeToEraser: () => void;
  // setModeToPen: () => void;
  drawing: boolean;
  mode: string;
  setDrawing: (drawing: boolean) => void;
  willDrawing: boolean;
  setWillDrawing: (willDrawing: boolean) => void;
  onDrawStart: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onDrawEnd: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onDrawing: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  points: Konva.LineConfig['points'];
}

const defaultValue = {
  shapes: [],
  selected: null,
  focused: null,
  updateShape: () => [],
  addShape: () => { return { x: 0, y: 0 }; },
  onDragStart: () => { },
  onDragEnd: () => { },
  unselect: () => { },
  unfocus: () => { },
  setSelected: () => { },
  setFocused: () => {},
  draggable: false,
  setDraggable: () => {},
  circles: [],
  rectangles: [],
  texts: [],
  lines: [],
  images: [],

  zoom: 5,
  canZoomIn: true,
  canZoomOut: true,
  zoomIn: () => {},
  zoomOut: () => {},

  setModeToEraser: () => {},
  setModeToPen: () => {},
  drawing: false,
  mode: 'pen',
  setDrawing: () => {},
  willDrawing: false,
  setWillDrawing: () => {},
  onDrawStart: () => {},
  onDrawing: () => {},
  onDrawEnd: () => {},
  points: [],
};

const ShapesContext = createContext<IShapesContext>(defaultValue);

const ShapesProvider = ({ children }: {
  children: ReactNode,
}) => {
  const {
    shapes, circles, rectangles, texts, lines, images, updateShape, addShape,
  } = useShapes();

  const {
    selected, onDragStart, onDragEnd, unselect, setSelected,
    draggable, setDraggable,
  } = useDraggable({
    updateShape,
  });

  const { focused, setFocused, unfocus } = useFocusable();

  const {
    zoom, canZoomIn, canZoomOut, zoomIn, zoomOut,
  } = useZoom();

  const {
    // setModeToEraser, setModeToPen,
    drawing, mode, setDrawing,
    onDrawStart, onDrawing, onDrawEnd, points,
    willDrawing, setWillDrawing,
  } = useDrawing({
    addShape, setSelected,
  });

  const initialState: IShapesContext = {
    shapes,
    selected,
    focused,
    setFocused,
    updateShape,
    addShape,
    onDragStart,
    onDragEnd,
    draggable,
    setDraggable,
    unselect,
    unfocus,
    setSelected,

    circles,
    rectangles,
    texts,
    lines,
    images,

    zoom,
    canZoomIn,
    canZoomOut,
    zoomIn,
    zoomOut,

    // setModeToEraser,
    // setModeToPen,
    setDrawing,
    drawing,
    mode,
    points,
    willDrawing,
    setWillDrawing,
    onDrawEnd,
    onDrawStart,
    onDrawing,
  };

  return (
    <ShapesContext.Provider value={initialState}>
      {children}
    </ShapesContext.Provider>
  );
};

const ShapesConsumer = ({ children }: { children: (value) => ReactNode }) => (
  <ShapesContext.Consumer>
    { children }
  </ShapesContext.Consumer>
);

export { ShapesContext, ShapesProvider, ShapesConsumer };
