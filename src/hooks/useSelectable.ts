import { useState } from 'react';

export function useSelectable() {
  const [selected, setSelected] = useState<null | string>(null);

  return {
    selected,
    setSelected,
    isSelected: (id: string) => selected === id,
  };
}
