/* Manga · benchmark film for the open-source Studio. Drawn to styles/manga/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'manga', title: "紧张时为什么心跳变快", name: "manga", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "紧张时为什么心跳变快", cues: [ "紧张时为什么心跳变快？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "速度线集中到胸口", "画面一格比一格近", "画面一格比一格近" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "砰、砰", "声音也跟着变急。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
