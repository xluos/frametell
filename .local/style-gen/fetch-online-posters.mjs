// Use the official studio's own style posters and hover loops (frametell.ai serves
// a pre-rendered poster.jpg and loop.mp4 per style showcase film). These are the
// exact thumbnails the /studio style strip shows, so the desktop panel matches the
// website instead of rendering our benchmark films.
//   - posters are downloaded into packages/engine/styles/<id>/poster.jpg (served locally)
//   - loops are referenced at runtime (CORS-open), written to packages/core/src/style-loops.ts
// online-films.json was extracted from the site's JS bundle (29 showcase styles).
//
// Usage: node .local/style-gen/fetch-online-posters.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../..');
const films = JSON.parse(fs.readFileSync(path.join(HERE, 'online-films.json'), 'utf8'));

let ok = 0;
const loops = {};
for (const st of films) {
  // strip logic: films[0], version dir from its path (root, f2, f3), zh language
  const seg = st.films[0].url.match(/styles\/[a-z0-9-]+\/(f\d)\/film/)?.[1] || '';
  const dir = (seg ? seg + '/' : '') + 'zh';
  loops[st.id] = `https://frametell.ai/styles/${st.id}/${dir}/loop.mp4`;
  const url = `https://frametell.ai/styles/${st.id}/${dir}/poster.960.jpg`;
  const dst = path.join(REPO, 'packages/engine/styles', st.id, 'poster.jpg');
  execFileSync('curl', ['-sS', '-L', '-m', '60', '-o', dst, url], { stdio: 'ignore' });
  const kind = execFileSync('file', ['-b', dst], { encoding: 'utf8' });
  if (!kind.includes('JPEG')) { console.log('BAD', st.id, kind.trim()); continue; }
  ok++;
  console.log('ok', st.id, Math.round(fs.statSync(dst).size / 1024) + 'KB');
}
console.log(`online posters: ${ok}/${films.length}`);

const lines = Object.entries(loops).map(([id, u]) => `  ${JSON.stringify(id)}: ${JSON.stringify(u)},`);
fs.writeFileSync(path.join(REPO, 'packages/core/src/style-loops.ts'),
  '// Hover loops for the style picker: the short silent clips the hosted studio (frametell.ai) plays when a\n' +
  '// style thumbnail is hovered. Referenced at runtime from the official site (CORS-open), not bundled; a style\n' +
  '// missing here just shows its still. Regenerate with .local/style-gen/fetch-online-posters.mjs.\n' +
  `export const STYLE_LOOPS: Record<string, string> = {\n${lines.join('\n')}\n};\n`);
console.log(`loops written: ${lines.length}`);
