ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'yellow' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(420, 560, 900, 60, { r: 14, at:-1, color:'ink', sw:3 });
  P.circle(1180, 590, 130, { at:-1, color:'yellow', sw:4 });
  P.line(1230, 560, 1230, 320, { at:-1, color:'yellow', sw:14 });
  P.text('✓', { x: 760, y: 610, w: 100, align:'c', size: 70, weight:700, at: P.c(0), cps: 4 });
  P.arrow(1000, 470, 1000, 330, { at:P.c(1), color:'orange' });
  P.text('省力', { x: 900, y: 300, w: 200, align:'c', size: 38, color:'orange', at:P.c(1), cps:3 });
});