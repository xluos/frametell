import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkNarration, type NarrationPage } from './narration.js';
import type { Storyboard } from './project.js';

const sb = (pages: Storyboard['pages'], lang: 'zh' | 'en' = 'zh'): Storyboard => ({ title: 'T', summary: '', style: 'whiteboard', cast: 'none', lang, pages });
const kinds = (s: Storyboard, p: NarrationPage[], voiced = true) => checkNarration(s, p, { voiced }).map((f) => `${f.level}:${f.kind}`);

test('a beat timed to a line or a word the narration does not have must be fixed, and says where the word is', () => {
  const s = sb([{ id: 'p01', section: '再平衡', say: '', beats: [{ at: 'c1:115元', object: '总额', action: '涨上去' }, { at: 'c5', object: '格子', action: '补齐' }] }]);
  const f = checkNarration(s, [{ id: 'p01', cues: ['只有股票涨到了40元，', '这时整笔钱，', '变成了115元。'] }], { voiced: true });
  assert.deepEqual(f.map((x) => x.level), ['fix', 'fix']);
  assert.match(f[0].msg, /it is in c2: change the beat to c2:115元/);
  assert.match(f[1].msg, /only 3 lines/);
});

test('the permanent-portfolio page as generated: a list read aloud, every line its own full stop', () => {
  const s = sb([{ id: 'p02', section: '配置', say: '', beats: [{ at: 'c0', object: '股票凭证', action: '描出', text: '股票/25%' }, { at: 'c1', object: '国债凭证', action: '描出', text: '长期国债/25%' }] }]);
  const k = kinds(s, [{ id: 'p02', cues: ['股票占25%。', '长期国债占25%。', '黄金也占25%。', '现金同样占25%。', '现金通常用短期国债等工具。', '这就是组合的基本配法。'] }]);
  assert.ok(k.includes('advice:parallel-list'), k.join());
  assert.ok(k.includes('advice:clipped'), k.join());
  assert.ok(k.includes('advice:reads-labels'), k.join());
});

test('the attention page as generated: definitions with no reasons', () => {
  const s = sb([{ id: 'p06', section: '计算层：信息被反复组合加工', say: '', beats: [] }]);
  const k = kinds(s, [{ id: 'p06', cues: ['常见大模型有多个计算层。', '每层先汇集上下文信息。', '再由前馈网络变换表示。', '也就是继续加工这些数值。', '层层加工，组合更复杂的关系。', '每层并不对应固定思维步骤。'] }]);
  assert.ok(k.includes('advice:clipped'), k.join());
  assert.ok(k.includes('advice:no-reasons'), k.join());
});

test('long sentences that happen to end alike, and labels named on the way to a point, are not a list read aloud', () => {
  const s = sb([{ id: 'p01', section: '再平衡', say: '', beats: [{ at: 'c0', object: '四格', action: '装满', text: '股票/长期国债/黄金/现金' }] }]);
  assert.deepEqual(kinds(s, [{ id: 'p01', cues: ['假设股票、长期国债、', '黄金、现金原来各放25元，', '后来只有股票涨到了40元，因为行情变了。', '所以总额乘25%，每格目标是28.75元。', '把股票多出的11.25元移走，再给另外三格各补3.75元。'] }]), []);
});

test('a page that teaches passes clean', () => {
  const s = sb([{ id: 'p01', section: '再平衡', say: '', beats: [{ at: 'c1:115元', object: '总额', action: '涨上去', text: '115元' }] }]);
  assert.deepEqual(kinds(s, [{ id: 'p01', cues: ['假设只有股票涨到了40元，', '整笔钱就变成了115元。', '可目标还是各占四分之一，', '所以每格该有的钱，', '要按现在的115元重新算。'] }]), []);
});

test('a silent film writes captions: no advice about how sentences run', () => {
  const s = sb([{ id: 'p01', section: '计算层', say: '', beats: [] }]);
  assert.deepEqual(kinds(s, [{ id: 'p01', cues: ['常见大模型有多个计算层。', '每层先汇集上下文信息。', '再由前馈网络变换表示。', '也就是继续加工这些数值。'] }], false), []);
});

test('caveats closing most pages are reported once for the film; a signpost opening is reported on its page', () => {
  const page = (id: string, first: string) => ({ id, cues: [first, '这里先算一遍，', '因为数字会变。', '但这不保证盈利。'] });
  const s = sb(['p01', 'p02', 'p03'].map((id) => ({ id, section: '例子', say: '', beats: [] })));
  const k = kinds(s, [page('p01', '同一笔钱，'), page('p02', '接下来我们看看，'), page('p03', '再往后，')]);
  assert.deepEqual(k.filter((x) => x === 'advice:caveats').length, 1);
  assert.ok(k.includes('advice:signpost'));
});

test('English narration is read with English words', () => {
  const s = sb([{ id: 'p01', section: 'Tokens', say: '', beats: [{ at: 'c1:vector', object: 'a sentence', action: 'splits apart' }] }], 'en');
  const f = checkNarration(s, [{ id: 'p01', cues: ['Next, let\'s look at tokens.', 'A token is a unit.', 'A token has an id.', 'A token is a number.'] }], { voiced: true });
  assert.ok(f.some((x) => x.kind === 'signpost'));
  assert.ok(f.some((x) => x.kind === 'parallel-list'));
  assert.ok(f.some((x) => x.kind === 'anchor' && x.level === 'fix'));
});
