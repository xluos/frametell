import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { ENGINE_DIR } from '../tools/project.mjs';

test('an export reuses unchanged frames but redraws after vendor or episode component changes', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'frametell-render-cache-'));
  const engine = path.join(root, 'engine'), film = path.join(root, 'film');
  try {
    fs.mkdirSync(engine); fs.mkdirSync(film);
    for (const name of ['tools', 'runtime', 'lib', 'vendor']) fs.cpSync(path.join(ENGINE_DIR, name), path.join(engine, name), { recursive: true });
    for (const name of ['package.json', 'boot.js']) fs.copyFileSync(path.join(ENGINE_DIR, name), path.join(engine, name));
    fs.symlinkSync(path.join(ENGINE_DIR, 'node_modules'), path.join(engine, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
    fs.cpSync(path.join(ENGINE_DIR, 'styles/metro'), path.join(engine, 'styles/metro'), { recursive: true, filter: f => !/[\\/]example$/.test(f) });
    fs.mkdirSync(path.join(film, 'pages'));
    fs.writeFileSync(path.join(film, 'script.js'), "globalThis.SCRIPT = {META:{style:'metro',extras:['film-kit.js']},PAGES:[{id:'p01',cues:['Test the scene.']}]};");
    fs.writeFileSync(path.join(film, 'film-kit.js'), 'window.sceneVersion = 1;');
    fs.writeFileSync(path.join(film, 'pages/p01.js'), 'ENGINE.visual("p01", P => P.title("Scene"));');
    fs.writeFileSync(path.join(film, 'index.html'), '<script src="engine/boot.js"></script>');
    fs.symlinkSync(engine, path.join(film, 'engine'), process.platform === 'win32' ? 'junction' : 'dir');
    const plan = () => {
      const r = spawnSync(process.execPath, [path.join(engine, 'tools/render.mjs'), '--plan', '--fps', '12'], { cwd: film, encoding: 'utf8', timeout: 15000 });
      assert.equal(r.status, 0, r.stderr);
      const line = r.stdout.split('\n').find(line => line.startsWith('PLAN '));
      return JSON.parse(line.slice(5)).segments.map(segment => segment.file);
    };
    const initial = plan();
    assert.ok(initial.length > 0);
    assert.deepEqual(plan(), initial);
    fs.appendFileSync(path.join(engine, 'vendor/paint.js'), '\n// revised brush pressure\n');
    const afterVendor = plan();
    assert.notDeepEqual(afterVendor, initial);
    fs.writeFileSync(path.join(film, 'film-kit.js'), 'window.sceneVersion = 2;');
    const afterComponent = plan();
    assert.notDeepEqual(afterComponent, afterVendor);
    fs.mkdirSync(path.join(engine, 'native/bundles'), { recursive: true });
    fs.writeFileSync(path.join(engine, 'native/bundles/test.js'), 'window.nativeBrushVersion = 1;');
    const afterNative = plan();
    assert.notDeepEqual(afterNative, afterComponent);
    fs.writeFileSync(path.join(engine, 'native/bundles/test.js'), 'window.nativeBrushVersion = 2;');
    assert.notDeepEqual(plan(), afterNative);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
