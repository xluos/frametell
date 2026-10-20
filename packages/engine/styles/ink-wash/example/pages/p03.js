ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M200 700 Q420 380 560 700 Q700 420 880 700 Q1040 400 1200 700 Q1380 440 1560 700', { at: -1, color: 'ink', sw: 4 });
  P.path('M1380 720 l70 0 l-26 -24 Z', { at: -1, color: 'ink' });
  P.text('留白', { x: 880, y: 430, w: 200, align:'c', size: 52, weight:700, color:'red', at: P.c(0), cps: 3 });
  P.ellipse(880, 560, 1500, 260, { at: P.c(1), color: 'faint', sw: 2 });
  P.ring(880, 420, 220, 130, { at: P.c(2), color: 'blue' });
});