ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  const scraps=[[420,340,-8],[760,300,5],[1100,360,-4],[900,560,7]];
  for (const [x,y,r,i] of scraps.map((v,i)=>[...v,i])) {
    P.path(`M${x-140} ${y-90} L${x+130} ${y-100} L${x+140} ${y+100} L${x-150} ${y+90} Z`, { at:P.c(1)+i*0.4, color:'ink', fill:i===2?'redF':'paper' });
  }
  P.rect(880, 280, 120, 30, { at:P.c(0,0.3), color:'yellow', fill:'yellowF' });
  P.line(420, 690, 1340, 560, { at: P.c(2), color: 'red', sw: 4, dashed: true });
  P.text('拼起来', { x: 1400, y: 640, w: 240, size: 36, color:'red', at: P.c(2), cps: 4 });
});