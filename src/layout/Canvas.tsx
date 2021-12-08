import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer } from 'react-konva';
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
  const stageRef = useRef<Konva.Stage>();
  const layerRef = useRef<Konva.Layer>();

  const {
    setSelected,
    onDragStart,
    onDragEnd,
    updateShape,
    unselect,
    shapes,

    selected,
    unfocus,
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
    stage,
    setStage,
    layer,
    setLayer,
  } = useShapesContext();

  useEffect(() => {
    if (stageRef.current && !stage) {
      setStage(stageRef.current);
    }
    if (layerRef.current && !layer) {
      setLayer(layerRef.current);
    }
  }, [stageRef, layerRef]);

  return (
    <ShapesConsumer>
      {(value) => (
        // TODO: 키보드 이벤트 리스닝하게 하기
        <Stage
          ref={stageRef}
          // TODO: 캔버스 크기를 이미지 기반으로 조절 가능하게
          width={width * zoom}
          height={height * zoom}
          onMouseDown={(e) => {
            if (willDrawing) {
              setDraggable(false);
              onDrawStart(e);
            } else {
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
            <Layer ref={layerRef}>
              {shapes.map((shape) => {
                switch (shape.type) {
                  case 'rectangle':
                    return (
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
                    );
                  case 'image':
                    return (
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
                    );
                  case 'ellipse':
                    return (
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
                    );
                  case 'line':
                    return (
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
                    );
                  case 'text':
                    return (
                      <EditableText
                        {...shape}
                        draggable={draggable}
                        id={shape.id}
                        key={shape.id}
                        text={shape.text}
                        stage={stageRef.current}
                        isSelected={selected === shape.id}
                        onDragStart={(e) => onDragStart(e, shape)}
                        onDragEnd={(e) => onDragEnd(e)}
                        onClick={() => setSelected(shape.id)}
                        onTransform={(updated) => updateShape({
                          ...updated,
                          id: shape.id,
                        })}
                      />
                    );
                  default:
                    return null;
                }
              })}
              {drawing && points.length > 0 ? (
                <TransformableLine
                  mode={mode}
                  points={points}
                  isSelected={false}
                  onDragStart={() => {}}
                  onDragEnd={() => {}}
                  onClick={() => {}}
                  onTransform={() => {}}
                  stroke="#637EF7"
                />
              )
                : null}
            </Layer>
            <Layer name="top-layer" />
          </ShapesContext.Provider>
        </Stage>
      )}
    </ShapesConsumer>
  );
};

export { Canvas };
