/* Mascot Explainer · benchmark film for the open-source Studio. Drawn to styles/mascot/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'mascot', title: "为什么先花要还", name: "mascot", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "为什么先花要还", cues: [ "为什么先花要还？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "小助手拿出三张卡", "一张写本金，一张写利息", "一张写日期" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "借的时候", "就要想好怎么还。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
