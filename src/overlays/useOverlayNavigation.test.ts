import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOverlayNavigation } from './useOverlayNavigation';

describe('useOverlayNavigation hook', () => {
  it('calls onClose when Escape key is pressed while open', () => {
    const onClose = vi.fn();
    const containerRef = { current: document.createElement('div') };

    renderHook(() =>
      useOverlayNavigation({
        isOpen: true,
        onClose,
        containerRef,
      })
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when isOpen is false', () => {
    const onClose = vi.fn();
    const containerRef = { current: document.createElement('div') };

    renderHook(() =>
      useOverlayNavigation({
        isOpen: false,
        onClose,
        containerRef,
      })
    );

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onClose).not.toHaveBeenCalled();
  });
});
