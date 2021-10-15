import { useState, useEffect } from 'react';

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useResizer({ width, height }): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width,
    height,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width,
        height,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
