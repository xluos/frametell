ENGINE.visual('p01', (P) => {
  P.title("三角形的内角和为什么是 180 度", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.line(200, 760, 1700, 760, { at: -1, color: 'muted', sw: 2 });
  P.line(880, 240, 880, 800, { at: -1, color: 'muted', sw: 2 });
  P.circle(880, 560, 380, { at: -1, color: 'ink' });
  P.text('?', { x: 880, y: 580, w: 120, align: 'c', size: 100, weight: 700, color: 'blue', at: P.c(1), cps: 6 });
  P.arrow(880, 560, 1150, 360, { at: P.c(2), color: 'yellow' });
  P.text('r', { x: 1040, y: 430, w: 80, align:'c', size: 40, color:'yellow', at: P.c(2), cps: 2 });
});