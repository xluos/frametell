/* One persistent example: the same four amounts grow and redistribute; numbers are explicitly hypothetical. */
ENGINE.visual('p01', (P) => {
  P.title('涨了以后，25%是多少？', { accent: 'green' });
  P.text('教学假设 · 金额单位：元', { x: 180, y: 220, size: 30, color: 'muted', at: 0, mode: 'fade' });
  const k = (t, at) => PV.ease.out(PV.clamp((t - at) / 1.1));
  const value = (i, t) => 25 + (i === 0 ? 15 * k(t, P.c(2)) - 11.25 * k(t, P.c(7)) : 3.75 * k(t, P.c(8)));
  P.bars(['股票', '长期国债', '黄金', '现金'].map((label, i) => ({ label, color: i ? 'blue' : 'green' })), value,
    { x: 190, base: 750, bw: 155, gap: 95, scale: 10, at: -1, labelSize: 34, valueSize: 46, fmt: v => Number(v.toFixed(2)).toString() });
  P.text('整笔钱', { x: 1390, y: 330, w: 420, align: 'c', size: 36, color: 'soft', at: 0, mode: 'fade' });
  P.follow(t => ({ text: (100 + 15 * k(t, P.c(2))).toFixed(0) + ' 元', x: 1390, y: 395 }), { w: 460, size: 84, weight: 700, color: 'green' });
  P.text('115 × 25%', { x: 1390, y: 555, w: 440, align: 'c', size: 50, at: P.c(5), mode: 'fade' });
  P.text('每类 28.75 元', { x: 1390, y: 640, w: 440, align: 'c', size: 46, color: 'green', at: P.c(6), mode: 'fade' });
  P.line(165, 462.5, 1110, 462.5, { at: P.c(6), color: 'orange', sw: 2, dur: 0.5 });
  P.text('目标', { x: 165, y: 415, size: 30, color: 'orange', at: P.c(6), mode: 'fade' }).hide(P.c(7), 0.2);
  P.text('−11.25', { x: 268, y: 265, w: 200, align: 'c', size: 40, color: 'green', at: P.c(7), mode: 'fade' });
  [518, 768, 1018].forEach(x => P.text('+3.75', { x, y: 265, w: 200, align: 'c', size: 40, color: 'blue', at: P.c(8), mode: 'fade' }));
  P.text('调仓按预设规则执行，未计税费', { x: 180, y: 835, size: 30, color: 'muted', at: P.c(4), mode: 'fade' });
});
