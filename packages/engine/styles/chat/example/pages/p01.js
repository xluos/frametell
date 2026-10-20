ENGINE.visual('p01', (P) => {
  P.title("陌生人发来链接怎么办", { accent: 'green' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(640, 200, 480, 620, { r: 46, at:-1, color:'ink', fill:'paper', sw:4 });
  P.rect(680, 270, 400, 90, { r: 20, at:P.c(0), color:'muted', fill:'mutedF' });
  P.rect(680, 400, 300, 90, { r: 20, at:P.c(1), color:'muted', fill:'mutedF' });
  P.circle(1030, 420, 26, { at:P.c(2), color:'blue', fill:'blue' });
  P.text('?', { x: 880, y: 640, w: 100, align:'c', size: 70, weight:700, color:'green', at:P.c(2,0.3), cps:4 });
  P.arrow(1180, 440, 1460, 440, { at:P.c(2,0.5), color:'blue' });
});