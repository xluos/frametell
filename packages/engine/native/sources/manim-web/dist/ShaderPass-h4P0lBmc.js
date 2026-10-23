import { n as e, t } from "./Pass-CSHIrJrV.js";
import { ShaderMaterial as n, UniformsUtils as r } from "three";
//#region node_modules/three/examples/jsm/postprocessing/ShaderPass.js
var i = class extends e {
	constructor(e, i = "tDiffuse") {
		super(), this.textureID = i, this.uniforms = null, this.material = null, e instanceof n ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = r.clone(e.uniforms), this.material = new n({
			name: e.name === void 0 ? "unspecified" : e.name,
			defines: Object.assign({}, e.defines),
			uniforms: this.uniforms,
			vertexShader: e.vertexShader,
			fragmentShader: e.fragmentShader
		})), this._fsQuad = new t(this.material);
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
