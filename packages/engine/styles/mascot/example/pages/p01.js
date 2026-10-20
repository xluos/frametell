ENGINE.visual('p01', (P) => {
  P.title("为什么先花要还", { accent: 'orange' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.circle(420, 520, 260, { at:P.c(0), color:'orange', fill:'orangeF', sw:4 });
  P.circle(370, 490, 26, { at:P.c(1), color:'ink' }); P.circle(470, 490, 26, { at:P.c(1,0.1), color:'ink' });
  P.path('M380 570 Q420 600 460 570', { at:P.c(1,0.2), color:'ink', sw:4 });
  P.rect(820, 360, 620, 360, { r: 18, at:P.c(2), color:'ink', fill:'paper', sw:4 });
  P.line(880, 470, 1380, 470, { at:P.c(2,0.2), color:'muted', sw:4 });
  P.line(680, 520, 840, 500, { at:P.c(2,0.4), color:'blue', sw:8 });
  P.text('?', { x: 1130, y: 590, w: 100, align:'c', size: 70, weight:700, at:P.c(2,0.5), cps:4 });
});