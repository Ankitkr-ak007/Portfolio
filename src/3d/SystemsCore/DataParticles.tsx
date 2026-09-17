import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';

const PARTICLE_COUNT = 160;

function createParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  return positions;
}

export const DataParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlePositions = useMemo(() => createParticlePositions(PARTICLE_COUNT), []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#78AFFF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};
