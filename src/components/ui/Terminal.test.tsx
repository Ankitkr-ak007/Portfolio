import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Terminal } from './Terminal';

describe('Terminal CLI Component', () => {
  it('renders terminal shell when open', () => {
    render(<Terminal isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/KALKI VISION TERMINAL/i)).toBeInTheDocument();
  });

  it('executes help command and displays available options', () => {
    render(<Terminal isOpen={true} onClose={() => {}} />);
    
    const input = screen.getByLabelText(/Terminal command input/i) as HTMLInputElement;
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'whoami' } });
    fireEvent.submit(form);

    expect(screen.getByText(/Ankit Kumar — B.Tech Student/i)).toBeInTheDocument();
  });

  it('executes clear command to reset terminal buffer', () => {
    render(<Terminal isOpen={true} onClose={() => {}} />);
    
    const input = screen.getByLabelText(/Terminal command input/i) as HTMLInputElement;
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.submit(form);

    expect(screen.queryByText(/Available commands/i)).not.toBeInTheDocument();
  });

  it('calls onClose on exit command', () => {
    const onClose = vi.fn();
    render(<Terminal isOpen={true} onClose={onClose} />);

    const input = screen.getByLabelText(/Terminal command input/i) as HTMLInputElement;
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'exit' } });
    fireEvent.submit(form);

    expect(onClose).toHaveBeenCalled();
  });
});
