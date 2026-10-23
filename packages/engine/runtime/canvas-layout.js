/* Actual Canvas glyph bounds and annotation geometry, rebuilt on every render. No OCR or time-dependent state. */
(function () {
  const bounds = pts => ({ x0: Math.min(...pts.map(p => p[0])), y0: Math.min(...pts.map(p => p[1])), x1: Math.max(...pts.map(p => p[0])), y1: Math.max(...pts.map(p => p[1])) });
  const transform = (ctx, pts) => { const m = ctx.getTransform(); return pts.map(([x,y]) => [m.a*x+m.c*y+m.e, m.b*x+m.d*y+m.f]); };
  const union = items => bounds(items.flatMap(b => [[b.x0,b.y0],[b.x1,b.y1]]));
  PV.CanvasLayout = {
    install(canvas, ctx) {
      const state = canvas.__layout = { texts: [], marks: [] };
      let group, curves = [], filled = false, mixed = false;
      const visible = () => ctx.globalAlpha >= .5;
      const reset = () => { state.texts = []; state.marks = []; curves = []; group = undefined; filled = mixed = false; };
      for (const method of ['fillText', 'strokeText']) {
        const draw = ctx[method].bind(ctx);
        ctx[method] = function (txt, x, y, maxWidth) {
          const result = maxWidth === undefined ? draw(txt,x,y) : draw(txt,x,y,maxWidth);
          if (!visible() || !String(txt).trim()) return result;
          const m = ctx.measureText(txt), scale = maxWidth && m.width > maxWidth ? maxWidth/m.width : 1;
          const b = bounds(transform(ctx, [[x-m.actualBoundingBoxLeft*scale,y-m.actualBoundingBoxAscent], [x+m.actualBoundingBoxRight*scale,y-m.actualBoundingBoxAscent], [x+m.actualBoundingBoxRight*scale,y+m.actualBoundingBoxDescent], [x-m.actualBoundingBoxLeft*scale,y+m.actualBoundingBoxDescent]]));
          const item = { ...b, txt: String(txt), complete: true };
          const into = group ? group.items : state.texts;
          if (!into.some(a => a.txt === item.txt && Math.abs(a.x0-b.x0)<.1 && Math.abs(a.y0-b.y0)<.1)) into.push(item);
          return result;
        };
      }
      const wrap = (method, before) => { const draw = ctx[method].bind(ctx); ctx[method] = function (...args) { before(...args); return draw(...args); }; };
      wrap('beginPath', () => { curves = []; filled = mixed = false; });
      for (const method of ['lineTo', 'bezierCurveTo', 'quadraticCurveTo', 'rect', 'roundRect']) wrap(method, () => { mixed = true; });
      wrap('fill', () => { filled = true; });
      wrap('ellipse', (x,y,rx,ry,r,a,b,ccw) => {
        const sweep = ccw ? a-b : b-a;
        if (sweep < Math.PI*2-1e-4) { mixed = true; return; }
        const pts = Array.from({length:65}, (_,i) => { const t=i/64*Math.PI*2; return [x+rx*Math.cos(t)*Math.cos(r)-ry*Math.sin(t)*Math.sin(r),y+rx*Math.cos(t)*Math.sin(r)+ry*Math.sin(t)*Math.cos(r)]; });
        curves.push(bounds(transform(ctx,pts)));
      });
      wrap('arc', (x,y,r,a,b,ccw) => {
        if ((ccw ? a-b : b-a) < Math.PI*2-1e-4) { mixed = true; return; }
        curves.push(bounds(transform(ctx, Array.from({length:65},(_,i)=>[x+r*Math.cos(i/64*Math.PI*2),y+r*Math.sin(i/64*Math.PI*2)]))));
      });
      wrap('stroke', (...args) => { if (!args.length && visible() && !filled && !mixed && curves.length === 1) state.marks.push({...curves[0], kind:'ring'}); });
      ctx.__layout = {
        reset,
        label(txt, draw, complete = true) {
          const prior = group, capture = group = {items:[]};
          try { return draw(); } finally {
            group = prior;
            if (capture.items.length) (prior ? prior.items : state.texts).push({...union(capture.items), txt:String(txt), complete});
          }
        },
        // Only near-elliptical closed outlines and short horizontal strokes are annotation candidates.
        mark(pts, q = {}, kind) {
          if (!visible() || (q.draw ?? 1) < .98 || q.decorative || q.fill || pts.length < 2) return;
          const b = bounds(pts), w=b.x1-b.x0, h=b.y1-b.y0;
          if (!kind) {
            if (pts.length === 2 && w > 24 && h <= Math.max(3,w*.025)) kind='underline';
            else if (pts.length >= 12 && w > 20 && h > 20 && Math.hypot(pts[0][0]-pts.at(-1)[0],pts[0][1]-pts.at(-1)[1]) < Math.min(w,h)*.08) {
              const cx=(b.x0+b.x1)/2,cy=(b.y0+b.y1)/2;
              if (pts.every(([x,y])=>Math.abs(Math.hypot((x-cx)/(w/2),(y-cy)/(h/2))-1)<.15)) kind='ring';
            }
          }
          if (kind) state.marks.push({...bounds(transform(ctx,pts)),kind});
        },
      };
      return ctx.__layout;
    },
    // Pair a mark with exactly one complete label; diagrams with several labels stay for visual review.
    pairs(layout) {
      const pairs=[];
      for (const mark of layout?.marks ?? []) {
        const mx=(mark.x0+mark.x1)/2,my=(mark.y0+mark.y1)/2,mw=mark.x1-mark.x0,mh=mark.y1-mark.y0;
        const candidates=(layout.texts ?? []).filter(b=>{
          const x=(b.x0+b.x1)/2,y=(b.y0+b.y1)/2,w=b.x1-b.x0,h=b.y1-b.y0;
          if (mw > Math.max(w*4,180)) return false;
          return mark.kind==='ring' ? mh <= Math.max(h*5,140) && Math.hypot((x-mx)/(mw/2),(y-my)/(mh/2))<1
            : my-b.y1 >= -3 && my-b.y1 <= Math.max(24,h*.7) && Math.min(b.x1,mark.x1)-Math.max(b.x0,mark.x0)>Math.min(w,mw)*.35;
        });
        if (candidates.length!==1 || !candidates[0].complete) continue;
        const text=candidates[0],dx=(text.x0+text.x1)/2-mx,dy=mark.kind==='ring' ? (text.y0+text.y1)/2-my : 0;
        const tolerance=Math.max(6,(mark.kind==='ring' ? Math.min(mw,mh) : mw)*.06);
        pairs.push({mark,text,dx,dy,tolerance});
      }
      return pairs;
    },
  };
})();
