import React from 'react';

export const CoreGeometry: React.FC = () => {
  return (
    <group>
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
    </group>
  );
};
