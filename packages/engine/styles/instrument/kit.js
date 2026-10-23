/* instrument: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** Meshing equal-tooth gears with opposite rotation. o: r,teeth,at. */
  B.gears = function (x, y, o = {}) { return PV.Studio.gears.apply(this, arguments); };
  /** Anatomy projected, extruded part. o: color,r,at. */
  B.isoBlock = function (x, y, w = 160, d = 160, h = 170, o = {}) { return PV.Studio.isoBlock.apply(this, arguments); };
})();
