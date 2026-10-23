// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p03', P => {
  P.nativeScene((N, host) => {
    const cv=host.canvas(),c=cv.getContext('2d'),G=N.Geometry,I=N.Ink;
    const path=I.prepare(G.buildPath([{id:'gesture',style:'adult',t:[0,8],parts:[{d:'M420 720 C560 250 840 250 960 540 C1080 830 1360 830 1490 360'}],marks:[],holds:[]}]));
    const paper=N.Paper.makePaper(),cam={cx:960,cy:540,k:1,r:0};
    return t=>{N.Paper.drawPaper(c,paper,cam,1920,1080);I.drawLine(c,path,G.headAt(path,Math.max(.1,t)),(x,y)=>[x,y],1);};
  });
});
