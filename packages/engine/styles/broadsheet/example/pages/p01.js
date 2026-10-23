// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p01', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d');N.U.setStage(host.width,host.height);
    return t=>{c.fillStyle='#fff';c.fillRect(0,0,1920,1080);N.CH.frame(c,t+.2,{title:'Same scale, clear comparison',sub:'Illustrative values',source:'Illustration',badge:'Example'});const y=N.CH.lin(0,100,810,300);N.CH.bars(c,[{x:600,v:40},{x:950,v:65},{x:1300,v:90}],y,170,Math.min(1,.15+t/3),{col:'#bf3f32',font:'42px sans-serif'});};
  });
});
