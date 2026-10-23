/* Generated from pinned sources; see native/sources.json and each source LICENSE. */
(window.NATIVE_FACTORIES ||= {})["nf-metro"] = function(environment = {}) {
const document = environment.document || globalThis.document;
var NativeModule = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/engine/native/nf-metro.entry.js
  var nf_metro_entry_exports = {};
  __export(nf_metro_entry_exports, {
    mount: () => mount
  });
  function mount(host, source) {
    const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
    if (parsed.querySelector("parsererror") || parsed.documentElement.localName !== "svg") throw new Error("nf-metro: invalid SVG; compile the .mmd with engine/tools/native-metro.mjs");
    const svg = document.importNode(parsed.documentElement, true);
    svg.setAttribute("width", host.width);
    svg.setAttribute("height", host.height);
    svg.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    host.root.appendChild(svg);
    svg.pauseAnimations();
    return { render(t) {
      svg.setCurrentTime(Math.max(0, t));
    }, dispose() {
      svg.remove();
    } };
  }
  return __toCommonJS(nf_metro_entry_exports);
})();

return NativeModule;
};
