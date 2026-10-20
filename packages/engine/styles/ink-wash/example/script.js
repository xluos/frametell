/* Ink wash · benchmark film for the open-source Studio. Drawn to styles/ink-wash/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'ink-wash', title: "山为什么近浓远淡", name: "ink-wash", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "山为什么近浓远淡", cues: [ "山为什么近浓远淡？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "近处的墨落在纸上", "水少，远处的墨对了水", "就淡了" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "留白", "就是山里的雾。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
