/* Mid-century Cartoon · benchmark film for the open-source Studio. Drawn to styles/midcentury/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'midcentury', title: "过马路要看哪里", name: "midcentury", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "过马路要看哪里", cues: [ "过马路要看哪里？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "红灯停", "绿灯行", "还要看拐弯的车" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "一看二慢三通过。", "这就是答案", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
