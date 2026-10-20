ENGINE.visual('p03', (P) => {
  P.title("原来如此", { accent: 'red' });
  P.line(180, 248, 1740, 268, { at: -1, color: 'faint', sw: 2 });
  P.line(180, 812, 1740, 792, { at: -1, color: 'faint', sw: 2 });
  P.circle(220, 300, 28, { at: -1, color: 'faint' });
  P.circle(220, 760, 28, { at: -1, color: 'faint' });
  P.circle(1700, 300, 28, { at: -1, color: 'faint' });
  P.circle(1700, 760, 28, { at: -1, color: 'faint' });
  for (let r=0;r<5;r++) for (let c=0;c<9;c++) P.circle(300+c*150, 250+r*120, 12, { at:-1, color:'faint' });
  P.path('M560 330 H1200 Q1280 330 1280 410 V580 Q1280 660 1200 660 H820 L700 740 L720 660 H560 Q480 660 480 580 V410 Q480 330 560 330 Z', { at: -1, color: 'ink', fill: 'redF', sw: 4 });
  P.text('✓', { x: 880, y: 540, w: 120, align:'c', size: 100, weight: 800, color: 'red', at: P.c(0), cps: 4 });
  for (let a=0;a<10;a++) { const ang=a/10*Math.PI*2; P.line(1330+Math.cos(ang)*70, 470+Math.sin(ang)*70, 1330+Math.cos(ang)*110, 470+Math.sin(ang)*110, { at:P.c(1)+a*0.05, color:'blue', sw:4 }); }
});