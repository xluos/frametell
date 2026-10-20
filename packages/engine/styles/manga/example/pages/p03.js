ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(300, 240, 1320, 520, { at:-1, color:'ink', sw:6 });
  for(let i=0;i<16;i++){const ang=i/16*Math.PI*2; P.line(880+Math.cos(ang)*200,500+Math.sin(ang)*160,880+Math.cos(ang)*420,500+Math.sin(ang)*300,{at:P.c(0)+i*0.03,color:i%3?'muted':'orange',sw:2.5});}
  P.text('咚', { x: 880, y: 560, w: 300, align:'c', size: 120, weight:800, color:'red', at:P.c(1), cps:1 });
  P.ring(880, 500, 300, 260, { at:P.c(2), color:'ink' });
});