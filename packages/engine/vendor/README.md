# engine/vendor

ESM-only libraries are bundled with esbuild into **IIFEs that set a global**, and projects reference them by name in `META.vendor` (`vendor: ['three']` → `vendor/three.js`, global `THREE`).

Style adapters can also declare classic-script paths in `STYLE.assets`. `runtime/style-kit.js` loads those dependencies before the style's components, including when `META.extras` explicitly requests its kit. The crayon, toon, burin, Anatomy, Colorfigures, PAINT and land adapters use this route. Their fixed sources, licences and adaptation boundaries are recorded in [the provenance report](../../../docs/style-sources.zh-CN.md); licences are retained in `licenses/`.

Not ES modules with an import map: pages are opened over file://, and Chromium blocks every module script there through CORS (origin null), so neither the preview nor the render could load them (tested 2026-10-08).

To rebuild (when upgrading, or edit the entry to add addons):

```bash
cd packages/engine && npx esbuild vendor/three.entry.mjs --bundle --format=iife --global-name=THREE --minify --outfile=vendor/three.js
```
