// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p01', P => {
  P.nativeScene((N, host) => {
    const svg=host.svg('0 0 750 450');svg.style.background='#f2efe7';
    return t=>{N.setCam(45+Math.sin(t*.5)*12,28);svg.innerHTML='<defs>'+N.filterFor(1)+'</defs><g transform="translate(370 310)" filter="url(#hand)">'+N.box(0,0,0,200,160,170,N.PALS.mint)+'</g>';};
  });
});
