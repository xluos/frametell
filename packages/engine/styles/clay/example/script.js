/* Clay Studio · benchmark film for the open-source Studio. Drawn to styles/clay/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'clay', title: "压力怎么让球变形", name: "clay", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "压力怎么让球变形", cues: [ "压力怎么让球变形？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "小球落下", "被地面挤扁", "又慢慢鼓回来" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "软", "是因为它愿意变形。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
