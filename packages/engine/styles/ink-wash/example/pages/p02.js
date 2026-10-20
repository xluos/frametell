ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M200 700 Q420 380 560 700 Q700 420 880 700 Q1040 400 1200 700 Q1380 440 1560 700', { at: -1, color: 'faint', sw: 4 });
  P.path('M200 700 Q420 380 560 700 Q700 420 880 700', { at: P.c(0), color: 'ink', sw: 5 });
  P.path('M880 700 Q1040 400 1200 700 Q1380 440 1560 700', { at: P.c(1), color: 'red', sw: 5 });
  P.line(300, 600, 1580, 600, { at: P.c(2), color: 'muted', sw: 2, dashed: true });
  P.text('水多则淡', { x: 1300, y: 520, w: 260, align:'c', size: 36, color:'blue', at: P.c(2), cps: 7 });
});