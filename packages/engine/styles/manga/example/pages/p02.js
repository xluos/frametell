ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(240, 220, 700, 560, { at:-1, color:'ink', sw:5 });
  P.rect(980, 220, 700, 560, { at:-1, color:'ink', sw:5 });
  for(let i=0;i<12;i++){const k=i/11; P.line(300+k*600, 760, 600, 480, { at:P.c(0)+i*0.04, color:i>7?'red':'muted', sw:2.5 }); }
  for(let i=0;i<12;i++){const k=i/11; P.line(1620-k*600, 760, 1330, 480, { at:P.c(1)+i*0.04, color:'muted', sw:2.5 }); }
  P.text('砰', { x: 600, y: 560, w: 200, align:'c', size: 72, weight:800, color:'red', at:P.c(2), cps:2 });
  P.arrow(720, 520, 960, 520, { at:P.c(2,0.3), color:'orange' });
});