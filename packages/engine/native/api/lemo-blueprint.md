# Source API namespaces
N.Draw: original draw.js namespace
N.Paper: original paper.js namespace
N.Sheet: original sheet.js namespace
N.Machine: original machine.js namespace

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## draw.js
export const W = 1920, H = 1080;
export const inkC = document.createElement('canvas'); inkC.width = W; inkC.height = H;
export const fxC = document.createElement('canvas'); fxC.width = W; fxC.height = H;
export const ovC = document.createElement('canvas'); ovC.width = W; ovC.height = H;
export const g = inkC.getContext('2d'), f = fxC.getContext('2d'), ov = ovC.getContext('2d');
export const TAU = Math.PI * 2;
export const cam = { x: 1600, y: 1000, z: .6, r: 0 };
export const proj = { k: 0, a: Math.PI / 4 };
export const LW = { out: 3.2, det: 2.0, thin: 1.25, hair: .9 };
export function setCam(c) { Object.assign(cam, c); zp = Math.pow(cam.z, .65); }
export const lw = w => w * zp;
export function clear() {
export function S(x, y, d = 0) {
export function camMatrix(ctx, x = 0, y = 0, rot = 0, d = 0) {
export function plen(p) { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; }
export function trunc(p, u) {
export const NIBS = [];   // 本帧正在画的笔尖（发光点）
export function line(pts, o = {}) {
export function knock(pts, d = 0) { g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = '#000'; pathScreen(g, pts, d, true); g.fill(); }
export function fillV(pts, v, d = 0) { g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = `rgb(${v * 255 | 0},${v * 255 | 0},${v * 255 | 0})`; pathScreen(g, pts, d, true); g.fill(); }
export function inPoly(pt, poly) { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a[1] > pt[1]) !== (b[1] > pt[1]) && pt[0] < (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
export function solid(pts, o = {}) {
export function hatch(pts, o = {}) {
export const circ = (cx, cy, r, n = 64, a0 = 0, a1 = TAU) => { const p = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } return p; };
export const ell = (cx, cy, rx, ry, rot = 0, n = 64, a0 = 0, a1 = TAU) => { const p = [], c = Math.cos(rot), s = Math.sin(rot); for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n, x = Math.cos(a) * rx, y = Math.sin(a) * ry; p.push([cx + c * x - s * y, cy + s * x + c * y]); } return p; };
export const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
export const xf = (pts, tx, ty, rot = 0, sc = 1) => { const c = Math.cos(rot) * sc, s = Math.sin(rot) * sc; return pts.map(([x, y]) => [tx + c * x - s * y, ty + s * x + c * y]); };
export function gearPts(cx, cy, T, m, rot = 0) {   // 渐开线近似：梯形齿
export const FONT = { hand: 'Architects', tech: 'B612', mono: 'B612Mono', sign: 'Allura' };
export function text(str, x, y, o = {}) {
export function textW(str, size, font = FONT.hand, ls = 0) { g.font = `400 ${size}px ${font}`; g.letterSpacing = ls + 'px'; const w = g.measureText(str).width; g.letterSpacing = '0px'; return w; }
export function dim(p1, p2, off, label, o = {}) {
export function arrow(p, dir, d = 0, len = 16, wid = 4.5) {
export function balloon(from, to, num, o = {}) {
export function nibs(a = 1) {
export function fxShadow(pts, a, blur, d = 0) { f.setTransform(1, 0, 0, 1, 0, 0); f.globalCompositeOperation = 'lighter'; f.filter = blur ? `blur(${blur * cam.z}px)` : 'none'; f.fillStyle = `rgba(255,0,0,${a})`; pathScreen(f, pts, d, true); f.fill(); f.filter = 'none'; }
export function fxWet(x, y, r, a) { const [sx, sy] = S(x, y); const R = r * cam.z; f.setTransform(1, 0, 0, 1, 0, 0); f.globalCompositeOperation = 'lighter'; const gr = f.createRadialGradient(sx, sy, 0, sx, sy, R); gr.addColorStop(0, `rgba(0,255,0,${a})`); gr.addColorStop(.72, `rgba(0,255,0,${a * .92})`); gr.addColorStop(1, 'rgba(0,255,0,0)'); f.fil
export function fxUnshadow(pts, d = 0) { f.setTransform(1, 0, 0, 1, 0, 0); f.globalCompositeOperation = 'multiply'; f.filter = 'none'; f.fillStyle = 'rgb(0,255,255)'; pathScreen(f, pts, d, true); f.fill(); f.globalCompositeOperation = 'lighter'; }
## machine.js
export const G = 1860, X = 1100;           // 地面线、桅杆轴
export const M = {
export function gearAngles(th) {
export function explodeOf(part, E) {
export function drawMachine(P = {}) {
export function drawGarden(P = {}) {
export function flower(x, y, h, droop, bloom, u = 1, o = {}) {
export function explodePaths(E, boomA = -.52, u = 1) {
## paper.js
export function makePaper(canvas, W, H) {
## sheet.js
export const SW = 3200, SH = 2200;
export function border(u = 1) {
export function header(u = 1, u2 = 1) {
export const TB = { x0: 2280, y0: SH - 480, x1: SW - 80, y1: SH - 80 };
export function titleBlock(o = {}) {
export const PARTS = [
export function partsList(u = 1) {
export function wrap(str, size, maxW, font = FONT.hand) {
export function notes(list, u = 1) {
export function cloudLobes(cx, cy, rx, ry, pf, seed = 1) {
export function revCloud(cx, cy, rx, ry, o = {}) {
export function makeDrops(seed, n, box, t0, t1) {
export function rain(D, t, o = {}) {
export function handShadow(nx, ny, a = 1, rot = 0) {
export function stamp(x, y, s, a, word = 'WORKS') {
export function revImprint(cx, cy, rx, ry, a = 1) {
```
