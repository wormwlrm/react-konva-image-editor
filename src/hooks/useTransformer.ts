import Konva from 'konva';
import React, { useEffect } from 'react';

export const useTransformer = <T extends Konva.Shape>({
  isSelected,
  shape,
  transformer,
}: {
  isSelected: boolean;
  shape: React.MutableRefObject<T>;
  transformer: React.MutableRefObject<Konva.Transformer>;
}) => {
  useEffect(() => {
    if (isSelected) {
      transformer.current.nodes([shape.current]);
      transformer.current.getLayer().batchDraw();
    }
  }, [isSelected]);
};
