ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'orange' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.ellipse(880, 700, 600, 50, { at:-1, color:'faint' });
  P.ellipse(880, 560, 380, 400, { at:-1, color:'ink', fill:'orangeF' });
  P.text('✓', { x: 880, y: 590, w: 120, align:'c', size: 90, weight:700, at: P.c(0), cps: 4 });
  P.ellipse(770, 430, 150, 90, { at:P.c(1), color:'blue', fill:'blueF' });
  P.ring(880, 560, 440, 460, { at: P.c(2), color: 'blue' });
});