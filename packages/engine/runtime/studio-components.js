/* Internal style adapters, loaded after the style's vendor assets. Time is always page-local. */
(function () {
  const { col, s, clamp, ease } = PV;
  const S = PV.Studio = {};
  const path = (pts, close = false) => pts.map(([x,y],i) => `${i?'L':'M'}${x} ${y}`).join(' ') + (close?' Z':'');
  const timing = (t, o) => PV.K(t, o.at ?? 0, o.dur ?? .8, ease.out);

  S.crayonScene = function (draw, o = {}) {
    const D = window.CRAYON;
    const tooth = new Uint8Array(STAGE.w * STAGE.h);
    const rng = PV.rng(71);
    for (let i=0;i<tooth.length;i++) tooth[i] = 80 + rng()*155;
    const canvas = this.canvas(0, 0, STAGE.w, STAGE.h, (ctx, t) => {
      D.CAM.x=960; D.CAM.y=540; D.CAM.s=1; D.BOIL.step=Math.floor(t*12); D.BOIL.amp=1;
      const L={g:ctx};
      const opts = (q={}) => ({...q, col:col(q.color || 'ink'), w:q.sw ?? q.w ?? 7});
      const pencil = {
        line: (pts,q) => { ctx.__layout.mark(pts,q); return D.line(L,pts,opts(q)); },
        fill: (pts,q) => D.fill(L,pts,{...opts(q), w:q?.sw ?? 13}),
        circle: (x,y,r,q={}) => { const pts=D.handCircle(x,y,r,q.seed??3,0,64); ctx.__layout.mark(pts,q,'ring'); if(q.fill) D.fill(L,pts,{...opts(q),col:col(q.fill),w:14}); D.line(L,pts,{...opts(q),closed:true}); },
        text: (txt,x,y,q={}) => ctx.__layout.label(txt,()=>D.text(L,txt,x,y,{font:'LXGW WenKai',...opts(q),size:q.size??44}), (q.reveal??1)>=.999),
        // x/y are the shared visual centre. Font ink metrics establish the baseline before annotations are drawn.
        label: (txt,x,y,q={}) => {
          const size=q.size??44;
          ctx.save();ctx.font=`${q.weight??400} ${size}px "LXGW WenKai"`;ctx.textAlign='left';ctx.textBaseline='alphabetic';
          const m=ctx.measureText(txt);ctx.restore();
          const baseline=y+(m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2;
          const centreX=x+(m.actualBoundingBoxLeft-m.actualBoundingBoxRight+m.width)/2;
          pencil.text(txt,centreX,baseline,{...q,align:'center'});
          const rx=q.rx??Math.max(size*.9,m.width/2+24),ry=q.ry??Math.max(size*.65,(m.actualBoundingBoxAscent+m.actualBoundingBoxDescent)/2+20);
          const mark={...q,draw:q.markDraw??q.draw??1};
          if(q.ring) pencil.line(Array.from({length:49},(_,i)=>[x+Math.cos(i/48*Math.PI*2)*rx,y+Math.sin(i/48*Math.PI*2)*ry]),{...mark,draw:q.ringDraw??mark.draw});
          if(q.underline) pencil.line([[x-rx*.65,y+ry*.65],[x+rx*.65,y+ry*.65]],{...mark,draw:q.underlineDraw??mark.draw});
        },
        ellipse: D.ellipse, handCircle: D.handCircle,
      };
      ctx.save(); ctx.globalAlpha=timing(t,o); draw(pencil,t); ctx.restore();
      // The original WebGL pressure/tooth rule, evaluated on the transparent Canvas2D pressure layer.
      // Paper remains in #bg, so cameras and subtitles are composited by Frametell as usual.
      const im=ctx.getImageData(0,0,STAGE.w,STAGE.h), a=im.data;
      for(let i=0;i<tooth.length;i++){
        const pressure=a[i*4+3]/255;
        if(!pressure) continue;
        const threshold=1-pressure*1.22;
        a[i*4+3] *= clamp((tooth[i]/255-threshold)*5+.35);
      }
      ctx.putImageData(im,0,0);
    });
    canvas.dataset.material='native-crayon'; return canvas;
  };

  S.printScene = function (draw, o = {}) {
    const T=window.TOON;
    return this.canvas(0,0,STAGE.w,STAGE.h,(ctx,t)=>{
      T.setClock(t);ctx.save();ctx.globalAlpha=timing(t,o);
      draw({
        shape:(pts,q={})=>T.shape(ctx,pts,{...q,fill:q.fill?col(q.fill):null,line:q.sw??4,lineColor:col(q.color||'ink')}),
        ellipse:T.ellipse, rect:T.rect,
        text:(txt,x,y,q={})=>ctx.__layout.label(txt,()=>T.text(ctx,txt,x,y,{...q,font:`${q.size??48}px \"LXGW WenKai\"`,fill:col(q.color||'ink'),plate:q.plate?col(q.plate):null})),
      },t);ctx.restore();
    });
  };
  S.engrave = function (d, o = {}) {
    const B=window.BURIN,sh=B.shape(d),ink=new B.Ink({color:col(o.color||'ink')}),at=o.at??0,dur=o.dur??4;
    const tone=B.formTone(sh.polys,{light:[-.6,-.7],base:.08});
    ink.group('outline');for(const p of sh.polys)B.outline(ink,p,{w:2,seed:3});
    ink.group('hatch');B.hatch(ink,sh.polys,{angle:-.6,spacing:5,tone,thr:.12,wMax:1.8,seed:4});
    ink.group('cross');B.hatch(ink,sh.polys,{angle:.65,spacing:6,tone,thr:.52,wMax:1.3,seed:5});
    ink.schedule('outline',at,at+dur*.25);ink.schedule('hatch',at+dur*.25,at+dur*.8);ink.schedule('cross',at+dur*.8,at+dur);
    const canvas=this.canvas(0,0,STAGE.w,STAGE.h,(ctx,t)=>ink.draw(ctx,t));
    canvas.dataset.material='native-engraving';return canvas;
  };
  S.paintScene = function (draw, o = {}) {
    return this.canvas(0,0,STAGE.w,STAGE.h,(ctx,t)=>{ctx.save();ctx.globalAlpha=timing(t,o);draw(ctx,window.PAINT,t);ctx.restore();});
  };

  S.metroRoute = function (points, stops = [], o = {}) {
    const at=o.at??0, dur=o.dur??3, color=o.color||'blue';
    const d=path(points), track=this.pathAt(d);
    const route=this.path(d,{at,dur,color,sw:o.sw??12,rough:0,pen:false,ease:ease.lin});
    stops.forEach((stop,i)=>{
      const p=track.at(stop.u), when=stop.at??at+dur*stop.u;
      this.circle(p.x,p.y,stop.interchange?48:26,{at:when,dur:.2,color,fill:'paper',sw:5,pen:false});
      if(stop.label) this.text(stop.label,{x:p.x+(stop.dx??0),y:p.y+(stop.dy??28),w:stop.w??220,align:'c',size:o.labelSize??34,at:when,mode:'fade'});
    });
    const train=this.layer();
    train.box(-38,-17,76,34,{at:-1,color,fill:'paper',sw:4,r:8,pen:false});
    train.line(-16,-10,-16,10,{at:-1,color,sw:3,pen:false});
    train.line(14,-10,14,10,{at:-1,color,sw:3,pen:false});
    this.move(train,t=>{if(t<at)return null; const p=track.at(clamp((t-at)/dur)); return {x:p.x,y:p.y,rot:p.a,op:t>at+dur+.5?0:1};},[0,0]);
    return {route,train,track};
  };

  S.mascot = function (x, y, size=300, o={}) {
    const L=this.layer(), u=size/300, at=o.at??0, c=o.color||'orange';
    const E=(xx,yy,w,h,fill)=>L.ellipse(x+xx*u,y+yy*u,w*u,h*u,{at,color:'ink',fill,sw:4,pen:false});
    E(0,255,230,35,'inkF');
    E(0,140,175,200,c); E(-57,235,95,42,c); E(57,235,95,42,c);
    E(-80,-27,78,78,c); E(80,-27,78,78,c); E(-80,-27,43,43,'orangeF'); E(80,-27,43,43,'orangeF');
    E(0,30,230,215,c); E(0,78,102,74,'paper');
    E(-82,146,62,95,c); E(88,142,87,52,c);
    E(-58,68,34,19,'redF'); E(58,68,34,19,'redF');
    const eyes=L.layer();
    [-38,38].forEach(xx=>eyes.circle(x+xx*u,y+27*u,14*u,{at,fill:'ink',color:'ink',pen:false}));
    L.ellipse(x,y+68*u,20*u,15*u,{at,fill:'ink',color:'ink',pen:false});
    L.path(`M${x-22*u} ${y+88*u} Q${x} ${y+108*u} ${x+22*u} ${y+88*u}`,{at,color:'ink',sw:3.5,pen:false});
    this.tick(t=>{eyes.wrap.style.opacity=Math.floor(Math.max(t,0)*12)%47===45?'0':'1';});
    L.wrap.dataset.component='mascot';
    return L;
  };
  S.coinPouch = function (x,y,o={}) {
    const L=this.layer(), at=o.at??0, c=o.color||'orange';
    L.path(`M${x-56} ${y-82} Q${x-105} ${y-28} ${x-95} ${y+45} Q${x} ${y+113} ${x+95} ${y+45} Q${x+105} ${y-28} ${x+56} ${y-82} Z`,{at,fill:c,color:'ink',sw:5,pen:false});
    L.path(`M${x-56} ${y-80} L${x-65} ${y-113} Q${x} ${y-93} ${x+65} ${y-113} L${x+56} ${y-80}`,{at,fill:c,color:'ink',sw:4,pen:false});
    L.line(x-57,y-77,x+57,y-77,{at,color:'ink',sw:6,pen:false});
    L.text(o.label||'资产',{x,y:y-22,w:165,align:'c',size:38,at,mode:'fade'});
    return L;
  };
  S.ledger = function (x,y,w=760,h=430,o={}) {
    const L=this.layer(),at=o.at??0,c=o.color||'orange',m=x+w/2;
    L.path(`M${x} ${y+15} Q${x+w*.25} ${y-25} ${m} ${y+20} Q${x+w*.75} ${y-25} ${x+w} ${y+15} V${y+h} Q${x+w*.75} ${y+h-35} ${m} ${y+h} Q${x+w*.25} ${y+h-35} ${x} ${y+h} Z`,{at,fill:'paper',color:c,sw:5,pen:false});
    L.line(m,y+20,m,y+h,{at,color:c,sw:3,pen:false});
    L.text(o.left||'收入',{x:x+w*.25,y:y+42,w:w*.4,align:'c',size:38,color:'blue',at,mode:'fade'});
    L.text(o.right||'生活开支',{x:x+w*.75,y:y+42,w:w*.4,align:'c',size:38,color:c,at,mode:'fade'});
    [0,1,2,3].forEach(i=>{L.line(x+35,y+130+i*65,m-35,y+130+i*65,{at,color:'faint',sw:2,pen:false});L.line(m+35,y+130+i*65,x+w-35,y+130+i*65,{at,color:'faint',sw:2,pen:false});});
    return L;
  };

  S.isoBlock = function (x,y,w=160,d=160,h=170,o={}) {
    const L=this.layer(), A=window.ANATOMY, at=o.at??0;
    const shape=A.extrude(A.roundedPlan({x:0,y:0,w,d,r:o.r??8}),0,h,{origin:[x,y],scale:1});
    L.path(shape.fill,{at,fill:o.color||'purple',color:'none',sw:0,pen:false});
    shape.shades.forEach((p,i)=>{if(p)L.path(p,{at,fill:PV.mix(o.color||'purple','ink',.1+i*.12),color:'none',sw:0,pen:false});});
    L.path(shape.outline+shape.crease,{at,color:'ink',sw:2,pen:false});
    return L;
  };
  S.inkedBox = function (x,y,w=180,d=150,h=160,o={}) {
    const g=s('g',{},this.svg), C=window.COLORFIGURES;
    const svg=C.box(0,0,0,w,d,h,C.PALS[o.palette||'mint']);
    const figure=s('g',{transform:`translate(${x} ${y}) scale(${o.scale??1.6})`},g);
    figure.innerHTML=svg;
    this.show(g,{at:o.at??0,dur:o.dur??.7,dy:0});
    g.dataset.component='colorfigures';return g;
  };
  S.gears = function (x,y,o={}) {
    const at=o.at??0, r=o.r??105, teeth=o.teeth??16;
    const gear=(cx,cy,rad,phase)=>{
      const L=this.layer(),pts=[];
      for(let i=0;i<teeth*4;i++){const a=i/(teeth*4)*Math.PI*2,rr=rad*(i%4===0||i%4===3?.84:1);pts.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]);}
      L.path(path(pts,true),{at,fill:'mutedF',color:'ink',sw:3,pen:false});
      L.circle(cx,cy,rad*.4,{at,fill:'paper',color:'ink',sw:3,pen:false});
      return L;
    };
    const a=gear(x,y,r,0); const b=gear(x+r*1.82,y,r,180/teeth);
    this.move(a,t=>({rot:Math.max(0,t-at)*30}),[x,y]);
    this.move(b,t=>({rot:180/teeth-Math.max(0,t-at)*30}),[x+r*1.82,y]);
    return [a,b];
  };

  S.pictograms = function (x,y,count,o={}) {
    const at=o.at??0,cols=o.cols??10,u=o.size??50;
    if(!Number.isInteger(count)||count<0||count>200)throw new Error('pictograms count must be an integer in 0..200');
    const L=this.layer();
    for(let i=0;i<count;i++){
      const xx=x+(i%cols)*u*1.45,yy=y+Math.floor(i/cols)*u*2.15,t=at+i*(o.step??.06),c=i<(o.highlight??count)?o.color||'red':'faint';
      L.circle(xx,yy,u*.35,{at:t,fill:c,color:c,pen:false});
      L.path(`M${xx-u*.24} ${yy+u*.3} L${xx+u*.24} ${yy+u*.3} L${xx+u*.2} ${yy+u} L${xx+u*.04} ${yy+u} L${xx} ${yy+u*.7} L${xx-u*.04} ${yy+u} L${xx-u*.2} ${yy+u} Z`,{at:t,fill:c,color:c,pen:false});
    }
    return L;
  };
  S.chatMessage = function (text,x,y,o={}) {
    const L=this.layer(), w=o.w??540, at=o.at??0;
    L.box(x,y,w,120,{at,fill:o.side==='right'?'green':'paper',color:'none',r:24,texture:false,pen:false});
    L.text(text,{x:x+30,y:y+32,w:w-60,size:38,at:at+.15,mode:'fade'});
    this.move(L,t=>({y:18*(1-timing(t,{at})),op:1-PV.K(t,o.retract??1e6,.3)}));
    if(o.retract!=null)this.text('消息已撤回',{x:x+w/2,y:y+34,w:400,align:'c',size:30,color:'muted',at:o.retract,mode:'fade'});
    return L;
  };
  S.browserWindow = function (x,y,w=1050,h=540,o={}) {
    const L=this.layer(),at=o.at??0;
    L.box(x,y,w,h,{at,fill:'paper',color:'ink',r:20,texture:false,pen:false});
    L.line(x,y+62,x+w,y+62,{at,color:'faint',pen:false});
    ['red','yellow','green'].forEach((c,i)=>L.circle(x+32+i*32,y+30,14,{at,fill:c,color:c,pen:false}));
    L.text(o.url||'产品演示',{x:x+160,y:y+16,w:w-200,size:28,color:'soft',at,mode:'fade'});
    return L;
  };
  S.cursorClick = function (points,o={}) {
    const L=this.layer(),track=this.pathAt(path(points)),at=o.at??0,dur=o.dur??1;
    L.path('M0 0 L0 40 L11 30 L20 48 L30 42 L20 26 L37 23 Z',{at:-1,fill:'paper',color:'ink',sw:3,pen:false});
    this.move(L,t=>{const p=track.at(clamp((t-at)/dur));return {x:p.x,y:p.y,op:t<at?0:1};},[0,0]);
    const end=points.at(-1);this.circle(end[0],end[1],75,{at:at+dur,dur:.3,color:'blue',sw:4,pen:false}).hide(at+dur+.3,.3);
    return L;
  };
  S.dimension = function (x,y,w,label,o={}) {
    const at=o.at??0,c=o.color||'ink';
    this.line(x,y-38,x,y+22,{at,color:c,pen:false});this.line(x+w,y-38,x+w,y+22,{at,color:c,pen:false});
    this.arrow(x+w,y,x,y,{at,color:c,head:12,pen:false});this.arrow(x,y,x+w,y,{at,color:c,head:12,pen:false});
    return this.text(label,{x:x+w/2,y:y+26,w:300,align:'c',size:34,color:c,at,mode:'fade'});
  };
  S.comicPanel = function (x,y,w,h,o={}) {
    return this.box(x,y,w,h,{...o,fill:o.fill||'paper',color:'ink',sw:7,r:0,texture:false,pen:false});
  };
  S.burst = function (x,y,text,o={}) {
    const pts=[],r=o.r??185,at=o.at??0;
    for(let i=0;i<32;i++){const a=i/32*Math.PI*2,rr=r*(i%2?.66:1);pts.push([x+Math.cos(a)*rr,y+Math.sin(a)*rr]);}
    this.path(path(pts,true),{at,fill:o.color||'yellow',color:'ink',sw:6,pen:false});
    return this.text(text,{x,y:y-42,w:r*1.3,align:'c',size:64,weight:700,at:at+.1,mode:'fade'});
  };
  S.paperCut = function (x,y,w,h,text,o={}) {
    const L=this.layer(),at=o.at??0,rng=PV.rng(o.seed??8),pts=[];
    for(let i=0;i<=12;i++)pts.push([x+i*w/12,y+(rng()-.5)*10]);
    pts.push([x+w,y+h]);for(let i=12;i>=0;i--)pts.push([x+i*w/12,y+h+(rng()-.5)*10]);
    L.path(path(pts,true),{at,fill:'paper',color:'soft',sw:1,pen:false});
    L.rect(x+w*.4,y-17,w*.2,38,{at,fill:'yellowF',color:'none',pen:false});
    L.text(text,{x:x+35,y:y+50,w:w-70,size:o.size??48,at,mode:'fade'});
    this.move(L,()=>({rot:o.rot??-3}),[x+w/2,y+h/2]);return L;
  };
  S.specimen = function (x,y,o={}) {
    const L=this.layer(),at=o.at??0,w=o.w??430,h=o.h??440;
    L.path(`M${x} ${y-h/2} C${x-w} ${y-h/2} ${x-w*.6} ${y+h/2} ${x} ${y+h/2} C${x+w*.6} ${y+h/2} ${x+w} ${y-h/2} ${x} ${y-h/2} Z`,{at,fill:'softF',color:'ink',sw:2,pen:false});
    L.path(`M${x} ${y-h/2} Q${x-30} ${y} ${x} ${y+h/2}`,{at:at+.3,color:'ink',sw:3,pen:false});
    for(let i=1;i<12;i++){const yy=y-h/2+i*h/12,span=Math.sin(i/12*Math.PI)*w*.42;L.curve([[x-span,yy-30],[x,yy+15],[x+span,yy-30]],{at:at+.2+i*.06,color:'ink',sw:.9,pen:false});}
    return L;
  };
  S.presenter = function (x,y,o={}) {
    const L=this.layer(),at=o.at??0;
    L.circle(x,y,105,{at,fill:'yellow',color:'ink',sw:3,pen:false});
    L.path(`M${x-75} ${y+72} L${x+65} ${y+66} L${x+90} ${y+260} L${x-90} ${y+260} Z`,{at,fill:'green',color:'ink',sw:3,pen:false});
    L.line(x-65,y+140,x-150,y+70,{at,color:'ink',sw:12,pen:false});
    L.line(x+65,y+140,x+180,y+80,{at,color:'ink',sw:12,pen:false});
    return L;
  };
  S.clayBuddy = function (x,y,o={}) {
    const L=this.layer(),at=o.at??0,c=o.color||'orange';
    L.ellipse(x,y+205,300,44,{at,fill:'inkF',color:'none',pen:false});
    L.ellipse(x,y+85,170,210,{at,fill:c,color:'none',pen:false});
    L.circle(x,y-60,165,{at,fill:c,color:'none',pen:false});
    [-32,32].forEach(xx=>L.circle(x+xx,y-66,18,{at,fill:'ink',color:'none',pen:false}));
    L.ellipse(x-55,y+193,90,53,{at,fill:c,color:'none',pen:false});L.ellipse(x+55,y+193,90,53,{at,fill:c,color:'none',pen:false});
    this.move(L,t=>{const step=Math.floor(Math.max(0,t-at)*12)/12;return {y:-30*Math.sin(Math.min(step,1.5)*Math.PI/1.5),s:1+.025*Math.sin(Math.min(step,1.5)*Math.PI*2)};},[x,y+200]);
    return L;
  };
  S.mathPlot = function (x,y,w=750,h=400,o={}) {
    const at=o.at??0;this.arrow(x,y,x+w,y,{at,color:'ink',pen:false});this.arrow(x,y,x,y-h,{at,color:'ink',pen:false});
    const pts=Array.from({length:81},(_,i)=>[x+i*w/80,y-(i/80)**2*h]);
    return this.curve(pts,{at:at+.4,dur:2,color:o.color||'blue',sw:5,pen:false});
  };
  S.continuousLine = function (from,to,o={}) {
    if(from.length!==to.length||from.length<2)throw new Error('continuousLine needs equal-length sampled point arrays');
    return this.liveRough((t,R)=>{const k=timing(t,o),pts=from.map((p,i)=>p.map((v,j)=>v+(to[i][j]-v)*k));return [R.path(path(pts),{color:'ink',sw:o.sw??5,single:true,rough:0})];});
  };
  S.headline = function (text,x,y,o={}) {return this.text(text,{x,y,w:o.w??1200,size:o.size??120,weight:700,at:o.at??0,mode:'fade',...o});};
  S.chartColumns = function (items,values,o={}) {return this.bars(items,(i,t)=>values[i]*timing(t,o),{x:o.x??520,base:o.y??750,bw:120,gap:80,scale:o.scale??3,at:o.at??0,fmt:v=>Math.round(v).toString()});};
  S.neonNetwork = function (nodes,o={}) {
    const at=o.at??0;nodes.forEach(([x,y],i)=>{if(i){this.line(...nodes[i-1],x,y,{at:at+i*.4,color:'blue',sw:5,pen:false});}this.circle(x,y,75,{at:at+i*.4,fill:'blueF',color:'blue',sw:5,pen:false});});
    return this.liveRough((t,R)=>{const k=clamp((t-at)/3)*(nodes.length-1),i=Math.min(nodes.length-2,Math.floor(k)),u=k-i;return [R.circle(nodes[i][0]+(nodes[i+1][0]-nodes[i][0])*u,nodes[i][1]+(nodes[i+1][1]-nodes[i][1])*u,20,{fill:'red',color:'red'})];});
  };
  S.washLandscape = function (x,y,o={}) {
    const at=o.at??0;[0,1,2].forEach(i=>this.path(`M${x-500} ${y+140-i*35} Q${x-230} ${y-300+i*100} ${x} ${y-10-i*40} Q${x+290} ${y-270+i*95} ${x+500} ${y+140-i*35} Z`,{at:at+i*.45,fill:i%2?'blueF':'greenF',color:'none',pen:false}));
    return this.circle(x+260,y-200,130,{at:at+1,fill:'yellow',color:'none',pen:false});
  };
  S.inkMountain = function (x,y,o={}) {
    const at=o.at??0;[0,1,2].forEach(i=>this.path(`M${x-530} ${y+100+i*35} Q${x-130+i*130} ${y-370+i*100} ${x+150} ${y-60+i*60} Q${x+360} ${y-180+i*60} ${x+530} ${y+100+i*35} Z`,{at:at+i*.45,fill:i?'inkF':'softF',color:'ink',sw:3-i*.8,pen:false}));
    return this.text(o.seal||'山水',{x:x+550,y:y-140,w:100,size:40,color:'red',at:at+1.5,mode:'fade'});
  };
  S.vectorBird = function (x,y,o={}) {
    const L=this.layer(),at=o.at??0;
    L.ellipse(x,y,220,140,{at,fill:'blue',color:'none',pen:false});L.circle(x+75,y-62,100,{at,fill:'blue',color:'none',pen:false});
    L.path(`M${x+110} ${y-80} L${x+184} ${y-61} L${x+110} ${y-44} Z`,{at,fill:'orange',color:'none',pen:false});
    L.path(`M${x-65} ${y-25} Q${x+20} ${y-70} ${x+42} ${y+35} Q${x-20} ${y+70} ${x-65} ${y-25} Z`,{at,fill:'purple',color:'none',pen:false});
    L.circle(x+94,y-76,12,{at,fill:'ink',color:'none',pen:false});return L;
  };
  S.mapRoute = function (points,o={}) {
    const at=o.at??0,d=path(points),track=this.pathAt(d),dur=o.dur??4;
    this.path(d,{at,dur,color:'red',sw:4,pen:false,ease:ease.lin});
    const ship=this.layer();ship.path('M-32 0 L32 0 L20 22 L-20 22 Z M0 -58 L0 0 M-4 -48 L-29 -5 L-4 -5 Z',{at:-1,color:'ink',fill:'paper',sw:3,pen:false});
    this.move(ship,t=>{const p=track.at(clamp((t-at)/dur));return {x:p.x,y:p.y,op:t<at?0:1};},[0,0]);return ship;
  };
  S.worldMap = function (o={}) {
    const x=o.x??240,y=o.y??230,w=o.w??1440,h=o.h??600,at=o.at??0;
    const project=([lon,lat])=>[x+(lon+180)/360*w,y+(90-lat)/180*h];
    const L=this.layer();
    for(const ring of window.LAND_OUTLINES)L.path(path(ring.map(project),true),{at,fill:'greenF',color:'ink',sw:1.2,pen:false});
    return {layer:L,project};
  };
})();
