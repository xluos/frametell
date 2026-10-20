ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.circle(460, 420, 80, { at:-1, color:'faint' });
  P.path('M460 500 L370 690 L550 690 Z', { at:-1, color:'faint', fill:'faintF' });
  P.circle(640, 420, 80, { at:P.c(0), color:'red' });
  P.path('M640 500 L550 690 L730 690 Z', { at:P.c(0), color:'red', fill:'redF' });
  P.circle(1040, 380, 54, { at:P.c(1), color:'blue' }); P.circle(1180, 380, 54, { at:P.c(1,0.3), color:'muted' }); P.circle(1320, 380, 54, { at:P.c(1,0.6), color:'muted' });
  P.line(1040, 460, 1040, 560, { at:P.c(1), color:'blue', sw:5 }); P.line(1180, 460, 1180, 560, { at:P.c(1,0.3), color:'muted', sw:5 }); P.line(1320, 460, 1320, 560, { at:P.c(1,0.6), color:'muted', sw:5 });
  P.text('停 看 通过', { x: 1180, y: 680, w: 400, align:'c', size: 40, at:P.c(2), cps:6 });
});