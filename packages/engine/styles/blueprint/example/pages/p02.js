ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(420, 330, 380, 380, { at:-1, color:'ink', sw:2.5 });
  P.line(380, 760, 860, 760, { at:P.c(0), color:'yellow', sw:2 });
  P.line(420,744,420,776,{at:P.c(0),color:'yellow',sw:2});P.line(800,744,800,776,{at:P.c(0),color:'yellow',sw:2});
  for (const [x,y] of [[1080,420],[1280,420],[1180,600]]) P.rect(x-90,y-90,180,180,{at:P.c(1),color:'ink',sw:2.5});
  P.line(990,510,1080,510,{at:P.c(1,0.3),color:'muted',sw:1.5,dashed:true});P.line(1370,510,1460,510,{at:P.c(1,0.3),color:'muted',sw:1.5,dashed:true});
  P.arrow(980, 690, 1080, 600, { at: P.c(2), color: 'yellow' });
});