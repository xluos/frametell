ENGINE.visual('p01', (P) => {
  P.title("一百人里有多少每天喝咖啡", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  function fig(x,y,c,at){ P.circle(x,y-46,34,{at,color:c,sw:3}); P.line(x,y-24,x,y+40,{at,c,sw:5}); P.line(x,y,x-34,y+10,{at,c,sw:5}); P.line(x,y,x+34,y+10,{at,c,sw:5}); P.line(x,y+40,x-24,y+92,{at,c,sw:5}); P.line(x,y+40,x+24,y+92,{at,c,sw:5}); }
  for(let r=0;r<3;r++) for(let c=0;c<8;c++) fig(340+c*170, 360+r*170, 'muted', P.c(0,0.2)+r*0.2);
  P.text('一百人', { x: 300, y: 260, w: 240, size: 40, weight:700, at: P.c(1), cps: 4 });
  P.arrow(1500, 300, 1500, 640, { at: P.c(2), color: 'red' });
});