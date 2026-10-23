# Source API namespaces
N.C: original crayon.js namespace
N.GL: original gl.js namespace
N.Rig: original rig.js namespace
N.Characters: original chars.js namespace
N.Book: original end.js namespace
N.Sheet: original sheet.js namespace
N.Palette: original pal.js namespace

Original C.text contract: o.font is ONE unquoted family name, e.g. "Patrick Hand" or "LXGW WenKai"; C.text adds its own CSS quotes. A quoted CSS fallback list is invalid and can silently leave the Canvas font at 10px. o.size is in pixels. x is the horizontal centre by default; set o.align="left" or "right" for those anchors. y is the alphabetic baseline. Use native o.p for pressure/opacity, not invented pressure/fontSize keys.

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## chars.js
export function head(C, o) {
export function star(C, c, r, seed, rot = 0, col = C_.yellow, lineOn = true) {
export function girl(C, o) {
export function sheep(C, o) {
export function moon(C, o) {
## crayon.js
export const W = 1920, H = 1080;
export const CAM = { x: 960, y: 540, s: 1 };
export const BOIL = { step: 0, amp: 1 };
export const WMUL = { k: 1 };        // 全局线宽倍数（设定表大特写时可调）
export function layer() { const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'); g.lineCap = 'round'; g.lineJoin = 'round'; return { c, g }; }
export function clear(L) { L.g.setTransform(1, 0, 0, 1, 0, 0); L.g.clearRect(0, 0, W, H); }
export const sx = x => (x - CAM.x) * CAM.s + W / 2;
export const sy = y => (y - CAM.y) * CAM.s + H / 2;
export const ws = w => w * Math.pow(CAM.s, 0.45) * WMUL.k;      // 屏幕线宽：轻微随镜头变化
export function line(L, pts, o = {}) {
export function fill(L, poly, o = {}) {
export function dab(L, x, y, r, o = {}) {
export function ellipse(cx, cy, rx, ry, n = 48, a0 = 0, a1 = Math.PI * 2, rot = 0) {
export function handCircle(cx, cy, r, seed = 1, over = 0.12, n = 56) {
export function bez(c, n = 16) {
export function smooth(pts, n = 8, closed = true) {
export function xf(pts, { x = 0, y = 0, r = 0, s = 1, sx: kx = 1, sy: ky = 1, ox = 0, oy = 0 } = {}) {
export function text(L, str, x, y, o = {}) {
## end.js
export const TURN = [47.6, 48.8];
export function endFrame(comp, t, api) {
  CAM.x = 960; CAM.y = 540; CAM.s = 1; clear(TXT);
  CAM.x = cx; CAM.y = cy; CAM.s = z;
## gl.js
export const W = 1920, H = 1080;
export function makeComp(canvas, w = W, h = H) {
## pal.js
export const PAL = {
## rig.js
export function group() { return { k: layer(), f: layer(), l: layer() }; }
export function clearGroup(C) { clear(C.k); clear(C.f); clear(C.l); }
export function erase(L, poly) { const g = L.g; g.save(); g.globalCompositeOperation = 'destination-out'; g.globalAlpha = 1; g.fillStyle = '#000'; pathScreen(g, poly); g.fill(); g.restore(); }
export function knock(C, poly) { const g = C.k.g; g.save(); g.globalAlpha = 1; g.fillStyle = '#000'; pathScreen(g, poly); g.fill(); g.restore(); }
export function part(C, poly, fo, lo, { occ = true, kn = true } = {}) {
export function tube(pts, w0, w1 = w0) {
export function curve(pts, n = 6) {
## sheet.js
export function sheet(comp, t, Q) {
  CAM.x = 960; CAM.y = 540; CAM.s = 1;
## world.js
export const WORLD = { W: 3200, H: 1800 };
export const pr = (t, a, b) => clamp((t - a) / (b - a));
export const HOUSE = {
export const ridgeY = x => 1050 - (x - 1100) * 40 / 620;
export const MOON = { x: 2450, y: 560, R: 240 };
export const WIN = [[1440, 1420], [1680, 1406], [1680, 1592], [1440, 1602]];
export const LAD = { l0: [1745, 1640], l1: [1760, 1296], r0: [1825, 1640], r1: [1840, 1292], rung: i => 1598 - i * 44 };
export function drawWorld(F, L, p) {
export function drawLadder(F, L, rungs, rail) {
export const STARS = [];
export function drawStars(G) {
export const BANDS = [
export function bandFront(b, t) { const u = clamp((t - b.t0) / (b.t1 - b.t0)); const e = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; const v = 0.15 * u + 0.85 * e; return b.dir > 0 ? lerp(X0, X1, v) : lerp(X1, X0, v); }
export function drawWash(LW, t) {
```
