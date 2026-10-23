/* manga: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** Black manga panel. Use at per cut. */
  B.comicPanel = function (x, y, w, h, o = {}) { return PV.Studio.comicPanel.apply(this, arguments); };
  /** Concentration burst. Use monochrome fill and a short sound effect. */
  B.burst = function (x, y, text, o = {}) { return PV.Studio.burst.apply(this, arguments); };
})();
