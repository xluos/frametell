import { n as e, t } from "./Pass-CSHIrJrV.js";
import { ACESFilmicToneMapping as n, AgXToneMapping as r, CineonToneMapping as i, ColorManagement as a, CustomToneMapping as o, LinearToneMapping as s, NeutralToneMapping as c, RawShaderMaterial as l, ReinhardToneMapping as u, SRGBTransfer as d, UniformsUtils as f } from "three";
//#region node_modules/three/examples/jsm/shaders/OutputShader.js
var p = {
	name: "OutputShader",
	uniforms: {
		tDiffuse: { value: null },
		toneMappingExposure: { value: 1 }
	},
	vertexShader: "\n		precision highp float;\n\n		uniform mat4 modelViewMatrix;\n		uniform mat4 projectionMatrix;\n\n		attribute vec3 position;\n		attribute vec2 uv;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		precision highp float;\n\n		uniform sampler2D tDiffuse;\n\n		#include <tonemapping_pars_fragment>\n		#include <colorspace_pars_fragment>\n\n		varying vec2 vUv;\n\n		void main() {\n\n			gl_FragColor = texture2D( tDiffuse, vUv );\n\n			// tone mapping\n\n			#ifdef LINEAR_TONE_MAPPING\n\n				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n\n			#elif defined( REINHARD_TONE_MAPPING )\n\n				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n\n			#elif defined( CINEON_TONE_MAPPING )\n\n				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n\n			#elif defined( ACES_FILMIC_TONE_MAPPING )\n\n				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n\n			#elif defined( AGX_TONE_MAPPING )\n\n				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n\n			#elif defined( NEUTRAL_TONE_MAPPING )\n\n				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n\n			#elif defined( CUSTOM_TONE_MAPPING )\n\n				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n\n			#endif\n\n			// color space\n\n			#ifdef SRGB_TRANSFER\n\n				gl_FragColor = sRGBTransferOETF( gl_FragColor );\n\n			#endif\n\n		}"
}, m = class extends e {
	constructor() {
		super(), this.isOutputPass = !0, this.uniforms = f.clone(p.uniforms), this.material = new l({
			name: p.name,
			uniforms: this.uniforms,
			vertexShader: p.vertexShader,
			fragmentShader: p.fragmentShader
		}), this._fsQuad = new t(this.material), this._outputColorSpace = null, this._toneMapping = null;
	}
	render(e, t, l) {
		this.uniforms.tDiffuse.value = l.texture, this.uniforms.toneMappingExposure.value = e.toneMappingExposure, (this._outputColorSpace !== e.outputColorSpace || this._toneMapping !== e.toneMapping) && (this._outputColorSpace = e.outputColorSpace, this._toneMapping = e.toneMapping, this.material.defines = {}, a.getTransfer(this._outputColorSpace) === d && (this.material.defines.SRGB_TRANSFER = ""), this._toneMapping === s ? this.material.defines.LINEAR_TONE_MAPPING = "" : this._toneMapping === u ? this.material.defines.REINHARD_TONE_MAPPING = "" : this._toneMapping === i ? this.material.defines.CINEON_TONE_MAPPING = "" : this._toneMapping === n ? this.material.defines.ACES_FILMIC_TONE_MAPPING = "" : this._toneMapping === r ? this.material.defines.AGX_TONE_MAPPING = "" : this._toneMapping === c ? this.material.defines.NEUTRAL_TONE_MAPPING = "" : this._toneMapping === o && (this.material.defines.CUSTOM_TONE_MAPPING = ""), this.material.needsUpdate = !0), this.renderToScreen === !0 ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
	}
	dispose() {
		this.material.dispose(), this._fsQuad.dispose();
	}
};
//#endregion
export { m as OutputPass };
