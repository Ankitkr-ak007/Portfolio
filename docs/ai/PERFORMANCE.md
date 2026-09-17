# PERFORMANCE ARCHITECTURE & FRAME BUDGETS

<!-- BEGIN HUMAN -->
## 1. PERFORMANCE BUDGETS
* **Main Entry JS Chunk**: < 350 kB (Currently ~322 kB)
* **Target FPS**: 60 FPS on desktop, 30-60 FPS on mobile
* **3D Particle Budget**: 180 particles max in hero scene
* **WebGL DPR Limit**: `dpr={[1, 2]}` clamp

## 2. CODE SPLITTING & ASSET OPTIMIZATION
* Manual chunking configured in `vite.config.ts`:
  * `vendor-three`: Three.js & React Three Fiber (~896 kB)
  * `vendor-motion`: Motion animation runtime (~126 kB)
  * `vendor-icons`: Lucide React icon suite (~18 kB)
* Lazy loaded overlays: `Terminal` and `CommandPalette` dynamically imported on demand.
<!-- END HUMAN -->
