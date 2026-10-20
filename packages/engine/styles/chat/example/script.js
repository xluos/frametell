/* Chat Screen · benchmark film for the open-source Studio. Drawn to styles/chat/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'chat', title: "陌生人发来链接怎么办", name: "chat", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "陌生人发来链接怎么办", cues: [ "陌生人发来链接怎么办？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "红色感叹号亮起来：不点", "先核实", "先核实" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "一个停顿", "能挡住一次被骗。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
