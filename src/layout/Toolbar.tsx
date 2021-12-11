import React, { useContext } from 'react';
import {
  Button, ButtonGroup, ThemeProvider, styled, createTheme, Stack, Divider,
  Tooltip
} from '@mui/material';
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
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Konva from 'konva';

import { HistoryContext, useShapesContext } from '@/context';
import { ImageHandler } from '@/components';
import { JsonHandler } from '@/components/JsonHandler';

const ToolbarBackground = styled('div')({
  backgroundColor: '#2c2c2c',
  borderBottom: '1px solid #e0e0e0',
  padding: '5px',
  display: 'flex',
});

const TooltipButton = ({
  title,
  disabled,
  onClick,
  children,
  ...props
}: {
  title: string;
  disabled?: boolean;
  onClick?: (e) => void;
  children: React.ReactNode;
  [key: string]: any;
}) => (
  <Tooltip title={title}>
    <span>
      <Button
        size="small"
        type="button"
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    </span>
  </Tooltip>
);

TooltipButton.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export const Toolbar = () => {
  const {
    redo, undo, canRedo, canUndo, saveHistory,
  } = useContext(HistoryContext);

  const {
    selected,
    addShape, setSelected,
    unselect, unfocus, zoomIn, zoomOut,
    canZoomIn, canZoomOut,
    toForward, toBackward,
    setWillDrawing, willDrawing, drawing,
    layer, removeShape, duplicateShape,
  } = useShapesContext();

  const handleAddShape = (configs: {[key: string]: any}) => {
    const [shape] = addShape<Konva.ShapeConfig>({ ...configs });
    setSelected(shape.id);
  };

  const downloadURI = (uri, name) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = () => {
    const base64 = layer.toDataURL();
    downloadURI(base64, 'image.png');
  };

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

  const serialize = () => {
    const serialized = layer.toJSON();
    const blob = new Blob([
      JSON.stringify(serialized),
    ], { type: 'application/json' });

    downloadURI(URL.createObjectURL(blob), 'image.json');
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToolbarBackground>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1}
          >
            <ButtonGroup variant="contained" size="small">
              <TooltipButton
                title="Circle"
                onClick={() => handleAddShape({
                  type: 'ellipse',
                })}
              >
                <CircleOutlinedIcon />
              </TooltipButton>

              <TooltipButton
                title="Rectangle"
                onClick={() => handleAddShape({
                  type: 'rect',
                })}
              >
                <RectangleOutlinedIcon />
              </TooltipButton>

              <TooltipButton
                title="Text Fields"
                onClick={() => handleAddShape({
                  type: 'text',
                })}
              >
                <TextFieldsOutlinedIcon />
              </TooltipButton>

              <TooltipButton
                title="Drawing"
                disabled={willDrawing || drawing}
                onClick={() => {
                  unselect();
                  unfocus();
                  setWillDrawing(true);
                }}
              >
                <CreateIcon />
              </TooltipButton>

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
                <TooltipButton
                  title="Image"
                  component="span"
                >
                  <AddAPhotoIcon />
                </TooltipButton>
              </label>
            </ButtonGroup>

            <ButtonGroup variant="contained" size="small">
              <TooltipButton
                title="Undo"
                disabled={!canUndo}
                onClick={() => {
                  unselect();
                  unfocus();
                  undo();
                }}
              >
                <UndoIcon />
              </TooltipButton>

              <TooltipButton
                title="Redo"
                disabled={!canRedo}
                onClick={() => {
                  unselect();
                  unfocus();
                  redo();
                }}
              >
                <RedoIcon />
              </TooltipButton>
            </ButtonGroup>

            <ButtonGroup variant="contained" size="small">
              <TooltipButton
                title="Zoom In"
                type="button"
                disabled={!canZoomIn}
                onClick={() => {
                  zoomIn();
                }}
              >
                <ZoomInIcon />
              </TooltipButton>

              <TooltipButton
                title="Zoom Out"
                type="button"
                disabled={!canZoomOut}
                onClick={() => {
                  zoomOut();
                }}
              >
                <ZoomOutIcon />
              </TooltipButton>
            </ButtonGroup>

            <ButtonGroup variant="contained" size="small">
              <TooltipButton
                title="Delete"
                disabled={!selected}
                onClick={() => {
                  removeShape(selected);
                  unselect();
                  unfocus();
                }}
              >
                <DeleteForeverIcon />
              </TooltipButton>

              <TooltipButton
                title="Duplicate"
                disabled={!selected}
                onClick={() => {
                  const shape = duplicateShape(selected);
                  setSelected(shape.id);
                }}
              >
                <ContentCopyIcon />
              </TooltipButton>

              <TooltipButton
                title="To Forward"
                disabled={!selected}
                onClick={() => {
                  toForward(selected);
                }}
              >
                <FlipToFrontIcon />
              </TooltipButton>

              <TooltipButton
                title="To Backward"
                disabled={!selected}
                onClick={() => {
                  toBackward(selected);
                }}
              >
                <FlipToBackIcon />
              </TooltipButton>
            </ButtonGroup>

            <ButtonGroup variant="contained" size="small">
              <TooltipButton
                title="Download"
                onClick={() => {
                  downloadImage();
                }}
              >
                <DownloadIcon />
              </TooltipButton>
              <TooltipButton
                title="Serialize"
                onClick={() => {
                  serialize();
                }}
              >
                <LogoutIcon />
              </TooltipButton>

              <label htmlFor="deserialize">
                <JsonHandler
                  jsonLoaded={(shapeArr) => {
                    addShape(shapeArr);
                  }}
                />
                <TooltipButton
                  title="Deserialize"
                  component="span"
                >
                  <LoginIcon />
                </TooltipButton>
              </label>
            </ButtonGroup>
          </Stack>
        </ToolbarBackground>
      </ThemeProvider>

    </>
  );
};
