ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(240, 220, 1440, 560, { r: 18, at:-1, color:'ink', fill:'paper', sw:3 });
  P.rect(240, 220, 1440, 80, { r: 18, at:-1, color:'ink', fill:'mutedF' });
  P.rect(560, 360, 520, 220, { r: 12, at:P.c(0), color:'blue', fill:'paper', sw:3 });
  for (let i=0;i<3;i++) P.line(600, 420+i*60, 1040, 420+i*60, { at:P.c(1)+i*0.25, color:'muted', sw:3 });
  P.path('M1100 560 l0 80 l30 -24 l24 40 l18 -10 l-24 -40 l32 0 Z',{at:P.c(2),color:'green',fill:'greenF'});
  P.ring(820, 480, 220, 70, { at: P.c(2,0.3), color: 'blue' });
});