ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'yellow' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(420, 560, 900, 60, { r: 14, at:-1, color:'ink', sw:3 });
  P.circle(1180, 590, 130, { at:-1, color:'ink', sw:4 });
  P.circle(1180, 590, 70, { at:-1, color:'paper', sw:3 });
  P.line(1230, 560, 1230, 360, { at:-1, color:'faint', sw:14 });
  P.line(1230, 560, 1230, 320, { at:P.c(0), color:'yellow', sw:14 });
  P.circle(1230, 560, 22, { at:P.c(0,0.2), color:'orange' });
  P.arrow(1330, 360, 1330, 250, { at:P.c(1), color:'orange' });
  P.text('支点', { x: 1420, y: 560, w: 200, size: 36, at: P.c(2), cps: 3 });
  P.arrow(1330, 560, 1330, 470, { at:P.c(2,0.4), color:'muted' });
});