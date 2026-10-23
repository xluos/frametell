import { Font as e } from "./FontLoader-BGYs-WAa.js";
import { ExtrudeGeometry as t } from "three";
//#region node_modules/three/examples/jsm/geometries/TextGeometry.js
var n = class n extends t {
	constructor(e, t = {}) {
		let n = t.font;
		if (n === void 0) super();
		else {
			let r = n.generateShapes(e, t.size, t.direction);
			t.depth === void 0 && (t.depth = 50), t.bevelThickness === void 0 && (t.bevelThickness = 10), t.bevelSize === void 0 && (t.bevelSize = 8), t.bevelEnabled === void 0 && (t.bevelEnabled = !1), super(r, t);
		}
		this.type = "TextGeometry";
	}
	toJSON() {
		return super.toJSON();
	}
	static fromJSON(t) {
		let r = t.options;
		return r.font = new e(r.font.data), new n(r.text, r);
	}
};
//#endregion
export { n as TextGeometry };
