# Design System & Token Specifications

## 1. Design Philosophy

The design system for Ankit Kumar's engineering portfolio represents a **high-precision industrial aesthetic**:
- **Obsidian Dark Foundation**: Deep cinematic blacks with subtle structural luminance.
- **Signal Blue Accents**: High-frequency electric cyan and azure accents signifying computational power and telemetry.
- **Monospaced Data Overlays**: Technical metadata, coordinates, and version tags in crisp monospace fonts.
- **Tactile Physics**: Snappy spring interactions and magnetic cursor tracking.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Backgrounds & Surfaces
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `bg-primary` | `#030407` | Deep root page background |
| `bg-surface` | `#0A0D14` | Primary card and container surfaces |
| `bg-surface-elevated`| `#10141E` | Dropdowns, command palettes, terminal shells |
| `bg-surface-active` | `#161D2B` | Active tabs, hover states, selected nodes |

### 2.2 Accents & Signal Colors
| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `accent-primary` | `#78AFFF` | Electric azure — primary CTAs, active indicators, shaders |
| `accent-secondary`| `#B7D7FF` | Soft cyan — supporting highlights and badges |
| `accent-tertiary` | `#38BDF8` | Sky blue — architecture nodes and data pipelines |
| `accent-amber` | `#F59E0B` | Warning and fault injection metrics |
| `accent-emerald` | `#10B981` | System online indicators and success signals |

### 2.3 Typography Colors
| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `text-primary` | `#F8FAFC` | High-contrast headings and active labels |
| `text-secondary` | `#94A3B8` | Body copy, descriptions, and metadata |
| `text-muted` | `#475569` | Decorative labels, borders, and timestamps |

---

## 3. Typography Scale & Hierarchy

### 3.1 Font Families
- **Display & Headings**: `font-sans` (`Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`)
- **Technical & Metadata**: `font-mono` (`JetBrains Mono`, `Fira Code`, `ui-monospace`, `Menlo`, `monospace`)

### 3.2 Type Scale
- **Hero Title**: `text-4xl` to `text-8xl` (`font-black`, `tracking-tighter`, `uppercase`)
- **Section Heading**: `text-3xl` to `text-6xl` (`font-black`, `tracking-tight`, `uppercase`)
- **Subheadings**: `text-xl` to `text-3xl` (`font-bold`, `tracking-tight`)
- **Body Large**: `text-base` to `text-lg` (`font-normal`, `leading-relaxed`, `text-[#94A3B8]`)
- **Body Regular**: `text-sm` (`font-normal`, `leading-relaxed`)
- **Monospace Metadata**: `text-xs` / `text-[11px]` / `text-[10px]` (`font-mono`, `tracking-widest`, `uppercase`)

---

## 4. Surfaces, Borders & Elevation

- **Card Borders**: `border border-[rgba(255,255,255,0.07)]`
- **Hover Borders**: `hover:border-[#78AFFF]` or `hover:border-[rgba(120,175,255,0.4)]`
- **Glow Shadows**: `shadow-[0_0_60px_rgba(0,0,0,0.95)]` and `shadow-[0_0_30px_rgba(120,175,255,0.2)]`
- **Backdrop Blurs**: `backdrop-blur-md` (8px) and `backdrop-blur-xl` (16px) for navigation headers and modals.

---

## 5. Micro-Interactions & Cursor States

### 5.1 Custom Cursor Variants
- `default`: Minimal 6px dot with smooth spring trailing.
- `project`: Expanded pill with label `"CASE STUDY"`.
- `button`: Magnetic snap with label `"EXECUTE"`.
- `link`: Circle indicator with label `"VISIT"`.
- `3d`: Crosshair inspection cursor.
- `hidden`: Hidden automatically on touch devices.

### 5.2 Magnetic Buttons
Interactive buttons and icons utilize the `<Magnetic strength={0.25}>` wrapper, physically attracting toward pointer proximity with spring physics.
