ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.icon('gear', 560, 500, 220, { at:P.c(0), color:'faint' });
  P.icon('gear', 880, 500, 220, { at:P.c(0,0.3), color:'faint' });
  P.icon('gear', 1200, 500, 220, { at:P.c(0,0.6), color:'faint' });
  P.icon('gear', 560, 500, 220, { at:P.c(1), color:'ink' });
  P.icon('gear', 880, 500, 220, { at:P.c(1,0.4), color:'blue' });
  P.icon('gear', 1200, 500, 220, { at:P.c(1,0.8), color:'ink' });
  P.arrow(700, 700, 1080, 700, { at: P.c(2), color: 'orange' });
  P.text('咬合', { x: 900, y: 780, w: 200, align:'c', size: 38, color:'orange', at: P.c(2), cps: 3 });
});