ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.line(180, 620, 1740, 620, { at: -1, color: 'muted', sw: 2 });
  const w = (x, col, at) => P.path(`M${x} 420 L${x+150} 620 L${x-150} 620 Z`, { at, color: 'ink', fill: col });
  w(520, 'yellowF', P.c(1)); w(880, 'blueF', P.c(1,0.4)); w(1240, 'yellowF', P.c(1,0.8));
  P.line(380, 620, 1380, 620, { at: P.c(2), color: 'blue', sw: 5 });
  P.text('180°', { x: 1500, y: 690, w: 180, align:'c', size: 44, color:'blue', at: P.c(2), cps: 5 });
});