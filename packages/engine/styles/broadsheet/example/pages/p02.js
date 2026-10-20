ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.rect(206, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(206, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 286, 28, 28, { at: -1, color: 'faint' });
  P.rect(1686, 746, 28, 28, { at: -1, color: 'faint' });
  P.rect(220, 230, 1480, 90, { at:-1, color:'ink', fill:'inkF' });
  const bars=[[460,300,'十年前'],[880,200,'五年前'],[1300,90,'现在']];
  for (const [x,h,lab,i] of bars.map((b,i)=>[...b,i])) {
    P.rect(x-90, 760-h, 180, h, { at: P.c(1)+i*0.4, color:'ink', fill: i===2?'redF':'paper', sw:3 });
    P.text(lab,{x,y:810,w:200,align:'c',size:30,at:P.c(1)+i*0.4,cps:4});
  }
  P.arrow(1300, 380, 1300, 300, { at: P.c(2), color: 'blue' });
  P.text('只剩一家', { x: 1430, y: 360, w: 240, size: 34, color:'blue', at: P.c(2), cps: 5 });
});