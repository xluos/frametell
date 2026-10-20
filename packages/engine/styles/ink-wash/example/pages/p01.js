ENGINE.visual('p01', (P) => {
  P.title("山为什么近浓远淡", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.ellipse(880, 560, 1500, 260, { at: -1, color: 'faint', sw: 2 });
  P.path('M200 700 Q420 380 560 700 Q700 420 880 700 Q1040 400 1200 700 Q1380 440 1560 700', { at: -1, color: 'ink', sw: 4 });
  P.path('M360 700 Q520 520 640 700 M1060 700 Q1200 540 1320 700', { at: -1, color: 'muted', sw: 3 });
  P.text('?', { x: 880, y: 470, w: 120, align: 'c', size: 90, weight: 700, color: 'red', at: P.c(1), cps: 6 });
  P.path('M1380 720 l70 0 l-26 -24 Z', { at: P.c(2), color: 'ink' });
  P.line(1415, 720, 1415, 690, { at: P.c(2), color: 'ink', sw: 3 });
});