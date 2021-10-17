import { useState } from 'react';

export function useFocusable() {
  const [focused, setFocused] = useState<null | string>(null);

  return {
    focused,
    setFocused,
    isFocused: (id: string) => focused === id,
  };
}
