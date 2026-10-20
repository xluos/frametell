/* Swiss Grid · benchmark film for the open-source Studio. Drawn to styles/swiss/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'swiss', title: "三个人里有一个在省钱。", name: "swiss", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "三个人里有一个在省钱。", cues: [ "三个人里有一个在省钱。", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "左边一千人", "右边三百四十人", "红色是已经开始存钱的" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "一个大数字", "比一长段话更有力。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
