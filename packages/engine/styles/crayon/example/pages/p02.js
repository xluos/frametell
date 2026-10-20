ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M520 470 L880 250 L1240 470 Z', { at:-1, color:'faint', sw:5 });
  P.rect(580, 470, 600, 280, { at:-1, color:'faint', sw:5 });
  P.circle(1380, 300, 130, { at:P.c(0), color:'blue', sw:6 });
  P.circle(1380, 300, 90, { at:P.c(1), color:'paper', sw:5 });
  P.arrow(1240, 420, 1080, 500, { at:P.c(2), color:'red' });
  P.path('M520 470 L880 250 L1240 470 Z', { at:P.c(2,0.2), color:'blue', fill:'blueF', sw:5 });
  P.text('被盖住', { x: 400, y: 360, w: 240, size: 38, at:P.c(2,0.4), cps:4 });
});