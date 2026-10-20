ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(560, 280, 640, 460, { at:-1, color:'ink', sw:3 });
  P.line(560, 400, 1200, 400, { at:-1, color:'muted', sw:2, dashed:true });
  P.line(880, 280, 880, 740, { at:-1, color:'muted', sw:2, dashed:true });
  P.text('✓', { x: 880, y: 560, w: 100, align:'c', size: 80, weight:700, at: P.c(0), cps: 4 });
  P.rect(700, 620, 360, 100, { at:P.c(1), color:'yellow', sw:2.5 });
  P.line(620, 260, 620, 760, { at:P.c(2), color:'yellow', sw:2, dashed:true });
});