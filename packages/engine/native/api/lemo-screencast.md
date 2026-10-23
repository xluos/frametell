# Source API namespaces
N.UI: original ui.js namespace
N.Character: original clawd.js namespace

The signatures below are source excerpts. Refer to the namespace for that module; use the worked example for mounting. Original source lives under engine/native/sources.

```js
## clawd.js
export const CLAY = '#D97757', CLAY_D = '#B85F40', EYE = '#2A2622';
export function grid({ eyes = 'n', arms = 'down', legs = 'stand' } = {}) {
export function sprite({ x, y, px = 7, flip = false, sq = 0, rot = 0, op = 1, shadow = 0, ...pose }) {
export function pixels(o) {
export function pixart(rows, { x, y, px = 7, pal, op = 1 }) {
export const BANG = (x, y, px = 6, op = 1) => pixart(['.kkk.', 'kwwwk', 'kwkwk', 'kwkwk', 'kwwwk', 'kwkwk', 'kwwwk', '.kkk.', '..k..'], { x, y, px, op, pal: { w: '#fff', k: EYE } });
export const DOTS = (x, y, px = 6, n = 3, op = 1) => n < 1 ? '' : pixart(['kk.kk.kk'.slice(0, n * 3 - 1), 'kk.kk.kk'.slice(0, n * 3 - 1)], { x, y, px, op, pal: { k: EYE } });
export const PENCIL = (x, y, px = 6, op = 1) => pixart(['......kk', '.....yyk', '....yyy.', '...yyy..', '..yyy...', '.pyy....', 'ppy.....', 'k.......'], { x, y, px, op, pal: { y: '#F2C14E', k: EYE, p: '#E8A898' } });
export const SPARK = (x, y, px = 6, col = '#F2C14E', op = 1) => pixart(['..y..', '..y..', 'yy.yy', '..y..', '..y..'], { x: x - 2.5 * px, y: y - 2.5 * px, px, op, pal: { y: col } });
export const HEART = (x, y, px = 5, op = 1) => pixart(['.rr.rr.', 'rrrrrrr', 'rrrrrrr', '.rrrrr.', '..rrr..', '...r...'], { x: x - 3.5 * px, y: y - 3 * px, px, op, pal: { r: '#E0543A' } });
export const CHECK = (x, y, px = 6, op = 1) => pixart(['.....g', '....gg', 'g..gg.', 'gggg..', '.gg...'], { x, y, px, op, pal: { g: '#2F9E4F' } });
export const SWEAT = (x, y, px = 5, op = 1) => pixart(['.b.', 'bbb', 'bbb', '.b.'], { x, y, px, op, pal: { b: '#7FB6E8' } });
export function dust(x, y, t, px = 5, n = 6, seed = 1) {
export function speedlines(x, y, dir, t, px = 5) {
## ui.js
export const WIN = { x: 110, y: 74, w: 1700, h: 950 };
export const TERM = { x: 580, y: 380, w: 760, h: 320 };
export const LOGO = { x: TERM.x + 22, y: TERM.y + 34 + 18 + 2 * 30, qw: 19 * .6 / 2, qh: 15 };
export function desk(D) {
export function appWin(A, t) {
```
