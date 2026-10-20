/* Antique Map · benchmark film for the open-source Studio. Drawn to styles/old-map/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'old-map', title: "船队为什么沿着海岸走", name: "old-map", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "船队为什么沿着海岸走", cues: [ "船队为什么沿着海岸走？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "罗盘指着北", "岸边有淡水", "路线画在旧地图上" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "沿着已知", "走向未知。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
