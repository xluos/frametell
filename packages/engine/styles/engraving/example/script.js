/* Copperplate Engraving · benchmark film for the open-source Studio. Drawn to styles/engraving/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'engraving', title: "贝壳为什么有螺纹", name: "engraving", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "贝壳为什么有螺纹", cues: [ "贝壳为什么有螺纹？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "每一圈比里面一圈大一点", "线最密的地方最鼓", "线最密的地方最鼓" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "铜版刻得出弧度。", "这就是答案", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
