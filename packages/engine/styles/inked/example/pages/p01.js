ENGINE.visual('p01', (P) => {
  P.title("开瓶器为什么省力", { accent: 'yellow' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(420, 560, 900, 60, { r: 14, at:-1, color:'ink', sw:3 });
  P.circle(1180, 590, 130, { at:P.c(0), color:'ink', sw:4 });
  P.circle(1180, 590, 70, { at:P.c(0,0.2), color:'paper', sw:3 });
  P.line(1230, 560, 1230, 300, { at:P.c(1), color:'yellow', sw:14 });
  P.arrow(1230, 340, 1230, 250, { at:P.c(2), color:'orange' });
  P.text('?', { x: 760, y: 610, w: 100, align:'c', size: 70, weight:700, at: P.c(2,0.3), cps: 4 });
});