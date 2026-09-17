import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';

interface SystemsCoreSceneProps {
  mousePos?: { x: number; y: number };
}

export const SystemsCoreScene: React.FC<SystemsCoreSceneProps> = ({ mousePos = { x: 0, y: 0 } }) => {
  const coreRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particle positions
  const particleCount = 200;
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.15;
      
      // Mouse parallax
      coreRef.current.rotation.y += mousePos.x * 0.05 * delta;
      coreRef.current.rotation.x += mousePos.y * 0.05 * delta;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.2;
      outerRingRef.current.rotation.x += delta * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#B7D7FF" />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#78AFFF" />

      {/* Main Computational Core Group */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <group ref={coreRef}>
          {/* Inner Crystalline Processor */}
          <mesh>
            <icosahedronGeometry args={[1.6, 0]} />
            <meshStandardMaterial
              color="#0A0D12"
              emissive="#78AFFF"
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.9}
              wireframe={false}
            />
          </mesh>

          {/* Wireframe Holographic Overlay */}
          <mesh>
            <icosahedronGeometry args={[1.62, 1]} />
            <meshBasicMaterial color="#78AFFF" wireframe transparent opacity={0.3} />
          </mesh>

          {/* Core Energy Center */}
          <mesh>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshBasicMaterial color="#B7D7FF" />
          </mesh>

          {/* Orbiting Ring 1 */}
          <mesh ref={outerRingRef}>
            <torusGeometry args={[2.5, 0.02, 16, 100]} />
            <meshBasicMaterial color="#78AFFF" transparent opacity={0.6} />
          </mesh>

          {/* Orbiting Ring 2 */}
          <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
            <torusGeometry args={[3.2, 0.015, 16, 100]} />
            <meshBasicMaterial color="#B7D7FF" transparent opacity={0.4} />
          </mesh>
        </group>
      </Float>

      {/* Background Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#78AFFF"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
