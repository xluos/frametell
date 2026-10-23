/* Shared surface rendering for static primitives AND liveRough. Original packs keep their own renderer. */
(function () {
  const { s, hashStr } = PV;
  const mode = window.STYLE?.material;
  if (!mode) return;
  const defs = s('defs', {}, s('svg', { width: 0, height: 0, style: 'position:absolute' }, document.body));
  const filter = (id, body) => { const f = s('filter', { id, x: '-30%', y: '-30%', width: '160%', height: '160%' }, defs); f.innerHTML = body; };
  filter('pigment', '<feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" seed="7" result="grain"/><feColorMatrix in="grain" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1.8 -.48"/><feComposite in="SourceGraphic" operator="in"/>');
  filter('bloom', '<feTurbulence type="fractalNoise" baseFrequency=".015" numOctaves="3" seed="11" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="9"/><feGaussianBlur stdDeviation=".8"/>');
  filter('tube', '<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>');
  filter('paper-shadow', '<feDropShadow dx="4" dy="7" stdDeviation="3" flood-opacity=".17"/>');
  filter('soft-shadow', '<feDropShadow dx="5" dy="9" stdDeviation="8" flood-opacity=".24"/>');
  const cache = new Map();
  function fillFor(color) {
    const key = mode + color;
    if (cache.has(key)) return cache.get(key);
    const id = 'material-' + hashStr(key);
    if (mode === 'clay') {
      const p = s('radialGradient', { id, cx: '.32', cy: '.25', r: '.85' }, defs);
      s('stop', { offset: 0, 'stop-color': color }, p);
      s('stop', { offset: 1, 'stop-color': `color-mix(in srgb, ${color} 72%, ${PV.col('ink')})` }, p);
    } else {
      const step = mode === 'halftone' ? 9 : mode === 'crayon' ? 8 : 6;
      const p = s('pattern', { id, width: step, height: step, patternUnits: 'userSpaceOnUse', patternTransform: mode === 'halftone' ? 'rotate(15)' : 'rotate(-32)' }, defs);
      if (mode === 'halftone') {
        s('rect', { width: step, height: step, fill: color, opacity: .22 }, p);
        s('circle', { cx: step / 2, cy: step / 2, r: 2.2, fill: color }, p);
      } else {
        s('rect', { width: step, height: step, fill: color, opacity: .12 }, p);
        s('path', { d: `M-2 1 L${step+2} 1 M-2 3 L${step+2} 4`, stroke: color, 'stroke-width': mode === 'crayon' ? 3.4 : .85, opacity: .85 }, p);
      }
    }
    cache.set(key, `url(#${id})`); return cache.get(key);
  }
  PV.materialAttrs = (type, op) => {
    const fill = type === 'fillPath';
    const a = { filter: 'none', 'data-material': mode };
    if (fill && ['halftone', 'engraving', 'crayon', 'clay'].includes(mode)) a.fill = fillFor(op.fill);
    if (mode === 'crayon') a.filter = 'url(#pigment)';
    if (mode === 'watercolor' || mode === 'ink') { a.filter = fill ? 'url(#bloom)' : 'none'; if (fill) a.opacity = mode === 'ink' ? .48 : .75; }
    if (mode === 'neon') a.filter = 'url(#tube)';
    if (mode === 'register' && fill) a.transform = 'translate(5 -3)';
    if (mode === 'collage' && fill) a.filter = 'url(#paper-shadow)';
    if (mode === 'clay' && fill) a.filter = 'url(#soft-shadow)';
    return a;
  };
})();
