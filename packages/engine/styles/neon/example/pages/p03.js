ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  const N=[[300,300],[880,520],[1460,300],[300,720],[1460,720]];
  for (const [a,b] of [[0,1],[1,2],[3,1],[1,4],[2,4]]) P.line(N[a][0],N[a][1],N[b][0],N[b][1],{at:-1,color:'blue',sw:3});
  for (const [x,y] of N) P.circle(x,y,30,{at:-1,color:'blue'});
  P.circle(880,520,150,{at:-1,color:'red'});
  P.text('✓', { x: 880, y: 560, w: 120, align:'c', size: 90, weight:700, color:'#07060D', at: P.c(0), cps: 4 });
  P.ring(880, 520, 230, 230, { at: P.c(2), color: 'red' });
});