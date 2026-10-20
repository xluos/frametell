ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M260 560 C360 360 520 360 620 500 C720 640 820 640 880 520 C960 380 1040 380 1120 500 C1200 620 1320 620 1400 500', { at:-1, color:'faint', sw:5 });
  P.path('M880 520 C960 380 1040 380 1120 500', { at:P.c(0), color:'ink', sw:5 });
  P.path('M1120 500 C1200 620 1320 620 1400 500', { at:P.c(1), color:'red', sw:5 });
  P.circle(1340, 480, 90, { at:P.c(2), color:'blue', sw:5 });
  P.arrow(500, 700, 1200, 700, { at: P.c(2,0.3), color:'muted' });
});