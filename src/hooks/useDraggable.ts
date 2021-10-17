import { KonvaEventObject } from 'konva/lib/Node';
import { ShapeConfig } from 'konva/lib/Shape';
import { useState } from 'react';

export const useDraggable = ({
  selected,
  setSelected,
  unselect,
  updateShape,
}) => {
  const [focused, setFocused] = useState<null | string>(null);

  const onDragStart = (shape: ShapeConfig) => {
    setFocused(shape.id);
    setSelected(null);
  };

  const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
    updateShape({
      id: focused,
      x: e.target.x(),
      y: e.target.y(),
    });

    setFocused(null);
    setSelected(focused);
  };

  const isFocused = (id: string) => focused === id;

  return {
    focused,
    setFocused,

    onDragStart,
    onDragEnd,
    isFocused,
  };
};
