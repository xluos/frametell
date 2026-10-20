ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  function fig(x,y,c,at){ P.circle(x,y-46,34,{at,color:c,sw:3}); P.line(x,y-24,x,y+40,{at,c,sw:5}); P.line(x,y,x-34,y+10,{at,c,sw:5}); P.line(x,y,x+34,y+10,{at,c,sw:5}); P.line(x,y+40,x-24,y+92,{at,c,sw:5}); P.line(x,y+40,x+24,y+92,{at,c,sw:5}); }
  for(let c=0;c<10;c++) fig(300+c*140, 560, c<3?'red':'muted', P.c(0,0.1)+c*0.08);
  P.text('三成', { x: 880, y: 300, w: 300, align:'c', size: 72, weight:700, color:'red', at: P.c(1), cps: 3 });
  P.ring(440, 514, 320, 420, { at: P.c(2), color: 'blue' });
});