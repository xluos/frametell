// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p01', P => {
  P.nativeScene((N, host) => {
    const {C,GL,Rig,Palette}=N, cv=host.canvas('webgl2','gl'), comp=GL.makeComp(cv), actor=Rig.group(), wash=C.layer();
    return t=>{
      Object.assign(C.CAM,{x:960,y:540,s:1}); C.BOIL.step=Math.floor(t*12); Rig.clearGroup(actor); C.clear(wash);
      const outline=C.handCircle(790,500,230,7,0,80);
      Rig.part(actor,outline,{col:Palette.PAL.crayon.yellow,w:20},{col:Palette.PAL.crayon.ink,w:7});
      C.line(actor.l,[[630,520],[760,650],[1110,330]],{col:Palette.PAL.crayon.white,w:25});
      wash.g.fillStyle='rgba(30,40,90,.8)'; wash.g.fillRect(360,230,Math.min(1,.15+Math.max(0,t)/5)*1200,560);
      comp.paperCam(960,540,1); comp.begin(Palette.PAL.paper); comp.group(actor); comp.wash(wash.c,{color:Palette.PAL.wash,resist:.93,edge:1.6,gran:.6}); comp.finish();
    };
  });
});
