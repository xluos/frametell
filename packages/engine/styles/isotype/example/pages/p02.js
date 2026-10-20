ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  function fig(x,y,c,at){ P.circle(x,y-46,34,{at,color:c,sw:3}); P.line(x,y-24,x,y+40,{at,c,sw:5}); P.line(x,y,x-34,y+10,{at,c,sw:5}); P.line(x,y,x+34,y+10,{at,c,sw:5}); P.line(x,y+40,x-24,y+92,{at,c,sw:5}); P.line(x,y+40,x+24,y+92,{at,c,sw:5}); }
  for(let c=0;c<8;c++) fig(340+c*170, 400, c<3?'red':'muted', P.c(1)+c*0.12);
  for(let c=0;c<8;c++) fig(340+c*170, 620, 'faint', P.c(0,0.2));
  P.text('喝咖啡', { x: 1420, y: 320, w: 260, size: 38, color:'red', at: P.c(2), cps: 4 });
  P.arrow(850, 470, 850, 580, { at: P.c(2,0.4), color: 'blue' });
});