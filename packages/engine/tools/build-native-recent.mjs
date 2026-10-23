// Packaging adapters only: drawing and layout remain in the pinned upstream code.
import fs from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';

export async function buildRecentNative(base) {
  const read = file => fs.readFileSync(path.join(base, 'sources', file), 'utf8');
  const scripts = html => [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
  const doodle = scripts(read('doodle-anim/templates/doodle.html')).split('/* ---------- boot ---------- */')[0];
  const chatHTML = read('chat-rap-video/assets/chat_template_v11.html');
  // Shadow DOM supplies its own document/body. Only document selectors change; coordinates and drawing are untouched.
  const chatCSS = chatHTML.match(/<style>([\s\S]*?)<\/style>/)[1].replace(':root', ':host').replace('html,body', ':host');
  const chatBody = chatHTML.match(/<body>([\s\S]*?)<script>/)[1];
  const entries = {
    'manim-web': `export * from './sources/manim-web/dist/manim-web.browser.js';
import {setKatexStylesheetUrl,setMathJaxScriptUrl,MathTex,VGroup} from './sources/manim-web/dist/manim-web.browser.js';
setKatexStylesheetUrl(null); setMathJaxScriptUrl(null);
// MathTex.copy starts a second asynchronous glyph render AND copies existing children. That doubles an animation's
// saved point array after its first frame. Animations may reference objects not yet in scene.mobjects, so scope
// the original VGroup copy to the MathTex prototype for the whole synchronous seek, then restore it.
export function seek(scene, time) {
  const copy = MathTex.prototype.copy;
  try { MathTex.prototype.copy = function() { return VGroup.prototype.copy.call(this); }; return scene.seek(time); }
  finally { MathTex.prototype.copy = copy; }
}`,
    'doodle-anim': doodle + '\nexport {RNG,mulberry32,hashStr,CrowdScene,DoodleChar,Human,Blob,Ghost,Pet,Weirdo,Oddhead,STORIES,poseAt};',
    'chat-rap-video': `export function create(host, script, assets = {}) {
  host.style(${JSON.stringify(chatCSS)});
  const node = document.createElement('div'); node.innerHTML = ${JSON.stringify(chatBody)}; host.root.appendChild(node);
  const window = { __SCRIPT__: script, __ASSETS__: assets, __CURRENT_MS__: 0 };
  // The upstream stack effect queues clone removal on a wall-clock timeout. Retire the previous frame's clones
  // immediately BEFORE drawing the next frame instead, so repeated/backward seeks cannot accumulate them.
  const retired = []; const setTimeout = fn => { retired.push(fn); };
  ${scripts(chatHTML)}
  return { renderAt(ms) { for (const fn of retired.splice(0)) fn(); window.renderAt(ms); }, dispose() { for (const fn of retired.splice(0)) fn(); node.remove(); } };
}`,
    'nf-metro': `export function mount(host, source) {
  const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
  if (parsed.querySelector('parsererror') || parsed.documentElement.localName !== 'svg') throw new Error('nf-metro: invalid SVG; compile the .mmd with engine/tools/native-metro.mjs');
  const manifest = parsed.getElementById('diagram-manifest');
  if (!manifest || manifest.getAttribute('data-schema-version') !== '1.0') throw new Error('nf-metro: expected the original CLI diagram manifest; compile the .mmd instead of drawing a replacement SVG');
  const svg = document.importNode(parsed.documentElement, true);
  svg.setAttribute('width', host.width); svg.setAttribute('height', host.height);
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  host.root.appendChild(svg); svg.pauseAnimations();
  return { render(t) { svg.setCurrentTime(Math.max(0,t)); }, dispose() { svg.remove(); } };
}`,
  };
  const renderers = {};
  for (const [id, code] of Object.entries(entries)) {
    const result = await build({ stdin: { contents: code, resolveDir: base, sourcefile: `${id}.entry.js` }, bundle: true, format: 'iife', globalName: 'NativeModule', write: false, treeShaking: false,
      external: ['@myriaddreamin/*'], legalComments: 'inline' });
    const output = `/* Generated from pinned sources; see native/sources.json and each source LICENSE. */\n(window.NATIVE_FACTORIES ||= {})[${JSON.stringify(id)}] = function(environment = {}) {\nconst document = environment.document || globalThis.document;\n${result.outputFiles[0].text}\nreturn NativeModule;\n};\n`;
    fs.writeFileSync(path.join(base, 'bundles', `${id}.js`), output);
    const style = { 'manim-web': 'math', 'doodle-anim': 'mascot', 'chat-rap-video': 'chat', 'nf-metro': 'metro' }[id];
    renderers[style] = { id, upstream: id, assets: [`native/bundles/${id}.js`], grammar: null, selectedHere: true,
      ...(id === 'chat-rap-video' ? { width: 1080, height: 1920 } : id === 'doodle-anim' ? { width: 1280, height: 720 } : {}) };
  }
  return renderers;
}
