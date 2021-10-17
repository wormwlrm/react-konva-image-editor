import React, { useRef, useEffect } from 'react';
import { Rect, Transformer } from 'react-konva';
import { Portal } from 'react-konva-utils';
import { Rect as RectType } from 'konva/lib/shapes/Rect';
import { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { ShapeConfig } from 'konva/lib/Shape';

export const TransformableRect = ({
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
    [key: string]: any;
}) => {
  const rectRef = useRef<RectType>();
  const transformerRef = useRef<TransformerType>();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([rectRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onClick}
        ref={rectRef}
        {...props}
        draggable
        onDragStart={onDragStart}
        onDragEnd={(e) => onDragEnd(e)}
        onTransformEnd={(e) => {
          const node = rectRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          onTransform({
            ...props,
            rotation: node.rotation(),
            x: node.x(),
            y: node.y(),
            width: (node.width() * scaleX),
            height: (node.height() * scaleY),
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
