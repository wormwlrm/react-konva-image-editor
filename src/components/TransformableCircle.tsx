import React, { useRef, useEffect } from 'react';
import { Ellipse, Transformer } from 'react-konva';
import { Ellipse as EllipseType } from 'konva/lib/shapes/Ellipse';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { ShapeConfig } from 'konva/lib/Shape';

export const TransformableCircle = ({
  onDragStart,
  onDragEnd,
  onClick,
  onSelect,
  onTransform,
  isSelected,
  ...props
}: {
    onDragStart: (shape: ShapeConfig) => void;
    onDragEnd: (e: any) => void;
    onSelect: (e: any) => void;
    onTransform: (e: any) => void;
    onClick: (e: any) => void;
    isSelected: boolean;
    radiusX: number;
    radiusY: number;
    [key: string]: any;
}) => {
  const circleRef = useRef<EllipseType>();
  const transformerRef = useRef<TransformerType>();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([circleRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Ellipse
        onClick={onClick}
        ref={circleRef}
        {...props}
        draggable
        onDragStart={onDragStart}
        onDragEnd={(e) => onDragEnd(e)}
        onTransformEnd={(e) => {
          console.log(2, e);
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
        <Transformer
          ref={transformerRef}
        />
      )}
    </>
  );
};
