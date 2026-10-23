// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p01', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d');
    return t=>{c.fillStyle=N.CREAM;c.fillRect(0,0,1920,1080);for(let i=0;i<8;i++){c.save();c.translate(360+(i%4)*360,350+Math.floor(i/4)*350);c.scale(235,235);N.drawFigure(c,N.joints(N.runCycle(t*.8+i*.13)),i<5?'#be453f':'#324c74','#8b7864');c.restore();}};
  });
});
