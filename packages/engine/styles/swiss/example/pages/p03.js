// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p03', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d');N.U.setStage(host.width,host.height);
    return t=>{c.fillStyle='#f3f1ec';c.fillRect(0,0,1920,1080);N.TY.slam(c,'01',250,650,t+.2,{size:360,fam:'sans-serif',color:'#e3321d'});N.TY.rise(c,'FORM FOLLOWS REASON',780,570,Math.min(1,.2+t/2),{size:74,fam:'sans-serif',align:'left',color:'#111111'});};
  });
});
