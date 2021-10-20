import { useContext } from 'react';

import { ShapesContext } from '@/context/ShapesContext';

export const useShapesContext = () => {
  const context = useContext(ShapesContext);

  return context;
};
