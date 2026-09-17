import { useState, useCallback } from 'react';

export interface CursorState {
  isHovered: boolean;
  label: string;
  variant: 'default' | 'project' | 'button' | 'link' | 'hidden';
}

export function useCustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    isHovered: false,
    label: '',
    variant: 'default',
  });

  const setCursorHover = useCallback((isHovered: boolean, label = '', variant: CursorState['variant'] = 'default') => {
    setCursor({
      isHovered,
      label,
      variant,
    });
  }, []);

  return { cursor, setCursorHover };
}
