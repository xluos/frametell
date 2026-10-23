// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p02', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d'),T=N.T;
    return t=>{T.setClock(t);c.fillStyle='#f1e8cd';c.fillRect(0,0,1920,1080);T.shape(c,T.rect(330,260,1100,530),{fill:'#8ea87c',lineColor:'#25271f',line:5,seed:2});T.shape(c,T.ellipse(1350,380,145,145),{fill:'#e6b64b',lineColor:'#25271f',line:5,seed:7});T.text(c,'OBSERVE',570,565,{font:'90px serif',fill:'#25271f',plate:'#d1583b'});};
  });
});
