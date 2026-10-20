ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'orange' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.circle(420, 520, 260, { at:-1, color:'orange', fill:'orangeF', sw:4 });
  P.circle(370, 490, 26, { at:-1, color:'ink' });P.circle(470, 490, 26, { at:-1, color:'ink' });
  P.line(620, 520, 800, 470, { at:P.c(0), color:'blue', sw:8 });
  for (const [x,t,i] of [[900,'本金',0],[1130,'利息',1],[1360,'日期',2]]) {
    P.rect(x-90, 400, 180, 240, { r: 14, at:P.c(1)+i*0.4, color:i===1?'orange':'ink', fill:i===1?'orangeF':'paper', sw:4 });
    P.text(t,{x,y:540,w:180,align:'c',size:36,at:P.c(1)+i*0.4,cps:3});
  }
  P.path('M380 580 Q420 560 460 580', { at:P.c(2), color:'ink', sw:4 });
});