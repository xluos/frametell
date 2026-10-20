ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'green' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(640, 200, 480, 620, { r: 46, at:-1, color:'ink', fill:'paper', sw:4 });
  P.rect(680, 270, 320, 80, { r: 20, at:-1, color:'muted', fill:'mutedF' });
  P.rect(760, 390, 320, 80, { r: 20, at:P.c(0), color:'green', fill:'greenF' });
  P.text('链接', { x: 920, y: 442, w: 200, align:'c', size: 34, color:'green', at:P.c(0,0.2), cps:3 });
  P.circle(1000, 410, 30, { at:P.c(1), color:'blue', fill:'blue' });
  P.text('!', { x: 1000, y: 424, w: 40, align:'c', size: 30, weight:700, color:'paper', at:P.c(1,0.1), cps:1 });
  for (const [x,i] of [[880,0],[920,1],[960,2]]) P.circle(x, 600, 14, { at:P.c(2)+i*0.15, color:'muted' });
  P.text('先核实', { x: 1300, y: 560, w: 260, size: 38, color:'blue', at:P.c(2,0.4), cps:4 });
});