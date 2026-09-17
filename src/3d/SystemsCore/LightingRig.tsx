import React from 'react';

export const LightingRig: React.FC = () => {
  return (
    <group>
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 12, 6]} intensity={1.4} color="#B7D7FF" />
      <pointLight position={[-8, -8, -6]} intensity={0.9} color="#78AFFF" />
      <pointLight position={[0, 4, -4]} intensity={0.6} color="#38BDF8" />
    </group>
  );
};
