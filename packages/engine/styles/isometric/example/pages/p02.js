ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'orange' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  for (let i=-4;i<=4;i++) P.line(240, 760+i*40, 1680, 760+i*40, { at:-1, color:'faint', sw:1.5 });
  function box(x,y,s,c1,c2,at){ P.path(`M${x} ${y} l${s} ${-s*0.5} l${s} ${s*0.5} l${-s} ${s*0.5} Z`,{at,color:'ink',fill:c1}); P.path(`M${x} ${y} l0 ${s} l${s} ${s*0.5} l0 ${-s} Z`,{at,color:'ink',fill:c2}); P.path(`M${x+s} ${y+s*0.5} l${s} ${-s*0.5} l0 ${s} l${-s} ${s*0.5} Z`,{at,color:'ink',fill:c1}); }
  box(420, 470, 160, 'mutedF','faintF', P.c(1));
  box(800, 470, 160, 'orangeF','mutedF', P.c(1,0.4));
  box(1180, 470, 160, 'mutedF','faintF', P.c(1,0.8));
  P.arrow(600, 680, 780, 680, { at: P.c(2), color: 'purple' });
  P.arrow(980, 680, 1160, 680, { at: P.c(2,0.4), color: 'purple' });
});