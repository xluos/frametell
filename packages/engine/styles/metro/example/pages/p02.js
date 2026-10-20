ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
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
  P.line(560, 600, 1240, 600, { at:P.c(0), color:'paper', sw:10 });
  P.circle(700, 600, 34, { at:P.c(0,0.2), color:'red' });
  P.circle(900, 600, 34, { at:P.c(1), color:'red' });
  P.circle(1100, 600, 34, { at:P.c(1,0.4), color:'red' });
  P.text('要走到换乘站', { x: 900, y: 740, w: 420, align:'c', size: 38, at:P.c(2), cps:6 });
});