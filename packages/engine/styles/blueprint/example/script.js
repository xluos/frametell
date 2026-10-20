/* Blueprint · benchmark film for the open-source Studio. Drawn to styles/blueprint/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'blueprint', title: "这把椅子为什么不会翻", name: "blueprint", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "这把椅子为什么不会翻", cues: [ "这把椅子为什么不会翻？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "四条腿的受力线落在地面的方框里", "四条腿的受力线落在地面的方框里", "四条腿的受力线落在地面的方框里" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "重心不出框", "就不会倒。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
