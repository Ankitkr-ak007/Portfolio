import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { SystemsCoreScene } from './SystemsCoreScene';
import { FallbackScene } from './FallbackScene';

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL Context Error, falling back to CSS 3D:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export const SystemsCoreCanvas: React.FC = () => {
  const [webglSupported] = useState<boolean>(checkWebGL);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!webglSupported) {
    return <FallbackScene />;
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <WebGLErrorBoundary fallback={<FallbackScene />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <React.Suspense fallback={null}>
            <SystemsCoreScene mousePos={mousePos} />
          </React.Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
