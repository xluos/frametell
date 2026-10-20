// Render one settled frame of every style's example film to <style>/poster.jpg
// (1920x1080 jpeg, no labels). Skips styles without an example.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { linkProject, ENGINE_DIR } from '../../packages/engine/tools/project.mjs';

const only = process.argv[2];
const styles = fs.readdirSync(path.join(ENGINE_DIR, 'styles')).filter((id) => {
  if (only && !only.split(',').includes(id)) return false;
  return fs.existsSync(path.join(ENGINE_DIR, 'styles', id, 'example', 'script.js'));
});
let ok = 0;
for (const id of styles) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ft-poster-'));
  try {
    fs.cpSync(path.join(ENGINE_DIR, 'styles', id, 'example'), tmp, { recursive: true, filter: (f) => !/[\\/](engine|engine_modules|out)$/.test(f) });
    linkProject(tmp);
    // 600 s is past every example's timeline: renderAt holds the last page settled.
    const r = spawnSync(process.execPath, [path.join(ENGINE_DIR, 'tools/snap.mjs'), '600'], { cwd: tmp, encoding: 'utf8', timeout: 120000 });
    const shot = path.join(tmp, 'out', 'snap', 'snap-600.png');
    if (r.status !== 0 || !fs.existsSync(shot)) { console.log('FAIL', id, r.stderr.slice(0, 200)); continue; }
    const dst = path.join(ENGINE_DIR, 'styles', id, 'poster.jpg');
    // snap writes PNG at 1920x1080; convert to a compact jpeg with the bundled ffmpeg
    const c = spawnSync(process.execPath, ['-e', `
      import { execFileSync } from 'node:child_process';
      import { FFMPEG } from '${path.join(ENGINE_DIR, 'tools/bins.mjs')}';
      execFileSync(FFMPEG, ['-y','-i',${JSON.stringify(shot)},'-frames:v','1','-q:v','3',${JSON.stringify(dst)}], { stdio: 'ignore' });
    `], { encoding: 'utf8' });
    if (c.status === 0 && fs.existsSync(dst)) { console.log('ok', id, (fs.statSync(dst).size / 1024).toFixed(0) + 'KB'); ok++; }
    else console.log('FAIL-convert', id, c.stderr?.slice(0, 200));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
console.log(`posters: ${ok}/${styles.length}`);
