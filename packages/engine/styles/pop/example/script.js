/* Pop comic · benchmark film for the open-source Studio. Drawn to styles/pop/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'pop', title: "为什么总觉得时间不够", name: "pop", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "为什么总觉得时间不够", cues: [ "为什么总觉得时间不够？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "待办事项像气泡一样冒出来", "一个接一个", "一个接一个" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "把最大的那个先戳破。", "这就是答案", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
