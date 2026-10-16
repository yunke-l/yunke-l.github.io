import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nearestGuideEdge } from '../src/scripts/guide-position.ts';

test('dragging near each edge selects that edge', () => {
  for (const [edge, left, top] of [['left', 16, 300], ['right', 908, 300], ['top', 400, 16], ['bottom', 400, 704]]) {
    assert.equal(nearestGuideEdge({ left, right: left + 76, top, bottom: top + 80 }, 1000, 800, 24), edge);
  }
});

test('a drag released in the interior leaves YUKI floating', () => {
  assert.equal(nearestGuideEdge({ left: 400, right: 476, top: 300, bottom: 380 }, 1000, 800, 24), null);
});

test('menu docking chooses the closest edge even outside the drag threshold', () => {
  assert.equal(nearestGuideEdge({ left: 300, right: 376, top: 100, bottom: 180 }, 1000, 800), 'top');
});

test('corners select a closest edge consistently', () => {
  const corner = { left: 16, right: 92, top: 16, bottom: 96 };
  assert.equal(nearestGuideEdge(corner, 1000, 800, 24), 'left');
});
