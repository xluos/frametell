ENGINE.visual('p01', (P) => {
  P.title("月亮为什么有圆有缺", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M520 470 L880 250 L1240 470 Z', { at:P.c(0), color:'blue', fill:'blueF', sw:5 });
  P.rect(580, 470, 600, 280, { at:P.c(0,0.3), color:'ink', fill:'paper', sw:5 });
  P.rect(820, 560, 130, 190, { at:P.c(1), color:'red', fill:'redF', sw:4 });
  P.text('?', { x: 880, y: 500, w: 100, align:'c', size: 70, weight:700, at: P.c(2), cps: 4 });
  P.circle(1420, 320, 80, { at:P.c(2,0.2), color:'blue', sw:5 });
});