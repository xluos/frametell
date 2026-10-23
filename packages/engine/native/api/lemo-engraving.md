# Source API namespaces
N.Engine: original engine/index.js namespace

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## engine/burin.js
export const INK = '#1c1510', PAPER = '#efe6cf';
export function RNG(seed = 1) {
export const hash = (a, b = 0) => { const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return n - Math.floor(n); };
export function noise1(x, seed = 0) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return hash(i, seed) * (1 - u) + hash(i + 1, seed) * u; }
export function noise2(x, y, seed = 0) {
export const clamp = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;
export const mix = (a, b, t) => a + (b - a) * t;
export const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
export function xf(x = 0, y = 0, s = 1, rot = 0, flip = false) {
export const compose = (outer, inner) => { const f = p => outer(inner(p)); f.scale = (outer.scale || 1) * (inner.scale || 1); return f; };
export function parseD(d, step = 2) {
export function toPath(subs, path = new Path2D()) {
export function bboxOf(polys, pad = 0) {
export function shape(d, f = xf(), step = 2) {
export function fromSubs(subs) {
export const ring = pts => fromSubs([{ pts, closed: true }]);
export function ellipsePts(cx, cy, rx, ry, rot = 0, n = 64, a0 = 0, a1 = Math.PI * 2) {
export const ellipse = (cx, cy, rx, ry, rot = 0, n = 72) => ring(ellipsePts(cx, cy, rx, ry, rot, n));
export function inPoly(polys, x, y) {
export const inAny = (polys, x, y) => { for (const p of polys) if (inPoly([p], x, y)) return true; return false; };
export function resample(pts, step) {
export function normals(P, closed) {
export const polyArea = P => { let s = 0; for (let i = 0; i < P.length; i++) { const [x1, y1] = P[i], [x2, y2] = P[(i + 1) % P.length]; s += x1 * y2 - x2 * y1; } return s / 2; };
export function offsetRing(P, d) {
export function along(P, u) {
export const BW = Array.from({ length: NB }, (_, b) => WB0 * Math.pow(WBR, b));
export class Ink {
export function viewRect(ctx, pad = 20) {
export function hatch(ink, polys, o = {}) {
export function engraveTone(ink, polys, o = {}) {
export function hatchAlong(ink, polys, guide, o = {}) {
export function outline(ink, pts, o = {}) {
export const stroke = (ink, pts, w = 1.4, o = {}) => outline(ink, pts, { closed: false, w, taper: o.taper ?? 16, grain: 0.15, ...o });
export function stipple(ink, polys, { density = 0.02, tone = () => 0.5, r = 0.7, seed = 5, thr = 0.2, excl = null } = {}) {
export function fur(ink, polys, { density = 0.01, len = 10, dir = () => [0, 1], w = 0.9, seed = 9, tone = () => 0.6, curl = 0.25, rimOut = 1, excl = null } = {}) {
export const LIGHT = { x: -0.55, y: -0.6, z: 0.58 };
export function sphereTone(cx, cy, rx, ry, { base = 0, k = 1, L = LIGHT, rot = 0 } = {}) {
export function cylTone(cx, cy, r, a, { base = 0, k = 1, L = LIGHT } = {}) {
export const linTone = (x0, y0, x1, y1, t0, t1) => { const dx = x1 - x0, dy = y1 - y0, L2 = dx * dx + dy * dy; return (x, y) => mix(t0, t1, clamp(((x - x0) * dx + (y - y0) * dy) / L2)); };
export const addT = (...fs) => (x, y) => clamp(fs.reduce((a, f) => a + (typeof f === 'number' ? f : f(x, y)), 0));
export const maxT = (...fs) => (x, y) => Math.max(...fs.map(f => typeof f === 'number' ? f : f(x, y)));
export const mulT = (f, k) => (x, y) => clamp(f(x, y) * k);
export const blobTone = (cx, cy, rx, ry, v = 0.6, soft = 0.5) => (x, y) => { const d = Math.hypot((x - cx) / rx, (y - cy) / ry); return v * (1 - sstep(1 - soft, 1, d)); };
export function formTone(polys, { light = [-0.6, -0.7], lz = 0.55, base = 0.05, k = 1, res = 180, radius = null, rim = 0.25, ambient = 0 } = {}) {
export function contourHatch(ink, polys, { spacing = 6, tone = null, thr = 0.15, wMin = 0.3, wMax = 1.8, from = 0.5, maxLevels = 200, taper = 8, seed = 4, light } = {}) {
## engine/copper.js
export function drawCopper(ctx, rect) {
export function copperLight(ctx, W, H, cam) {
export function drawGrooves(ctx, ink, t, { zoom = 1, light = [-0.6, -0.8] } = {}) {
export function drawBurin(ctx, tip, dir, { s = 1, lift = 0, skew = 0.22 } = {}) {
export function drawSwarf(ctx, tip, dir, len, { s = 1, seed = 3 } = {}) {
## engine/index.js
export function engraveShape(d, { at = B.xf(), light = [-0.6, -0.7], spacing = 4, wMax = 1.6, outlineW = 1.8, style = 'hatch', angle = -0.6, ink = new B.Ink(), g = '', base = 0.05, seed = 1 } = {}) {
## engine/plate.js
export const PAL = {
export const FONTS = { roman: 'Bodoni Moda', script: 'Pinyon Script' };
export function paperTexture(W = 1920, H = 1080, seed = 53) {
export function drawSheet(ctx, { W = 1920, H = 1080, plate = [70, 44, 1850, 1036], tone = 1 } = {}) {
export function borderInk(ink, [x0, y0, x1, y1], { gap = 9 } = {}) {
export function measure(ctx, str, { size = 40, font = FONTS.roman, weight = 500, italic = false, track = 0 } = {}) {
export function engraveText(ctx, str, x, y, o = {}) {
export function writeScript(ctx, str, x, y, o = {}) {
export function fitLines(ctx, str, maxW, o) {
export function roundelFrame(ctx, x, y, r, { p = 1, w = 2.2 } = {}) {
export function leader(ctx, from, to, { p = 1, w = 0.9, num = null, numP = 1, size = 16 } = {}) {
export function wrapLines(ctx, str, maxW, o) {
## engine/wash.js
export class Wash {
## subjects/bee.js
export const FORE = 'M0 -7 C70 -22 200 -31 288 -23 C327 -19 339 6 322 27 C296 51 218 64 150 58 C96 52 46 37 0 11 Z';
export const FORE_VEINS = [...Object.values(FV), ['M138 -21 C146 -22 152 -21 156 -17', 2.6],
export const HIND = 'M0 -5 C60 -15 150 -19 208 -9 C236 -3 241 20 222 34 C190 52 120 50 70 36 C36 26 12 14 0 7 Z';
export const HIND_VEINS = [
export const HAMULI_U = [118, 152];                          // hooks along the hindwing leading edge (wing-local x)
export function wing(ink, d, veins, f, seed, { hamuli = false, excl = null } = {}) {
export function buildBee({ x = 960, y = 560, s = 1, seed = 7 } = {}) {
## subjects/details.js
export const DETAILS = { eye: buildEye, hamuli: buildHamuli, corbicula: buildCorbicula };
export function buildDetail(name, o = {}) { return (DETAILS[name] || buildEye)(o); }
## subjects/scallop.js
export function buildScallop({ x = 960, y = 606, s = 1, seed = 12 } = {}) {
```
