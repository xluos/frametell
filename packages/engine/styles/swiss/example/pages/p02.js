ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.line(180, 260, 1740, 260, { at: -1, color: 'ink', sw: 4 });
  for (const [x,n,c,col] of [[480,'1000','总人数','ink'],[1240,'340','存钱的人','red']]) {
    P.line(x-180, 380, x+180, 380, { at: P.c(0), color: 'muted', sw: 2 });
    P.text(n, { x, y: 480, w: 420, align:'c', size: 120, weight: 800, color: col, at: P.c(1), cps: 6 });
    P.text(c, { x, y: 700, w: 360, align:'c', size: 38, at: P.c(1,0.4), cps: 6 });
  }
  P.arrow(720, 520, 1020, 520, { at: P.c(2), color: 'blue' });
});