ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M260 520 Q420 420 560 500 Q720 600 880 480 Q1060 380 1240 480 Q1400 560 1620 470', { at:-1, color:'faint', sw:3 });
  P.path('M360 340 Q600 260 760 420 Q900 560 1120 440 Q1300 360 1420 470', { at:P.c(0), color:'red', sw:4, dashed:true });
  P.path('M360 340 l44 -16 l-8 48 Z M1420 470 l-44 16 l8 -48 Z', { at:P.c(1), color:'ink', fill:'greenF' });
  P.circle(360, 340, 20, { at:P.c(2), color:'green' });
  P.text('沿航线', { x: 820, y: 300, w: 240, size: 36, color:'red', at:P.c(2), cps:4 });
});