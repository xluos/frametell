/* metro: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** Transit line with moving train and timed stations. points are 45/90-degree bends. stops: {u,label,at,interchange,dx,dy,w}; u is 0..1 along the path. o: color,sw,dur,at,labelSize. */
  B.metroRoute = function (points, stops = [], o = {}) { return PV.Studio.metroRoute.apply(this, arguments); };
})();
