import { useState, useEffect } from 'react';

export interface CursorState {
  x: number;
  y: number;
  isHovered: boolean;
  label: string;
  variant: 'default' | 'project' | 'button' | 'link' | 'hidden';
}

export function useCustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovered: false,
    label: '',
    variant: 'default',
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const setCursorHover = (isHovered: boolean, label = '', variant: CursorState['variant'] = 'default') => {
    setCursor((prev) => ({
      ...prev,
      isHovered,
      label,
      variant,
    }));
  };

  return { cursor, setCursorHover };
}
