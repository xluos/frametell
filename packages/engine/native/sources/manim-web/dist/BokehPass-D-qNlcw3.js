import { n as e, t } from "./Pass-CSHIrJrV.js";
import { Color as n, HalfFloatType as r, MeshDepthMaterial as i, NearestFilter as a, NoBlending as o, RGBADepthPacking as s, ShaderMaterial as c, UniformsUtils as l, WebGLRenderTarget as u } from "three";
//#region node_modules/three/examples/jsm/shaders/BokehShader.js
var d = {
	name: "BokehShader",
	defines: {
		DEPTH_PACKING: 1,
		PERSPECTIVE_CAMERA: 1
	},
	uniforms: {
		tColor: { value: null },
		tDepth: { value: null },
		focus: { value: 1 },
		aspect: { value: 1 },
		aperture: { value: .025 },
		maxblur: { value: .01 },
		nearClip: { value: 1 },
		farClip: { value: 1e3 }
	},
	vertexShader: "\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		#include <common>\n\n		varying vec2 vUv;\n\n		uniform sampler2D tColor;\n		uniform sampler2D tDepth;\n\n		uniform float maxblur; // max blur amount\n		uniform float aperture; // aperture - bigger values for shallower depth of field\n\n		uniform float nearClip;\n		uniform float farClip;\n\n		uniform float focus;\n		uniform float aspect;\n\n		#include <packing>\n\n		float getDepth( const in vec2 screenPosition ) {\n			#if DEPTH_PACKING == 1\n			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );\n			#else\n			return texture2D( tDepth, screenPosition ).x;\n			#endif\n		}\n\n		float getViewZ( const in float depth ) {\n			#if PERSPECTIVE_CAMERA == 1\n			return perspectiveDepthToViewZ( depth, nearClip, farClip );\n			#else\n			return orthographicDepthToViewZ( depth, nearClip, farClip );\n			#endif\n		}\n\n\n		void main() {\n\n			vec2 aspectcorrect = vec2( 1.0, aspect );\n\n			float viewZ = getViewZ( getDepth( vUv ) );\n\n			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation\n\n			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );\n\n			vec2 dofblur9 = dofblur * 0.9;\n			vec2 dofblur7 = dofblur * 0.7;\n			vec2 dofblur4 = dofblur * 0.4;\n\n			vec4 col = vec4( 0.0 );\n\n			col += texture2D( tColor, vUv.xy );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );\n\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );\n\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );\n\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );\n			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );\n			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );\n\n			gl_FragColor = col / 41.0;\n			gl_FragColor.a = 1.0;\n\n		}"
}, f = class extends e {
	constructor(e, f, p) {
		super(), this.scene = e, this.camera = f;
		let m = p.focus === void 0 ? 1 : p.focus, h = p.aperture === void 0 ? .025 : p.aperture, g = p.maxblur === void 0 ? 1 : p.maxblur;
		this._renderTargetDepth = new u(1, 1, {
			minFilter: a,
			magFilter: a,
			type: r
		}), this._renderTargetDepth.texture.name = "BokehPass.depth", this._materialDepth = new i(), this._materialDepth.depthPacking = s, this._materialDepth.blending = o;
		let _ = l.clone(d.uniforms);
		_.tDepth.value = this._renderTargetDepth.texture, _.focus.value = m, _.aspect.value = f.aspect, _.aperture.value = h, _.maxblur.value = g, _.nearClip.value = f.near, _.farClip.value = f.far, this.materialBokeh = new c({
			defines: Object.assign({}, d.defines),
			uniforms: _,
			vertexShader: d.vertexShader,
			fragmentShader: d.fragmentShader
		}), this.uniforms = _, this._fsQuad = new t(this.materialBokeh), this._oldClearColor = new n();
	}
	render(e, t, n) {
		this.scene.overrideMaterial = this._materialDepth, e.getClearColor(this._oldClearColor);
		let r = e.getClearAlpha(), i = e.autoClear;
		e.autoClear = !1, e.setClearColor(16777215), e.setClearAlpha(1), e.setRenderTarget(this._renderTargetDepth), e.clear(), e.render(this.scene, this.camera), this.uniforms.tColor.value = n.texture, this.uniforms.nearClip.value = this.camera.near, this.uniforms.farClip.value = this.camera.far, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), e.clear(), this._fsQuad.render(e)), this.scene.overrideMaterial = null, e.setClearColor(this._oldClearColor), e.setClearAlpha(r), e.autoClear = i;
	}
	setSize(e, t) {
		this.materialBokeh.uniforms.aspect.value = e / t, this._renderTargetDepth.setSize(e, t);
	}
	dispose() {
		this._renderTargetDepth.dispose(), this._materialDepth.dispose(), this.materialBokeh.dispose(), this._fsQuad.dispose();
	}
};
//#endregion
export { f as BokehPass };
