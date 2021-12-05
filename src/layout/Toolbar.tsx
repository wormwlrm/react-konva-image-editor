import React, { useContext } from 'react';
import {
  Button, ButtonGroup, createTheme, ThemeProvider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FlipToFrontIcon from '@mui/icons-material/FlipToFront';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import CreateIcon from '@mui/icons-material/Create';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';

import { HistoryContext } from '@/context';
import { useShapesContext } from '@/hooks';
import { ImageHandler } from '@/components';

const ToolbarBackground = styled('div')({
  backgroundColor: '#2c2c2c',
  borderBottom: '1px solid #e0e0e0',
  padding: '5px',
  display: 'flex',
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E5E5E5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export const Toolbar = () => {
  const {
    redo, undo, canRedo, canUndo,
  } = useContext(HistoryContext);

  const {
    mode, selected,
    addShape, setSelected,
    unselect, unfocus, zoomIn, zoomOut,
    canZoomIn, canZoomOut,
    toForward, toBackward,
    setWillDrawing, willDrawing, drawing,
  } = useShapesContext();

  const handleAddShape = (configs: {[key: string]: any}) => {
    const shape = addShape({ ...configs });
    setSelected(shape.id);
  };

  return (
    <>
      <ToolbarBackground>
        <ThemeProvider theme={darkTheme}>
          <ButtonGroup variant="contained" size="small">
            <Button
              size="small"
              onClick={() => handleAddShape({
                type: 'ellipse',
              })}
            >
              <CircleOutlinedIcon />
            </Button>
            <Button
              size="small"
              onClick={() => handleAddShape({
                type: 'rect',
              })}
            >
              <RectangleOutlinedIcon />
            </Button>
            <Button
              size="small"
              onClick={() => handleAddShape({
                type: 'text',
              })}
            >
              <TextFieldsOutlinedIcon />
            </Button>

            <Button
              size="small"
              disabled={willDrawing || drawing}
              onClick={() => {
                unselect();
                unfocus();
                setWillDrawing(true);
              }}
            >
              <CreateIcon />
            </Button>
            &nbsp;

            <label htmlFor="add-image">
              <ImageHandler
                onBase64ImageLoaded={(image) => {
                  handleAddShape({
                    type: 'image',
                    image,
                  });
                }}
              />
              <Button variant="contained" component="span" size="small">
                <AddAPhotoIcon />
              </Button>
            </label>
          </ButtonGroup>
          &nbsp;
          <ButtonGroup variant="contained" size="small">
            <Button
              disabled={!canUndo}
              onClick={() => {
                unselect();
                unfocus();
                undo();
              }}
            >
              <UndoIcon />
            </Button>
            <Button
              type="button"
              disabled={!canRedo}
              onClick={() => {
                unselect();
                unfocus();
                redo();
              }}
            >
              <RedoIcon />
            </Button>
          </ButtonGroup>
          &nbsp;

          <ButtonGroup variant="contained" size="small">
            <Button
              type="button"
              disabled={!canZoomIn}
              onClick={() => {
                zoomIn();
              }}
            >
              <ZoomInIcon />
            </Button>
            <Button
              type="button"
              disabled={!canZoomOut}
              onClick={() => {
                zoomOut();
              }}
            >
              <ZoomOutIcon />
            </Button>
          </ButtonGroup>
          &nbsp;

          <ButtonGroup variant="contained" size="small">
            <Button
              disabled={!selected}
              onClick={() => {
                toForward(selected);
              }}
            >
              <FlipToFrontIcon />
            </Button>
            <Button
              disabled={!selected}
              onClick={() => {
                toBackward(selected);
              }}
            >
              <FlipToBackIcon />
            </Button>
          </ButtonGroup>
        </ThemeProvider>
      </ToolbarBackground>

    </>
  );
};
