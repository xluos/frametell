/* Screencast · benchmark film for the open-source Studio. Drawn to styles/screencast/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'screencast', title: "怎么把链接存成书签", name: "screencast", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "怎么把链接存成书签", cues: [ "怎么把链接存成书签？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "光标移到地址栏右边", "点一下星星", "再按完成" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "以后一点就能打开。", "这就是答案", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
