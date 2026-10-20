/* Vector Science · benchmark film for the open-source Studio. Drawn to styles/vector/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'vector', title: "为什么天上的星星数不清", name: "vector", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "为什么天上的星星数不清", cues: [ "为什么天上的星星数不清？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "地球在最下面一格", "往上一格是太阳系，再往上是银河，每过一格", "数量大约多十倍" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "到第十格", "星星比地球上的沙子还多。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
