ENGINE.visual('p01', (P) => {
  P.title("船队为什么沿着海岸走", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M260 520 Q420 420 560 500 Q720 600 880 480 Q1060 380 1240 480 Q1400 560 1620 470', { at:-1, color:'ink', sw:3 });
  P.path('M300 600 Q500 680 700 620 Q900 560 1080 640 Q1280 700 1560 600', { at:-1, color:'muted', sw:2 });
  P.circle(360, 340, 130, { at:-1, color:'muted' });P.circle(1420, 660, 90, { at:-1, color:'muted' });
  P.circle(1480, 320, 70, { at:P.c(1), color:'green', sw:3 });
  P.line(1480,270,1480,370,{at:P.c(1),color:'green',sw:3});P.line(1430,320,1530,320,{at:P.c(1),color:'green',sw:3});
  P.text('?', { x: 800, y: 520, w: 100, align:'c', size: 70, weight:700, color:'red', at:P.c(2), cps:4 });
});