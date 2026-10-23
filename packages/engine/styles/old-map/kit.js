/* old-map: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** A ship traces a historical route; points must come from real map geography. This component does not invent coastlines. */
  B.mapRoute = function (points, o = {}) { return PV.Studio.mapRoute.apply(this, arguments); };
  /** Natural Earth land outlines. o: x,y,w,h,at; returns project([lon,lat]). Small islands omitted; never use for borders or navigation. */
  B.worldMap = function (o = {}) { return PV.Studio.worldMap.apply(this, arguments); };
})();
