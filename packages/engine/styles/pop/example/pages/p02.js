ENGINE.visual('p02', (P) => {
  P.title("怎么发生", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  for (let i=0;i<3;i++) {
    const y=340+i*180;
    P.path(`M360 ${y} H900 Q960 ${y} 960 ${y+60} V${y+100} Q960 ${y+160} 900 ${y+160} H520 l-80 60 l10-60 H360 Q300 ${y+160} 300 ${y+100} V${y+60} Q300 ${y} 360 ${y} Z`, { at: P.c(1)+i*0.4, color: i===1?'red':'ink', fill: i===1?'redF':'paper', sw: 4 });
  }
  P.arrow(1020, 420, 1280, 420, { at: P.c(2), color: 'blue' });
  P.text('先最大', { x: 1400, y: 440, w: 260, align:'c', size: 38, color:'blue', at: P.c(2), cps: 5 });
});