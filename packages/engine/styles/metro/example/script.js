/* Transit Map · benchmark film for the open-source Studio. Drawn to styles/metro/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'metro', title: "换乘为什么要走那么远", name: "metro", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "换乘为什么要走那么远", cues: [ "换乘为什么要走那么远？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "红点在蓝色线上", "要走到环线的交汇站", "才能换方向" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "两条线之间", "是一段步行的路。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
