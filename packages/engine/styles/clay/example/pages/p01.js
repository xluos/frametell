ENGINE.visual('p01', (P) => {
  P.title("压力怎么让球变形", { accent: 'orange' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.ellipse(880, 600, 460, 420, { at:-1, color:'ink', fill:'orangeF', sw:3 });
  P.ellipse(770, 470, 150, 90, { at:-1, color:'blue', fill:'blueF' });
  P.ellipse(1010, 540, 90, 60, { at:-1, color:'blue', fill:'blueF' });
  P.text('?', { x: 880, y: 620, w: 120, align:'c', size: 90, weight:700, at: P.c(1), cps: 6 });
  P.arrow(1140, 580, 1460, 660, { at: P.c(2), color: 'blue' });
  P.ellipse(880, 800, 600, 60, { at:-1, color:'faint' });
});