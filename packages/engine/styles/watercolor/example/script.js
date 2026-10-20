/* Watercolor · benchmark film for the open-source Studio. Drawn to styles/watercolor/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'watercolor', title: "叶子为什么秋天会变色", name: "watercolor", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "叶子为什么秋天会变色", cues: [ "叶子为什么秋天会变色？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "绿色先退掉", "黄色和红色才透出来", "像两团水色叠在一起" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "颜色是本来就有的", "只是被绿色盖住了。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
