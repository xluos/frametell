/* screencast: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** A drawn browser shell; real screen recording uses the media API. */
  B.browserWindow = function (x, y, w = 1050, h = 540, o = {}) { return PV.Studio.browserWindow.apply(this, arguments); };
  /** Cursor travels along [x,y] points and clicks the destination. o: at,dur. */
  B.cursorClick = function (points, o = {}) { return PV.Studio.cursorClick.apply(this, arguments); };
})();
