import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Line } from 'react-konva';
import Konva from 'konva';

import {
  EditableText,
  TransformableCircle,
  TransformableLine,
  TransformableRect
} from '@/components';
import {
  useShapesContext, WindowSize
} from '@/hooks';
import { ShapesConsumer, ShapesContext, ShapesProvider } from '@/context';
import { TransformableImage } from '@/components/TransformableImage';

const Canvas = ({
  width, height,
}: {
    width: WindowSize['width'];
    height: WindowSize['height'];
}) => {
  const {
    setSelected,
    onDragStart,
    onDragEnd,
    updateShape,
    unselect,
    circles,
    rectangles,
    texts,
    lines,
    images,

    selected,
    unfocus,
    setFocused,
    zoom,
    willDrawing,
    drawing,

    onDrawStart,
    onDrawing,
    onDrawEnd,
    points,
    mode,

    draggable,
    setDraggable,
  } = useShapesContext();

  const stage = useRef<Konva.Stage>();

  return (
    <ShapesConsumer>
      {(value) => (
        // TODO: 키보드 이벤트 리스닝하게 하기
        <Stage
          ref={stage}
          // TODO: 캔버스 크기를 이미지 기반으로 조절 가능하게
          width={width * zoom}
          height={height * zoom}
          onMouseDown={(e) => {
            if (willDrawing) {
              setDraggable(false);
              onDrawStart(e);
              console.log('willDraw');
            } else {
              console.log('NotwillDraw');
              unselect(e);
              unfocus(e);
            }
          }}
          onMouseMove={(e) => {
            if (drawing) {
              onDrawing(e);
              unselect(e);
              unfocus(e);
            }
          }}
          onMouseUp={(e) => {
            if (drawing) {
              onDrawEnd(e);
              setDraggable(true);
              console.log('drawEnd');
            } else {
              console.log(4);
            }
          }}
          scaleX={zoom}
          scaleY={zoom}
          onTouchStart={unselect}
          style={{
            cursor: willDrawing || drawing ? 'crosshair' : 'default',
            display: 'inline-block',
            backgroundColor: 'white',
            verticalAlign: 'middle',
          }}

        >
          <ShapesContext.Provider value={value}>
            <Layer>
              {images.map((shape) => (
                <TransformableImage
                  {...shape}
                  draggable={draggable}
                  key={shape.id}
                  src={shape.image}
                  maxWidth={width * 0.9}
                  isSelected={selected === shape.id}
                  onDragStart={(e) => onDragStart(e, shape)}
                  onDragEnd={(e) => onDragEnd(e)}
                  onClick={() => setSelected(shape.id)}
                  onTransform={(updated) => updateShape({
                    ...updated,
                    id: shape.id,
                  })}
                />
              ))}
              {circles.map((shape) => (
                <TransformableCircle
                  {...shape}
                  draggable={draggable}
                  key={shape.id}
                  radiusX={shape.radiusX}
                  radiusY={shape.radiusY}
                  isSelected={selected === shape.id}
                  onClick={() => setSelected(shape.id)}
                  onDragStart={(e) => onDragStart(e, shape)}
                  onDragEnd={(e) => onDragEnd(e)}
                  onTransform={(updated) => updateShape({
                    ...updated,
                    id: shape.id,
                  })}
                />
              ))}
              {rectangles.map((shape) => (
                <TransformableRect
                  {...shape}
                  draggable={draggable}
                  key={shape.id}
                  isSelected={selected === shape.id}
                  onDragStart={(e) => onDragStart(e, shape)}
                  onDragEnd={(e) => onDragEnd(e)}
                  onClick={() => setSelected(shape.id)}
                  onTransform={(updated) => updateShape({
                    ...updated,
                    id: shape.id,
                  })}
                />
              ))}
              {texts.map((shape) => (
                <EditableText
                  {...shape}
                  draggable={draggable}
                  key={shape.id!}
                  text={shape.text}
                  stage={stage.current}
                  isSelected={selected === shape.id}
                  onDragStart={(e) => onDragStart(e, shape)}
                  onDragEnd={(e) => onDragEnd(e)}
                  onClick={() => setSelected(shape.id)}
                  onTransform={(updated) => updateShape({
                    ...updated,
                    id: shape.id,
                  })}
                />
              ))}
              {lines.concat({
                id: '-1',
                points,
                mode,
              }).map((shape) => (
                <TransformableLine
                  {...shape}
                  draggable={draggable}
                  key={shape.id!}
                  mode={shape.mode}
                  points={shape.points}
                  isSelected={selected === shape.id}
                  onDragStart={(e) => onDragStart(e, shape)}
                  onDragEnd={(e) => onDragEnd(e)}
                  onClick={() => setSelected(shape.id)}
                  onTransform={(updated) => updateShape({
                    ...updated,
                    id: shape.id,
                  })}
                />
              ))}
            </Layer>
            <Layer name="top-layer" />
          </ShapesContext.Provider>
        </Stage>
      )}
    </ShapesConsumer>
  );
};

export { Canvas };
