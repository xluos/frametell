ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  const N=[[300,300],[880,520],[1460,300],[300,720],[1460,720]];
  for (const [a,b] of [[0,1],[1,2],[3,1],[1,4]]) P.line(N[a][0],N[a][1],N[b][0],N[b][1],{at:-1,color:'muted',sw:3});
  for (const [x,y] of N) P.circle(x,y,30,{at:-1,color:'blue'});
  P.line(300,300,880,520,{at:P.c(0),color:'red',sw:6});
  P.line(880,520,1460,300,{at:P.c(1),color:'red',sw:6});
  P.circle(470,370,40,{at:P.c(0,0.1),color:'red'});
  P.circle(1080,430,40,{at:P.c(1,0.1),color:'red'});
  P.circle(1330,340,40,{at:P.c(2),color:'red'});
  P.arrow(1460,360,1460,680,{at:P.c(2,0.4),color:'blue'});
});