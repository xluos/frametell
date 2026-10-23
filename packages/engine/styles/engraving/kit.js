/* engraving: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** Curved engraved specimen with vein lines and clipped hatch. o: w,h,at. */
  B.specimen = function (x, y, o = {}) { return PV.Studio.specimen.apply(this, arguments); };
  /** Native Lemo burin ordered outline and form-dependent cross-hatch. d is a closed SVG path; o: at,dur,color. */
  B.engrave = function (d, o = {}) { return PV.Studio.engrave.apply(this, arguments); };
})();
