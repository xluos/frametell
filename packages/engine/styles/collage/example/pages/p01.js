// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p01', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d');N.U.setStage(host.width,host.height);
    return t=>{c.fillStyle='#d8cbbb';c.fillRect(0,0,1920,1080);N.CL.placed(c,430,280,-.08,g=>{N.CL.tornRect(g,700,490,4,12);g.fillStyle='#f5edda';g.fill();N.TY.text(g,'A piece of evidence',50,160,{size:54,fam:'serif',align:'left'});});N.CL.tape(c,770,265,-.08,180);N.CL.highlight(c,470,520,560,70,Math.min(1,.1+t/3));};
  });
});
