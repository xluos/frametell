ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M300 260 L1500 250 L1480 700 L290 720 Z', { at:-1, color:'ink', fill:'paper' });
  P.rect(820, 240, 120, 34, { at:-1, color:'yellow', fill:'yellowF' });
  P.text('历史', { x: 900, y: 420, w: 400, align:'c', size: 90, weight:700, color:'red', at: P.c(0), cps: 3 });
  P.text('碎片拼起来', { x: 900, y: 560, w: 500, align:'c', size: 42, at: P.c(1), cps: 6 });
  P.line(620, 600, 1180, 600, { at: P.c(2), color: 'yellow', sw: 5 });
});