// Native source APIs; Frametell supplies only the page clock and output viewport.
ENGINE.visual('p01', P => {
  P.nativeScene((N, host) => {
    host.style(N.CSS); const wrapper=document.createElement('div');wrapper.className='th';Object.assign(wrapper.style,{position:'absolute',inset:'0',background:'#FAF9F5'});host.root.appendChild(wrapper);
    return t=>{wrapper.innerHTML=N.UI.appWin({sessions:[{name:'A new idea',on:true}],msgs:[{k:'u',html:'Show how the idea becomes a working page.'},{k:'t',html:'Read the request. Build the page. Review the result.',p:Math.min(1,.1+Math.max(0,t)/5)}]},t);};
  });
});
