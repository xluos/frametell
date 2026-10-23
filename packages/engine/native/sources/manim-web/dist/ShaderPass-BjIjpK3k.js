import { qa as e, ta as t } from "./three.core-FQGwh_Lt.js";
import { n, t as r } from "./Pass-BzNVLB2_.js";
//#region node_modules/three/examples/jsm/postprocessing/ShaderPass.js
var i = class extends n {
	constructor(n, i = "tDiffuse") {
		super(), this.textureID = i, this.uniforms = null, this.material = null, n instanceof t ? (this.uniforms = n.uniforms, this.material = n) : n && (this.uniforms = e.clone(n.uniforms), this.material = new t({
			name: n.name === void 0 ? "unspecified" : n.name,
			defines: Object.assign({}, n.defines),
			uniforms: this.uniforms,
			vertexShader: n.vertexShader,
			fragmentShader: n.fragmentShader
		})), this._fsQuad = new r(this.material);
	}
	render(e, t, n) {
		this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this._fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
	}
	dispose() {
		this.material.dispose(), this._fsQuad.dispose();
	}
};
//#endregion
export { i as ShaderPass };
