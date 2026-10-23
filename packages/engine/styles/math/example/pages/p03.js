// manim-web world coordinates, native geometry and native MasterTimeline.
ENGINE.visual('p03', P => {
  P.nativeScene((N, host) => {
    const container = document.createElement('div'); host.root.appendChild(container);
    const scene = new N.Scene(container, {width:host.width,height:host.height,backgroundColor:'#1c1c1c'});
    const axes = new N.Axes({xRange:[-6, 6],yRange:[-2, 2],xLength:8,yLength:5,color:'#dddddd'});
    axes.shift([-1.5,-0.3,0]);
    const curve = new N.FunctionGraph({func:x=>Math.sin(x),xRange:[-6, 6],axes,color:'#58c4dd',strokeWidth:5});
    const formula = new N.MathTex({latex:"y=\\sin(x)",color:'#ffff88',fontSize:48,position:[4,1.8,0]});
    const ready = formula.waitForRender().then(() => {
      scene.add(axes,curve,formula);
      const timeline = new N.MasterTimeline();
      timeline.addSegment([new N.Create(axes,{duration:1})]);
      timeline.addSegment([new N.Create(curve,{duration:3})]);
      timeline.addSegment([new N.Write(formula,{duration:1.5})]);
      scene.setTimeline(timeline);scene.seek(0);
    });
    return {ready,render:t=>N.seek(scene,Math.max(0,t)),dispose:()=>scene.dispose()};
  });
});
