ENGINE.visual('p01', (P) => {
  P.title("紧张时为什么心跳变快", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  P.rect(240, 220, 700, 560, { at:-1, color:'ink', sw:5 });
  P.rect(980, 220, 700, 560, { at:-1, color:'ink', sw:5 });
  P.line(960, 220, 960, 780, { at:-1, color:'ink', sw:6 });
  for(let i=0;i<10;i++) P.line(300+i*50, 780, 500+i*20, 300, { at:P.c(0,0.2)+i*0.05, color:'muted', sw:2 });
  P.text('?', { x: 600, y: 520, w: 100, align:'c', size: 80, weight:800, at:P.c(1), cps:4 });
  P.circle(1300, 500, 180, { at:P.c(2), color:'ink', sw:5 });
  for(let r=0;r<3;r++) for(let c=0;c<3;c++) P.circle(1240+c*50, 440+r*50, 8, { at:-1, color:'muted' });
});