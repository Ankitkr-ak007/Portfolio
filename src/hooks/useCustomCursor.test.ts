import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCustomCursor } from './useCustomCursor';

describe('useCustomCursor hook', () => {
  it('initializes with default cursor state', () => {
    const { result } = renderHook(() => useCustomCursor());
    expect(result.current.cursor).toEqual({
      isHovered: false,
      label: '',
      variant: 'default',
    });
  });

  it('updates cursor state when setCursorHover is called', () => {
    const { result } = renderHook(() => useCustomCursor());

    act(() => {
      result.current.setCursorHover(true, 'VIEW', 'project');
    });

    expect(result.current.cursor).toEqual({
      isHovered: true,
      label: 'VIEW',
      variant: 'project',
    });

    act(() => {
      result.current.setCursorHover(false);
    });

    expect(result.current.cursor).toEqual({
      isHovered: false,
      label: '',
      variant: 'default',
    });
  });
});
