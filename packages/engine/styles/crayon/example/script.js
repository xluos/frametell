/* Crayon Picture Book · benchmark film for the open-source Studio. Drawn to styles/crayon/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'crayon', title: "月亮为什么有圆有缺", name: "crayon", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "月亮为什么有圆有缺", cues: [ "月亮为什么有圆有缺？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "地球的影子慢慢盖住月亮", "又慢慢让开", "又慢慢让开" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "像用蜡笔涂掉一块", "再补回来。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
