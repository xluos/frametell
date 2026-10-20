ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'orange' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.ellipse(880, 700, 600, 50, { at:-1, color:'faint' });
  P.ellipse(880, 640, 520, 180, { at:P.c(0), color:'ink', fill:'orangeF' });
  P.ellipse(880, 560, 420, 300, { at:P.c(1), color:'ink', fill:'orangeF' });
  P.ellipse(880, 540, 360, 380, { at:P.c(2), color:'blue', fill:'blueF' });
  P.arrow(480, 620, 680, 620, { at: P.c(2,0.3), color: 'muted' });
  P.text('压扁', { x: 520, y: 560, w: 200, align:'c', size: 38, at: P.c(2,0.3), cps: 3 });
});