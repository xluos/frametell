ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M260 520 Q420 420 560 500 Q720 600 880 480 Q1060 380 1240 480 Q1400 560 1620 470', { at:-1, color:'ink', sw:3 });
  P.path('M360 340 Q600 260 760 420 Q900 560 1120 440 Q1300 360 1420 470', { at:-1, color:'red', sw:4, dashed:true });
  P.circle(1420, 470, 40, { at:P.c(0), color:'red', fill:'red' });
  P.text('✓', { x: 880, y: 620, w: 100, align:'c', size: 70, weight:700, at:P.c(1), cps:4 });
  P.ring(880, 480, 900, 300, { at:P.c(2), color:'green' });
});