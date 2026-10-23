/* mascot: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** The same orange bear geometry on every page. y is the head centre; body extends to y+255*size/300. o: at,color. Returns a movable layer. */
  B.mascot = function (x, y, size = 300, o = {}) { return PV.Studio.mascot.apply(this, arguments); };
  /** Reusable filled pouch; extends y-113..y+113. o: label,color,at. */
  B.coinPouch = function (x, y, o = {}) { return PV.Studio.coinPouch.apply(this, arguments); };
  /** One open ledger reused across pages. o: left, right, at, color. */
  B.ledger = function (x, y, w = 760, h = 430, o = {}) { return PV.Studio.ledger.apply(this, arguments); };
})();
