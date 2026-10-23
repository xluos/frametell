# manim-web 0.39.4

`N` exposes manim-web's public browser exports (Scene, MasterTimeline, geometry, Axes, NumberPlane, FunctionGraph, MathTex, Text, Create, Write, Transform, FadeIn, etc). Use original world coordinates and colours. Build a `new N.Scene(container,{width:host.width,height:host.height})` in host.root. Register native animations in a `new N.MasterTimeline()`, then `scene.setTimeline(timeline)`. Return `render: t => N.seek(scene,t)` and `dispose: () => scene.dispose()`; do not use autonomous scene.play() or the Player loop in a frame-driven host.

`timeline.addSegment([animation,...])` appends parallel animations; `timeline.addWaitSegment(seconds)` inserts waits. `MasterTimeline` resets animation states for backwards seeking. The source Scene also exposes setTimeline(timeline), render(), add(...objects), remove(), clear(), and dispose().

MathTex uses `new N.MathTex({latex:'y=x^2',color:'#fff',fontSize:48})`. Await `math.waitForRender()` before measuring or building its animations. Return the promise as `ready`, with render/dispose, so fonts and vector glyphs finish before preview or export. MathJax is bundled locally; CDN script/CSS fallbacks are disabled. The optional Typst WASM compiler, remote models and image/video inputs need their own assets and are outside this bundled mathematical drawing path.

Fixed package distribution and its dependencies are preserved at engine/native/sources/manim-web. The worked example demonstrates asynchronous MathTex, original axes/curve drawing, a native MasterTimeline and random access rendering.

The adapter `N.seek(scene,t)` uses original VGroup copies for MathTex animation snapshots during the native seek, restoring the public copy method immediately afterwards. In 0.39.4, MathTex.copy both clones glyphs and starts another asynchronous glyph render, doubling the snapshot's point count between exported frames. The adapter keeps rendered glyph snapshots synchronous; all geometry, typography and animation still come from manim-web, and the preserved upstream files are unchanged.
