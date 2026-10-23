# Source API namespaces
N: original public functions and constants

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## engine.js
  G.mix = mix; G.rgba = rgba;
  G.PAL = PAL; G.CREAM = CREAM; G.INK = INK;
  G.CYCLE = ['red', 'purple', 'green', 'gold', 'ochre'];
  G.canvas = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  G.disc = (ctx, x, y, r, col) => { if (r <= 0) return; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };
  G.seg = (ctx, a, b, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); };
  G.ring = (ctx, x, y, r, w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); };
  G.poly = (ctx, pts, col) => { ctx.fillStyle = col; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill(); };
  G.CELL = CELL;
  G.motif = motif;
  G.pattern = function (palKey, seed = 1, o = {}) {
  G.drawPattern = function (ctx, pat, offs, o = {}) {
  G.LEN = LEN; G.WID = WID;
  G.rot2 = rot2;
  G.POSE_DEFAULT = DEF;
  G.joints = function (p) {
  G.drawFigure = function (ctx, J, col, far) {
  G.lerpPose = function (a, b, t) {
  G.keyPose = function (keys, u, loop) {
  G.runCycle = function (ph, k = 1, o = {}) {
  G.walkCycle = function (ph, k = 1) {
  G.F = {
  G.fitFont = function (ctx, text, fam, weight, px, maxW, ls = 0) {
  G.maskText = function (ctx, text, x, y, font, col, p, o = {}) {
  G.typeText = function (ctx, text, x, y, font, col, p, o = {}) {
  G.hair = (ctx, x, y, w, col, p = 1, lw = 2) => { ctx.fillStyle = col; ctx.fillRect(x, y, w * clamp(p), lw); };
## poses/base.js
  G.P = {
```
