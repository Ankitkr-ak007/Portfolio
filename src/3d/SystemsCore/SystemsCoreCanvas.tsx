import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { SystemsCoreScene } from './SystemsCoreScene';
import { FallbackScene } from '../fallbacks/FallbackScene';
import { WebGLErrorBoundary } from '../fallbacks/WebGLErrorBoundary';
import { checkWebGLSupport } from '../utils/webglSupport';

export const SystemsCoreCanvas: React.FC = () => {
  const [webglSupported] = useState<boolean>(checkWebGLSupport);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
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
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          onCreated={(state) => {
            state.gl.domElement.addEventListener(
              'webglcontextlost',
              (event) => {
                event.preventDefault();
              },
              false
            );
          }}
          className="w-full h-full"
        >
          <React.Suspense fallback={null}>
            <SystemsCoreScene mousePosRef={mousePosRef} />
          </React.Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
