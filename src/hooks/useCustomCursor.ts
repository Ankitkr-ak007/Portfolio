import { useState, useCallback } from 'react';

export type CursorVariant = 'default' | 'project' | 'button' | 'link' | '3d' | 'drag' | 'hidden';

export interface CursorState {
  isHovered: boolean;
  label: string;
  variant: CursorVariant;
}

export function useCustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    isHovered: false,
    label: '',
    variant: 'default',
  });

  const setCursorHover = useCallback((isHovered: boolean, label = '', variant: CursorVariant = 'default') => {
    setCursor({
      isHovered,
      label,
      variant,
    });
  }, []);

  return { cursor, setCursorHover };
}
