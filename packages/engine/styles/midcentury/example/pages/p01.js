ENGINE.visual('p01', (P) => {
  P.title("过马路要看哪里", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  for(let a=0;a<12;a++){const ang=a/12*Math.PI*2;P.line(1480,360+Math.sin(ang)*60,1480+Math.cos(ang)*120,360+Math.sin(ang)*120,{at:-1,color:'blue',sw:4});}
  P.circle(1480,360,70,{at:-1,color:'blue',fill:'blueF'});
  P.circle(620, 420, 90, { at:P.c(0), color:'red', sw:4 });
  P.path('M620 510 L520 700 L720 700 Z', { at:P.c(0,0.2), color:'red', fill:'redF' });
  P.text('?', { x: 620, y: 450, w: 80, align:'c', size: 60, weight:700, at: P.c(1), cps: 4 });
  P.arrow(720, 560, 1080, 560, { at:P.c(2), color:'blue' });
  P.rect(1080, 470, 260, 180, { at:P.c(2,0.2), color:'ink', fill:'paper' });
});