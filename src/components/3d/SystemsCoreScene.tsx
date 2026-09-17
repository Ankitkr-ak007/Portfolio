import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SystemsCoreSceneProps {
  mousePos?: { x: number; y: number };
}

const PARTICLE_COUNT = 200;
function createParticlePositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  return positions;
}

export const SystemsCoreScene: React.FC<SystemsCoreSceneProps> = ({ mousePos = { x: 0, y: 0 } }) => {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const orbitalNodesRef = useRef<THREE.Group>(null);

  const timeRef = useRef(0);

  const isReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const particlePositions = useMemo(() => createParticlePositions(PARTICLE_COUNT), []);

  useFrame((_, delta) => {
    if (isReducedMotion) return;

    timeRef.current += delta;

    if (coreRef.current) {
      // Floating physical oscillation
      coreRef.current.position.y = Math.sin(timeRef.current * 1.4) * 0.12;

      // Base continuous rotation
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.12;

      // Smooth mouse parallax damping
      coreRef.current.rotation.y += (mousePos.x * 0.4 - coreRef.current.rotation.y * 0.05) * delta;
      coreRef.current.rotation.x += (-mousePos.y * 0.4 - coreRef.current.rotation.x * 0.05) * delta;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z -= delta * 0.2;
      ring1Ref.current.rotation.x += delta * 0.08;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.22;
      ring2Ref.current.rotation.z += delta * 0.12;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.18;
    }

    if (orbitalNodesRef.current) {
      orbitalNodesRef.current.rotation.y += delta * 0.3;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <group>
      {/* Volumetric Atmosphere Lights */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 12, 6]} intensity={1.4} color="#B7D7FF" />
      <pointLight position={[-8, -8, -6]} intensity={0.9} color="#78AFFF" />
      <pointLight position={[0, 4, -4]} intensity={0.6} color="#38BDF8" />

      {/* Main Core Architecture */}
      <group ref={coreRef}>
        {/* Layer 1: Inner Crystalline Core */}
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color="#0A0D14"
            emissive="#78AFFF"
            emissiveIntensity={0.45}
            roughness={0.15}
            metalness={0.92}
          />
        </mesh>

        {/* Layer 2: Wireframe Structural Cage */}
        <mesh>
          <icosahedronGeometry args={[1.52, 1]} />
          <meshBasicMaterial color="#78AFFF" wireframe transparent opacity={0.32} />
        </mesh>

        {/* Layer 3: Glowing Inner Energy Sphere */}
        <mesh>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshBasicMaterial color="#B7D7FF" />
        </mesh>

        {/* Layer 4: Orbital Ring 1 (Electric Blue) */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.4, 0.022, 16, 90]} />
          <meshBasicMaterial color="#78AFFF" transparent opacity={0.65} />
        </mesh>

        {/* Layer 5: Orbital Ring 2 (Secondary Glow) */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
          <torusGeometry args={[3.0, 0.016, 16, 90]} />
          <meshBasicMaterial color="#B7D7FF" transparent opacity={0.45} />
        </mesh>

        {/* Layer 6: Outer Boundary Ring */}
        <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[3.5, 0.012, 16, 90]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.3} />
        </mesh>

        {/* Layer 7: Orbiting Data Nodes */}
        <group ref={orbitalNodesRef}>
          <mesh position={[2.4, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#78AFFF" />
          </mesh>
          <mesh position={[-2.4, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#B7D7FF" />
          </mesh>
          <mesh position={[0, 2.4, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
        </group>
      </group>

      {/* Dynamic Background Particle Field */}
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
