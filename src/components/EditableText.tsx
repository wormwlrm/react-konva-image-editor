import React, {
  useRef, useEffect, useState, useContext
} from 'react';
import { Text, Transformer } from 'react-konva';
import { Html, Portal } from 'react-konva-utils';
import Konva from 'konva';

import { TextareaPortal } from '@/portals';
import { ShapesContext } from '@/context';

const EditableText = ({
  onDragStart,
  onDragEnd,
  onClick,
  onTransform,
  isSelected,
  stage,
  id,
  ...props
}: {
  onDragStart: (shape: Konva.ShapeConfig) => void;
  onDragEnd: (e: any) => void;
  onTransform: (e: any) => void;
  onClick: (e: any) => void;
  isSelected: boolean;
  stage: Konva.Stage;
  id: string;
  [key: string]: any;
}) => {
  const shapeRef = useRef<Konva.Text>();
  const textareaRef = useRef<HTMLTextAreaElement>();
  const transformerRef = useRef<Konva.Transformer>();

  const [divProps, setDivProps] = useState<any>({
    style: {
      display: 'none',
      position: 'absolute',
      top: '10px',
      left: '20px',
      width: '30px',
      height: '40px',
    },
  });

  const [textareaProps, setTextareaProps] = useState<any>({
    value: '',
    style: {
      fontSize: '',
      border: '',
      padding: '',
      margin: '',
      overflow: '',
      background: '',
      outline: '',
      resize: '',
      lineHeight: '',
      fontFamily: '',
      transformOrigin: '',
      textAlign: '',
      color: '',
      transform: '',
    },
  });

  const [originProps, setOriginProps] = useState<any>({
    value: '',
    style: {
      fontSize: '',
      border: '',
      padding: '',
      margin: '',
      overflow: '',
      background: '',
      outline: '',
      resize: '',
      lineHeight: '',
      fontFamily: '',
      transformOrigin: '',
      textAlign: '',
      color: '',
      transform: '',
    },
  });

  const { focused, setFocused, selected } = useContext(ShapesContext);

  useEffect(() => {
    if (selected) {
      setFocused(null);
    }
  }, [selected]);

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleTextDblClick(e) {
    shapeRef.current.hide();
    transformerRef.current.hide();

    const textPosition = shapeRef.current.absolutePosition();

    const areaPosition = {
      x: stage.offsetX() + textPosition.x,
      y: stage.offsetY() + textPosition.y,
    };

    const updatedDivProps = {
      ...divProps,
    };

    // 원본 저장
    setOriginProps(textareaProps);

    const updatedTextareaProps = {
      ...textareaProps,
      style: {
        ...textareaProps.style,
      },
    };

    updatedDivProps.style.position = 'absolute';
    updatedDivProps.style.display = 'block';

    updatedDivProps.style.width = `${
      shapeRef.current.width() - shapeRef.current.padding() * 2}px`;
    updatedDivProps.style.height = `${
      shapeRef.current.height() - shapeRef.current.padding() * 2 + 5}px`;

    updatedDivProps.style.left = `${areaPosition.x}px`;
    updatedDivProps.style.top = `${areaPosition.y}px`;

    updatedTextareaProps.value = shapeRef.current.text();

    updatedTextareaProps.style.border = 'none';
    updatedTextareaProps.style.fontSize = `${shapeRef.current.fontSize()}px`;
    updatedTextareaProps.style.padding = '0px';
    updatedTextareaProps.style.margin = '0px';
    updatedTextareaProps.style.overflow = 'hidden';
    updatedTextareaProps.style.background = 'none';
    updatedTextareaProps.style.outline = 'none';
    updatedTextareaProps.style.resize = 'none';
    updatedTextareaProps.style.lineHeight = shapeRef.current.lineHeight();
    updatedTextareaProps.style.fontFamily = shapeRef.current.fontFamily();
    updatedTextareaProps.style.transformOrigin = 'left top';
    updatedTextareaProps.style.textAlign = shapeRef.current.align();
    updatedTextareaProps.style.color = shapeRef.current.fill();

    const rotation = shapeRef.current.rotation();
    let transform = '';
    if (rotation) {
      transform += `rotateZ(${rotation}deg)`;
    }

    let px = 0;
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(shapeRef.current.fontSize() / 20);
    }

    transform += `translateY(-${px}px)`;

    updatedTextareaProps.style.transform = transform;

    // reset height
    updatedTextareaProps.style.height = 'auto';
    // after browsers resized it we can set actual value
    updatedTextareaProps.style.height = `${
      updatedTextareaProps.scrollHeight + 3}px`;

    setDivProps(updatedDivProps);
    setTextareaProps(updatedTextareaProps);

    textareaRef.current.focus();
  }

  function setTextareaWidth(width) {
    let newWidth = width;
    if (!newWidth) {
      newWidth = shapeRef.current.text().length * shapeRef.current.fontSize();
    }

    const isSafari = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    );

    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isSafari || isFirefox) {
      newWidth = Math.ceil(newWidth);
    }

    const isEdge = /Edge/.test(navigator.userAgent);
    if (isEdge) {
      newWidth += 1;
    }

    setTextareaProps({
      ...textareaProps,
      style: {
        ...textareaProps.style,
        width: `${newWidth}px`,
      },
    });
  }

  function removeTextarea() {
    setDivProps({
      ...divProps,
      style: {
        ...divProps.style,
        display: 'none',
      },
    });
  }

  return (
    <>
      <Text
        {...props}
        ref={shapeRef}
        draggable
        wrap="word"
        onDblClick={(e) => {
          setFocused(props.id);
          handleTextDblClick(e);
        }}
        onClick={onClick}
        onDragStart={onDragStart}
        onDragEnd={(e) => onDragEnd(e)}
        onTransform={(e) => {
          const node = shapeRef.current;
          node.setAttrs({
            scaleX: 1,
            width: node.width() * node.scaleX(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          onTransform({
            ...props,
            rotation: node.rotation(),
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
          });
        }}
      />
      {isSelected && (
      <Portal selector=".top-layer" enabled={isSelected}>
        <Transformer
          ref={transformerRef}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(oldBox, newBox) => {
            // eslint-disable-next-line
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      </Portal>
      )}
      <Html
        divProps={divProps}
      >
        <textarea
          ref={textareaRef}
          value={textareaProps.value}
          onChange={(e) => {
            console.log(e.target.value);
            setTextareaProps({
              ...textareaProps,
              value: e.target.value,
            });
          }}
          onKeyDown={(e) => {
            const scale = shapeRef.current.getAbsoluteScale().x;
            setTextareaWidth(shapeRef.current.width() * scale);
            setTextareaProps({
              ...textareaProps,
              style: {
                ...textareaProps.style,
                height: 'auto',
              },
            });
            setTextareaProps({
              ...textareaProps,
              style: {
                ...textareaProps.style,
                height: `${
                  textareaRef.current.scrollHeight + shapeRef.current.fontSize()
                }px`,
              },
            });
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              onTransform({
                id,
                text: textareaProps.value,
              });
              removeTextarea();
              shapeRef.current.show();
            }
            // TODO: 나중에 키바인딩 라이브러리 쓰기
            if (e.key === 'Esc') {
              setTextareaProps({
                ...originProps,
              });
              shapeRef.current.show();
            }
          }}
          {...textareaProps}
        />
      </Html>

    </>
  );
};

export { EditableText };
