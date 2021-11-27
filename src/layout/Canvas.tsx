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
  useDrawing,
  useResizer, useShapesContext, WindowSize
} from '@/hooks';
import { ShapesConsumer, ShapesContext, ShapesProvider } from '@/context';

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
    selected,
    unfocus,
    setFocused,
    zoom,
    willDrawing,
    drawing,

    setDrawing,
    setWillDrawing,
    onDrawStart,
    onDrawing,
    onDrawEnd,
    points,
    mode,
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
              onDrawStart(e);
            } else {
              unselect(e);
              unfocus(e);
            }
          }}
          onMouseMove={(e) => {
            if (drawing) {
              onDrawing(e);
              console.log('2 :>> ', 2);
            } else {
              console.log('3 :>> ', 3);
            }
          }}
          onMouseUp={(e) => {
            if (drawing) {
              onDrawEnd(e);
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
              {circles.map((shape) => (
                <TransformableCircle
                  key={shape.id}
                  {...shape}
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
                  key={shape.id}
                  {...shape}
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
                  key={shape.id!}
                  text={shape.text}
                  {...shape}
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
                  key={shape.id!}
                  mode={shape.mode}
                  points={shape.points}
                  {...shape}
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
