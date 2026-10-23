// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p02', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d');N.U.setStage(host.width,host.height);
    return t=>{c.fillStyle='#120a3c';c.fillRect(0,0,1920,1080);N.TY.rise(c,'SCALE',380,430,Math.min(1,.2+t/2),{size:190,fam:'sans-serif',align:'left',color:'#32baee'});N.PAINT.roughPath(c,[[450,720],[770,610],[1160,500],[1510,270]],{amp:0,seed:8});c.strokeStyle='#ffa62b';c.lineWidth=22;c.stroke();};
  });
});
