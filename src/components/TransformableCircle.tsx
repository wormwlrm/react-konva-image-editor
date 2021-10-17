import React, { useRef, useEffect } from 'react';
import { Circle, Transformer } from 'react-konva';
import { Circle as CircleType } from 'konva/lib/shapes/Circle';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { ShapeConfig } from 'konva/lib/Shape';

export const TransformableCircle = ({
  onDragStart,
  onDragEnd,
  isSelected,
  isFocused,
  onSelect,
  onChange,
  ...props
}: {
    onDragStart: (shape: ShapeConfig) => void;
    onDragEnd: (e: any) => void;
    onSelect: (e: any) => void;
    onChange: (e: any) => void;
    isSelected: boolean;
    isFocused: boolean;
    [key: string]: any;
}) => {
  const circleRef = useRef<CircleType>();
  const transformerRef = useRef<TransformerType>();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([circleRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Circle
        onClick={onSelect}
        ref={circleRef}
        {...props}
        draggable
        onMouseOver={(e) => {
          const node = circleRef.current;
          const shape = e.target as CircleType;
          shape.strokeEnabled(true);
          console.log('mouseOver');
          onChange({
            id: node.id(),
            stroke: 'red',
          });
        }}
        onMouseLeave={(e) => {
          const node = circleRef.current;
          const shape = e.target as CircleType;
          shape.strokeEnabled(false);

          onChange({
            id: node.id(),
            stroke: 'transparent',
          });
        }}
        onDragStart={onDragStart}
        onDragEnd={(e) => onDragEnd(e)}
        onTransformEnd={(e) => {
          const node = circleRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...props,
            rotation: node.rotation(),
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  );
};
