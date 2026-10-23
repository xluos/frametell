import { U as e, Yt as t, do as n, no as r, or as i, qa as a, ro as o, ta as s } from "./three.core-FQGwh_Lt.js";
import { n as c, t as l } from "./Pass-BzNVLB2_.js";
import { t as u } from "./CopyShader-C2Oc7n1P.js";
//#region node_modules/three/examples/jsm/shaders/LuminosityHighPassShader.js
var d = {
	name: "LuminosityHighPassShader",
	uniforms: {
		tDiffuse: { value: null },
		luminosityThreshold: { value: 1 },
		smoothWidth: { value: 1 },
		defaultColor: { value: new e(0) },
		defaultOpacity: { value: 0 }
	},
	vertexShader: "\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		uniform sampler2D tDiffuse;\n		uniform vec3 defaultColor;\n		uniform float defaultOpacity;\n		uniform float luminosityThreshold;\n		uniform float smoothWidth;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vec4 texel = texture2D( tDiffuse, vUv );\n\n			float v = luminance( texel.xyz );\n\n			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n			gl_FragColor = mix( outputColor, texel, alpha );\n\n		}"
}, f = class f extends c {
	constructor(c, f = 1, p, m) {
		super(), this.strength = f, this.radius = p, this.threshold = m, this.resolution = c === void 0 ? new r(256, 256) : new r(c.x, c.y), this.clearColor = new e(0, 0, 0), this.needsSwap = !1, this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
		let h = Math.round(this.resolution.x / 2), g = Math.round(this.resolution.y / 2);
		this.renderTargetBright = new n(h, g, {
			type: t,
			depthBuffer: !1
		}), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
		for (let e = 0; e < this.nMips; e++) {
			let r = new n(h, g, {
				type: t,
				depthBuffer: !1
			});
			r.texture.name = "UnrealBloomPass.h" + e, r.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(r);
			let i = new n(h, g, {
				type: t,
				depthBuffer: !1
			});
			i.texture.name = "UnrealBloomPass.v" + e, i.texture.generateMipmaps = !1, this.renderTargetsVertical.push(i), h = Math.round(h / 2), g = Math.round(g / 2);
		}
		let _ = d;
		this.highPassUniforms = a.clone(_.uniforms), this.highPassUniforms.luminosityThreshold.value = m, this.highPassUniforms.smoothWidth.value = .01, this.materialHighPassFilter = new s({
			uniforms: this.highPassUniforms,
			vertexShader: _.vertexShader,
			fragmentShader: _.fragmentShader
		}), this.separableBlurMaterials = [];
		let v = [
			6,
			10,
			14,
			18,
			22
		];
		h = Math.round(this.resolution.x / 2), g = Math.round(this.resolution.y / 2);
		for (let e = 0; e < this.nMips; e++) this.separableBlurMaterials.push(this._getSeparableBlurMaterial(v[e])), this.separableBlurMaterials[e].uniforms.invSize.value = new r(1 / h, 1 / g), h = Math.round(h / 2), g = Math.round(g / 2);
		this.compositeMaterial = this._getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = f, this.compositeMaterial.uniforms.bloomRadius.value = .1;
		let y = [
			1,
			.8,
			.6,
			.4,
			.2
		];
		this.compositeMaterial.uniforms.bloomFactors.value = y, this.bloomTintColors = [
			new o(1, 1, 1),
			new o(1, 1, 1),
			new o(1, 1, 1),
			new o(1, 1, 1),
			new o(1, 1, 1)
		], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, this.copyUniforms = a.clone(u.uniforms), this.blendMaterial = new s({
			uniforms: this.copyUniforms,
			vertexShader: u.vertexShader,
			fragmentShader: u.fragmentShader,
			premultipliedAlpha: !0,
			blending: 2,
			depthTest: !1,
			depthWrite: !1,
			transparent: !0
		}), this._oldClearColor = new e(), this._oldClearAlpha = 1, this._basic = new i(), this._fsQuad = new l(null);
	}
	dispose() {
		for (let e = 0; e < this.renderTargetsHorizontal.length; e++) this.renderTargetsHorizontal[e].dispose();
		for (let e = 0; e < this.renderTargetsVertical.length; e++) this.renderTargetsVertical[e].dispose();
		this.renderTargetBright.dispose();
		for (let e = 0; e < this.separableBlurMaterials.length; e++) this.separableBlurMaterials[e].dispose();
		this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this._basic.dispose(), this._fsQuad.dispose();
	}
	setSize(e, t) {
		let n = Math.round(e / 2), i = Math.round(t / 2);
		this.renderTargetBright.setSize(n, i);
		for (let e = 0; e < this.nMips; e++) this.renderTargetsHorizontal[e].setSize(n, i), this.renderTargetsVertical[e].setSize(n, i), this.separableBlurMaterials[e].uniforms.invSize.value = new r(1 / n, 1 / i), n = Math.round(n / 2), i = Math.round(i / 2);
	}
	render(e, t, n, r, i) {
		e.getClearColor(this._oldClearColor), this._oldClearAlpha = e.getClearAlpha();
		let a = e.autoClear;
		e.autoClear = !1, e.setClearColor(this.clearColor, 0), i && e.state.buffers.stencil.setTest(!1), this.renderToScreen && (this._fsQuad.material = this._basic, this._basic.map = n.texture, e.setRenderTarget(null), e.clear(), this._fsQuad.render(e)), this.highPassUniforms.tDiffuse.value = n.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this._fsQuad.material = this.materialHighPassFilter, e.setRenderTarget(this.renderTargetBright), e.clear(), this._fsQuad.render(e);
		let o = this.renderTargetBright;
		for (let t = 0; t < this.nMips; t++) this._fsQuad.material = this.separableBlurMaterials[t], this.separableBlurMaterials[t].uniforms.colorTexture.value = o.texture, this.separableBlurMaterials[t].uniforms.direction.value = f.BlurDirectionX, e.setRenderTarget(this.renderTargetsHorizontal[t]), e.clear(), this._fsQuad.render(e), this.separableBlurMaterials[t].uniforms.colorTexture.value = this.renderTargetsHorizontal[t].texture, this.separableBlurMaterials[t].uniforms.direction.value = f.BlurDirectionY, e.setRenderTarget(this.renderTargetsVertical[t]), e.clear(), this._fsQuad.render(e), o = this.renderTargetsVertical[t];
		this._fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, e.setRenderTarget(this.renderTargetsHorizontal[0]), e.clear(), this._fsQuad.render(e), this._fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, i && e.state.buffers.stencil.setTest(!0), this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(n), this._fsQuad.render(e)), e.setClearColor(this._oldClearColor, this._oldClearAlpha), e.autoClear = a;
	}
	_getSeparableBlurMaterial(e) {
		let t = [], n = e / 3;
		for (let r = 0; r < e; r++) t.push(.39894 * Math.exp(-.5 * r * r / (n * n)) / n);
		let i = [], a = [];
		for (let n = 1; n < e; n += 2) {
			let r = t[n], o = n + 1 < e ? t[n + 1] : 0, s = r + o;
			i.push((n * r + (n + 1) * o) / s), a.push(s);
		}
		return new s({
			defines: { KERNEL_PAIRS: i.length },
			uniforms: {
				colorTexture: { value: null },
				invSize: { value: new r(.5, .5) },
				direction: { value: new r(.5, .5) },
				centerWeight: { value: t[0] },
				gaussianOffsets: { value: i },
				gaussianWeights: { value: a }
			},
			vertexShader: "\n\n				varying vec2 vUv;\n\n				void main() {\n\n					vUv = uv;\n					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n				}",
			fragmentShader: "\n\n				#include <common>\n\n				varying vec2 vUv;\n\n				uniform sampler2D colorTexture;\n				uniform vec2 invSize;\n				uniform vec2 direction;\n				uniform float centerWeight;\n				uniform float gaussianOffsets[KERNEL_PAIRS];\n				uniform float gaussianWeights[KERNEL_PAIRS];\n\n				void main() {\n\n					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;\n\n					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {\n\n						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];\n						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;\n						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;\n						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];\n\n					}\n\n					gl_FragColor = vec4( diffuseSum, 1.0 );\n\n				}"
		});
	}
	_getCompositeMaterial(e) {
		return new s({
			defines: { NUM_MIPS: e },
			uniforms: {
				blurTexture1: { value: null },
				blurTexture2: { value: null },
				blurTexture3: { value: null },
				blurTexture4: { value: null },
				blurTexture5: { value: null },
				bloomStrength: { value: 1 },
				bloomFactors: { value: null },
				bloomTintColors: { value: null },
				bloomRadius: { value: 0 }
			},
			vertexShader: "\n\n				varying vec2 vUv;\n\n				void main() {\n\n					vUv = uv;\n					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n				}",
			fragmentShader: "\n\n				varying vec2 vUv;\n\n				uniform sampler2D blurTexture1;\n				uniform sampler2D blurTexture2;\n				uniform sampler2D blurTexture3;\n				uniform sampler2D blurTexture4;\n				uniform sampler2D blurTexture5;\n				uniform float bloomStrength;\n				uniform float bloomRadius;\n				uniform float bloomFactors[NUM_MIPS];\n				uniform vec3 bloomTintColors[NUM_MIPS];\n\n				float lerpBloomFactor( const in float factor ) {\n\n					float mirrorFactor = 1.2 - factor;\n					return mix( factor, mirrorFactor, bloomRadius );\n\n				}\n\n				void main() {\n\n					// 3.0 for backwards compatibility with previous alpha-based intensity\n					vec3 bloom = 3.0 * bloomStrength * (\n						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb\n					);\n\n					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );\n					gl_FragColor = vec4( bloom, bloomAlpha );\n\n				}"
		});
	}
};
f.BlurDirectionX = new r(1, 0), f.BlurDirectionY = new r(0, 1);
//#endregion
export { f as UnrealBloomPass };
