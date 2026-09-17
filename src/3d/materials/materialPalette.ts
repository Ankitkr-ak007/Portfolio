import * as THREE from 'three';

/**
 * Authored PBR Material Vocabulary for Systems Core & 3D Engineering Views
 */

export const materials = {
  // Deep Dark Graphite
  graphite: new THREE.MeshStandardMaterial({
    color: '#0A0D14',
    roughness: 0.85,
    metalness: 0.1,
  }),

  // Precision Anodized Metal
  anodizedMetal: new THREE.MeshStandardMaterial({
    color: '#10141E',
    roughness: 0.2,
    metalness: 0.95,
  }),

  // Crystalline Electric Blue Core
  crystallineCore: new THREE.MeshStandardMaterial({
    color: '#0A0D14',
    emissive: '#78AFFF',
    emissiveIntensity: 0.5,
    roughness: 0.15,
    metalness: 0.9,
  }),

  // Luminous Electric Wireframe
  luminousWireframe: new THREE.MeshBasicMaterial({
    color: '#78AFFF',
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  }),

  // Subtle Orbital Glow Ring
  orbitalRing: new THREE.MeshBasicMaterial({
    color: '#B7D7FF',
    transparent: true,
    opacity: 0.55,
  }),

  // Amber Systems Node (Rust Systems)
  amberSystemsNode: new THREE.MeshStandardMaterial({
    color: '#10141E',
    emissive: '#F59E0B',
    emissiveIntensity: 0.45,
    roughness: 0.2,
    metalness: 0.9,
  }),
};
