// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p02', P => {
  P.nativeScene((N, host) => {
    const svg=host.svg();host.style(N.ISO_CSS);svg.setAttribute('class','iso iso-svg');svg.dataset.theme='light';
    return t=>{svg.innerHTML=[0,1,2].map((i)=>N.solidSvg(N.extrude(N.roundedPlan({x:0,y:0,w:120,d:120,r:8}),0,90+i*60,{origin:[500+i*400,690],scale:2.1}),{lit:true})).join('');};
  });
});
