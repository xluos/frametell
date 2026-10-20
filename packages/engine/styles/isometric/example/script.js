/* Isometric · benchmark film for the open-source Studio. Drawn to styles/isometric/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'isometric', title: "包裹在仓库里怎么走", name: "isometric", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "包裹在仓库里怎么走", cues: [ "包裹在仓库里怎么走？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "箱子从传送带这头进来", "拐一个弯", "上货架" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "每一格", "都有自己的去向。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
