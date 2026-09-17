import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Project3DVisualProps {
  type: 'kalki-core' | 'agent-dag' | 'rust-systems' | 'topology-particles';
  interactive?: boolean;
}

const KalkiCoreMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.position.y = Math.sin(timeRef.current * 2) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner Crystal Core */}
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#0A0D14" emissive="#78AFFF" emissiveIntensity={0.6} roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Wireframe Shield */}
      <mesh>
        <octahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial color="#78AFFF" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Outer Orbital Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshBasicMaterial color="#B7D7FF" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const AgentDagMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.z = Math.sin(timeRef.current * 1.5) * 0.15;
    }
  });

  const nodePositions: [number, number, number][] = useMemo(() => [
    [0, 1.2, 0],
    [-1.2, -0.6, 0.6],
    [1.2, -0.6, 0.6],
    [0, -0.6, -1.2],
  ], []);

  return (
    <group ref={groupRef}>
      {/* Central Orchestrator */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color="#0A0D14" emissive="#78AFFF" emissiveIntensity={0.8} />
      </mesh>
      {/* Satellite Sub-Agents */}
      {nodePositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <boxGeometry args={[0.35, 0.35, 0.35]} />
            <meshStandardMaterial color="#10141E" emissive="#B7D7FF" emissiveIntensity={0.6} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const RustSystemsMesh: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.3;
      groupRef.current.rotation.y += delta * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.5, 0.35, 16, 48]} />
        <meshStandardMaterial color="#0E121B" emissive="#78AFFF" emissiveIntensity={0.3} roughness={0.15} metalness={0.95} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#10141E" emissive="#F59E0B" emissiveIntensity={0.4} roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.85, 0.85, 0.85]} />
        <meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

const STATIC_TOPOLOGY_PARTICLES = (() => {
  const count = 120;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.sin(i * 0.3) * 2.2);
    positions[i * 3 + 1] = (Math.cos(i * 0.5) * 2.2);
    positions[i * 3 + 2] = (Math.sin(i * 0.7) * 2.2);
  }
  return positions;
})();

const TopologyParticlesMesh: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.2;
      pointsRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STATIC_TOPOLOGY_PARTICLES, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#78AFFF" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

export const Project3DVisual: React.FC<Project3DVisualProps> = ({ type }) => {
  const renderGeometry = () => {
    switch (type) {
      case 'kalki-core':
        return <KalkiCoreMesh />;
      case 'agent-dag':
        return <AgentDagMesh />;
      case 'rust-systems':
        return <RustSystemsMesh />;
      case 'topology-particles':
        return <TopologyParticlesMesh />;
      default:
        return <KalkiCoreMesh />;
    }
  };

  return (
    <div className="w-full h-full min-h-[220px] relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#B7D7FF" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#78AFFF" />
        <React.Suspense fallback={null}>
          {renderGeometry()}
        </React.Suspense>
      </Canvas>
    </div>
  );
};
