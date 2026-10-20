ENGINE.visual('p01', (P) => {
  P.title("贝壳为什么有螺纹", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(260, 220, 1400, 560, { at:-1, color:'ink', sw:3 });
  P.rect(290, 250, 1340, 500, { at:-1, color:'muted', sw:1.5 });
  P.path('M880 300 C1180 340 1260 520 880 700 C500 520 580 340 880 300 Z', { at:P.c(0), color:'ink', fill:'redF', sw:2.5 });
  P.text('?', { x: 880, y: 520, w: 100, align:'c', size: 70, weight:700, at: P.c(1), cps: 4 });
  P.line(880, 320, 880, 680, { at:P.c(2), color:'blue', sw:2 });
});