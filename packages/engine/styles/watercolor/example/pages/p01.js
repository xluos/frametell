ENGINE.visual('p01', (P) => {
  P.title("叶子为什么秋天会变色", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.ellipse(640, 420, 420, 300, { at:-1, color:'green', fill:'greenF' });
  P.ellipse(980, 400, 460, 330, { at:-1, color:'blue', fill:'blueF' });
  P.ellipse(840, 470, 380, 280, { at:-1, color:'muted', fill:'mutedF' });
  P.rect(830, 560, 60, 200, { r: 12, at:-1, color:'ink', fill:'inkF' });
  P.text('?', { x: 860, y: 470, w: 120, align:'c', size: 90, weight:700, color:'blue', at: P.c(1), cps: 6 });
  P.arrow(1150, 560, 1460, 660, { at: P.c(2), color: 'green' });
});