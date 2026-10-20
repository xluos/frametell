ENGINE.visual('p01', (P) => {
  P.title("这条街的店为什么换了一茬", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(220, 230, 1480, 110, { at:-1, color:'ink', fill:'inkF' });
  P.text('财经早报', { x: 960, y: 310, w: 500, align:'c', size: 56, weight: 700, at: P.c(0), cps: 5 });
  P.line(300, 420, 800, 420, { at:-1, color:'muted', sw:2 });
  P.line(300, 470, 720, 470, { at:-1, color:'muted', sw:2 });
  P.text('?', { x: 1240, y: 560, w: 120, align:'c', size: 100, weight: 700, color:'red', at: P.c(1), cps: 6 });
  P.arrow(1300, 620, 1500, 700, { at: P.c(2), color: 'blue' });
});