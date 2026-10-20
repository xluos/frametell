ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.ellipse(880, 520, 620, 200, { at: -1, color: 'orange', sw: 3 });
  P.circle(880, 520, 360, { at: -1, color: 'ink' });
  P.text('✓', { x: 880, y: 560, w: 120, align: 'c', size: 100, weight: 700, color: 'blue', at: P.c(0), cps: 4 });
  P.path('M1080 620 Q1300 700 1500 520 Q1560 470 1620 430', { at: P.c(1), color: 'orange', sw: 3 });
  P.circle(1630, 424, 20, { at: P.c(1,0.9), color: 'blue' });
  P.ring(880, 520, 420, 420, { at: P.c(2), color: 'blue' });
});