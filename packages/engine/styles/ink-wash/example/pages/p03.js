// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p03', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d');N.U.setStage(host.width,host.height);
    return t=>{c.fillStyle='#f3ecdc';c.fillRect(0,0,1920,1080);N.PAINT.inkWash(c,'mountain',Math.min(1,.2+t/3),g=>{g.beginPath();g.moveTo(260,800);g.quadraticCurveTo(790,120,1080,800);g.quadraticCurveTo(1430,300,1690,800);g.closePath();g.fillStyle='#4a4c43';g.fill();},{blur:3,halo:22,haloA:.25});};
  });
});
