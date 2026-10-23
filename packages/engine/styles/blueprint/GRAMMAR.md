# 把尺寸说清楚 · local renderer grammar

外轮廓与尺寸引线分开，读数落在物件旁。

## Drawing contract

- Paper #0F3B78; legible ink #F2F7FF. Palette names are literal: red is red, blue is blue, orange is orange. Keep a colour's meaning consistent across the film. Do not remap named colours to the order of a swatch.
- Surface: flat. The kit is a local implementation, with the source techniques identified in the provenance document.
- Only promise what the components below can draw. The hosted catalogue is a reference, not a complete implementation shipped in this fork.
- Use the style kit below to build the subject. It is automatically loaded for preview and export. Reuse one actor/object geometry across pages; move its layer, rather than redrawing it differently each time.

## Available components

- `P.dimension(x, y, w, label, o = {})`: Engineering extension lines and opposed dimension arrows. o: color,at.

## Motion, readability and review

- Tie each meaningful change to the spoken cue using P.c/P.cw. Show the actual transfer, assembly or state change; the spoken cause must be visible.
- Body text at least 36px, labels at least 28px. Keep actors, labels and any camera move within x=180..1740, y=220..880 in landscape. Leave the subtitle area clear. Verify camera crops as well as the static layout.
- Colours, material, recurring actor shape, the mechanism, cropping, overlap, subtitles and deterministic seeking are separate review assertions. Passing a layout check alone does not verify the style.
- Use 45/90-degree bends for metro routes; one continuous stroke for one-line; integer counts with stated units for isotype; real projection and face shading for isometric/instrument/inked. Use only constraints relevant to this style.
- Keep any unsupported visual request explicit in the storyboard and author the missing capability before rendering. A hosted poster or hover clip cannot substitute for a local sample.
