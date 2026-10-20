ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M260 560 C360 360 520 360 620 500 C720 640 820 640 880 520 C960 380 1040 380 1120 500 C1200 620 1320 620 1400 500 C1480 400 1520 420 1560 460', { at:-1, color:'ink', sw:5 });
  P.circle(960, 440, 120, { at:-1, color:'red', sw:5 });
  P.text('✓', { x: 960, y: 480, w: 100, align:'c', size: 70, weight:700, at: P.c(0), cps: 4 });
  P.path('M1560 460 l60 -10 l-40 50 Z', { at:P.c(1), color:'blue', sw:4 });
  P.ring(900, 500, 1300, 400, { at: P.c(2), color: 'blue' });
});