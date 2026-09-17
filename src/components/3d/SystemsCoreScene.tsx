import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SystemsCoreSceneProps {
  mousePos?: { x: number; y: number };
}

// Static Float32Array particle positions generator (180 particles)
const PARTICLE_COUNT = 180;
function createParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 11;
  }
  return positions;
}

export const SystemsCoreScene: React.FC<SystemsCoreSceneProps> = ({ mousePos = { x: 0, y: 0 } }) => {
  const coreRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Time tracking for float animation without THREE.Clock deprecation
  const timeRef = useRef(0);

  // Check reduced motion
  const isReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const particlePositions = useMemo(() => createParticlePositions(PARTICLE_COUNT), []);

  useFrame((_, delta) => {
    if (isReducedMotion) return;

    timeRef.current += delta;

    if (coreRef.current) {
      // Procedural floating oscillation
      coreRef.current.position.y = Math.sin(timeRef.current * 1.5) * 0.15;

      coreRef.current.rotation.y += delta * 0.22;
      coreRef.current.rotation.x += delta * 0.12;
      
      // Mouse parallax
      coreRef.current.rotation.y += mousePos.x * 0.04 * delta;
      coreRef.current.rotation.x += mousePos.y * 0.04 * delta;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.18;
      outerRingRef.current.rotation.x += delta * 0.08;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group>
      {/* Balanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#B7D7FF" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#78AFFF" />

      {/* Main Core Group */}
      <group ref={coreRef}>
        {/* Inner Crystalline Processor */}
        <mesh>
          <icosahedronGeometry args={[1.6, 0]} />
          <meshStandardMaterial
            color="#0A0D12"
            emissive="#78AFFF"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Wireframe Holographic Geometry */}
        <mesh>
          <icosahedronGeometry args={[1.62, 1]} />
          <meshBasicMaterial color="#78AFFF" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Glowing Center Core */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial color="#B7D7FF" />
        </mesh>

        {/* Orbiting Ring 1 */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[2.5, 0.02, 16, 80]} />
          <meshBasicMaterial color="#78AFFF" transparent opacity={0.6} />
        </mesh>

        {/* Orbiting Ring 2 */}
        <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
          <torusGeometry args={[3.2, 0.015, 16, 80]} />
          <meshBasicMaterial color="#B7D7FF" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Background Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#78AFFF"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
