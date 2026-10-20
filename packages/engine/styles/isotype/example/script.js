/* Isotype · benchmark film for the open-source Studio. Drawn to styles/isotype/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'isotype', title: "一百人里有多少每天喝咖啡", name: "isotype", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "一百人里有多少每天喝咖啡", cues: [ "一百人里有多少每天喝咖啡？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "每一个小人代表十个人", "蓝色是每天喝的", "蓝色是每天喝的" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "数小人", "就知道比例。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
