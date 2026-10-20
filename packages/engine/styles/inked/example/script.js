/* Inked Gadgets · benchmark film for the open-source Studio. Drawn to styles/inked/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'inked', title: "开瓶器为什么省力", name: "inked", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "开瓶器为什么省力", cues: [ "开瓶器为什么省力？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "手压下这一头", "支点在瓶盖边", "长柄把力气放大" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "小小的工具", "是放大力量的办法。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
