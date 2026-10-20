ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.line(240, 320, 1680, 320, { at:-1, color:'red', sw:10 });
  P.line(240, 600, 1680, 600, { at:-1, color:'blue', sw:10 });
  P.line(560, 220, 560, 720, { at:-1, color:'muted', sw:10 });
  P.line(1240, 220, 1240, 720, { at:-1, color:'muted', sw:10 });
  for (const [x,y] of [[560,320],[1240,320],[560,600],[1240,600]]) P.circle(x,y,30,{at:-1,color:'paper'});
  P.circle(1240, 320, 46, { at:P.c(0), color:'red' });
  P.text('✓', { x: 1240, y: 344, w: 80, align:'c', size: 44, weight:700, at:P.c(0), cps:4 });
  P.ring(1240, 320, 200, 200, { at:P.c(2), color:'red' });
  P.line(1240, 600, 1240, 360, { at:P.c(1), color:'paper', sw:10, dashed:true });
});