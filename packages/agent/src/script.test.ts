import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Director } from './director.js';
import type { AgentRuntime } from './runtime/types.js';

/** the narration step of a three-page storyboard; `narrate(n)` is which pages the planner's n-th reply has narrated,
 *  `cues` what the narration check reads (none: nothing to say about it) */
async function script(narrate: (n: number) => string[], voiced = false, cues?: (n: number) => { id: string; cues: string[] }[]) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ft-script-'));
  fs.writeFileSync(path.join(dir, 'storyboard.json'), JSON.stringify({ title: 'T', lang: 'zh', pages: ['p01', 'p02', 'p03'].map((id) => ({ id, section: id, say: '…', beats: [] })) }));
  const sent: string[] = [];
  let narrated: string[] = [];
  const runtime: AgentRuntime = { id: 'pi', model: { provider: 'x', id: 'x' }, open: async () => ({ ref: 'r', close: async () => {}, send: async (i) => { sent.push(i.text); narrated = narrate(sent.length); return { text: 'ok', stopReason: 'done', usage: {} } as never; } }) };
  const d = new Director({ dir, style: 'chalkboard', brief: { durationSec: 60, lang: 'zh', replyLang: 'zh', ...(voiced ? { voice: 'volcengine' as const } : {}) }, runtime });
  Object.assign(d.project, { scriptCheck: async () => ({ code: 0, out: 'ok', err: '' }), timeline: async () => ({ pages: narrated.map((id) => ({ id })) }), commit: async () => undefined });
  Object.assign(d as object, { serverMeta: () => {} });
  if (cues) Object.assign(d as object, { narrationFindings: async () => (await import('./narration.js')).checkNarration(d.project.storyboard(), cues(sent.length), { voiced }) });
  else Object.assign(d as object, { narrationFindings: async () => [] });
  const error = await d.script().then(() => undefined, (e: Error) => e.message);
  return { sent, error };
}

test('a narration that stops before the storyboard ends is asked for the rest', async () => {
  const { sent, error } = await script((n) => (n === 1 ? ['p01'] : ['p01', 'p02', 'p03']));
  assert.equal(error, undefined);
  assert.equal(sent.length, 2);
  assert.match(sent[1], /no narration for p02, p03/);
});

test('a narration still short of the storyboard stops the film, saying which pages', async () => {
  const { sent, error } = await script(() => ['p01']);
  assert.equal(sent.length, 3);
  assert.match(error ?? '', /p02、p03 没有口播/);
});


const slides = ['股票占25%。', '长期国债占25%。', '黄金也占25%。', '现金同样占25%。'];
const lesson = ['四类资产各放25元，', '是因为谁也猜不准下一年哪种会涨，', '所以干脆让它们各管一种天气，', '哪一种好，都有一份在里面。'];
const all = (c: string[]) => ['p01', 'p02', 'p03'].map((id) => ({ id, cues: c }));

test('narration that reads like slides goes back with what a listener would hear, at most twice', async () => {
  let reads = 0;
  const { sent, error } = await script(
    (n) => (n === 2 ? ['p01'] : ['p01', 'p02', 'p03']), true,
    () => { reads++; return all(reads === 1 ? slides : lesson); });   // the rewrite fixes it on the first pass
  assert.equal(error, undefined);
  assert.equal(sent.length, 3);   // write, the fix, ask for the pages its rewrite left behind
  assert.match(sent[1], /listener will hear/);
  assert.match(sent[1], /built the same way/);
  assert.match(sent[2], /no narration for p02, p03/);
});

test('narration the rewrite cannot clear goes back a second time, then goes on', async () => {
  const { sent, error } = await script(() => ['p01', 'p02', 'p03'], true, () => all(slides));
  assert.equal(error, undefined);
  assert.equal(sent.length, 3);
});

test('narration that already teaches is voiced as written: no extra round', async () => {
  const { sent, error } = await script(() => ['p01', 'p02', 'p03'], true, () => all(lesson));
  assert.equal(error, undefined);
  assert.equal(sent.length, 1);
});

test('the narration starts with one empty entry per storyboard page, not the template opener', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ft-prefill-'));
  fs.writeFileSync(path.join(dir, 'storyboard.json'), JSON.stringify({ title: 'T：一个题目', pages: [
    { id: 'p01', section: '疑问：问题', say: '…', beats: [] },
    { id: 'p02', section: '调回比例', say: '…', beats: [] },
  ] }));
  fs.writeFileSync(path.join(dir, 'script.js'), `(function (root) {
  const META = { title: '旧', name: '旧', gap: 0.5, libs: [], extras: [], publish: { titles: {}, description: '', tags: [] } };
  const PAGES = [
    { id: 'p01', section: '开场', title: '旧', cues: ['大家好，这一篇我们来聊：', '旧。'] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);`);
  const runtime: AgentRuntime = { id: 'pi', model: { provider: 'x', id: 'x' }, open: async () => ({ ref: 'r', close: async () => {}, send: async () => { throw new Error('must not call model'); } }) };
  const d = new Director({ dir, style: 'chalkboard', brief: { durationSec: 60, lang: 'zh', replyLang: 'zh' }, runtime });
  Object.assign(d as object, { prefillPages: (d as unknown as { prefillPages: () => void }).prefillPages });
  (d as unknown as { prefillPages: () => void }).prefillPages();
  const src = fs.readFileSync(path.join(dir, 'script.js'), 'utf8');
  assert.match(src, /title: 'T：一个题目'/);
  assert.match(src, /id: 'p01', section: '疑问：问题', title: '疑问', cues: \[\n\s*\]/);
  assert.match(src, /id: 'p02', section: '调回比例', title: '调回比例', cues: \[\n\s*\]/);
  assert.doesNotMatch(src, /大家好/);
});

test('a page whose cues were never filled is asked for, like a missing page', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ft-empty-'));
  fs.writeFileSync(path.join(dir, 'storyboard.json'), JSON.stringify({ title: 'T', pages: ['p01', 'p02'].map((id) => ({ id, section: id, say: '…', beats: [] })) }));
  const sent: string[] = [];
  const runtime: AgentRuntime = { id: 'pi', model: { provider: 'x', id: 'x' }, open: async () => ({ ref: 'r', close: async () => {}, send: async (i) => { sent.push(i.text); return { text: 'ok', stopReason: 'done', usage: {} } as never; } }) };
  const d = new Director({ dir, style: 'chalkboard', brief: { durationSec: 60, lang: 'zh', replyLang: 'zh' }, runtime });
  Object.assign(d.project, { scriptCheck: async () => ({ code: 0, out: 'ok', err: '' }), timeline: async () => ({ pages: [{ id: 'p01', cues: ['有了'] }, { id: 'p02', cues: [] }] }), commit: async () => undefined });
  Object.assign(d as object, { serverMeta: () => {}, prefillPages: () => {}, narrationFindings: async () => [] });
  const error = await d.script().then(() => undefined, (e: Error) => e.message);
  assert.match(error ?? '', /p02 没有口播/);
  assert.match(sent[1], /no narration for p02/);
});
