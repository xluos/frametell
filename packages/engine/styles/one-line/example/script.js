/* One line · benchmark film for the open-source Studio. Drawn to styles/one-line/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'one-line', title: "风是怎么形成的", name: "one-line", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "风是怎么形成的", cues: [ "风是怎么形成的？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "一条线先画成太阳", "弯上去变成云，再落下来变成雨", "最后弯成一个人在跑" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "从头到尾", "笔没抬过。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
