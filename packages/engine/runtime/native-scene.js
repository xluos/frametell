/* A native renderer owns its pixels, palette, camera and compositing. The host only supplies time and a viewport. */
(function () {
  const B = PV.Builder.prototype;
  PV.sceneElements = function query(root, selector) {
    const result = [...root.querySelectorAll(selector)];
    for (const el of root.querySelectorAll('*')) if (el.shadowRoot) result.push(...query(el.shadowRoot, selector));
    return result;
  };
  PV.sceneOpacity = function (element, stop) {
    let opacity = 1;
    for (let el = element; el && el !== stop; el = el.parentElement || el.getRootNode()?.host) {
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return 0;
      opacity *= +style.opacity;
    }
    return opacity;
  };
  PV.scenePixels = function (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // Read a WebGL compositor's presented frame without taking ownership of its context or shader buffers.
    const copy = new OffscreenCanvas(canvas.width, canvas.height), out = copy.getContext('2d');
    out.drawImage(canvas, 0, 0); return out.getImageData(0, 0, canvas.width, canvas.height).data;
  };
  B.nativeScene = function (setup, options = {}) {
    const id = options.renderer || window.STYLE?.renderer?.id;
    const factory = window.NATIVE_FACTORIES?.[id];
    if (!factory) throw new Error(`Native renderer ${id || '(unspecified)'} is unavailable`);
    const width = options.width || window.STYLE?.renderer?.width || 1920, height = options.height || window.STYLE?.renderer?.height || 1080;
    const scale = Math.min(STAGE.w / width, STAGE.h / height);
    const mount = document.createElement('div');
    mount.className = 'native-scene'; mount.dataset.renderer = id;
    Object.assign(mount.style, { position: 'absolute', left: (STAGE.w-width*scale)/2+'px', top: (STAGE.h-height*scale)/2+'px', width: width + 'px', height: height + 'px', transformOrigin: '0 0', transform: `scale(${scale})`, isolation: 'isolate' });
    this.host.appendChild(mount);
    // Keep native CSS and element ids inside this scene; original modules may look up their own canvas by id.
    const root = mount.attachShadow({ mode: 'open' });
    const resources = [];
    const scopedDocument = new Proxy(document, { get(target, key) {
      if (key === 'getElementById') return id => root.getElementById(id);
      if (key === 'querySelector' || key === 'querySelectorAll') return selector => root[key](selector);
      if (key === 'body') return root;
      const value = Reflect.get(target, key, target);
      return typeof value === 'function' ? value.bind(target) : value;
    } });
    const host = {
      root, width, height,
      canvas(type = '2d', id = '') {
        const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
        if (id) canvas.id = id;
        Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' }); root.appendChild(canvas);
        if (type === '2d') canvas.getContext('2d');
        resources.push(canvas); return canvas;
      },
      style(css) { const el = document.createElement('style'); el.textContent = css; root.appendChild(el); },
      svg(viewBox = `0 0 ${width} ${height}`) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', viewBox); svg.setAttribute('width', width); svg.setAttribute('height', height); root.appendChild(svg); return svg;
      },
      at: (i, dt = 0) => this.c(i, dt), word: (i, word, dt = 0) => this.cw(i, word, dt),
      duration: this.page.end - this.page.start,
    };
    let scene;
    try {
      const api = factory({ document: scopedDocument });
      scene = setup(api, host);
      if (typeof scene === 'function') scene = { render: scene };
      if (typeof scene?.render !== 'function') throw new Error('nativeScene setup must return render(time) or {render(time), dispose?}');
    } catch (e) { mount.remove(); throw e; }
    this.sh.native = { renderer: id, transition: options.transition || 'cut' };
    if (scene.ready) (this.sh.ready ??= []).push(Promise.resolve(scene.ready));
    this.sh.disposers ??= [];
    this.sh.disposers.push(() => {
      try { scene.dispose?.(); } finally {
        for (const canvas of new Set([...resources, ...root.querySelectorAll('canvas')])) {
          // A context is cached by browsers; querying a different type simply returns null.
          const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
          gl?.getExtension('WEBGL_lose_context')?.loseContext();
          canvas.width = canvas.height = 1;
        }
        mount.remove();
      }
    });
    this.tick((local, global) => scene.render(local, { global, duration: host.duration }));
    return mount;
  };
})();
