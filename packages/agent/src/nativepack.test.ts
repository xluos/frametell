import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nativeRenderer, nativePack } from './nativepack.js';
import { pageSystem, plannerSystem, reviewerSystem } from './prompts.js';

test('native pages receive the original medium and APIs without generic palette and camera restrictions', () => {
  const text = pageSystem('crayon');
  assert.ok(text.includes('WebGL2') && text.includes('wax') && text.includes('N.GL'));
  assert.ok(text.includes('P.nativeScene'));
  assert.ok(!text.includes("Use only the style pack's colour names"));
  assert.ok(!text.includes('The camera uses the pulse presets'));
  assert.ok(plannerSystem('crayon').includes('NATIVE') || plannerSystem('crayon').includes('native renderer'));
  assert.ok(reviewerSystem('crayon').includes('upstream style grammar'));
});

test('selected source backends and legacy styles retain explicit provenance', () => {
  assert.equal(nativeRenderer('watercolor')?.selectedHere,true);
  assert.ok(nativePack('watercolor')?.includes('not claimed to be the hosted'));
  assert.equal(nativeRenderer('mascot')?.id,'doodle-anim');
  assert.ok(pageSystem('whiteboard').includes('How to write'));
});

test('recent backends supply their actual authoring contracts', () => {
  for (const [style,id] of [['math','manim-web'],['mascot','doodle-anim'],['chat','chat-rap-video'],['metro','nf-metro']]) {
    assert.equal(nativeRenderer(style)?.id,id);
    assert.ok(pageSystem(style).includes('P.nativeScene'));
    assert.ok(!pageSystem(style).includes("Use only the style pack's colour names"));
  }
  assert.ok(pageSystem('math').includes('MasterTimeline') && pageSystem('math').includes('waitForRender'));
  assert.ok(pageSystem('metro').includes('native-metro.mjs') && pageSystem('metro').includes('materials/p01.mmd'));
});
