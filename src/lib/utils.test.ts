import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils / cn', () => {
  it('merges single class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional and falsy class names', () => {
    const isHidden = false;
    expect(cn('font-mono', isHidden ? 'text-red-500' : undefined, null, 'text-xs')).toBe('font-mono text-xs');
  });

  it('resolves tailwind conflict overrides properly', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });
});
