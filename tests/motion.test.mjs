import test from 'node:test';
import assert from 'node:assert/strict';
import { pointerRotation, limits, damp } from '../src/motion.mjs';

test('Head tracking stays within its permitted angles, including out-of-bounds pointer coordinates', () => {
  for (const x of [-5000, -1, 0, 500, 1000, 9000]) for (const y of [-3000, 0, 350, 700, 12000]) {
    const { yaw, pitch } = pointerRotation(x, y, 1000, 700);
    assert.ok(Math.abs(yaw) <= limits.yaw);
    assert.ok(Math.abs(pitch) <= limits.pitch);
  }
  assert.deepEqual(pointerRotation(500, 350, 1000, 700), { yaw: 0, pitch: 0 });
  assert.ok(pointerRotation(0, 350, 1000, 700).yaw < 0);
  assert.ok(pointerRotation(1000, 350, 1000, 700).yaw > 0);
});

test('Soft return converges without overshoot at different display frame rates', () => {
  for (const fps of [30, 60, 120]) {
    let value = limits.yaw;
    for (let i = 0; i < fps * 2; i++) {
      const previous = value;
      value = damp(value, 0, 1 / fps);
      assert.ok(value >= 0 && value <= previous);
    }
    assert.ok(value < 0.0001);
  }
});

test('A resumed tab cannot jump straight to the target after a large time gap', () => {
  const result = damp(0, limits.yaw, 120);
  assert.ok(result > 0 && result < limits.yaw * 0.5);
});
