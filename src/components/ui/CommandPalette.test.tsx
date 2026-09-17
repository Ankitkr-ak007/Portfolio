import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommandPalette } from './CommandPalette';

describe('CommandPalette component', () => {
  it('renders correctly when open', () => {
    render(
      <CommandPalette
        isOpen={true}
        onClose={() => {}}
        onOpenTerminal={() => {}}
      />
    );

    expect(screen.getByPlaceholderText(/Type a command or search/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Selected Work/i)).toBeInTheDocument();
  });

  it('filters actions when typing a query', () => {
    render(
      <CommandPalette
        isOpen={true}
        onClose={() => {}}
        onOpenTerminal={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/Type a command or search/i);
    fireEvent.change(input, { target: { value: 'Terminal' } });

    expect(screen.getByText(/Open Interactive Terminal/i)).toBeInTheDocument();
  });

  it('triggers onOpenTerminal and onClose when terminal action is clicked', () => {
    const onClose = vi.fn();
    const onOpenTerminal = vi.fn();

    render(
      <CommandPalette
        isOpen={true}
        onClose={onClose}
        onOpenTerminal={onOpenTerminal}
      />
    );

    const terminalAction = screen.getByText(/Open Interactive Terminal/i);
    fireEvent.click(terminalAction);

    expect(onOpenTerminal).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
