ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.icon('gear', 760, 500, 260, { at:-1, color:'blue' });
  P.icon('gear', 1060, 430, 160, { at:-1, color:'ink' });
  P.icon('gear', 1060, 620, 140, { at:-1, color:'ink' });
  P.text('✓', { x: 760, y: 540, w: 100, align:'c', size: 80, weight:700, at: P.c(0), cps: 4 });
  P.line(760, 360, 760, 260, { at:P.c(1), color:'muted', sw:2, dashed:true });
  P.circle(760, 250, 12, { at:P.c(1), color:'orange' });
  P.ring(860, 500, 500, 400, { at: P.c(2), color: 'orange' });
});