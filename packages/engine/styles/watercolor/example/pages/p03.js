// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p03', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d');
    const strokes=N.withSeed(82,()=>Array.from({length:24},(_,i)=>N.mk(N.qcurve(490+i*38,760,720+i*17,260,110,32),36,['#869f83','#b2c2a4','#d7b567'][i%3],{nb:8,a:.5,prof:'leaf'})));
    return t=>{c.fillStyle=N.PAPER;c.fillRect(0,0,1920,1080);N.drawList(c,strokes,Math.min(1,.1+Math.max(0,t)/6));};
  });
});
