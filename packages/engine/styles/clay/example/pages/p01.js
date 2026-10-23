ENGINE.visual('p01', (P) => {
  P.title("捏出来的角色");
  P.ellipse(950,805,1220,80,{at:-1,fill:'paper',color:'none',pen:false});
  P.clayBuddy(720,485,{at:P.c(0)});
  P.clayBuddy(1260,510,{at:P.c(1),color:'blue'});
});
