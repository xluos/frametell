ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.ellipse(520, 470, 400, 300, { at:P.c(0), color:'green', fill:'greenF' });
  P.ellipse(880, 470, 400, 300, { at:P.c(1), color:'blue', fill:'blueF' });
  P.ellipse(1240, 470, 400, 300, { at:P.c(1,0.5), color: i_col(), fill: i_col('F') });
  P.rect(830, 560, 60, 200, { r: 12, at:-1, color:'ink', fill:'inkF' });
  P.arrow(620, 720, 760, 720, { at: P.c(2), color:'muted' });
  P.arrow(980, 720, 1120, 720, { at: P.c(2,0.4), color:'muted' });
  function i_col(){ return 'green'; }
});