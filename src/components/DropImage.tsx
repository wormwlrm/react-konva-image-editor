import React, { ReactNode, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function DropImage(props: {
  children: ReactNode,
  onBase64ImageLoaded: (image: HTMLImageElement) => void,
}) {
  const { children, onBase64ImageLoaded } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const binaryStr = String(reader.result);
      const base64 = binaryStr.split(',')[1];

      const image = new Image();
      image.src = `data:image/png;base64,${base64}`;
      image.onload = () => onBase64ImageLoaded(image);
    };

    acceptedFiles.forEach((file) => reader.readAsDataURL(file));
  }, [props]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
