# 纸齿接住蜡笔 · local renderer grammar

蜡笔随笔压沉下去，颜色来回涂过纸纹。

## Drawing contract

- Paper #F8F0DD; legible ink #2D3263. Palette names are literal: red is red, blue is blue, orange is orange. Keep a colour's meaning consistent across the film. Do not remap named colours to the order of a swatch.
- Surface: crayon. The kit includes a native source adapter; see the provenance document for exactly what was imported.
- Only promise what the components below can draw. The hosted catalogue is a reference, not a complete implementation shipped in this fork.
- Use the style kit below to build the subject. It is automatically loaded for preview and export. Reuse one actor/object geometry across pages; move its layer, rather than redrawing it differently each time.

## Available components

- `P.crayonScene(draw, o = {})`: Native Lemo pressure/ribbon/zigzag wax renderer and paper-tooth composition. draw(D,t) per page; D.line(points,{color,sw,draw,seed}), D.fill(polygon,{color,sw,draw,seed,cross}), D.circle(x,y,r,{color,fill,sw}), D.text(text,x,y,{color,size}). Use a single scene per page. o: at,dur.
- `D.text(text,x,y,q)`: x is already the horizontal centre by default; y is the alphabetic baseline. Do not subtract half the text width again. `align:'left'|'right'` explicitly changes the x anchor.
- For a number with an enclosing ring or underline, use `D.label(text,cx,cy,{size,ring:true,underline:true,rx,ry,markDraw})`. cx/cy is one visual centre for the text and both annotations; the helper measures the glyphs to set the baseline. `markDraw` animates annotations independently of the text; `ringDraw` and `underlineDraw` give the two strokes separate reveal times. A closed unfilled ellipse or short horizontal line is checked against the single nearby label once fully revealed. Set `decorative:true` only for strokes that do not annotate text.

## Motion, readability and review

- Tie each meaningful change to the spoken cue using P.c/P.cw. Show the actual transfer, assembly or state change; the spoken cause must be visible.
- Body text at least 36px, labels at least 28px. Keep actors, labels and any camera move within x=180..1740, y=220..880 in landscape. Leave the subtitle area clear. Verify camera crops as well as the static layout.
- Colours, material, recurring actor shape, the mechanism, cropping, overlap, subtitles and deterministic seeking are separate review assertions. Passing a layout check alone does not verify the style.
- Use 45/90-degree bends for metro routes; one continuous stroke for one-line; integer counts with stated units for isotype; real projection and face shading for isometric/instrument/inked. Use only constraints relevant to this style.
- Keep any unsupported visual request explicit in the storyboard and author the missing capability before rendering. A hosted poster or hover clip cannot substitute for a local sample.
