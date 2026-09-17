import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectedWork } from './SelectedWork';

describe('SelectedWork Component', () => {
  it('renders project list and systems archive header', () => {
    render(<SelectedWork onCursorHover={vi.fn()} />);
    expect(screen.getByText(/FEATURED SYSTEMS/i)).toBeInTheDocument();
    expect(screen.getByText(/PROJECT ARCHIVE/i)).toBeInTheDocument();
    expect(screen.getByText(/KALKI VISION/i)).toBeInTheDocument();
  });

  it('opens case study modal when a project card is clicked', () => {
    render(<SelectedWork onCursorHover={vi.fn()} />);
    const kalkiCard = screen.getByText(/KALKI VISION/i).closest('.group');
    expect(kalkiCard).toBeInTheDocument();

    fireEvent.click(kalkiCard!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/SYSTEM \/\//i)).toBeInTheDocument();
  });
});
