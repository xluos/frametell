ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'green' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(640, 200, 480, 620, { r: 46, at:-1, color:'ink', fill:'paper', sw:4 });
  P.rect(680, 270, 320, 80, { r: 20, at:-1, color:'muted', fill:'mutedF' });
  P.rect(760, 390, 320, 80, { r: 20, at:-1, color:'green', fill:'greenF' });
  P.text('不点', { x: 920, y: 442, w: 200, align:'c', size: 38, color:'green', at:P.c(0), cps:3 });
  P.text('✓', { x: 880, y: 640, w: 100, align:'c', size: 70, weight:700, color:'blue', at:P.c(1), cps:4 });
  P.ring(880, 620, 220, 160, { at:P.c(2), color:'blue' });
});