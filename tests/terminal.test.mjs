import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';

function fixture() {
  function element() {
    const listeners = new Map();
    const attributes = new Map();
    const classes = new Set();
    return {
      hidden: true, textContent: '', dataset: {}, value: '',
      classList: { add: value => classes.add(value), toggle: (value, active) => active ? classes.add(value) : classes.delete(value), contains: value => classes.has(value) },
      setAttribute: (key, value) => attributes.set(key, value),
      getAttribute: key => attributes.get(key) ?? null,
      removeAttribute: key => attributes.delete(key),
      hasAttribute: key => attributes.has(key),
      addEventListener(type, handler) { if (!listeners.has(type)) listeners.set(type, []); listeners.get(type).push(handler); },
      dispatchEvent(event) { for (const handler of listeners.get(event.type) ?? []) handler(event); },
      focus() { this.focused = true; }, scrollIntoView() {}, setSelectionRange() {}
    };
  }
  const [terminal, form, input, gallery, photo, response, help, file, position] = Array.from({ length: 9 }, element);
  const thumbnails = Array.from({ length: 6 }, element);
  gallery.querySelectorAll = () => thumbnails;
  class Button {
    constructor(dataset) { this.dataset = dataset; }
    closest() { return this; }
  }
  file.textContent = 'shell';
  const selectors = { '[data-terminal-form]': form, '[data-cat-gallery]': gallery, '[data-cat-photo]': photo, '[data-terminal-result]': response, '[data-terminal-help]': help, '[data-terminal-file]': file, '[data-cat-position]': position, input };
  for (const node of [terminal, form, gallery]) node.querySelector = selector => selectors[selector];
  const puffPhotos = Array.from({ length: 6 }, (_, i) => ({ src: `puff-${i + 1}.jpg`, alt: `Puff ${i + 1}` }));
  photo.src = puffPhotos[0].src;
  let discoveries = 0;
  terminal.addEventListener('terminal:puff', () => discoveries++);
  const source = readFileSync(new URL('../src/scripts/terminal.ts', import.meta.url), 'utf8').replace(/^import .*?;\n/, '');
  runInNewContext(stripTypeScriptTypes(source), {
    document: { querySelector: () => terminal },
    window: { matchMedia: () => ({ matches: true }) }, puffPhotos, Event, Element: Button
  });
  return {
    terminal, input, gallery, photo, response, help, file, position, thumbnails,
    discoveries: () => discoveries,
    hint() { terminal.dispatchEvent(new Event('terminal:hint')); },
    type(command) { input.value = command; form.dispatchEvent({ type: 'submit', preventDefault() {} }); },
    clickPhoto(dataset) { gallery.dispatchEvent({ type: 'click', target: new Button(dataset) }); },
    photoKey(key) { gallery.dispatchEvent({ type: 'keydown', key, preventDefault() {} }); }
  };
}

test('YUKI hint highlights and focuses the terminal without opening photos or changing a draft', () => {
  const s = fixture();
  s.input.value = 'unfinished command';
  s.hint();
  assert.equal(s.terminal.hasAttribute('data-terminal-highlighted'), true);
  assert.equal(s.input.focused, true);
  assert.equal(s.input.value, 'unfinished command');
  assert.equal(s.gallery.hidden, true);
  assert.equal(s.file.textContent, 'shell');
  assert.equal(s.response.dataset.kind, 'hint');
  assert.equal(s.response.classList.contains('sr-only'), false);
  assert.match(s.response.textContent, /Type cat/);
  assert.equal(s.discoveries(), 0);
});

test('typed commands reveal help and photos, and navigate with wraparound', () => {
  const s = fixture();
  s.type('help');
  assert.equal(s.help.hidden, false);
  assert.equal(s.gallery.hidden, true);
  s.type('cat');
  assert.equal(s.help.hidden, true);
  assert.equal(s.gallery.hidden, false);
  assert.equal(s.discoveries(), 1);
  s.type('prev');
  assert.equal(s.position.textContent, '6 of 6');
  s.type('next');
  assert.equal(s.position.textContent, '1 of 6');
  s.type('cat 3');
  assert.equal(s.photo.src, 'puff-3.jpg');
  assert.equal(s.discoveries(), 1);
});

test('clear removes the highlight, hint, help, and photos', () => {
  const s = fixture();
  s.hint();
  s.type('cat');
  s.type('clear');
  assert.equal(s.terminal.hasAttribute('data-terminal-highlighted'), false);
  assert.equal(s.gallery.hidden, true);
  assert.equal(s.help.hidden, true);
  assert.equal(s.response.hidden, true);
  assert.equal(s.file.textContent, 'shell');
});

test('a hint preserves an existing photo and terminal clicks do not execute commands', () => {
  const s = fixture();
  s.terminal.dispatchEvent({ type: 'click', target: { dataset: { terminalCommand: 'cat' } } });
  assert.equal(s.gallery.hidden, true);
  s.type('cat 4');
  s.hint();
  assert.equal(s.photo.src, 'puff-4.jpg');
  assert.equal(s.position.textContent, '4 of 6');
  assert.equal(s.discoveries(), 1);
});

test('gallery controls work after a typed command but cannot reveal hidden photos', () => {
  const s = fixture();
  s.clickPhoto({ catIndex: '3' });
  s.photoKey('ArrowRight');
  assert.equal(s.gallery.hidden, true);
  assert.equal(s.discoveries(), 0);
  s.type('cat');
  s.clickPhoto({ catIndex: '3' });
  assert.equal(s.photo.src, 'puff-4.jpg');
  assert.equal(s.thumbnails[3].getAttribute('aria-pressed'), 'true');
  assert.equal(s.thumbnails[0].getAttribute('aria-pressed'), 'false');
  s.clickPhoto({ catDirection: 'next' });
  assert.equal(s.position.textContent, '5 of 6');
  s.clickPhoto({ catDirection: 'prev' });
  s.photoKey('ArrowLeft');
  assert.equal(s.position.textContent, '3 of 6');
  s.type('clear');
  s.clickPhoto({ catIndex: '1' });
  assert.equal(s.gallery.hidden, true);
});
