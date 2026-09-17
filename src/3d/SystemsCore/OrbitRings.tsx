import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';

export const OrbitRings: React.FC = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
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
  });

  return (
    <group>
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
    </group>
  );
};
