/* Paper Collage · benchmark film for the open-source Studio. Drawn to styles/collage/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'collage', title: "旧报纸里的头条说了什么", name: "collage", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "旧报纸里的头条说了什么", cues: [ "旧报纸里的头条说了什么？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "把几块剪报拼在一起", "拼出那一年的大事", "拼出那一年的大事" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "碎片拼起来", "就是历史。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
