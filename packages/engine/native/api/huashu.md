# Source API namespaces
N.U, N.KIT, N.PAINT, N.RIG, N.HUASHU, N.CH, N.CL, N.TY, N.MO, N.CAM, N.MEDIUM, N.TOON, N.DG: original namespaces

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## scripts/engine/lib/brush.js
P.brush = (c, pts, { w = 10, tone = 0.85, dry = 0.45, seed = 1, reveal = 1, bristles = 8, col = [16, 14, 12], head = 0.12, tail = 0.4, per = 5 } = {}) => {
P.leaf = (c, x, y, ang, L, wmax, tone = 0.88, col = [16, 14, 12]) => {
P.inkWash = (c, key, grow, fn, { blur = 2, halo = 10, haloA = 0.22, alpha = 1 } = {}) => {
P.flowSeeds = (cell = 24, seed = 5) => { const r = rng(seed), o = []; for (let y = -10; y < H + 10; y += cell) for (let x = -10; x < W + 10; x += cell) o.push([x + (r() - .5) * cell, y + (r() - .5) * cell, r(), r()]); return o; };
P.flowLines = (c, seeds, { t = 0, region, angle, color, params, extraSteps = 8 }) => {
P.deform = (pts, depth, amp, r) => {
P.watercolor = (g, pts, color, { layers = 7, alpha = 0.13, amp = 10, seed = 1, edge = 0.1, blend = 'multiply', fill } = {}) => {
P.rectPts = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
P.ellipsePts = (cx, cy, rx, ry, n = 18) => Array.from({ length: n }, (_, i) => [cx + Math.cos(i / n * Math.PI * 2) * rx, cy + Math.sin(i / n * Math.PI * 2) * ry]);
P.impasto = (c, pts, w, col, hi) => {
P.cut = (pts, seed, step = 18, amp = 2.5) => {
## scripts/engine/lib/camera.js
CAM.apply = (c, cam) => { const k = n(cam); c.translate(W / 2, H / 2); if (k.r) c.rotate(k.r); c.scale(k.z, k.z); c.translate(-k.x, -k.y); };
CAM.with = (c, cam, fn) => { c.save(); CAM.apply(c, cam); fn(c); c.restore(); };
CAM.toScreen = (cam, x, y) => { const k = n(cam); let dx = (x - k.x) * k.z, dy = (y - k.y) * k.z; if (k.r) { const cs = Math.cos(k.r), sn = Math.sin(k.r); [dx, dy] = [dx * cs - dy * sn, dx * sn + dy * cs]; } return [W / 2 + dx, H / 2 + dy]; };
CAM.toWorld = (cam, sx, sy) => { const k = n(cam); let dx = sx - W / 2, dy = sy - H / 2; if (k.r) { const cs = Math.cos(-k.r), sn = Math.sin(-k.r); [dx, dy] = [dx * cs - dy * sn, dx * sn + dy * cs]; } return [k.x + dx / k.z, k.y + dy / k.z]; };
CAM.zlerp = (z0, z1, e) => z0 * Math.pow(z1 / z0, e);
CAM.coverZoom = (r, cx = W / 2, cy = H / 2) => Math.max(Math.hypot(cx, cy), Math.hypot(W - cx, cy), Math.hypot(cx, H - cy), Math.hypot(W - cx, H - cy)) / r;
CAM.anchor = (wx, wy, z, sx, sy) => ({ x: wx - (sx - W / 2) / z, y: wy - (sy - H / 2) / z, z });
CAM.pushTo = (base, wx, wy, Z, e, k = e, to = [W / 2, H / 2]) => {
CAM.at = (keys, t) => {
CAM.track = (base, events, t) => {
CAM.layer = (c, cam, d, fn) => { const k = n(cam); c.save(); CAM.apply(c, { x: lerp(W / 2, k.x, d), y: lerp(H / 2, k.y, d), z: Math.pow(k.z, d) }); fn(c); c.restore(); };
CAM.velocity = (camFn, t, dt = 1 / 60) => { const a = camFn(t), b = camFn(t - dt); const z = n(a).z; return [(n(a).x - n(b).x) * z, (n(a).y - n(b).y) * z]; };
CAM.motionBlur = (c, src, vx, vy, k = 7) => {
CAM.drift = (t, amp = 6, seed = 0) => [amp * Math.sin(t * 0.9 + seed) + amp * 0.4 * Math.sin(t * 2.3 + seed * 2), amp * 0.7 * Math.sin(t * 1.1 + seed * 3)];
## scripts/engine/lib/chart.js
CH.lin = (d0, d1, r0, r1) => { const f = v => r0 + (v - d0) / (d1 - d0) * (r1 - r0); f.inv = y => d0 + (y - r0) / (r1 - r0) * (d1 - d0); return f; };
CH.ticks = (min, max, n = 5) => {
CH.mixHex = (a, b, t) => { const A = PAINT.hex(a), B = PAINT.hex(b); return `rgb(${lerp(A[0], B[0], t) | 0},${lerp(A[1], B[1], t) | 0},${lerp(A[2], B[2], t) | 0})`; };
CH.grid = (c, F, ys, yS, p, { col = 'rgba(0,0,0,.14)', zeroCol = '#121212', lw = 1.5, zeroLw = 3, lag = 0.12, font = '28px sans-serif', labelCol = '#5b5b5b', fmt = v => String(v), side = 'right', labelDy = -10 } = {}) => {
CH.xLabels = (c, items, y, p, { font = '28px sans-serif', col = '#3a3a3a', lag = 0.1 } = {}) => {
CH.bars = (c, data, yS, bw, p, { lag = 0.18, col = '#1f5c99', hi = -1, hiP = 0, hiCol, dimCol = '#b9c3cc', label = true, fmt = v => v.toFixed(0), font = '30px sans-serif', labelCol = '#121212' } = {}) => {
CH.line = (c, pts, p, { col = '#e3120b', lw = 5, head = true, headR = 9, area, glow } = {}) => {
CH.yAt = (pts, x) => { for (let i = 1; i < pts.length; i++) if (pts[i][0] >= x) { const a = pts[i - 1], b = pts[i]; return lerp(a[1], b[1], (x - a[0]) / (b[0] - a[0])); } return pts[pts.length - 1][1]; };
CH.candles = (c, rows, xs, yS, cw, p, { up = '#e0322f', down = '#11a05a', lag = 0.06, hollowUp = false } = {}) => {
CH.callout = (c, lt, t0, { x, y, tx, ty, lines = [], col = '#121212', dotCol = '#e3120b', font = '600 30px sans-serif', font2, align = 'left', r = 11 }) => {
CH.tag = (c, x, y, w = 64, h = 14, col = '#e3120b') => { c.fillStyle = col; c.fillRect(x, y, w, h); };
CH.demoBadge = (c, text = '示意数据', { x = W - 40, y = 1040, font = '600 24px sans-serif', col = '#7a7a7a', box = 'rgba(0,0,0,.06)' } = {}) => {
CH.frame = (c, lt, { title, sub, source = '来源：示意数据', badge = '示意数据', bg = '#FFFFFF', red = '#E3120B', ink = '#0C0C0C', subCol = '#4F5B61', srcCol = '#7c868b',
## scripts/engine/lib/collage.js
CL.paperTile = (key, base, { size = 512, amt = 10, fibers = 260, grain = 10, fiberCol = [120, 100, 70], seed = 3 } = {}) => PAINT.cached('ytpaper_' + key, size, size, (g) => {
CL.fillPaper = (c, tile, x, y, w, h) => { c.save(); c.fillStyle = c.createPattern(tile, 'repeat'); c.fillRect(x, y, w, h); c.restore(); };
CL.tornEdge = (x0, y0, x1, y1, { step = 9, amp = 10, seed = 5 } = {}) => {
CL.tornRect = (g, w, h, seed, amp = 5) => {
CL.halftone = (key, src, { cell = 7, ink = '#1b1b1b', paper = '#efe9dc', angle = Math.PI / 4, gamma = 1, contrast = 1.15 } = {}) => PAINT.cached('ytht_' + key, src.width, src.height, (g) => {
CL.photo = (key, w, h, draw, { border = 14, cell = 6, paper = '#f2f0ea', ink = '#1a1a1a', htPaper = '#e8e4da', contrast = 1.3 } = {}) => PAINT.cached('clphoto_' + key, w + border * 2, h + border * 2, (g) => {
CL.placed = (g, x, y, r, fn) => { g.save(); g.translate(x, y); g.rotate(r); fn(g); g.restore(); };
CL.shadowed = (g, fn, { col = 'rgba(50,40,25,.28)', blur = 10, x = 3, y = 6 } = {}) => { g.save(); g.shadowColor = col; g.shadowBlur = blur; g.shadowOffsetX = x; g.shadowOffsetY = y; fn(); g.restore(); };
CL.slideIn = (g, t, t0, x, y, r, fn, { from = [420, -60], tilt = 0.2, dur = 0.6, fps = 12 } = {}) => {
CL.tape = (g, x, y, a, w = 120, col = 'rgba(226,220,200,.85)') => { g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = col; g.translate(-w / 2, -17); CL.tornRect(g, w, 34, (x * 7 + y) | 0, 3); g.fill(); g.restore(); };
CL.pin = (g, x, y, col = '#b8433f') => { g.save(); g.translate(x, y); g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.arc(3, 5, 12, 0, 7); g.fill(); g.fillStyle = col; g.beginPath(); g.arc(0, 0, 12, 0, 7); g.fill(); g.fillStyle = 'rgba(255,255,255,.55)'; g.beginPath(); g.arc(-4, -4, 4, 0, 7); g.fill(); g.restore(); };
CL.stringPts = (a, b, sag = 0.08, n = 48) => { const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + Math.hypot(b[0] - a[0], b[1] - a[1]) * sag; const o = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; o.push([u * u * a[0] + 2 * u * t * mx + t * t * b[0], u * u * a[1] + 2 * u * t * my + t * t * b[1]]); } return o; };
CL.string = (g, pts, cum, d, { col = '#b8433f', lw = 5, shadow = 'rgba(0,0,0,.16)' } = {}) => {
CL.highlight = (g, x0, y0, w, h, q, col = 'rgba(218,207,8,.9)') => { if (q <= 0) return; g.save(); g.globalCompositeOperation = 'multiply'; g.fillStyle = col;
CL.stickerEdge = (src, key, border = 12, col = '#f4f2ec', dirs = 16) => {
## scripts/engine/lib/motion.js
MO.seg = (t, a, b) => clamp((t - a) / (b - a));                          // [a,b] → 0..1
MO.at = (t, t0, dur) => clamp((t - t0) / dur);                           // [t0, t0+dur] → 0..1
MO.anim = (lt, start, dur, ease = MO.smooth) => ease(clamp((lt - start) / dur));
MO.step = (t, fps = 12) => Math.floor(t * fps + 1e-6) / fps;
MO.smooth = t => { t = clamp(t); return t * t * t * (10 - 15 * t + 6 * t * t); };
MO.smoothCE = (t, inflection = 10) => { const e = sig(-inflection / 2); return clamp((sig(inflection * (t - 0.5)) - e) / (1 - 2 * e)); };   // ManimCE 版
MO.thereAndBack = t => MO.smooth(t < 0.5 ? 2 * t : 2 * (1 - t));          // Indicate 用：去了又回
MO.rushInto = t => 2 * MO.smooth(t / 2);                                  // 慢起、冲进终点
MO.rushFrom = t => 2 * MO.smooth(t / 2 + 0.5) - 1;                        // 冲出、慢收
MO.doubleSmooth = t => t < 0.5 ? 0.5 * MO.smooth(2 * t) : 0.5 * (1 + MO.smooth(2 * t - 1));
MO.wiggle = (t, wiggles = 2) => MO.thereAndBack(t) * Math.sin(wiggles * Math.PI * t);
MO.lagged = (i, n, p, r = 0.05) => clamp(p * (1 + (n - 1) * r) - i * r);
MO.linear = p => p;
MO.sineInOut = p => -(Math.cos(Math.PI * p) - 1) / 2;
MO.cubicIn = p => p * p * p;
MO.cubicOut = p => 1 - Math.pow(1 - p, 3);
MO.cubicInOut = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
MO.quartOut = p => 1 - Math.pow(1 - p, 4);
MO.quintOut = p => 1 - Math.pow(1 - p, 5);
MO.quintInOut = p => p < .5 ? 16 * p ** 5 : 1 - Math.pow(-2 * p + 2, 5) / 2;
MO.expoIn = p => p <= 0 ? 0 : Math.pow(2, 10 * p - 10);
MO.expoOut = p => p >= 1 ? 1 : 1 - Math.pow(2, -10 * p);                // 动效设计最常用的「快出慢停」
MO.expoInOut = p => p <= 0 ? 0 : p >= 1 ? 1 : p < .5 ? Math.pow(2, 20 * p - 10) / 2 : (2 - Math.pow(2, -20 * p + 10)) / 2;
MO.backOut = (p, s = 1.70158) => { const q = p - 1; return 1 + (s + 1) * q * q * q + s * q * q; };
MO.elasticOut = p => p <= 0 ? 0 : p >= 1 ? 1 : Math.pow(2, -10 * p) * Math.sin((p * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
MO.bezier = (x1, y1, x2, y2) => {
MO.appleOut = MO.bezier(0.25, 0.1, 0.25, 1);        // CSS `ease`：苹果官网/发布会过渡
MO.emphasized = MO.bezier(0.2, 0, 0, 1);            // Material 3 emphasized：长尾减速
MO.k75 = MO.bezier(0.75, 0, 0.25, 1);               // Kurzgesagt「其他动作用 75% influence」（y1 调研 §6.2）
MO.easyEase = MO.bezier(0.333, 0, 0.667, 1);        // AE Easy Ease：循环动作
MO.longTail = MO.bezier(0.33, 0, 0.2, 1);           // Vox「沿线追过去」「拉出揭示」：起步快、长尾落定（y2 调研）
MO.spring = (t, { duration = 0.5, bounce = 0, v0 = 0 } = {}) => {
MO.smoothSpring = t => MO.spring(t, { duration: 0.5, bounce: 0 });
MO.snappy = t => MO.spring(t, { duration: 0.5, bounce: 0.15 });
MO.bouncy = t => MO.spring(t, { duration: 0.5, bounce: 0.3 });
MO.springHz = (t, freq = 2.5, decay = 9) => t <= 0 ? 0 : 1 - Math.exp(-decay * t) * Math.cos(2 * Math.PI * freq * t);
MO.settle = (t, amp, freq = 3, decay = 5) => t <= 0 ? 0 : amp * Math.sin(2 * Math.PI * freq * t) / Math.exp(decay * t);
MO.PULSE = { punch: 0.28, pan: 0.30, slam: 0.17, k: 0.25, kMin: 0.18, kMax: 0.32, push: 0.9, glide: 0.7, pull: 1.1 };
MO.slamK = (k, from = 1.55, under = 0.94) => k <= 0 ? from : k < 0.6 ? from - (from - under) * (k / 0.6) : k < 1 ? under + (1 - under) * ((k - 0.6) / 0.4) : 1;
MO.slam = (t, at, o = {}) => t < at ? 0 : MO.slamK((t - at) / (o.dur || MO.PULSE.slam), o.from, o.under);
MO.pulse = (t, at, dur = MO.PULSE.punch, ease = MO.cubicInOut) => ease(clamp((t - at) / dur));
MO.float = (t, amp = 6, period = 4, ph = 0) => amp * (0.75 * Math.sin(2 * Math.PI * t / period + ph) + 0.25 * Math.sin(2 * Math.PI * t / (period * 0.53) + ph * 1.7));
MO.invert = (ease, y, iters = 30) => { let a = 0, b = 1; for (let i = 0; i < iters; i++) { const m = (a + b) / 2; if (ease(m) < y) a = m; else b = m; } return (a + b) / 2; };
MO.beat = (n, bpm = 120) => n * 60 / bpm;
MO.onBeat = (barTime, revealP, trDur) => barTime - revealP * trDur;
## scripts/engine/lib/paint.js
P.canvas = (w = W, h = H) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
P.cached = (key, w, h, fn) => { if (!CACHE[key]) { const c = P.canvas(w, h); fn(c.getContext('2d'), c); CACHE[key] = c; } return CACHE[key]; };
P.scratch = (key) => { if (!CACHE['s_' + key]) CACHE['s_' + key] = P.canvas(); return CACHE['s_' + key]; };
P.noise = (x, y) => {                                   // Perlin 2D，约 [-1,1]
P.fbm = (x, y, o = 4) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++) { s += a * P.noise(x * f, y * f); a *= 0.5; f *= 2; } return s; };
P.hex = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
P.rgb = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
P.mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
P.jitter = (c, r, amt) => [c[0] + (r() - .5) * amt, c[1] + (r() - .5) * amt, c[2] + (r() - .5) * amt];
P.texture = (key, base, opt = {}) => P.cached('tex_' + key, W, H, (g) => {
P.grain = (key, density = 0.08, col = [0, 0, 0], alpha = 0.18) => P.cached('grain_' + key, W, H, (g) => {
P.craquelure = (key, alpha = 0.35) => P.cached('crack_' + key, W, H, (g) => {
P.boilSeed = (t, fps = 12) => Math.floor(t * fps);
P.roughPath = (c, pts, { amp = 2, seed = 1, closed = false, step = 6 } = {}) => {
P.bez = (p0, p1, p2, p3, n = 24) => { const o = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; o.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]); } return o; };
P.path = (d) => new Path2D(d);
P.strokes = (dst, src, { cell = 12, len = 22, width = 7, angle, seed = 1, t = 0, boil = 8, outline = 0.35, outlineCol = [20, 25, 60], outlineMix = 0.55, jitterCol = 18, mask, alphaMask = false, palette, cap = 'round' } = {}) => {
P.swatch = (hexes, mixBase = 0.35) => { const cs = hexes.map(P.hex); return (col, r) => { const k = cs[(r() * cs.length) | 0]; return P.mix(k, col, mixBase); }; };
P.dabs = (dst, src, { cell = 10, size = 9, seed = 2, t = 0, boil = 8, angle = -0.6, shift = 22 } = {}) => {
P.mosaic = (dst, src, { tile = 14, grout = '#3b352e', seed = 3, jitter = 0.25 } = {}) => {
P.halftone = (dst, src, { cell = 14, paper = '#f4ecd8', seed = 4 } = {}) => {
P.pixelate = (dst, src, { size = 8, palette } = {}) => {
P.facets = (dst, src, { nx = 22, ny = 13, seed = 5, t = 0, shiftAmt = 26, edge = 'rgba(40,30,20,.45)' } = {}) => {
P.cupCycle = (t, period = 2.4) => { const q = ((t % period) + period) % period;
P.choreo = (lt, t) => ({
P.steam = (c, t, x, y, { h = 80, n = 3, color = 'rgba(255,255,255,.8)', width = 4, spread = 16, wobble = 10, seed = 1 } = {}) => {
P.particles = (n, seed, t, { x0 = 0, x1 = W, y0 = -40, y1 = H + 40, speed = 80, drift = 30, life = 6 } = {}) => {
## scripts/engine/lib/render.js
P.halftoneGray = (c, src, bx, by, bw, bh, cell, col, gain = 0.78, ang = Math.PI / 4) => {
P.shadeDots = (c, path, bx, by, bw, bh, cell, col, f) => {
P.dotPattern = (c, key, pitch, r, col, bg, angleDeg = 45) => {
P.pointillism = (c, src, { pal, comp = {}, pitch = 10, rad = 4.5, posJitter = 2.4, colorJitter = 40, compRate = 0.08, flicker = 0.07, fps = 6, t = 0, shimmer, white = 12, dark = 0, bleed = 45 } = {}) => {
P.clipBeside = (c, path, dx, dy) => { const m = new Path2D(); m.addPath(BIG); m.addPath(path, new DOMMatrix().translate(dx, dy)); c.clip(path); c.clip(m, 'evenodd'); };
P.cel = (c, p, base, shade, rim, { sd = 22, rw = 7, line = '#6a4632', lw = 2.2, lx = -1, ly = -0.55 } = {}) => {
P.kirbyShade = (g, path, { d1 = 14, d2 = 30, gap = 9, light = [-0.86, -0.5], ink = '#141212', lw = 2.6 } = {}) => {
P.vol = (c, path, x0, y0, x1, y1, a, b, occl = 'rgba(40,20,10,.45)', blur = 14) => {
P.castShadow = (c, layers, { kx = 1, ky = 0.22, clipY = 0, alpha = 0.55, blur = 1.5, key = 'castShadow' } = {}) => {
P.litClip = (c, polys, drawLit) => {
P.pool = (g, x, y, r, col, a) => { const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(${col},${a})`); rg.addColorStop(0.45, `rgba(${col},${a * 0.55})`); rg.addColorStop(1, `rgba(${col},0)`); g.fillStyle = rg; g.fillRect(x - r, y - r, 2 * r, 2 * r); };
P.lightMap = (key, ambient, fn) => {
P.applyLight = (c, map) => { c.save(); c.globalCompositeOperation = 'multiply'; c.drawImage(map, 0, 0); c.restore(); };
P.carve = {
P.piece = (g, path, col, carve, { edge = 5, line = '#3a160a', lw = 2.6 } = {}) => {
P.stamp = (c, layer, { dx = 7, dy = 5, shadow = 0.28, blur = 6 } = {}) => {
P.glowStroke = (c, col, w, blur) => { c.shadowColor = col; c.shadowBlur = blur; c.strokeStyle = col; c.lineWidth = w; c.stroke(); c.shadowBlur = 0; };
P.roughen = (layer, box, { freq = 0.028, amp = 9, key = 'rough' } = {}) => {
## scripts/engine/lib/rig.js
R.ik2 = (S, T, a, b, bendSign = 1) => {
R.limb = (A, B, wA, wB) => {
R.stretch = (O, sx = 1, sy = 1, anchor = [0, 0]) => {
R.smooth = (pts, closed = true, k = 0.5) => {              // Catmull-Rom → 三次贝塞尔
R.taper = (A, B, wA, wB, bulge = 0) => {                  // 锥形肢体（袖子/手臂），bulge 让中段鼓起
R.girl = (opt = {}) => {
  G.hairBack = sm(HP, [[1262, 312], [1300, 290], [1350, 293], [1392, 322], [1408, 368], [1398, 420], [1372, 448], [1346, 442], [1332, 412], [1318, 380], [1292, 340]]);
  G.bun = style === 'bun' ? (() => { const c0 = HP(1390, 372), p = new Path2D(); p.arc(c0[0], c0[1], 31 * s, 0, Math.PI * 2); return p; })() : null;
  G.bunSpiral = HP(1390, 372);
  G.hairDown = (style === 'long' || style === 'down') ? sm(HP, [[1340, 420], [1385, 430], [1418, 480], [1425, 560], [1405, 600], [1385, 540], [1360, 470]]) : null;
  G.braid = style === 'braid' ? [0, 1, 2, 3, 4].map(k => HP(1392 - k * 2, 440 + k * 30)) : null;
  G.face = sm(HP, [[1258, 318], [1252, 335], [1250, 352], [1242, 366], [1249, 373], [1256, 378], [1253, 386], [1259, 391], [1255, 398], [1263, 406], [1276, 413], [1296, 412], [1316, 398], [1326, 370], [1320, 335], [1296, 314]]);
  G.neck = sm(T, [[1286, 400], [1314, 400], [1324, 445], [1290, 448]]);
  G.bangs = sm(HP, [[1248, 322], [1260, 300], [1290, 293], [1322, 304], [1338, 330], [1332, 364], [1320, 346], [1302, 328], [1282, 322], [1266, 330], [1257, 346]]);
  G.locks = [sm(HP, [[1318, 345], [1308, 372], [1314, 398], [1306, 420], [1314, 440]], false), sm(HP, [[1326, 352], [1322, 380], [1330, 405], [1324, 430]], false)];
  G.hairLines = [sm(HP, [[1262, 312], [1300, 300], [1345, 312], [1380, 340]], false), sm(HP, [[1275, 322], [1315, 318], [1350, 338], [1372, 372]], false), sm(HP, [[1300, 330], [1340, 352], [1360, 395]], false)];
  G.lid = sm(HP, [[1259, 348], [1268, 343], [1279, 348]], false);
  G.lashes = [[HP(1259, 348), HP(1254, 343)], [HP(1262, 345), HP(1258, 339)]];
  G.brow = sm(HP, [[1257, 335], [1268, 330], [1281, 334]], false);
  G.nostril = HP(1250, 382);
  G.lips = [HP(1252, 389), HP(1259, 390), HP(1254, 397)];
  G.cheek = HP(1283, 380); G.ear = HP(1318, 372);
    G.brim = (() => { const c0 = HP(1326, 300), p = new Path2D(); p.ellipse(c0[0], c0[1], 130 * s, 25 * s, tilt + 0.19, 0, Math.PI * 2); return p; })();
    G.crown = (() => { const c0 = HP(1336, 290), p = new Path2D(); p.ellipse(c0[0], c0[1], 62 * s, 44 * s, tilt + 0.14, Math.PI, 0); p.closePath(); return p; })();
    G.band = sm(HP, [[1276, 283], [1336, 296], [1398, 306], [1396, 318], [1336, 309], [1276, 296]]);
    G.bow = HP(1404, 318);
  G.torso = sm(TB, [[1290, 432], [1318, 428], [1350, 434], [1380, 446], [1404, 482], [1416, 542], [1424, 600], [1412, 622], [1300, 618], [1285, 560], [1282, 500], [1286, 460]]);
  G.bib = sm(TB, [[1291, 438], [1313, 436], [1307, 500], [1303, 560], [1305, 612], [1286, 612], [1283, 520]]);
  G.skirt = sm(T, [[1300, 605], [1420, 612], [1446, 650], [1452, 722], [1440, 762], [1362, 772], [1342, 802], [1352, 926], [1220, 932], [1104, 926], [1118, 820], [1150, 722], [1190, 656], [1242, 630]]);
  G.apronSkirt = sm(T, [[1300, 612], [1352, 642], [1332, 702], [1316, 822], [1200, 824], [1192, 702], [1200, 656], [1252, 630]]);
  G.folds = [sm(T, [[1230, 670], [1222, 760], [1226, 815]], false), sm(T, [[1268, 668], [1262, 760], [1268, 818]], false), sm(T, [[1160, 760], [1150, 860], [1146, 920]], false), sm(T, [[1300, 820], [1306, 880], [1300, 925]], false)];
  G.apronBow = [T(1428, 616), T(1450, 600), T(1452, 634), T(1440, 690)];
  G.shoe = sm(T, [[1098, 918], [1120, 910], [1146, 914], [1150, 928], [1100, 930]]);
  G.farSleeve = sm(TB, [[1332, 468], [1364, 520], [1346, 600], [1250, 632], [1212, 626], [1220, 604], [1300, 584], [1318, 520]]);
  G.farCuff = sm(T, [[1222, 604], [1236, 604], [1238, 630], [1220, 632]]);
  G.farHand = sm(T, [[1218, 606], [1180, 604], [1150, 609], [1146, 618], [1180, 626], [1218, 630]]);
  G.upperArm = R.taper(S, E, 54 * s, 40 * s, 10 * s);
  G.foreArm = R.taper(E, W_, 40 * s, 30 * s, 2 * s);
  G.cuff = R.taper([lerp(E[0], H[0], 0.76), lerp(E[1], H[1], 0.76)], W_, 32 * s, 31 * s);
  G.hand = (() => { const p = new Path2D(), r = 15 * s; p.ellipse(H[0], H[1], r * 1.15, r, fa, 0, Math.PI * 2); return p; })();
  G.thumb = [H[0] + Math.cos(fa - 1.2) * 14 * s, H[1] + Math.sin(fa - 1.2) * 14 * s];
  G.cup = { x: cp[0], y: cp[1] - 18 * s, w: 44 * s, h: 38 * s, tilt: -0.45 * cup };
  G.hipSeat = T(1400, 700);
  G.A = { headTop: HP(1320, 288), headC: HP(1318, 360), forehead: HP(1262, 318), nape: HP(1360, 420), ear: HP(1318, 372), chin: HP(1270, 410),
  G.tilt = tilt;
  G.HP = HP; G.T = T;                                   // 头部局部坐标（随仰头旋转）与身体坐标，加头饰/服饰用
  G.box = [T(1100, 240), T(1460, 935)];
  G.pivots = { neck, shoulder: S, elbow: E, wrist: W_, hip: T(1400, 700), farShoulder: TB(1332, 468), knee: G.A.knee };
  G.rigid = { head: ['hairBack', 'bun', 'hairDown', 'braid', 'face', 'bangs', 'locks', 'hairLines', 'lid', 'brow', 'brim', 'crown', 'band'], neck: ['neck'],
  G.rigidPivot = { head: 'neck', neck: 'neck', torso: 'hip', skirt: 'hip', farArm: 'farShoulder', upperArm: 'shoulder', foreArm: 'elbow', hand: 'wrist' };
R.GIRL_ORDER = ['farSleeve', 'farHand', 'farCuff', 'hairDown', 'skirt', 'apronSkirt', 'folds', 'shoe', 'torso', 'bib', 'apronBow', 'neck', 'hairBack', 'bun', 'bunSpiral', 'face', 'cheek', 'ear',
R.drawGirl = (c, G, pal) => {
R.drawFeatures = (c, G, s = {}) => {
R.drawCup = (c, cup, st = {}) => {
R.cat = (opt = {}) => {
  P.bodyPts = [[470, 900], [430, 860], [425, 790], [450, 720], [500, 680], [570, 668], [625, 690], [650, 750], [660, 830], [650, 900]].map(p => T(p[0], p[1] - (p[1] < 800 ? breathe * 300 : 0)));
  P.body = Object.assign(R.smooth(P.bodyPts), { pts: P.bodyPts, closed: true });     // 卡通/赛璐珞/不描线的画法里折线身体会露直边（迁移测试 B、D）
  P.head = head;
  P.earInner = [[T(563, 585), T(565, 550), T(588, 578)], [T(622, 578), T(646, 553), T(644, 596)]];
  P.chest = Object.assign(R.smooth(chestPts), { pts: chestPts, closed: true });
  P.muzzle = new Path2D(); P.muzzle.ellipse(mz[0], mz[1], 34 * s, 24 * s, 0, 0, Math.PI * 2);
  P.paws = new Path2D(); const pawC = [585, 635].map(x => T(x, 893));
  P.white = white;
  P.whitePts = { chest: chestPts, muzzle: { x: mz[0], y: mz[1], rx: 34 * s, ry: 24 * s }, paws: pawC.map(c0 => ({ x: c0[0], y: c0[1], rx: 22 * s, ry: 13 * s })) };
  P.legs = [R.limb(T(588, 740), T(584, 888), 34 * s, 28 * s), R.limb(T(630, 742), T(634, 888), 34 * s, 28 * s)];
  P.eyes = [{ x: T(612, 615)[0], y: T(612, 615)[1] }, { x: T(648, 612)[0], y: T(648, 612)[1] }]; P.eyeR = 9 * s; P.blink = blink;
  P.nose = T(655, 640); P.mouth = [T(645, 655), T(655, 650), T(664, 655)];
  P.whiskers = [[T(660, 645), T(712, 632)], [T(660, 650), T(715, 655)], [T(598, 648), T(552, 640)]];
  P.stripes = [[T(585, 572), T(590, 595)], [T(605, 568), T(607, 592)], [T(625, 572), T(622, 594)],
  P.tailPts = P_bez(t0, T(360, 900), T(330, 860 + tail * 40), tip);
  P.tail = (() => { const p = new Path2D(); const pts = P.tailPts; pts.forEach((q, i) => i ? p.lineTo(...q) : p.moveTo(...q)); return p; })();
  P.tailW = 26 * s;
  P.box = [T(390, 540), T(700, 905)];
  P.pivots = { neck: T(588 + look * 6, 680), tailBase: t0, shoulder: T(600, 735), hip: T(470, 870) };
  P.rigid = { head: ['head', 'earInner', 'eyes', 'nose', 'mouth', 'whiskers', 'muzzle'], body: ['body', 'chest', 'stripes'], legs: ['legs', 'paws'], tail: ['tail'] };
  P.rigidPivot = { head: 'neck', body: 'hip', legs: 'shoulder', tail: 'tailBase' };
R.drawCatLines = (c, K, pal) => {
R._lc = {};
R.visibleLines = (key, drawWith, lineColor, box, thresh = 90) => {
R.drawCat = (c, K, pal) => {
R.rigidPose = (O, angles) => {
## scripts/engine/lib/rig_huashu.js
HS.pose = (name, ph = 0, k = {}) => {
HS.build = (o = {}) => {
HS.details = (c, H, pal) => {
HS.PAL = { skin: '#fbd9bf', hair: '#151515', shirt: '#ffffff', shorts: '#d8cdb8', hat: '#ffffff', hatBand: '#e9e9e9', shoe: '#fbfaf6', watch: '#1d1f22', line: '#151515', lw: 5, cheek: 'rgba(245,140,120,.35)' };
HS.draw = (c, H, pal = HS.PAL) => {
## scripts/engine/lib/typo.js
TY.font = (size, fam = 'PuHui-Black') => `${size}px "${fam}"`;
TY.text = (c, s, x, y, { size = 120, fam = 'PuHui-Black', color = '#111', align = 'center', base = 'alphabetic', alpha = 1, scale = 1, rot = 0, track = 0, stroke, strokeW = 0, ox = x, oy = y } = {}) => {
TY.width = (c, s, size, fam = 'PuHui-Black', track = 0) => { c.save(); c.font = TY.font(size, fam); if (track) c.letterSpacing = track + 'px'; const w = c.measureText(s).width; c.restore(); return w; };
TY.wrap = (c, text, maxW, font) => {
TY.fit = (c, text, maxW, size, fam, { maxLines = 2, min = 0.45, weight = '', soft = false, balance = false } = {}) => {
TY.fitFloor = (c, text, maxW, size, fam, { maxLines = 2, floor = size * 0.5, weight = '', balance = false } = {}) => {
TY.charsIn = (c, str, x, y, lt, { font, color, dur = 0.35, stagger = 0.04, dy = 24, scale0 = 1, align = 'left', ease = MO.cubicOut, shadow, spacing = 0 } = {}) => {
TY.rise = (c, s, x, y, p, o = {}) => {
TY.pop = (c, s, x, y, p, o = {}) => {
TY.blurIn = (c, text, x, y, p, { blur = 18, dy = 28, scale = 0 } = {}) => {
TY.typed = (s, p) => [...s].slice(0, Math.round(clamp(p) * [...s].length)).join('');
TY.typedCount = (t, t0, rate, fps = 0) => Math.max(0, Math.floor(((fps ? MO.step(t, fps) : t) - t0) * rate + 1e-6) + 1);
TY.marker = (c, x, y, w, h, p, color = '#FFE14D', skew = 0.18) => {
TY.underline = (c, x, y, w, p, color, lw = 10) => { if (p <= 0) return; c.save(); c.strokeStyle = color; c.lineCap = 'round'; c.lineWidth = lw; c.beginPath(); c.moveTo(x, y); c.lineTo(x + w * MO.expoOut(clamp(p)), y); c.stroke(); c.restore(); };
TY.slam = (c, s, x, y, lt, o = {}) => {
TY.keyword = (c, s, x, y, t, tIn, tHit, o) => {
TY.keywordMarker = (c, x, y, w, size, t, tHit, sc, col) => { if (t < tHit) return; TY.marker(c, x - 8, y - size * 0.98 * sc, (w + 16) * sc, size * 1.18 * sc, MO.at(t, tHit, 0.3), col); };
TY.fmt = (v, dec = 0, sep = true) => { const s = Math.abs(v).toFixed(dec); const [i, f] = s.split('.'); const ii = sep ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i; return (v < 0 ? '−' : '') + ii + (f ? '.' + f : ''); };
TY.count = (lt, start, dur, a, b, ease = MO.expoOut) => lerp(a, b, ease(clamp((lt - start) / dur)));
TY.tabular = (c, str, x, y, { align = 'left', digitW } = {}) => {
```
