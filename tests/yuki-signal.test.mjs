import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createYukiSignal } from '../src/scripts/yuki-signal.ts';

test('recognizes the YUKI signal once, case-insensitively', () => {
  const signal = createYukiSignal();
  assert.deepEqual([..."Yuki"].map((key, i) => signal(key, 100 + i * 100)), [false, false, false, true]);
  assert.equal(signal('i', 600), false);
});

test('typing in a field or using a shortcut discards the sequence', () => {
  const signal = createYukiSignal();
  signal('y', 100);
  signal('u', 200);
  assert.equal(signal('k', 300, true), false);
  assert.equal(signal('i', 400), false);
  for (const key of 'yuki') assert.equal(signal(key, 500, true), false);
});

test('a long pause or navigation key interrupts the secret', () => {
  const signal = createYukiSignal();
  signal('y', 100);
  signal('u', 200);
  signal('k', 300);
  assert.equal(signal('i', 2400), false);
  signal('y', 2500);
  signal('u', 2600);
  signal('Escape', 2700);
  signal('k', 2800);
  assert.equal(signal('i', 2900), false);
});
