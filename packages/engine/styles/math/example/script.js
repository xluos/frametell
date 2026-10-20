/* Math animation · benchmark film for the open-source Studio. Drawn to styles/math/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'math', title: "三角形的内角和为什么是 180 度", name: "math", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "三角形的内角和为什么是 180 度", cues: [ "三角形的内角和为什么是 180 度？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "把三个角撕下来", "顶点对在一起", "刚好拼成一条直线" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "直线就是 180 度。", "这就是答案", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
