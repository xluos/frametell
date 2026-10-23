# 沿真实海岸航行 · local renderer grammar

世界海岸来自公开地图数据，船只沿路线前进。

## Drawing contract

- Paper #EBDDBC; legible ink #2B1D12. Palette names are literal: red is red, blue is blue, orange is orange. Keep a colour's meaning consistent across the film. Do not remap named colours to the order of a swatch.
- Surface: engraving. The kit is a local implementation, with the source techniques identified in the provenance document.
- The bundled Natural Earth overview omits small islands. Do not invent borders or use it for navigation.
- Use the style kit below to build the subject. It is automatically loaded for preview and export. Reuse one actor/object geometry across pages; move its layer, rather than redrawing it differently each time.

## Available components

- `P.mapRoute(points, o = {})`: A ship traces a historical route; points must come from real map geography. This component does not invent coastlines.
- `P.worldMap(o = {})`: Natural Earth land outlines. o: x,y,w,h,at; returns project([lon,lat]). Small islands omitted; never use for borders or navigation.

## Motion, readability and review

- Tie each meaningful change to the spoken cue using P.c/P.cw. Show the actual transfer, assembly or state change; the spoken cause must be visible.
- Body text at least 36px, labels at least 28px. Keep actors, labels and any camera move within x=180..1740, y=220..880 in landscape. Leave the subtitle area clear. Verify camera crops as well as the static layout.
- Colours, material, recurring actor shape, the mechanism, cropping, overlap, subtitles and deterministic seeking are separate review assertions. Passing a layout check alone does not verify the style.
- Use 45/90-degree bends for metro routes; one continuous stroke for one-line; integer counts with stated units for isotype; real projection and face shading for isometric/instrument/inked. Use only constraints relevant to this style.
- Keep any unsupported visual request explicit in the storyboard and author the missing capability before rendering. A hosted poster or hover clip cannot substitute for a local sample.
