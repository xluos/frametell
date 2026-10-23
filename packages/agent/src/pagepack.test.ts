import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pagePack } from './pagepack.js';

test('the warm-story pack lists every component with its doc and carries a benchmark page', () => {
  const t = pagePack('warm-story', ['engine/lib/warm.js']);
  for (const name of ['ground', 'snowball', 'jar', 'coin', 'tree', 'trail', 'hand', 'calendar', 'tag']) assert.ok(t.includes(`\`P.${name}(`), name);
  assert.ok(!t.includes('const shade'), 'no source code leaks into the component list');
  assert.match(t, /```js\n[\s\S]*ENGINE\.visual\('p\d+'/);
});

test('a style without components or example yields only the header', () => {
  assert.ok(pagePack('study', []).length < 400);   // the English header alone is about 250 characters
});

test('native style components are supplied without META.extras', () => {
  for (const [style, name] of [['crayon', 'crayonScene'], ['metro', 'metroRoute'], ['mascot', 'mascot'], ['inked', 'inkedBox'], ['instrument', 'isoBlock']]) {
    assert.ok(pagePack(style, []).includes(`P.${name}(`), `${style} kit is missing from the agent context`);
  }
});

test('a kit already present in extras is documented once', () => {
  const pack = pagePack('metro', ['engine/styles/metro/kit.js']);
  assert.equal(pack.split('`P.metroRoute(').length - 1, 1);
});
