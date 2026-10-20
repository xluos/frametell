ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.circle(620, 420, 90, { at:-1, color:'red' });
  P.path('M620 510 L520 700 L720 700 Z', { at:-1, color:'red', fill:'redF' });
  P.text('✓', { x: 620, y: 450, w: 80, align:'c', size: 60, weight:700, at: P.c(0), cps: 4 });
  P.arrow(760, 520, 1080, 520, { at:P.c(1), color:'blue' });
  P.circle(1240, 380, 54, { at:-1, color:'muted' });P.line(1240,460,1240,560,{at:-1,color:'muted',sw:5});
  P.circle(1240, 380, 54, { at:P.c(2), color:'blue' });P.line(1240,460,1240,560,{at:P.c(2),color:'blue',sw:5});
});