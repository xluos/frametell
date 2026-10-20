ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.path('M880 300 C1180 340 1260 520 880 700 C500 520 580 340 880 300 Z', { at:-1, color:'ink', fill:'paper', sw:2.5 });
  for (let i=0;i<9;i++){ const k=i/8; P.path(`M${600+k*280} 680 Q880 ${640-i*36} ${1160-k*280} 680`,{at:P.c(1)+i*0.12,color:i>5?'red':'muted',sw:2}); }
  P.line(880, 320, 880, 680, { at:P.c(2), color:'blue', sw:2 });
  P.text('越密越鼓', { x: 1240, y: 300, w: 280, size: 34, color:'blue', at:P.c(2), cps:5 });
});