import { test } from 'node:test';
import assert from 'node:assert/strict';
import { syncWorkspaceTabs } from '../src/scripts/workspace-tabs.ts';

function fixture() {
  const bar = {
    children: [], moves: 0, hidden: false,
    get lastElementChild() { return this.children.at(-1) ?? null; },
    insertBefore(item, current) {
      this.moves++;
      this.children.splice(this.children.indexOf(item), 1);
      const index = current ? this.children.indexOf(current) : this.children.length;
      this.children.splice(index, 0, item);
    }
  };
  const items = ['about', 'work', 'research', 'resume', 'github', 'message'].map(id => ({
    dataset: { tabFile: id }, hidden: id === 'message',
    get nextElementSibling() { return bar.children[bar.children.indexOf(this) + 1] ?? null; },
    get previousElementSibling() { return bar.children[bar.children.indexOf(this) - 1] ?? null; }
  }));
  bar.children = [...items];
  return { bar, items, visible: () => bar.children.filter(item => !item.hidden).map(item => item.dataset.tabFile) };
}

test('repeated active-file changes do not detach or move existing tabs', () => {
  const { bar, items } = fixture();
  const open = ['about', 'work', 'research', 'resume', 'github'];
  const nodes = [...bar.children];
  for (let i = 0; i < 10; i++) syncWorkspaceTabs(bar, items, open);
  assert.equal(bar.moves, 0);
  assert.deepEqual(bar.children, nodes);
});

test('restored tab order is reconciled once and then stays stable', () => {
  const { bar, items, visible } = fixture();
  const open = ['about', 'research', 'work', 'github', 'resume'];
  syncWorkspaceTabs(bar, items, open);
  assert.deepEqual(visible(), open);
  const moves = bar.moves;
  syncWorkspaceTabs(bar, items, open);
  assert.equal(bar.moves, moves);
});

test('closing and reopening puts the reopened tab at the end', () => {
  const { bar, items, visible } = fixture();
  const open = ['about', 'research', 'resume', 'github'];
  syncWorkspaceTabs(bar, items, open);
  assert.equal(bar.moves, 0);
  syncWorkspaceTabs(bar, items, [...open, 'work']);
  assert.deepEqual(visible(), [...open, 'work']);
  assert.equal(bar.moves, 1);
});

test('an empty tab bar can reopen the message file', () => {
  const { bar, items, visible } = fixture();
  syncWorkspaceTabs(bar, items, []);
  assert.equal(bar.hidden, true);
  syncWorkspaceTabs(bar, items, ['message']);
  assert.equal(bar.hidden, false);
  assert.deepEqual(visible(), ['message']);
  const moves = bar.moves;
  syncWorkspaceTabs(bar, items, ['message']);
  assert.equal(bar.moves, moves);
});
