# Source API namespaces
N: original public functions and constants

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## engine.js
const W = 1920, H = 1080;
function mulberry(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rnd = (a = 0, b = 1) => a + (b - a) * RNG();
const pick = a => a[Math.floor(RNG() * a.length)];
function withSeed(seed, fn) { const keep = RNG; RNG = mulberry(seed); try { return fn(); } finally { RNG = keep; } }
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const ss = t => { t = clamp(t); return t * t * (3 - 2 * t); };
const eio = t => { t = clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
const eo = t => 1 - Math.pow(1 - clamp(t), 3);
const ei = t => Math.pow(clamp(t), 2.2);
const hash = n => { n = Math.sin(n * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); };
const vnoise = x => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u); };
const fbm = x => vnoise(x) * .55 + vnoise(x * 2.1 + 17) * .3 + vnoise(x * 4.3 + 41) * .15;
function monotone(keys) {
const PAPER = '#f1e9da', INK = '#2b2520', INK2 = '#3d3129';
const _rgb = {};
const hex2rgb = h => _rgb[h] || (_rgb[h] = [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]);
const mixc = (a, b, t) => { const A = hex2rgb(a), B = hex2rgb(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
const rgba = (h, a) => { const c = hex2rgb(h); return `rgba(${c[0]},${c[1]},${c[2]},${clamp(a).toFixed(3)})`; };
function qcurve(x0, y0, x1, y1, bend = 0, n = 12) {
function qctrl(x0, y0, cx, cy, x1, y1, n = 12) {
const polar = (x, y, a, len, bend = 0, n = 8) => qcurve(x, y, x + Math.cos(a) * len, y + Math.sin(a) * len, bend, n);
function mk(pts, w, col, o = {}) {
function drawS(c, s, p = 1, col = null, am = 1) {
function drawList(c, L, p = 1, col = null, am = 1) {
function bbox(L, pad = 6) {
function sprite(L, col = null) {
function clump(S, cx, cy, r, n, cols, o = {}) {
function edgeOf(s, side, w, col, a = .85) {
## plants.js
const COL = {
function spinifex(sc) {
function desertOak(sc) {
function mulga(sc) {
function saltbush(sc) { const S = []; clump(S, 0, -12 * sc, 22 * sc, 14, COL.salt, { l0: 6 * sc, l1: 12 * sc, w0: 6 * sc, w1: 10 * sc, sx: 1.5, sy: .6 }); return { S }; }
function wattle(sc) {
function tussock(sc, cols = COL.gold, n = 14) {
function gum(sc, hm = 1) {
function ash(sc) {
function frond(S, x, y, ang, len, sc, cols, droop = .35) {
function treeFern(sc) {
function groundFern(sc) { const S = []; for (let i = 0; i < 6; i++) frond(S, rnd(-6, 6) * sc, 0, -Math.PI / 2 + (i / 5 - .5) * 2.6, rnd(40, 70) * sc, sc * .7, COL.fern, .15); return { S }; }
function rfTree(sc, o = {}) {
function fanPalm(sc) {
function vine(sc) {
function farTree(sc, cols, tall = 1) {
function uluru(sc) {
function cloud(sc, col = '#aab8bd') {
function shrub(sc, cols = COL.rain) {
```
