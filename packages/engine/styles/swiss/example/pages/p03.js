ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.line(180, 260, 1740, 260, { at: -1, color: 'ink', sw: 4 });
  P.line(180, 760, 1740, 760, { at: -1, color: 'ink', sw: 4 });
  P.text('34%', { x: 880, y: 430, w: 600, align:'c', size: 180, weight: 800, color: 'red', at: P.c(0), cps: 4 });
  P.text('一个大数字', { x: 880, y: 770, w: 500, align:'c', size: 44, at: P.c(1), cps: 6 });
  P.line(560, 740, 1200, 740, { at: P.c(2), color: 'blue', sw: 5 });
});