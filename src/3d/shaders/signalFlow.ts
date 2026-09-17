/**
 * Signal Flow & Traveling Pulse Shader
 */
export const signalFlowShader = {
  vertexShader: `
    uniform float uTime;
    attribute float aProgress;
    varying float vProgress;

    void main() {
      vProgress = aProgress;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uBaseColor;
    uniform vec3 uPulseColor;
    uniform float uSpeed;
    varying float vProgress;

    void main() {
      float pulse = fract(vProgress - uTime * uSpeed);
      float intensity = smoothstep(0.0, 0.15, pulse) * (1.0 - smoothstep(0.15, 0.5, pulse));
      vec3 color = mix(uBaseColor, uPulseColor, intensity * 2.0);
      gl_FragColor = vec4(color, clamp(intensity + 0.3, 0.0, 1.0));
    }
  `
};
