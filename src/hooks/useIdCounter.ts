import { useState } from 'react';

export function useIdCounter() {
  const [idCounter, setIdCounter] = useState(1);

  return {
    generateId: () => {
      setIdCounter(idCounter + 1);
      return `${idCounter}`;
    },
  };
}
