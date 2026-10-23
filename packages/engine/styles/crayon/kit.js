/* crayon: auto-loaded by boot; documentation is passed to the page agent. */
(function () {
  const B = PV.Builder.prototype;
  /** Native wax renderer. draw(D,t) per page; D.line(points,q), D.fill(polygon,q), D.circle(x,y,r,q). D.text(text,x,y,q) has x at the horizontal centre (do not subtract half-width), y at the alphabetic baseline. D.label(text,cx,cy,{size,ring,underline,rx,ry,markDraw}) shares one visual centre between text and annotations. Use one scene per page. o: at,dur. */
  B.crayonScene = function (draw, o = {}) { return PV.Studio.crayonScene.apply(this, arguments); };
})();
