/* Mechanism · benchmark film for the open-source Studio. Drawn to styles/instrument/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'instrument', title: "发条是怎么让钟走的", name: "instrument", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "发条是怎么让钟走的", cues: [ "发条是怎么让钟走的？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "齿轮一个咬一个", "最里面的发条慢慢松开", "最里面的发条慢慢松开" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "拆开", "才看得见它在用力。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
