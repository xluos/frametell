// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p03', P => {
  P.nativeScene((N, host) => {
    const E=N.Engine, c=host.canvas().getContext('2d'), paper=E.paperTexture(), shape=E.engraveShape('M630 760 C320 430 660 190 960 260 C1270 180 1580 500 1240 760 Z');
    shape.ink.schedule('ol',0,1); shape.ink.schedule('h1',1,3); shape.ink.schedule('h2',3,5); shape.ink.schedule('h3',5,7);
    return t=>{c.clearRect(0,0,1920,1080);c.fillStyle=E.PAL.paper;c.fillRect(0,0,1920,1080);c.drawImage(paper,0,0);shape.ink.draw(c,t+.2);E.roundelFrame(c,950,510,360);};
  });
});
