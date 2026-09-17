/**
 * Fresnel Glint & Rim Light GLSL Functions
 */
export const fresnelVertexShader = `
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const fresnelFragmentShader = `
uniform vec3 uColor;
uniform vec3 uRimColor;
uniform float uFresnelBias;
uniform float uFresnelScale;
uniform float uFresnelPower;

varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = uFresnelBias + uFresnelScale * pow(1.0 - max(dot(viewDir, vNormal), 0.0), uFresnelPower);
  
  vec3 finalColor = mix(uColor, uRimColor, clamp(fresnel, 0.0, 1.0));
  gl_FragColor = vec4(finalColor, clamp(fresnel * 0.85, 0.2, 0.9));
}
`;
