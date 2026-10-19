import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { workspaceFiles } from '../src/data/workspace.ts';

// Build first: every entry must contain every file so tab switches can reuse
// the current document instead of navigating to a missing pane's HTML page.
for (const route of ['index.html', 'resume/index.html', 'github/index.html']) {
  test(`${route} includes every workspace file for in-page navigation`, async () => {
    const html = await readFile(new URL(`../dist/${route}`, import.meta.url), 'utf8');
    const panes = [...html.matchAll(/<section\b[^>]*>/g)]
      .map(match => match[0])
      .filter(tag => /\bdata-workspace-pane(?:\s|=|>)/.test(tag))
      .map(tag => tag.match(/\bid="([^"]+)"/)?.[1]);
    assert.deepEqual([...panes].sort(), workspaceFiles.map(file => file.id).sort());
  });
}
