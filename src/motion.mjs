export const limits = Object.freeze({ yaw: 0.36, pitch: 0.17 });
export const clamp = (n, low, high) => Math.max(low, Math.min(high, n));
export function pointerRotation(x, y, width, height) {
  return {
    yaw: clamp((x / Math.max(width, 1) - 0.5) * 2, -1, 1) * limits.yaw,
    pitch: clamp((y / Math.max(height, 1) - 0.5) * 2, -1, 1) * limits.pitch,
  };
}
export function damp(current, target, dt, lambda = 5) {
  return current + (target - current) * (1 - Math.exp(-lambda * Math.max(0, Math.min(dt, 0.1))));
}
