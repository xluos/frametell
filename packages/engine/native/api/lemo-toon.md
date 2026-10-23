# Source API namespaces
N.T: original engine/toon.js namespace
N.Characters: original engine/chars.js namespace
N.Icons: original engine/icons.js namespace

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## sheet.js
export function drawSheet(ctx, t, C) {
## engine/chars.js
export const NAVY = '#3B4766', NAVYD = '#2A3350';
export function armJoints(pose, which) {
export function toScreen(pose, p) { const s = pose.s ?? 1, d = pose.dir ?? 1; return [pose.x + p[0] * s * d, pose.y + p[1] * s]; }
export function drawHand(ctx, x, y, a, kind = 'open', side = 1, k = 1, skin = PAL.skin) {
export function drawOwner(ctx, pose, t = 0) {
export function drawDock(ctx, x, y, s = 1, rot = 0, o = {}) {
export function drawPip(ctx, x, y, o = {}) {
## engine/icons.js
export const ICONS = {
export function icon(ctx, name, cx, cy, size, o = {}) {
## engine/toon.js
export const PAL = {
export function rng(seed) { let s = seed | 0 || 1; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export const hash = (x, y = 0, z = 0) => { const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return n - Math.floor(n); };
export function noise(seed = 0) {
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const seg = (t, a, b) => clamp((t - a) / (b - a));
export const ss = t => { t = clamp(t); return t * t * (3 - 2 * t); };
export const eo = t => 1 - Math.pow(1 - clamp(t), 3);
export const eio = t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
export const back = (t, s = 1.7) => { t = clamp(t) - 1; return 1 + t * t * ((s + 1) * t + s); };
export const TAU = Math.PI * 2;
export const twos = (t, fps = 12) => Math.floor(t * fps + 1e-6) / fps;
export const REG = { dx: 6, dy: 4, jit: 1.6, on: true };
export function setClock(t) { CLOCK = t; }
export function reg(seed = 0, k = 1) {
export function spline(pts, closed = true, n = 8) {
export const ellipse = (cx, cy, rx, ry, n = 48, a0 = 0, a1 = TAU, rot = 0) => {
export const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
export function rrect(x, y, w, h, r, n = 5) {
export const move = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);
export const xform = (pts, ox, oy, a = 0, s = 1, sy = s) => { const c = Math.cos(a), si = Math.sin(a); return pts.map(([x, y]) => [ox + c * x * s - si * y * sy, oy + si * x * s + c * y * sy]); };
export function path(ctx, pts, closed = true) { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); if (closed) ctx.closePath(); }
export function bbox(pts) { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (const [x, y] of pts) { a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); } return [a, b, c, d]; }
export function plen(pts) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
export function subpath(pts, u) {
export function pointAt(pts, u) { const s = subpath(pts, u); const a = s[s.length - 1], b = s[Math.max(0, s.length - 2)]; return { x: a[0], y: a[1], a: Math.atan2(a[1] - b[1], a[0] - b[0]) }; }
export function textures() {
export function pat(ctx, name) {
export function grainIn(ctx, pts, k = 0.35) {
export function ink(ctx, pts, w, o = {}) {
export function shape(ctx, pts, o = {}) {
export function plane(ctx, pts, fill, o = {}) { shape(ctx, pts, { fill, line: 0, grain: o.grain ?? 0.25, off: o.off || [0, 0], alpha: o.alpha ?? 1 }); }
export function starPts(cx, cy, r, n = 8, inner = 0.42, rot = 0, sq = 1) {
export function star(ctx, cx, cy, r, o = {}) {
export function sparkle(ctx, cx, cy, r, o = {}) {
export function rays(ctx, cx, cy, n, r, fill, o = {}) {
export function atom(ctx, cx, cy, r, o = {}) {
export const boomerang = (cx, cy, s, rot = 0) => xform(spline([[-1, -0.25], [-0.2, -0.05], [0.15, -0.55], [0.95, -0.2], [0.35, 0.1], [0.1, 0.45], [-0.85, 0.35]], true, 10), cx, cy, rot, s);
export const kidney = (cx, cy, s, rot = 0) => xform(spline([[-1, -0.1], [-0.6, -0.55], [0.1, -0.45], [0.35, -0.15], [0.8, -0.45], [1.05, 0.05], [0.6, 0.5], [-0.4, 0.5]], true, 10), cx, cy, rot, s);
export function dashed(ctx, pts, w, dash, gap, phase = 0, color = PAL.ink, upto = 1) {
export function arrow(ctx, from, to, o = {}) {
export function text(ctx, str, x, y, o = {}) {
export function measure(ctx, str, font, track = 0) { ctx.save(); ctx.font = font; if (track) ctx.letterSpacing = track + 'px'; const w = ctx.measureText(str).width; ctx.restore(); return w; }
export function fit(ctx, str, fam, px, maxW, maxLines = 2, minPx = px * 0.6) {
export function paperFinish(ctx, W, H, k = 1) {
```
