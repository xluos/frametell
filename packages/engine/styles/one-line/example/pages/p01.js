ENGINE.visual('p01', (P) => {
  P.title("风是怎么形成的", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M260 560 C360 360 520 360 620 500 C720 640 820 640 880 520', { at:P.c(0), color:'ink', sw:5 });
  P.circle(960, 440, 120, { at:P.c(1), color:'red', sw:5 });
  for (let a=0;a<8;a++){const ang=-2.4+a*0.14; P.line(960+Math.cos(ang)*70,440+Math.sin(ang)*70,960+Math.cos(ang)*110,440+Math.sin(ang)*110,{at:P.c(1,0.3)+a*0.04,color:'blue',sw:4});}
  P.text('?', { x: 960, y: 480, w: 100, align:'c', size: 70, weight:700, at: P.c(2), cps: 4 });
});