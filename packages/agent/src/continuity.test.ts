import { test } from 'node:test';
import assert from 'node:assert/strict';
import { continuityNote, recurringIssues, recurringNote, recurringObjects } from './continuity.js';
import { pagePrompt, reviewerPrompt } from './prompts.js';
import type { PageTiming, Storyboard } from './project.js';

const disc = { name: '四格资金圆盘', look: '画面中央的圆，十字分成四格：左上股票、右上长期国债、左下黄金、右下现金，金额写在格内，蓝色标注', pages: ['p01', 'p02', 'p04'] };
const sb = (objects?: unknown): Storyboard => ({ title: 'T', summary: 's', style: 'whiteboard', cast: 'none', lang: 'zh', ...(objects ? { objects: objects as Storyboard['objects'] } : {}), pages: [
  { id: 'p01', section: '分开应对', say: '…', beats: [{ at: 'c0', object: '四格资金圆盘', action: '画出四格' }, { at: 'c5', object: '四格资金圆盘', action: '各格写上25%' }] },
  { id: 'p02', section: '分开应对', say: '…', beats: [{ at: 'c0', object: '四格资金圆盘', action: '股票格连向工厂' }] },
  { id: 'p03', section: '恢复比例', say: '…', beats: [{ at: 'c0', object: '四根金额柱', action: '股票柱长高' }] },
  { id: 'p04', section: '仍有风险', say: '…', beats: [{ at: 'c0', object: '四格资金圆盘', action: '两格画下跌箭头' }] },
] as Storyboard['pages'] });
const t: PageTiming = { id: 'p02', start: 15, end: 31, speechEnd: 30, cues: [{ i: 0, at: 0.3, abs: 15.3, text: '顺着这四份钱看，' }] };

test('a film of three pages or more must name what it keeps drawing; a thin look is a warning', () => {
  assert.equal(recurringIssues(sb())[0].level, 'red');
  assert.deepEqual(recurringIssues(sb([disc])), []);
  assert.deepEqual(recurringIssues(sb([{ ...disc, look: '一个圆' }])).map((i) => i.level), ['yellow']);
  assert.deepEqual(recurringObjects(sb([disc, { name: 'x', look: 'y', pages: ['p99'] }])).map((o) => o.name), ['四格资金圆盘']);
});

test('a page on which a recurring object appears is told its look; others are not', () => {
  assert.match(recurringNote(sb([disc]), 'p04'), /左上股票、右上长期国债/);
  assert.equal(recurringNote(sb([disc]), 'p03'), '');
});

test('a page that carries an object over opens from where the last page left it', () => {
  const n = continuityNote(sb([disc]), 'p02');
  assert.match(n, /p01/);
  assert.match(n, /各格写上25%/);
  assert.match(n, /四格资金圆盘 was on screen then/);
  assert.match(n, /Don't redraw it from nothing/);
  assert.doesNotMatch(continuityNote(sb([disc]), 'p04'), /was on screen then/);   // p03 had no disc
  assert.equal(continuityNote(sb([disc]), 'p01'), '');
});

test('the page agent and its reviewer both get the object and the continuity', () => {
  for (const msg of [pagePrompt(sb([disc]), 'p02', t, 'zh', 'zh'), reviewerPrompt(sb([disc]), 'p02', t, 1, [], [{ local: 1 }])]) {
    assert.match(msg, /Recurring objects on this page/);
    assert.match(msg, /Where the previous page left off/);
  }
});
