ENGINE.visual('p02', (P) => {
  P.title("沿真实海岸航行");
  const map=P.worldMap({at:P.c(0),y:280,h:500});
  P.mapRoute([[-5,40],[-25,15],[-35,-20],[15,-38],[50,-15]].map(map.project),{at:P.c(1),dur:4});
});
