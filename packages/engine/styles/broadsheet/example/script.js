/* Broadsheet · benchmark film for the open-source Studio. Drawn to styles/broadsheet/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'broadsheet', title: "这条街的店为什么换了一茬", name: "broadsheet", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "这条街的店为什么换了一茬", cues: [ "这条街的店为什么换了一茬？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "左边是十年前的店铺数", "右边是现在", "只剩一家" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "版面会自己说话。", "这就是答案", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
