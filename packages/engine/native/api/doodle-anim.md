# doodle-anim

Original Canvas 2D engine and character APIs, extracted from the preserved upstream HTML without its demo boot/player. `N.CrowdScene`, `N.Human`, `N.Blob`, `N.Ghost`, `N.Pet`, `N.Weirdo`, `N.Oddhead`, `N.DoodleChar`, `N.RNG`, `N.mulberry32`, `N.hashStr`, `N.STORIES`, `N.poseAt` are original upstream definitions, not Frametell drawing primitives.

`new N.CrowdScene({width,height,seed,count,duration,story,mix,rosterKind})` constructs paper and seeded characters. `scene.render(ctx, timeSeconds)` paints the original characters and camera. It is a pure function of time. Author custom actors/timelines through `scene.chars`, each actor's `tl` and `emotes`, or use the original character classes. The whole source is at `engine/native/sources/doodle-anim/templates/doodle.html` (especially CrowdScene, buildStory, buildCrowd, Human, and poseAt). Do not use Frametell's old mascot/bear kit.

The source canvas is 1280 x 720, automatically fitted by the native host. The native scene's returned render function must explicitly call the source's render(ctx,t). Characters, colours, skin, jitter, expressions and seeded paper remain controlled by the original engine. Use a stable seed per recurring actor and build a story corresponding to the narration.
