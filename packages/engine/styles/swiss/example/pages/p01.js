ENGINE.visual('p01', (P) => {
  P.title("三个人里有一个在省钱。", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.line(180, 260, 1740, 260, { at: -1, color: 'ink', sw: 4 });
  P.line(180, 760, 1740, 760, { at: -1, color: 'ink', sw: 4 });
  P.text('1 / 3', { x: 880, y: 380, w: 500, align:'c', size: 170, weight: 800, color: 'red', at: P.c(1), cps: 5 });
  P.text('三个人里有一个', { x: 880, y: 750, w: 700, align:'c', size: 44, at: P.c(2), cps: 8 });
  P.line(540, 640, 1220, 640, { at: P.c(2,0.3), color: 'blue', sw: 4 });
});