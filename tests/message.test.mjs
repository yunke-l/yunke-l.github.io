import { test } from 'node:test';
import assert from 'node:assert/strict';

let sequence = 0;
async function setup(t, { saved = null, storageFails = false } = {}) {
  const originals = Object.fromEntries(['document', 'sessionStorage', 'FormData', 'fetch'].map(key => [key, globalThis[key]]));
  t.after(() => { Object.assign(globalThis, originals); });
  const storage = new Map(saved === null ? [] : [['yunke.message.draft.v1', saved]]);
  const fields = Object.fromEntries(['name', 'email', 'message', '_honey'].map(name => [name, {
    name, value: '', maxLength: name === 'message' ? 5000 : name === 'name' ? 100 : 254,
    readOnly: false, setCustomValidity(value) { this.validation = value; },
    reportValidity() { this.reported = true; }, addEventListener() {}
  }]));
  const element = () => ({ textContent: '', attributes: {}, setAttribute(key, value) { this.attributes[key] = value; }, removeAttribute(key) { delete this.attributes[key]; } });
  const selectors = Object.fromEntries(['send', 'status', 'count'].map(key => [`[data-message-${key}]`, element()]));
  selectors['[data-send-label]'] = element();
  const listeners = {};
  const form = {
    elements: { namedItem: name => fields[name] },
    dataset: { ajaxEndpoint: 'https://example.invalid/mail' },
    querySelector: selector => selectors[selector],
    addEventListener: (event, handler) => { listeners[event] = handler; },
    reset: () => Object.values(fields).forEach(field => { field.value = ''; }),
    setAttribute() {}, removeAttribute() {}
  };
  globalThis.document = { querySelector: () => form };
  globalThis.sessionStorage = {
    getItem(key) { if (storageFails) throw new Error('Blocked'); return storage.get(key) ?? null; },
    setItem(key, value) { if (storageFails) throw new Error('Blocked'); storage.set(key, value); },
    removeItem: key => storage.delete(key)
  };
  globalThis.FormData = class { constructor() { this.data = Object.fromEntries(Object.values(fields).map(field => [field.name, field.value])); } };
  const calls = [];
  let reply = async () => ({ ok: true, json: async () => ({ success: 'true' }) });
  globalThis.fetch = (...args) => { calls.push(args); return reply(...args); };
  await import(`../src/scripts/message.ts?test=${sequence++}`);
  return {
    fields, selectors, storage, calls,
    input(values) { Object.entries(values).forEach(([key, value]) => { fields[key].value = value; }); listeners.input(); },
    submit: () => listeners.submit({ preventDefault() {} }),
    setReply: fn => { reply = fn; },
    status: selectors['[data-message-status]'], button: selectors['[data-message-send]']
  };
}

test('accepted submission sends the fields once and clears the draft', async t => {
  const s = await setup(t);
  s.input({ name: 'Test Visitor', email: 'visitor@example.invalid', message: 'Hello Yunke!' });
  await s.submit();
  assert.equal(s.calls.length, 1);
  assert.equal(s.calls[0][0], 'https://example.invalid/mail');
  assert.equal(s.calls[0][1].body.data.message, 'Hello Yunke!');
  assert.equal(s.fields.message.value, '');
  assert.equal(s.storage.has('yunke.message.draft.v1'), false);
  assert.match(s.status.textContent, /Message submitted/);
  assert.equal(s.button.disabled, false);
});

test('failed responses keep the draft and restore editable fields', async t => {
  const s = await setup(t);
  s.input({ message: 'Please keep this draft.' });
  for (const response of [
    async () => ({ ok: false, json: async () => ({ success: true }) }),
    async () => ({ ok: true, json: async () => ({ success: 'false' }) }),
    async () => ({ ok: true, json: async () => ({}) }),
    async () => { throw new Error('Offline'); }
  ]) {
    s.setReply(response);
    await s.submit();
    assert.equal(s.fields.message.value, 'Please keep this draft.');
    assert.equal(s.status.attributes['data-error'], 'true');
    assert.equal(s.fields.message.readOnly, false);
    assert.equal(s.button.disabled, false);
  }
  s.input({ message: 'A revised draft' });
  assert.equal(s.status.textContent, '');
});

test('in-flight submissions cannot be duplicated', async t => {
  const s = await setup(t);
  s.input({ message: 'Hello!' });
  let resolve;
  s.setReply(() => new Promise(done => { resolve = done; }));
  const pending = s.submit();
  assert.equal(s.button.disabled, true);
  assert.equal(s.fields.message.readOnly, true);
  await s.submit();
  assert.equal(s.calls.length, 1);
  resolve({ ok: true, json: async () => ({ success: true }) });
  await pending;
});

test('whitespace messages and populated honeypots never send', async t => {
  const s = await setup(t);
  s.input({ message: ' \n ' });
  await s.submit();
  assert.equal(s.fields.message.reported, true);
  s.input({ message: 'Hello', _honey: 'bot' });
  await s.submit();
  assert.equal(s.calls.length, 0);
});

test('saved drafts restore with length limits', async t => {
  const s = await setup(t, { saved: JSON.stringify({ name: 'Visitor', email: 7, message: 'x'.repeat(5100) }) });
  assert.equal(s.fields.name.value, 'Visitor');
  assert.equal(s.fields.email.value, '');
  assert.equal(s.fields.message.value.length, 5000);
  assert.equal(s.selectors['[data-message-count]'].textContent, '5,000 / 5,000');
});

test('the form still submits when session storage is blocked', async t => {
  const s = await setup(t, { storageFails: true });
  s.input({ message: 'Hello without storage' });
  await s.submit();
  assert.match(s.status.textContent, /Message submitted/);
});
