import Konva from 'konva';
import { useState } from 'react';

export const useDraggable = ({ updateShape }) => {
  const [selected, setSelected] = useState<null | string>(null);

  const unselect = (e?) => {
    if (e === undefined) {
      setSelected(null);
      return;
    }

    const emptyClicked = e.target === e.target.getStage();

    if (emptyClicked) {
      setSelected(null);
    }
  };

  const isSelected = (id: string) => selected === id;

  const onDragStart = (shape: Konva.ShapeConfig) => {
    console.log(shape);
    setSelected(shape.id);
  };

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    console.log('onDragEnd');
    updateShape({
      id: selected,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return {
    selected,
    setSelected,
    unselect,
    isSelected,

    onDragStart,
    onDragEnd,
  };
};
