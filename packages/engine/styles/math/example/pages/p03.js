ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.line(180, 620, 1740, 620, { at: -1, color: 'muted', sw: 2 });
  P.path('M520 420 L670 620 L370 620 Z M880 420 L1030 620 L730 620 Z M1240 420 L1390 620 L1090 620 Z', { at: -1, color: 'ink', fill: 'blueF' });
  P.text('✓', { x: 880, y: 430, w: 120, align: 'c', size: 90, weight: 700, color: 'blue', at: P.c(0), cps: 4 });
  P.arrow(1420, 470, 1420, 600, { at: P.c(1), color: 'yellow' });
  P.text('180°', { x: 1520, y: 560, w: 180, align:'c', size: 44, color:'yellow', at: P.c(1), cps: 5 });
});