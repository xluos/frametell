ENGINE.visual('p01', (P) => {
  P.title("这把椅子为什么不会翻", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(420, 300, 420, 420, { at:-1, color:'ink', sw:2.5 });
  P.rect(980, 360, 420, 300, { at:-1, color:'ink', sw:2.5 });
  P.line(420, 510, 840, 510, { at:-1, color:'muted', sw:1.5, dashed:true });
  P.line(630, 300, 630, 720, { at:-1, color:'muted', sw:1.5, dashed:true });
  P.circle(1560, 380, 70, { at:P.c(1), color:'yellow', sw:2.5 });
  P.line(1560,330,1560,430,{at:P.c(1),color:'yellow',sw:2});P.line(1510,380,1610,380,{at:P.c(1),color:'yellow',sw:2});
  P.text('?', { x: 620, y: 560, w: 100, align:'c', size: 80, weight:700, at: P.c(2), cps: 4 });
});