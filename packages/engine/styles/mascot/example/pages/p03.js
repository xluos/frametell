ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'orange' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.circle(420, 520, 260, { at:-1, color:'orange', fill:'orangeF', sw:4 });
  P.circle(370, 490, 26, { at:-1, color:'ink' });P.circle(470, 490, 26, { at:-1, color:'ink' });
  P.path('M380 570 Q420 610 460 570', { at:-1, color:'ink', sw:4 });
  P.line(620, 520, 820, 500, { at:-1, color:'blue', sw:8 });
  P.rect(860, 380, 620, 320, { r: 18, at:P.c(0), color:'orange', fill:'orangeF', sw:4 });
  P.text('先想好', { x: 1170, y: 560, w: 400, align:'c', size: 60, weight:700, color:'orange', at:P.c(1), cps:4 });
  P.ring(1170, 540, 500, 360, { at:P.c(2), color:'blue' });
});