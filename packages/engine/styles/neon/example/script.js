/* Neon Noir · benchmark film for the open-source Studio. Drawn to styles/neon/GRAMMAR.md; also this style's regression test. */
(function (root) {
  const META = { style: 'neon', title: "数据包怎么穿过网络", name: "neon", gap: 0.6 };
  const PAGES = [
    { id: 'p01', section: '问题', title: "数据包怎么穿过网络", cues: [ "数据包怎么穿过网络？", "先别急着回答。", "我们把它摆到眼前看。" ] },
    { id: 'p02', section: '过程', title: '怎么发生', cues: [ "请求是一个小光点", "沿亮着的路径一跳一跳", "沿亮着的路径一跳一跳" ] },
    { id: 'p03', section: '答案', title: '原来如此', cues: [ "到达服务器", "再沿另一条线回来。", "这就是答案" ] },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
