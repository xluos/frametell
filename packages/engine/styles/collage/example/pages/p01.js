ENGINE.visual('p01', (P) => {
  P.title("旧报纸里的头条说了什么", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M300 260 L700 250 L720 520 L290 540 Z', { at:-1, color:'ink', fill:'yellowF' });
  P.path('M1080 300 L1500 280 L1480 560 L1060 540 Z', { at:-1, color:'ink', fill:'paper' });
  P.rect(760, 380, 360, 300, { r: 4, at:P.c(0), color:'red', fill:'redF' });
  P.rect(900, 360, 90, 34, { at:P.c(0,0.2), color:'yellow', fill:'yellowF' });
  P.text('?', { x: 940, y: 580, w: 120, align:'c', size: 90, weight:700, at: P.c(1), cps: 6 });
  P.arrow(1120, 600, 1400, 660, { at: P.c(2), color: 'yellow' });
});