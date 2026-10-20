ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  for (const [x,d,i] of [[360,90,0],[880,220,1],[1400,380,2]]) {
    P.ellipse(x, 560, d*1.7, d*0.55, { at: -1, color: 'faint', sw: 2 });
    P.circle(x, 560, d, { at: P.c(1)+i*0.45, color: i===1?'blue':'ink' });
  }
  P.arrow(470, 720, 770, 720, { at: P.c(2), color: 'orange' });
  P.arrow(1000, 720, 1290, 720, { at: P.c(2,0.4), color: 'orange' });
  P.text('十倍', { x: 600, y: 790, w: 160, align:'c', size: 34, color:'orange', at: P.c(2), cps: 4 });
  P.text('十倍', { x: 1140, y: 790, w: 160, align:'c', size: 34, color:'orange', at: P.c(2,0.4), cps: 4 });
});