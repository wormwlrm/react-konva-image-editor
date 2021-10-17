import { useState } from 'react';

export function useSelectable() {
  const [selected, setSelected] = useState<null | string>(null);

  const unselect = (e) => {
    const emptyClicked = e.target === e.target.getStage();

    if (emptyClicked) {
      setSelected(null);
    }
  };

  const isSelected = (id: string) => selected === id;

  return {
    selected,
    setSelected,
    unselect,
    isSelected,
  };
}
