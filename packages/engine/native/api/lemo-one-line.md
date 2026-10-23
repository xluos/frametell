# Source API namespaces
N.Geometry: original geom.js namespace
N.Ink: original ink.js namespace
N.Paper: original paper.js namespace
N.Camera: original cam.js namespace
N.Face: original face.js namespace
N.Hands: original hands.js namespace

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## cam.js
export const BASE = 0.85;   // z=1 时每单位像素（整张脸入画）
export function camAt(P, keys, t, W = 1920, H = 1080) {
export function worldToScreen(cam, W = 1920, H = 1080) {
## face.js
export const LX = 128, LY = -20, LR = 92;
export const MOUTH_L = [-138, 212];
export const NOSE_A = A_PROF[8];
export const SEGS = [
## geom.js
export const STEP = 0.6;   // 采样间距（纸面单位）
export function sampleD(d, tf = {}, step = STEP) {
export function buildPath(segs) {
export function headAt(P, t) {
export function posAt(P, h) {
## hands.js
export function penShadow(ctx, tip, dir, k, opts = {}) {
export function handShadow(ctx, cx, cy, size, ang, alpha, chub = 0, t = 0) {
## ink.js
export const PAPER = [244, 239, 228];
export const INK = [29, 26, 23];
export const RED = [179, 51, 43];
export function prepare(P) {
  P.DX = X; P.DY = Y;
  P.blots = [];
export function drawLine(ctx0, P, head, M, k, opts = {}) {
export function drawBlots(ctx, P, t, M, k) {
## paper.js
export function makePaper() {
export function drawPaper(ctx, paper, cam, W, H) {
export function vignette(ctx, W, H, amt = .13) {
export function makeTooth() {
export function drawTooth(ctx, tooth, cam, W, H, alpha = .32) {
## shots.js
export const CAM = [
## story.js
export const DUR = 47.5;
export const TITLE = { t0: 5.6, t1: 8.2, text: 'The Line That Never Lifted', sub: 'a one-line drawing' };
export const VO = [
export const HAND = { enter: 40.3, grip: 41.1, oldOut: [41.3, 42.6], newLine: 41.7 };
export const END = { t0: 43.4 };
## subs.js
export function subtitle(ctx, text, t0, t1, t, W, H, opt = {}) {
export function title(ctx, T, t, W, H) {
export function endCard(ctx, E, t, W, H) {
```
