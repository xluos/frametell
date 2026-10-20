// Strokes that run off the frame: an arrow's bend written in pixels (bend: -30) once threw a page's arrows thousands of
// pixels away, as long lines crossing the whole picture, and no check saw it (lint measured only text). The engine now
// reads a large bend as pixels, and lint reports any annotation stroke that runs far past the stage.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { ENGINE_DIR, linkProject } from '../tools/project.mjs';

function project(page) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'frametell-strokes-'));
  fs.writeFileSync(path.join(dir, 'index.html'), '<!doctype html><html><head><meta charset="utf-8"><meta name="engine-modules" content="engine_modules/"><script src="script.js"></script><script src="engine/boot.js"></script></head><body></body></html>');
  fs.writeFileSync(path.join(dir, 'script.js'), `(function (root) {
  const META = { style: 'whiteboard', title: 'T', name: 'T', gap: 0.4, extras: [] };
  const PAGES = [{ id: 'p01', section: 's', title: '箭头', cues: ['第一句话先画好图。', '第二句话画箭头。', { t: '第三句话停住。', hold: 0.8 }] }];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);`);
  fs.mkdirSync(path.join(dir, 'pages'));
  fs.writeFileSync(path.join(dir, 'pages/p01.js'), `ENGINE.visual('p01', (P) => {
  P.title('箭头', {});
  P.rect(300, 300, 400, 300, { at: 0 });
  P.rect(1100, 300, 400, 300, { at: 0 });
  ${page}
});`);
  linkProject(dir);
  return dir;
}
const lint = (dir) => {
  const r = spawnSync(process.execPath, [path.join(ENGINE_DIR, 'tools/lint.mjs'), '--json'], { cwd: dir, encoding: 'utf8', timeout: 180000 });
  return JSON.parse(r.stdout.trim().split('\n').pop()).filter((i) => i.kind === 'off-canvas');
};

test('an arrow bend written in pixels bows that many pixels and stays on the frame', () => {
  const dir = project(`P.arrow(700, 450, 1100, 450, { at: P.c(1), bend: -30 }); P.arrow(1100, 560, 700, 560, { at: P.c(1), bend: 0.2 });`);
  try { assert.deepEqual(lint(dir), []); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('a stroke that runs far off the frame is an error, naming what to check', () => {
  const dir = project(`P.arrow(700, 450, 1100, 450, { at: P.c(1), d: 'M700 450 Q900 -4000 1100 450' });`);
  try {
    const found = lint(dir);
    assert.equal(found.length, 1);
    assert.equal(found[0].level, 'error');
    assert.match(found[0].msg, /runs off the frame/);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
