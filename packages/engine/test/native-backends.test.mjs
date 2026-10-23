import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { ENGINE_DIR, linkProject } from '../tools/project.mjs';
import { findChrome } from '../tools/bins.mjs';

test('preserved upstream files match their locked content identities', () => {
  const locks = JSON.parse(fs.readFileSync(path.join(ENGINE_DIR, 'native/source-lock.json'), 'utf8'));
  assert.ok(locks.length > 80);
  for (const file of locks) {
    const bytes = fs.readFileSync(path.join(ENGINE_DIR, 'native/sources', file.project, file.path));
    const actual = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    assert.equal(actual, file.sha, file.path);
  }
});

test('native source backends render, isolate page state, dispose and seek without generic material conversion', { timeout: 240_000 }, async t => {
  const { chromium } = createRequire(import.meta.url)('playwright-core');
  const browser = await chromium.launch({ executablePath: findChrome() });
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'frametell-native-backends-'));
  const manifest = JSON.parse(fs.readFileSync(path.join(ENGINE_DIR, 'native/renderers.json'), 'utf8'));
  assert.equal(Object.keys(manifest).length, 21);
  try {
    const selected = process.env.NATIVE_STYLE_IDS?.split(',');
    for (const [id, renderer] of Object.entries(manifest).filter(([id]) => !selected || selected.includes(id))) {
      await t.test(id, async () => {
        const dir = path.join(temp, id); fs.cpSync(path.join(ENGINE_DIR, 'styles', id, 'example'), dir, { recursive: true }); linkProject(dir);
        const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
        const errors = []; page.on('pageerror', e => errors.push(e.message));
        page.on('requestfailed', r => errors.push(r.url()));
        try {
          await page.goto('file://' + path.join(dir, 'index.html') + '?render'); await page.evaluate(() => window.__ready);
          const state = await page.evaluate(() => {
            const [a,b] = ENGINE.pages, middle = (a.pg.start + a.pg.end) / 2;
            ENGINE.renderAt(middle);
            return { errors: ENGINE.errors, ids: ENGINE.pages.map(p => p.sh.native?.renderer), roots: document.querySelectorAll('.native-scene').length, pixels: PV.sceneElements(a.root, 'canvas').map(c=>PV.scenePixels(c).some((v,i)=>i%4===3&&v>32)), styleId: STYLE.renderer.id, sameRoot: a.root.querySelector('.native-scene')?.shadowRoot === b.root.querySelector('.native-scene')?.shadowRoot };
          });
          assert.deepEqual(errors, []); assert.deepEqual(state.errors, []);
          assert.ok(state.ids.every(id => id === renderer.id)); assert.equal(state.roots, 3); assert.equal(state.sameRoot, false);
          if (state.pixels.length) assert.ok(state.pixels.some(Boolean));
          const imageAt = async from => {
            await page.evaluate(from => { const p=ENGINE.pages[0]; ENGINE.renderAt(from === 'end' ? p.pg.end-.1 : 0); ENGINE.renderAt((p.pg.start+p.pg.end)/2); }, from);
            return page.screenshot({ type: 'png' });
          };
          const first = await imageAt('start'), second = await imageAt('end');
          // GPU anti-aliasing can vary slightly. Compare decoded pixels with the engine's established tolerance.
          const fraction = first.equals(second) ? 0 : await page.evaluate(async ([a,b]) => {
            const pixels = async raw => {const img=await createImageBitmap(await (await fetch('data:image/png;base64,'+raw)).blob());const c=new OffscreenCanvas(img.width,img.height),g=c.getContext('2d');g.drawImage(img,0,0);return g.getImageData(0,0,img.width,img.height).data;};
            const [x,y]=await Promise.all([pixels(a),pixels(b)]);let n=0;for(let i=0;i<x.length;i+=4)if(Math.abs(x[i]-y[i])+Math.abs(x[i+1]-y[i+1])+Math.abs(x[i+2]-y[i+2])>48)n++;return n/(x.length/4);
          },[first.toString('base64'),second.toString('base64')]);
          assert.ok(fraction <= .0005, `${id}: seek changed ${fraction}`);
          const rebuild = await page.evaluate(async () => { const old=document.querySelector('.native-scene');ENGINE.init();await ENGINE.whenReady();ENGINE.renderAt(3);return {oldConnected:old.isConnected,roots:document.querySelectorAll('.native-scene').length,errors:ENGINE.errors}; });
          assert.equal(rebuild.oldConnected,false); assert.equal(rebuild.roots,3); assert.deepEqual(rebuild.errors,[]);
        } finally { await page.close(); }
      });
    }
  } finally { await browser.close(); fs.rmSync(temp,{recursive:true,force:true}); }
});
