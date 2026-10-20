ENGINE.visual('p01', (P) => {
  P.title("发条是怎么让钟走的", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.icon('gear', 700, 500, 260, { at:P.c(0), color:'ink' });
  P.icon('gear', 1080, 400, 170, { at:P.c(0,0.4), color:'orange' });
  P.icon('gear', 1080, 640, 150, { at:P.c(0,0.8), color:'muted' });
  P.line(830, 470, 990, 420, { at:P.c(1), color:'muted', sw:2, dashed:true });
  P.text('?', { x: 700, y: 540, w: 100, align:'c', size: 80, weight:700, at: P.c(2), cps: 4 });
});