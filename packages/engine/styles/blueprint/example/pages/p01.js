// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p01', P => {
  P.nativeScene((N, host) => {
    const D=N.Draw,cv=host.canvas('webgl2'),paper=N.Paper.makePaper(cv,1920,1080);
    return t=>{D.setCam({x:960,y:540,z:1,r:0});D.clear();D.proj.k=.3;D.line(D.gearPts(960,510,20,13,t*.07),{w:3.2,u:1});D.circ(960,510,88);D.line(D.circ(960,510,88),{w:2,u:1});D.dim([600,800],[1320,800],80,'720',{size:40});paper(D.inkC,D.fxC,D.ovC,{sheet:[1920,1080],cam:D.cam,seed:4});};
  });
});
