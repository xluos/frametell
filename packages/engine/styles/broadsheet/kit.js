/* broadsheet: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** Word-timed data columns. items: {label,color}; o: x,y,scale,at. */
  B.chartColumns = function (items, values, o = {}) { return PV.Studio.chartColumns.apply(this, arguments); };
  /** Serif newspaper headline, o: size,w,at. */
  B.headline = function (text, x, y, o = {}) { return PV.Studio.headline.apply(this, arguments); };
  /** Source huashu Canvas2D tools. draw(ctx,PAINT,t); all seeds fixed. PAINT.roughPath/noise/grain/texture/halftone are available. */
  B.paintScene = function (draw, o = {}) { return PV.Studio.paintScene.apply(this, arguments); };
})();
