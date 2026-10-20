ENGINE.visual('p01', (P) => {
  P.title("为什么天上的星星数不清", { accent: 'blue' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.ellipse(880, 520, 620, 200, { at: -1, color: 'orange', sw: 3 });
  P.circle(880, 520, 360, { at: -1, color: 'ink' });
  P.circle(760, 430, 90, { at: -1, color: 'orange' });
  for (const [x,y,r] of [[260,300,26],[1520,280,18],[330,640,16],[1500,640,24]]) P.circle(x,y,r,{at:P.c(0,0.3),color:'orange'});
  P.text('?', { x: 880, y: 560, w: 120, align: 'c', size: 100, weight: 700, color: 'blue', at: P.c(1), cps: 6 });
  P.arrow(1080, 600, 1420, 690, { at: P.c(2), color: 'orange' });
});