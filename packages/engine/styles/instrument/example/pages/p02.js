// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p02', P => {
  P.nativeScene((N, host) => {
    const svg=host.svg(),proj={origin:[960,700],scale:3};host.style(N.ISO_CSS);svg.setAttribute('class','iso iso-svg');svg.dataset.theme='light';
    return t=>{const s=N.extrude(N.roundedPlan({x:-90,y:-70,w:180,d:140,r:18}),0,100+Math.sin(t*.8)*35,proj);svg.innerHTML=N.solidSvg(s,{lit:true});};
  });
});
