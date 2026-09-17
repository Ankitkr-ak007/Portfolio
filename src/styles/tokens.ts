/**
 * Centralized Design System Tokens for Ankit Kumar's Portfolio
 * 10% Spectacle / 90% Precision
 */

export const tokens = {
  colors: {
    bg: {
      base: '#030407',
      surface: '#0A0D14',
      elevated: '#10141E',
      overlay: 'rgba(3, 4, 7, 0.92)',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#475569',
      dim: '#334155',
    },
    accent: {
      blue: '#78AFFF',
      highlight: '#B7D7FF',
      cyan: '#38BDF8',
      warm: '#F59E0B',
    },
    border: {
      hairline: 'rgba(255, 255, 255, 0.07)',
      subtle: 'rgba(120, 175, 255, 0.12)',
      active: 'rgba(120, 175, 255, 0.35)',
      glow: 'rgba(120, 175, 255, 0.5)',
    },
  },
  typography: {
    display: "'Inter', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Source Code Pro', monospace",
  },
  radii: {
    none: '0px',
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  zIndex: {
    background: 0,
    atmosphere: 1,
    content: 10,
    floatingNav: 40,
    overlay: 50,
    modal: 60,
    cursor: 100,
  },
  motion: {
    fast: '150ms',
    normal: '300ms',
    slow: '800ms',
  },
  threeD: {
    fov: 50,
    dprMax: 1.5,
  },
} as const;

export type Tokens = typeof tokens;
