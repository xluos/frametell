# Source API namespaces
N: original public functions and constants

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## iso-kit.mjs
export const AZIMUTH = 45;
export const ELEVATION = 30;
export const SHADES = 4;
export function cameraOf({ scale, azimuth = AZIMUTH, elevation = ELEVATION }) {
export function iso([x, y, z], projection) {
export function towardViewer(projection) {
export function depthOf([x, y, z], projection) {
export function pathOf(points, closed = false) {
export const joinPaths = (paths) => paths.filter(Boolean).join("");
export function roundedPlan({ x, y, w, d, r }, steps = 8) {
export function extrude(ring, z, height, projection, options = {}) {
export const ringOf = (plan, steps = 8) => roundedPlan(plan, steps);
export function slabOf(plan, z, height, projection, steps = 8, bevel = 0) {
export function circleRing(cx, cy, radius, steps = 40) {
export function cylinder(cx, cy, radius, z, height, projection, steps = 32, bevel = 0) {
export const insetPlan = ({ x, y, w, d, r }, by) => ({ x: x + by, y: y + by, w: w - by * 2, d: d - by * 2, r: Math.max(0, r - by) });
export function onTop(points, z, projection, closed = false) {
export const planOutline = (plan, z, projection, steps = 8) => onTop(ringOf(plan, steps), z, projection, true);
export const lineOnTop = (from, to, z, projection) => onTop([from, to], z, projection);
export const segment = (from, to, projection) => pathOf([iso(from, projection), iso(to, projection)]);
export const rise = (at, from, to, projection) => segment([at[0], at[1], from], [at[0], at[1], to], projection);
export const ring = (cx, cy, radius, z, projection, steps = 40) => onTop(circleRing(cx, cy, radius, steps), z, projection, true);
export const pointsAt = (points, projection) => points.map((point) => iso(point, projection));
export function dotGrid(x, y, columns, rows, gap, z, projection) {
export function corners({ x, y, w, d }, inset = 0) {
export function boxCorners({ x, y, w, d }, z0, z1) {
export function knurl(cx, cy, radius, z0, z1, count, projection, inset = 0.4) {
export function sideArc(cx, cy, radius, z, projection, steps = 24) {
export function ringSeam(ring, z, projection) {
export const sideSeam = (plan, z, projection, steps = 8) => ringSeam(ringOf(plan, steps), z, projection);
export function sideRing(center, radius, axis, projection, steps = 20) {
export function coil(from, to, center, radius, turns, axis, projection, perTurn = 16) {
export function topTicks(from, to, step, every, edge, z, lengths, projection, axis = "x") {
export function sideTicks(from, to, step, every, face, top, lengths, projection, axis = "x") {
export function radialTicks(cx, cy, radius, count, every, z, lengths, projection, from = 0, span = Math.PI * 2) {
export const haloOf = (plan, z, height, projection) => slabOf(plan, z, height, projection).fill;
export function axisVector(projection, [dx, dy, dz]) {
export function translateAlong(projection, by) {
export function holdStill(element, [dx, dy]) {
export function topMatrix(at, z, projection, along = "x") {
export function sideMatrix(at, z, projection, face) {
export function screenRise(height, projection) {
export function fitProjection(points, width, height, { pad = 24, headroom = 0, azimuth = AZIMUTH, elevation = ELEVATION } = {}) {
export function solidSvg(paths, { tone = "hi", crease = "faint", halo = false, lit = false, flat = false, className, inner = "" } = {}) {
export function lineSvg(d, { tone = "lo", dotted = false, dashed = false, flow = false, className, free } = {}) {
export function dotsSvg(points, { size = 0.5, tone = "mid", pulse = false } = {}) {
export function fadedSvg(list, style = {}) {
export function fadeLineSvg(points, { fade = [0, 0], tone = "lo", className, stops = 6 } = {}) {
export function wireSvg(from, to, { via = [], tone = "lo", dotted = false, dashed = false, flow = false, ends = "both", size = 1.2 } = {}) {
export function faceTextSvg(transform, text, { size = 3, tone = "mid", anchor = "start" } = {}) {
export function groupSvg(children, extra = {}) {
export function figureSvg({ width, height, label, body, standalone = false, className }) {
export function plateHtml({ fig, title, hint, readout = "", keys = [], caption, body }) {
export function pageHtml({ title, theme = "dark", body, script = "", width = 650 }) {
export const ISO_CSS = `
```
