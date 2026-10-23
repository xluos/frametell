// Full original doodle-anim Canvas engine, not the old local mascot kit.
ENGINE.visual('p01', P => {
  P.nativeScene((N,host) => {
    const cv=host.canvas('2d'),ctx=cv.getContext('2d');
    const scene=new N.CrowdScene({width:host.width,height:host.height,seed:7,duration:host.duration,story:'meet',mix:'human:2,ghost:1'});
    return t=>{
      scene.render(ctx,Math.max(0,t));
      ctx.save();ctx.fillStyle='#47372c';ctx.font='700 40px system-ui';ctx.textAlign='center';
      ctx.fillText("先停下来，听对方说完",host.width/2,115);ctx.restore();
    };
  });
});
