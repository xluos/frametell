ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(240, 220, 1440, 560, { r: 18, at:-1, color:'ink', fill:'paper', sw:3 });
  P.rect(240, 220, 1440, 80, { r: 18, at:-1, color:'ink', fill:'mutedF' });
  P.text('✓', { x: 900, y: 520, w: 120, align:'c', size: 90, weight:700, color:'blue', at: P.c(0), cps: 4 });
  P.rect(560, 360, 520, 220, { r: 12, at:-1, color:'blue', fill:'blueF', sw:3 });
  P.text('已完成', { x: 820, y: 490, w: 300, align:'c', size: 44, color:'blue', at: P.c(1), cps: 4 });
  P.path('M1300 620 l0 90 l34 -26 l26 44 l20 -12 l-26 -44 l36 0 Z',{at:P.c(2),color:'ink',fill:'inkF'});
});