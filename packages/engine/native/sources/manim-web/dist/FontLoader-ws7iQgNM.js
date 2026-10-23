import { Ft as e, Kn as t, aa as n } from "./three.core-FQGwh_Lt.js";
//#region node_modules/three/examples/jsm/loaders/FontLoader.js
var r = class extends t {
	constructor(e) {
		super(e);
	}
	load(t, n, r, i) {
		let a = this, o = new e(this.manager);
		o.setPath(this.path), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(t, function(e) {
			let t = a.parse(JSON.parse(e));
			n && n(t);
		}, r, i);
	}
	parse(e) {
		return new i(e);
	}
}, i = class {
	constructor(e) {
		this.isFont = !0, this.type = "Font", this.data = e;
	}
	generateShapes(e, t = 100, n = "ltr") {
		let r = [], i = a(e, t, this.data, n);
		for (let e = 0, t = i.length; e < t; e++) r.push(...i[e].toShapes());
		return r;
	}
};
function a(e, t, n, r) {
	let i = Array.from(e), a = t / n.resolution, s = (n.boundingBox.yMax - n.boundingBox.yMin + n.underlineThickness) * a, c = [], l = 0, u = 0;
	(r == "rtl" || r == "tb") && i.reverse();
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		if (t === "\n") l = 0, u -= s;
		else {
			let e = o(t, a, l, u, n);
			r == "tb" ? (l = 0, u += n.ascender * a) : l += e.offsetX, c.push(e.path);
		}
	}
	return c;
}
function o(e, t, r, i, a) {
	let o = a.glyphs[e] || a.glyphs["?"];
	if (!o) {
		console.error("THREE.Font: character \"" + e + "\" does not exists in font family " + a.familyName + ".");
		return;
	}
	let s = new n(), c, l, u, d, f, p, m, h;
	if (o.o) {
		let e = o._cachedOutline ||= o.o.split(" ");
		for (let n = 0, a = e.length; n < a;) switch (e[n++]) {
			case "m":
				c = e[n++] * t + r, l = e[n++] * t + i, s.moveTo(c, l);
				break;
			case "l":
				c = e[n++] * t + r, l = e[n++] * t + i, s.lineTo(c, l);
				break;
			case "q":
				u = e[n++] * t + r, d = e[n++] * t + i, f = e[n++] * t + r, p = e[n++] * t + i, s.quadraticCurveTo(f, p, u, d);
				break;
			case "b": u = e[n++] * t + r, d = e[n++] * t + i, f = e[n++] * t + r, p = e[n++] * t + i, m = e[n++] * t + r, h = e[n++] * t + i, s.bezierCurveTo(f, p, m, h, u, d);
		}
	}
	return {
		offsetX: o.ha * t,
		path: s
	};
}
//#endregion
export { i as Font, r as FontLoader };
