import { useState } from 'react';

export const useFocusable = () => {
  const [focused, setFocused] = useState<string | null>(null);

  return {
    focused,
    setFocused,
  };
};
