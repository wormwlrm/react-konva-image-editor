import React, { useRef, useEffect } from 'react';
import { Rect, Transformer } from 'react-konva';
import { Portal } from 'react-konva-utils';
import Konva from 'konva';

export const TransformableRect = ({
  onDragStart,
  onDragEnd,
  onClick,
  onTransform,
  isSelected,
  ...props
}: {
    onDragStart: (shape: Konva.ShapeConfig) => void;
    onDragEnd: (e: any) => void;
    onTransform: (e: any) => void;
    onClick: (e: any) => void;
    isSelected: boolean;
    [key: string]: any;
}) => {
  const rectRef = useRef<Konva.Rect>();
  const transformerRef = useRef<Konva.Transformer>();

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
        onTransformEnd={() => {
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
