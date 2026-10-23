// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p03', P => {
  P.nativeScene((N, host) => {
    const c=host.canvas().getContext('2d');N.U.setStage(host.width,host.height);
    return t=>{c.fillStyle='#f4e6c2';c.fillRect(0,0,1920,1080);const p=new Path2D();for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=i%2?255:400;const x=960+Math.cos(a)*r,y=520+Math.sin(a)*r;i?p.lineTo(x,y):p.moveTo(x,y);}p.closePath();c.fillStyle='#ffd60a';c.fill(p);N.PAINT.shadeDots(c,p,550,110,820,820,14,'#e3221b',()=>.45);N.TY.slam(c,'AHA!',720,590,t+.2,{size:170,fam:'sans-serif',color:'#111'});};
  });
});
