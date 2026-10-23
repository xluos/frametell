/* pop: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** Heavy framed comic panel. */
  B.comicPanel = function (x, y, w, h, o = {}) { return PV.Studio.comicPanel.apply(this, arguments); };
  /** Ben-Day burst and short lettering. o: color, r, at. */
  B.burst = function (x, y, text, o = {}) { return PV.Studio.burst.apply(this, arguments); };
  /** Source huashu Canvas2D tools. draw(ctx,PAINT,t); all seeds fixed. PAINT.roughPath/noise/grain/texture/halftone are available. */
  B.paintScene = function (draw, o = {}) { return PV.Studio.paintScene.apply(this, arguments); };
})();
