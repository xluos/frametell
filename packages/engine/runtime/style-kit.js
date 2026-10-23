/* Runs during HTML parsing, AFTER style.js. Loading is identical on file://, preview and export. */
(function () {
  const root = document.currentScript.src.replace(/runtime\/style-kit\.js(?:\?.*)?$/, '');
  const kit = window.STYLE?.kit;
  if (!kit) return;
  const registered = (window.SCRIPT?.META?.extras || []).some((f) => f.replace(/^engine\//, '') === kit);
  const files = [...new Set([...(STYLE.assets || []), ...(STYLE.renderer?.assets || []), 'runtime/studio-components.js', ...(registered ? [] : [kit])])];
  if (files.some((f) => !/^[a-zA-Z0-9_/-]+\.js$/.test(f) || f.includes('..'))) throw new Error('Invalid style asset path');
  document.write(files.map((f) => `<script src="${root}${f}"><\/script>`).join(''));
})();
