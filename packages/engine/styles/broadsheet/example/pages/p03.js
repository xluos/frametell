ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(220, 230, 1480, 90, { at:-1, color:'ink', fill:'inkF' });
  P.line(300, 420, 1620, 420, { at:-1, color:'muted', sw:2 });
  P.text('1', { x: 880, y: 430, w: 400, align:'c', size: 150, weight: 700, color:'red', at: P.c(0), cps: 2 });
  P.text('版面自己说话', { x: 880, y: 800, w: 500, align:'c', size: 40, at: P.c(1), cps: 7 });
  P.line(620, 760, 1140, 760, { at: P.c(2), color:'blue', sw: 4 });
});