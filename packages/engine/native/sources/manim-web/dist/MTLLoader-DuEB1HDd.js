import { Ft as e, G as t, Kn as n, Ma as r, Qi as i, U as a, Wi as o, _t as s, fr as c, no as l, qn as u } from "./three.core-FQGwh_Lt.js";
//#region node_modules/three/examples/jsm/loaders/MTLLoader.js
var d = class extends n {
	constructor(e) {
		super(e);
	}
	load(t, n, r, i) {
		let a = this, o = this.path === "" ? u.extractUrlBase(t) : this.path, s = new e(this.manager);
		s.setPath(this.path), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(t, function(e) {
			try {
				n(a.parse(e, o));
			} catch (e) {
				i ? i(e) : console.error(e), a.manager.itemError(t);
			}
		}, r, i);
	}
	setMaterialOptions(e) {
		return this.materialOptions = e, this;
	}
	parse(e, t) {
		let n = e.split("\n"), r = {}, i = /\s+/, a = {};
		for (let e = 0; e < n.length; e++) {
			let t = n[e];
			if (t = t.trim(), t.length === 0 || t.charAt(0) === "#") continue;
			let o = t.indexOf(" "), s = o >= 0 ? t.substring(0, o) : t;
			s = s.toLowerCase();
			let c = o >= 0 ? t.substring(o + 1) : "";
			if (c = c.trim(), s === "newmtl") r = { name: c }, a[c] = r;
			else if (s === "ka" || s === "kd" || s === "ks" || s === "ke") {
				let e = c.split(i, 3);
				r[s] = [
					parseFloat(e[0]),
					parseFloat(e[1]),
					parseFloat(e[2])
				];
			} else r[s] = c;
		}
		let o = new f(this.resourcePath || t, this.materialOptions);
		return o.setCrossOrigin(this.crossOrigin), o.setManager(this.manager), o.setMaterials(a), o;
	}
}, f = class {
	constructor(e = "", t = {}) {
		this.baseUrl = e, this.options = t, this.materialsInfo = {}, this.materials = {}, this.materialsArray = [], this.nameLookup = {}, this.crossOrigin = "anonymous", this.side = this.options.side === void 0 ? 0 : this.options.side, this.wrap = this.options.wrap === void 0 ? o : this.options.wrap;
	}
	setCrossOrigin(e) {
		return this.crossOrigin = e, this;
	}
	setManager(e) {
		this.manager = e;
	}
	setMaterials(e) {
		this.materialsInfo = this.convert(e), this.materials = {}, this.materialsArray = [], this.nameLookup = {};
	}
	convert(e) {
		if (!this.options) return e;
		let t = {};
		for (let n in e) {
			let r = e[n], i = {};
			t[n] = i;
			for (let e in r) {
				let t = !0, n = r[e], a = e.toLowerCase();
				switch (a) {
					case "kd":
					case "ka":
					case "ks": this.options && this.options.normalizeRGB && (n = [
						n[0] / 255,
						n[1] / 255,
						n[2] / 255
					]), this.options && this.options.ignoreZeroRGBs && n[0] === 0 && n[1] === 0 && n[2] === 0 && (t = !1);
				}
				t && (i[a] = n);
			}
		}
		return t;
	}
	preload() {
		for (let e in this.materialsInfo) this.create(e);
	}
	getIndex(e) {
		return this.nameLookup[e];
	}
	getAsArray() {
		let e = 0;
		for (let t in this.materialsInfo) this.materialsArray[e] = this.create(t), this.nameLookup[t] = e, e++;
		return this.materialsArray;
	}
	create(e) {
		return this.materials[e] === void 0 && this.createMaterial_(e), this.materials[e];
	}
	createMaterial_(e) {
		let n = this, r = this.materialsInfo[e], o = {
			name: e,
			side: this.side
		};
		function s(e, t) {
			return typeof t != "string" || t === "" ? "" : /^https?:\/\//i.test(t) ? t : e + t;
		}
		function l(e, t) {
			if (o[e]) return;
			let r = n.getTextureParams(t, o), a = n.loadTexture(s(n.baseUrl, r.url));
			a.repeat.copy(r.scale), a.offset.copy(r.offset), a.wrapS = n.wrap, a.wrapT = n.wrap, (e === "map" || e === "emissiveMap") && (a.colorSpace = i), o[e] = a;
		}
		for (let e in r) {
			let n = r[e], s;
			if (n !== "") switch (e.toLowerCase()) {
				case "kd":
					o.color = t.colorSpaceToWorking(new a().fromArray(n), i);
					break;
				case "ks":
					o.specular = t.colorSpaceToWorking(new a().fromArray(n), i);
					break;
				case "ke":
					o.emissive = t.colorSpaceToWorking(new a().fromArray(n), i);
					break;
				case "map_kd":
					l("map", n);
					break;
				case "map_ks":
					l("specularMap", n);
					break;
				case "map_ke":
					l("emissiveMap", n);
					break;
				case "norm":
					l("normalMap", n);
					break;
				case "map_bump":
				case "bump":
					l("bumpMap", n);
					break;
				case "disp":
					l("displacementMap", n);
					break;
				case "map_d":
					l("alphaMap", n), o.transparent = !0;
					break;
				case "ns":
					o.shininess = parseFloat(n);
					break;
				case "d":
					s = parseFloat(n), s < 1 && (o.opacity = s, o.transparent = !0);
					break;
				case "tr": s = parseFloat(n), this.options && this.options.invertTrProperty && (s = 1 - s), s > 0 && (o.opacity = 1 - s, o.transparent = !0);
			}
		}
		return this.materials[e] = new c(o), this.materials[e];
	}
	getTextureParams(e, t) {
		let n = {
			scale: new l(1, 1),
			offset: new l(0, 0)
		}, r = e.split(/\s+/), i;
		return i = r.indexOf("-bm"), i >= 0 && (t.bumpScale = parseFloat(r[i + 1]), r.splice(i, 2)), i = r.indexOf("-mm"), i >= 0 && (t.displacementBias = parseFloat(r[i + 1]), t.displacementScale = parseFloat(r[i + 2]), r.splice(i, 3)), i = r.indexOf("-s"), i >= 0 && (n.scale.set(parseFloat(r[i + 1]), parseFloat(r[i + 2])), r.splice(i, 4)), i = r.indexOf("-o"), i >= 0 && (n.offset.set(parseFloat(r[i + 1]), parseFloat(r[i + 2])), r.splice(i, 4)), n.url = r.join(" ").trim(), n;
	}
	loadTexture(e, t, n, i, a) {
		let o = this.manager === void 0 ? s : this.manager, c = o.getHandler(e);
		c === null && (c = new r(o)), c.setCrossOrigin && c.setCrossOrigin(this.crossOrigin);
		let l = c.load(e, n, i, a);
		return t !== void 0 && (l.mapping = t), l;
	}
};
//#endregion
export { d as MTLLoader };
