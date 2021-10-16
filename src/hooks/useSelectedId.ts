import { useState } from 'react';

export function useSelectedId() {
  const [selectedId, setSelectedId] = useState(null);

  return {
    selectedId,
    setSelectedId,
    isSelected: (id: string) => selectedId === id,
  };
}
