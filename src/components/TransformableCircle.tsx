import React, { useRef, useEffect } from 'react';
import { Ellipse, Transformer } from 'react-konva';
import { Portal } from 'react-konva-utils';
import Konva from 'konva';

export const TransformableCircle = ({
  onDragStart,
  onDragEnd,
  onClick,
  onSelect,
  onTransform,
  isSelected,
  ...props
}: {
    onDragStart: (shape: Konva.ShapeConfig) => void;
    onDragEnd: (e: any) => void;
    onSelect: (e: any) => void;
    onTransform: (e: any) => void;
    onClick: (e: any) => void;
    isSelected: boolean;
    radiusX: number;
    radiusY: number;
    [key: string]: any;
}) => {
  const circleRef = useRef<Konva.Ellipse>();
  const transformerRef = useRef<Konva.Transformer>();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([circleRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Ellipse
        ref={circleRef}
        {...props}
        draggable
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={(e) => onDragEnd(e)}
        onTransformEnd={(e) => {
          const node = circleRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          onTransform({
            ...props,
            rotation: node.rotation(),
            x: node.x(),
            y: node.y(),
            radiusX: (node.width() * scaleX) / 2,
            radiusY: (node.height() * scaleY) / 2,
          });
        }}
      />

      {isSelected && (
        <Portal selector=".top-layer" enabled={isSelected}>
          <Transformer
            ref={transformerRef}
          />
        </Portal>
      )}
    </>
  );
};
