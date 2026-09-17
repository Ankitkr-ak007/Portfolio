import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { LightingRig } from './LightingRig';
import { CoreGeometry } from './CoreGeometry';
import { OrbitRings } from './OrbitRings';
import { SignalNodes } from './SignalNodes';
import { DataParticles } from './DataParticles';

interface SystemsCoreSceneProps {
  mousePosRef: React.RefObject<{ x: number; y: number }>;
}

export const SystemsCoreScene: React.FC<SystemsCoreSceneProps> = ({ mousePosRef }) => {
  const coreRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const isReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useFrame((_, delta) => {
    if (isReducedMotion) return;

    timeRef.current += delta;

    if (coreRef.current) {
      const mouse = mousePosRef.current || { x: 0, y: 0 };
      // Physical oscillation
      coreRef.current.position.y = Math.sin(timeRef.current * 1.4) * 0.12;

      // Base rotation
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.12;

      // Smooth pointer parallax damping without triggering React re-renders
      coreRef.current.rotation.y += (mouse.x * 0.4 - coreRef.current.rotation.y * 0.05) * delta;
      coreRef.current.rotation.x += (-mouse.y * 0.4 - coreRef.current.rotation.x * 0.05) * delta;
    }
  });

  return (
    <group>
      <LightingRig />
      <group ref={coreRef}>
        <CoreGeometry />
        <OrbitRings />
        <SignalNodes />
      </group>
      <DataParticles />
    </group>
  );
};
