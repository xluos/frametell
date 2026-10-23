import { a as e, i as t, n, r, t as i } from "./wasm-D04jJNiT.js";
//#region node_modules/@myriaddreamin/typst.ts/dist/esm/options.init.mjs
var a = [
	"DejaVuSansMono-Bold.ttf",
	"DejaVuSansMono-BoldOblique.ttf",
	"DejaVuSansMono-Oblique.ttf",
	"DejaVuSansMono.ttf",
	"LibertinusSerif-Bold.otf",
	"LibertinusSerif-BoldItalic.otf",
	"LibertinusSerif-Italic.otf",
	"LibertinusSerif-Regular.otf",
	"LibertinusSerif-Semibold.otf",
	"LibertinusSerif-SemiboldItalic.otf",
	"NewCM10-Bold.otf",
	"NewCM10-BoldItalic.otf",
	"NewCM10-Italic.otf",
	"NewCM10-Regular.otf",
	"NewCMMath-Bold.otf",
	"NewCMMath-Book.otf",
	"NewCMMath-Regular.otf"
], o = [
	"InriaSerif-Bold.ttf",
	"InriaSerif-BoldItalic.ttf",
	"InriaSerif-Italic.ttf",
	"InriaSerif-Regular.ttf",
	"Roboto-Regular.ttf",
	"NotoSerifCJKsc-Regular.otf"
], s = ["TwitterColorEmoji.ttf", "NotoColorEmoji-Regular-COLR.subset.ttf"];
function c() {
	return d([], { assets: !1 });
}
function l(e) {
	return d([], e);
}
function u(e) {
	let t = [];
	if (e && e?.assets !== !1 && e?.assets?.length && e?.assets?.length > 0) {
		let n = {
			text: "https://cdn.jsdelivr.net/gh/typst/typst-assets@v0.13.1/files/fonts/",
			_: "https://cdn.jsdelivr.net/gh/typst/typst-dev-assets@v0.13.1/files/fonts/"
		}, r = e.assetUrlPrefix ?? n;
		r = typeof r == "string" ? { _: r } : {
			...n,
			...r
		};
		for (let e of Object.keys(r)) {
			let t = r[e];
			t[t.length - 1] !== "/" && (r[e] = t + "/");
		}
		let i = (e, t) => t.map((t) => (r[e] || r._) + t);
		for (let n of e.assets) switch (n) {
			case "text":
				t.push(...i(n, a));
				break;
			case "cjk":
				t.push(...i(n, o));
				break;
			case "emoji": t.push(...i(n, s));
		}
	}
	return t;
}
function d(e, t) {
	let n = u(t), r = async (r, { ref: i, builder: a }) => {
		t?.fetcher && i.setFetcher(t.fetcher), await i.loadFonts(a, [...e, ...n]);
	};
	return r._preloadRemoteFontOptions = t, r._kind = "fontLoader", r;
}
function f(e) {
	return async (t, { builder: n }) => new Promise((t) => {
		n.set_package_registry(e, function(t) {
			return e.resolve(t, this);
		}), t();
	});
}
function p(e) {
	return async (t, n) => {
		if (n.alreadySetAccessModel) throw Error(`already set some assess model before: ${n.alreadySetAccessModel.constructor?.name}(${n.alreadySetAccessModel})`);
		return n.alreadySetAccessModel = e, new Promise((t) => {
			n.builder.set_access_model(e, (t) => {
				let n = e.getMTime(t);
				return n ? n.getTime() : 0;
			}, (t) => e.isFile(t) || !1, (t) => e.getRealPath(t) || t, (t) => e.readAll(t)), t();
		});
	};
}
//#endregion
//#region node_modules/@myriaddreamin/typst.ts/dist/esm/compiler.mjs
var m;
(function(e) {
	e[e.vector = 0] = "vector", e[e.pdf = 1] = "pdf", e[e._dummy = 2] = "_dummy";
})(m ||= {});
var h = class {
	[r];
	constructor(e) {
		this[r] = e;
	}
	reset() {
		this[r].reset();
	}
	current() {
		return this[r].current();
	}
	setAttachDebugInfo(e) {
		this[r].set_attach_debug_info(e);
	}
}, g;
g ||= {};
function _() {
	return new x();
}
var v = class {
	[r];
	constructor(e) {
		this[r] = e;
	}
	compile(e) {
		return this[r].compile(0, w(e?.diagnostics));
	}
	compileHtml(e) {
		return this[r].compile(1, w(e?.diagnostics));
	}
	async query(e) {
		return JSON.parse(this[r].query(0, e.selector, e.field));
	}
	title() {
		return this[r].title(0);
	}
	vector(e) {
		return this[r].get_artifact(0, w(e?.diagnostics)) || {};
	}
	pdf(e) {
		return this[r].get_artifact(1, w(e?.diagnostics)) || {};
	}
}, y = (e) => new i(async (t) => await e.default(t));
function b() {
	return new S();
}
var x = class {
	fontBuilderJs;
	fontBuilder;
	async init(e) {
		this.fontBuilderJs = await (e?.getWrapper?.() || import("./wasm-pack-shim-CERydRhl.js")), await y(this.fontBuilderJs).init(e?.getModule?.()), this.fontBuilder = new this.fontBuilderJs.TypstFontResolverBuilder();
	}
	async getFontInfo(e) {
		return this.fontBuilder.get_font_info(e);
	}
	async addFontData(e) {
		this.fontBuilder.add_raw_font(e);
	}
	async addLazyFont(e, t) {
		return this.fontBuilder.add_lazy_font(e, t);
	}
	async build(e) {
		let t = await this.fontBuilder.build(), n = await e(t);
		return t.free(), n;
	}
}, S = class e {
	compiler;
	compilerJs;
	static defaultAssets = ["text"];
	constructor() {}
	async init(n) {
		this.compilerJs = await (n?.getWrapper?.() || import("./wasm-pack-shim-CERydRhl.js"));
		let r = this.compilerJs.TypstCompilerBuilder, i = { ...n || {} }, a = i.beforeBuild ??= [], o = a.some((e) => e._preloadRemoteFontOptions !== void 0), s = a.some((e) => e._preloadRemoteFontOptions?.assets !== void 0), c = a.some((e) => e._preloadRemoteFontOptions?.assets === !1);
		if ((!o || !s && !c) && a.push(d([], { assets: e.defaultAssets })), !a.some((e) => e._kind === "fontLoader")) throw Error("TypstCompiler: no font loader found, please use font loaders, e.g. loadFonts or preloadSystemFonts");
		this.compiler = await t(n, y(this.compilerJs), r, {});
	}
	setFonts(e) {
		this.compiler.set_fonts(e);
	}
	compile(e) {
		return new Promise((t) => {
			let n = this.compiler.snapshot(e.root, e.mainFilePath, C(e.inputs));
			"incrementalServer" in e ? t(n.incr_compile(e.incrementalServer[r], w(e.diagnostics))) : t(n.get_artifact(e.format || m.vector, w(e.diagnostics)));
		});
	}
	async runWithWorld(e, t) {
		let n = this.compiler.snapshot(e.root, e.mainFilePath, C(e.inputs)), r = await t(new v(n));
		return n.free(), r;
	}
	query(e) {
		return this.runWithWorld(e, async (t) => JSON.parse(await t.query(e)));
	}
	getSemanticTokenLegend() {
		return new Promise((e) => {
			e(this.compiler.get_semantic_token_legend());
		});
	}
	getSemanticTokens(e) {
		return new Promise((t) => {
			this.compiler.reset(), t(this.compiler.get_semantic_tokens(e.offsetEncoding || "utf-16", e.mainFilePath, e.resultId));
		});
	}
	async withIncrementalServer(e) {
		let t = new h(this.compiler.create_incr_server());
		try {
			return await e(t);
		} finally {
			t[r].free();
		}
	}
	async getAst(e) {
		return this.compiler.get_ast(e);
	}
	async reset() {
		await new Promise((e) => {
			this.compiler.reset(), e(void 0);
		});
	}
	addSource(e, t) {
		if (arguments.length > 2) throw Error("use of addSource(path, source, isMain) is deprecated, please use addSource(path, source) instead");
		this.compiler.add_source(e, t);
	}
	mapShadow(e, t) {
		this.compiler.map_shadow(e, t);
	}
	unmapShadow(e) {
		this.compiler.unmap_shadow(e);
	}
	resetShadow() {
		this.compiler.reset_shadow();
	}
	renderPageToCanvas() {
		throw Error("Please use the api TypstRenderer.renderToCanvas in v0.4.0");
	}
};
b._impl = S;
function C(e) {
	return e ? Object.entries(e) : void 0;
}
function w(e) {
	switch (e) {
		case "none": return 1;
		case "unix": return 2;
		default: return 3;
	}
}
//#endregion
//#region node_modules/@myriaddreamin/typst.ts/dist/esm/render/canvas/view.mjs
var T = class {
	pageInfos;
	loadPageCount;
	imageScaleFactor;
	container;
	canvasList;
	textLayerList;
	commonList;
	textLayerParentList;
	semanticLayerList;
	constructor(e, t, r) {
		this.pageInfos = e, this.imageScaleFactor = r.pixelPerPt ?? n.PIXEL_PER_PT, t.innerHTML = "", t.style.width = "100%", this.container = t, this.canvasList = Array(this.loadPageCount), this.textLayerList = Array(this.loadPageCount), this.commonList = Array(this.loadPageCount), this.textLayerParentList = Array(this.loadPageCount), this.semanticLayerList = Array(this.loadPageCount);
		let i = (e, n, r) => {
			let i = Math.ceil(n.width) * this.imageScaleFactor, a = Math.ceil(n.height) * this.imageScaleFactor, o = this.canvasList[e] = document.createElement("canvas"), s = this.semanticLayerList[e] = document.createElement("div"), c = this.textLayerList[e] = document.createElement("div"), l = this.textLayerParentList[e] = document.createElement("div");
			if (o.getContext("2d")) {
				let e = document.createElement("div");
				o.width = i, o.height = a, e.appendChild(o), r.appendChild(e), e.style.position = "absolute";
			}
			{
				l.appendChild(c), l.className = "typst-html-semantics";
				let e = t.offsetWidth, i = e / n.width;
				l.style.width = `${e}px`, l.style.height = `${n.height * i}px`, l.style.setProperty("--data-text-width", `${i}px`), l.style.setProperty("--data-text-height", `${i}px`), r.classList.add("typst-page"), r.classList.add("canvas"), r.style.width = `${e}px`, r.style.height = `${a * i}px`, r.style.position = "relative", s.appendChild(l), r.appendChild(s);
			}
		};
		for (let e = 0; e < this.pageInfos.length; e++) {
			let n = this.pageInfos[e], r;
			r = this.commonList[e] = document.createElement("div"), t.appendChild(r), i(e, n, r);
		}
	}
	resetLayout() {
		for (let e = 0; e < this.pageInfos.length; e++) {
			let t = this.pageInfos[e], n = Math.ceil(t.width) * this.imageScaleFactor, r = Math.ceil(t.height) * this.imageScaleFactor, i = this.canvasList[e].parentElement;
			if (!i) throw Error(`canvasDiv is null for page ${e}, canvas list length ${this.canvasList.length}`);
			let a = this.commonList[e], o = this.textLayerParentList[e], s = this.container.offsetWidth, c = s / n;
			o.style.width = `${s}px`, o.style.height = `${r * c}px`, a.style.width = `${s}px`, a.style.height = `${r * c}px`;
			let l = this.container.offsetWidth / n;
			i.style.transformOrigin = "0px 0px", i.style.transform = `scale(${l})`;
		}
	}
}, E;
(function(e) {
	e[e.Doc = 0] = "Doc", e[e.Slide = 1] = "Slide";
})(E ||= {});
var D = class e {
	hookedElem;
	kModule;
	opts;
	modes = [];
	partialRendering = !0;
	renderMode = "svg";
	r = void 0;
	previewMode = E.Doc;
	isContentPreview = !1;
	isMixinOutline = !1;
	backgroundColor = "black";
	pageColor = "white";
	pixelPerPt = 3;
	retrieveDOMState;
	isRendering = !1;
	moduleInitialized = !1;
	patchQueue = [];
	disposeList = [];
	canvasRenderCToken;
	currentRealScale = 1;
	currentScaleRatio = 1;
	vpTimeout = void 0;
	sampledRenderTime = 0;
	partialRenderPage = 0;
	outline = void 0;
	cursorPosition = void 0;
	cachedDOMState = {
		width: 0,
		height: 0,
		window: {
			innerWidth: 0,
			innerHeight: 0
		},
		boundingRect: {
			left: 0,
			top: 0,
			right: 0
		}
	};
	constructor(e) {
		this.hookedElem = e.hookedElem, this.kModule = e.kModule, this.opts = e || {};
		{
			let { renderMode: t, previewMode: n, isContentPreview: r, retrieveDOMState: i } = e || {};
			this.partialRendering = !1, this.renderMode = t ?? this.renderMode, this.previewMode = n ?? this.previewMode, this.isContentPreview = r || !1, this.retrieveDOMState = i ?? (() => ({
				width: this.hookedElem.offsetWidth,
				height: this.hookedElem.offsetHeight,
				window: {
					innerWidth: window.innerWidth,
					innerHeight: window.innerHeight
				},
				boundingRect: this.hookedElem.getBoundingClientRect()
			})), this.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--typst-preview-background-color");
		}
		this.hookedElem.classList.add("hide-scrollbar-x"), this.hookedElem.parentElement?.classList.add("hide-scrollbar-x"), this.previewMode === E.Slide && (this.hookedElem.classList.add("hide-scrollbar-y"), this.hookedElem.parentElement?.classList.add("hide-scrollbar-y")), this.installCtrlWheelHandler();
	}
	reset() {
		this.kModule.reset(), this.moduleInitialized = !1;
	}
	dispose() {
		let e = this.disposeList;
		this.disposeList = [], e.forEach((e) => e());
	}
	static derive(e, t) {
		return [
			"rescale",
			"rerender",
			"postRender"
		].reduce((n, r) => (n[r] = e[`${r}$${t}`].bind(e), console.assert(n[r] !== void 0, `${r}$${t} is undefined`), n), {});
	}
	registerMode(t) {
		let n = e.derive(this, t);
		this.modes.push([t, n]), t === this.renderMode && (this.r = n);
	}
	installCtrlWheelHandler() {
		let e = [
			.1,
			.2,
			.3,
			.4,
			.5,
			.6,
			.7,
			.8,
			.9,
			1,
			1.1,
			1.3,
			1.5,
			1.7,
			1.9,
			2.1,
			2.4,
			2.7,
			3,
			3.3,
			3.7,
			4.1,
			4.6,
			5.1,
			5.7,
			6.3,
			7,
			7.7,
			8.5,
			9.4,
			10
		], t = (t) => {
			if (t.ctrlKey) {
				t.preventDefault(), this.cachedDOMState = this.retrieveDOMState(), window.onresize !== null && (window.onresize = null);
				let n = this.currentScaleRatio;
				if (t.deltaY < 0) {
					if (this.currentScaleRatio >= e.at(-1)) return;
					this.currentScaleRatio = e.filter((e) => e > this.currentScaleRatio).at(0);
				} else if (t.deltaY > 0) {
					if (this.currentScaleRatio <= e.at(0)) return;
					this.currentScaleRatio = e.filter((e) => e < this.currentScaleRatio).at(-1);
				} else return;
				let r = this.currentScaleRatio / n, i = t.pageX * (r - 1), a = t.pageY * (r - 1);
				Math.abs(this.currentScaleRatio - 1) < 1e-5 ? (this.hookedElem.classList.add("hide-scrollbar-x"), this.hookedElem.parentElement?.classList.add("hide-scrollbar-x"), this.previewMode === E.Slide && (this.hookedElem.classList.add("hide-scrollbar-y"), this.hookedElem.parentElement?.classList.add("hide-scrollbar-y"))) : (this.hookedElem.classList.remove("hide-scrollbar-x"), this.hookedElem.parentElement?.classList.remove("hide-scrollbar-x"), this.previewMode === E.Slide && (this.hookedElem.classList.remove("hide-scrollbar-y"), this.hookedElem.parentElement?.classList.remove("hide-scrollbar-y")));
				let o = this.hookedElem.firstElementChild;
				if (o) {
					let e = this.getSvgScaleRatio(), t = Number.parseFloat(o.getAttribute("data-height")), n = Math.ceil(t * e);
					this.hookedElem.style.height = `${n * 2}px`;
				}
				return window.scrollBy(i, a), this.addViewportChange(), !1;
			}
		};
		this.renderMode !== "dom" && (typeof acquireVsCodeApi < "u" ? (window.addEventListener("wheel", t, { passive: !1 }), this.disposeList.push(() => {
			window.removeEventListener("wheel", t);
		})) : (document.body.addEventListener("wheel", t, { passive: !1 }), this.disposeList.push(() => {
			document.body.removeEventListener("wheel", t);
		})));
	}
	getSvgScaleRatio() {
		let e = this.hookedElem.firstElementChild;
		if (!e) return 0;
		let t = this.cachedDOMState, n = Number.parseFloat(e.getAttribute("data-width") || e.getAttribute("width") || "1"), r = Number.parseFloat(e.getAttribute("data-height") || e.getAttribute("height") || "1");
		return this.currentRealScale = this.previewMode === E.Slide ? Math.min(t.width / n, t.height / r) : t.width / n, this.currentRealScale * this.currentScaleRatio;
	}
	processQueue(e) {
		let t = e[0];
		switch (t) {
			case "new":
			case "diff-v1": return t === "new" && this.reset(), this.kModule.manipulateData({
				action: "merge",
				data: e[1]
			}), this.moduleInitialized = !0, !0;
			case "viewport-change": return this.moduleInitialized ? !0 : (console.log("viewport-change before initialization"), !1);
			default: return console.log("svgUpdateEvent", e), !1;
		}
	}
	triggerUpdate() {
		if (this.isRendering) return;
		this.isRendering = !0;
		let e = async () => {
			if (this.cachedDOMState = this.retrieveDOMState(), this.patchQueue.length === 0) this.isRendering = !1, this.postprocessChanges();
			else try {
				let t = performance.now(), n = this.canvasRenderCToken;
				n && (await n.cancel(), await n.wait(), this.canvasRenderCToken = void 0, console.log("cancel canvas rendering"));
				let r = !1;
				for (; this.patchQueue.length > 0;) r = this.processQueue(this.patchQueue.shift()) || r;
				performance.now(), r && (this.r.rescale(), await this.r.rerender(), this.r.rescale());
				let i = performance.now();
				this.sampledRenderTime = i - t, requestAnimationFrame(e);
			} catch (e) {
				console.error(e), this.isRendering = !1, this.postprocessChanges();
			}
		};
		requestAnimationFrame(e);
	}
	postprocessChanges() {
		this.r.postRender(), this.previewMode === E.Slide && document.querySelectorAll(".typst-page-number-indicator").forEach((e) => {
			e.textContent = `${this.kModule.retrievePagesInfo().length}`;
		});
	}
	addChangement(e) {
		e[0] === "new" && this.patchQueue.splice(0, this.patchQueue.length);
		let t = () => {
			this.vpTimeout = void 0, this.patchQueue.push(e), this.triggerUpdate();
		};
		this.vpTimeout !== void 0 && clearTimeout(this.vpTimeout), e[0] === "viewport-change" && this.isRendering ? this.vpTimeout = setTimeout(t, this.sampledRenderTime || 100) : t();
	}
	addViewportChange() {
		this.addChangement(["viewport-change", ""]);
	}
};
function O(e) {
	return class {
		impl;
		kModule;
		constructor(t) {
			if (t.isContentPreview && (t.renderMode = "canvas"), this.kModule = t.kModule, this.impl = new e(t), !this.impl.r) throw Error(`mode is not supported, ${t?.renderMode}`);
			t.isContentPreview && (this.impl.partialRendering = !0, this.impl.pixelPerPt = 1, this.impl.isMixinOutline = !0);
		}
		dispose() {
			this.impl.dispose();
		}
		reset() {
			this.impl.reset();
		}
		addChangement(e) {
			this.impl.addChangement(e);
		}
		addViewportChange() {
			this.impl.addViewportChange();
		}
		setPageColor(e) {
			this.impl.pageColor = e, this.addViewportChange();
		}
		setPartialRendering(e) {
			this.impl.partialRendering = e;
		}
		setCursor(e, t, n) {
			this.impl.cursorPosition = [
				e,
				t,
				n
			];
		}
		setPartialPageNumber(e) {
			return e <= 0 || e > this.kModule.retrievePagesInfo().length ? !1 : (this.impl.partialRenderPage = e - 1, this.addViewportChange(), !0);
		}
		getPartialPageNumber() {
			return this.impl.partialRenderPage + 1;
		}
		setOutineData(e) {
			this.impl.outline = e, this.addViewportChange();
		}
	};
}
function k(e, ...t) {
	return t.reduce((e, t) => t(e), e);
}
//#endregion
//#region node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/dom/typst-cancel.mjs
var A = class {
	isCancellationRequested = !1;
	_onCancelled;
	_onCancelledResolveResolved;
	constructor() {
		let e, t;
		this._onCancelled = new Promise((n) => {
			e = n, t && t(n);
		}), this._onCancelledResolveResolved = new Promise((n) => {
			t = n, e && n(e);
		});
	}
	async cancel() {
		await this._onCancelledResolveResolved, this.isCancellationRequested = !0;
	}
	isCancelRequested() {
		return this.isCancellationRequested;
	}
	async consume() {
		(await this._onCancelledResolveResolved)();
	}
	wait() {
		return this._onCancelled;
	}
}, j = () => new Promise((e) => requestAnimationFrame(e)), M;
(function(e) {
	e[e.Doc = 0] = "Doc", e[e.Pages = 1] = "Pages";
})(M ||= {});
var N;
(function(e) {
	e[e.Layout = 0] = "Layout", e[e.Svg = 1] = "Svg", e[e.Semantics = 2] = "Semantics", e[e.PrepareCanvas = 3] = "PrepareCanvas", e[e.Canvas = 4] = "Canvas";
})(N ||= {});
function P(e) {
	return class extends e {
		tmpl = document.createElement("template");
		stub = this.createElement("<stub></stub>");
		plugin;
		docKernel;
		resourceHeader = void 0;
		pages = [];
		domScale = 1;
		track_mode = M.Doc;
		current_task = void 0;
		viewport;
		constructor(...e) {
			if (super(...e), this.registerMode("dom"), this.disposeList.push(() => {
				this.dispose();
			}), this.plugin = this.opts.renderer, this.opts.domScale !== void 0) {
				if (this.opts.domScale <= 0) throw Error("domScale must be positive");
				this.domScale = this.opts.domScale;
			}
		}
		dispose() {
			for (let e of this.pages) e.dispose();
			this.docKernel && this.docKernel.free();
		}
		createElement(e) {
			return this.tmpl.innerHTML = e, this.tmpl.content.firstElementChild;
		}
		async mountDom(e) {
			if (this.docKernel) throw Error("already mounted");
			this.hookedElem.innerHTML = "<svg class=\"typst-svg-resources\" viewBox=\"0 0 0 0\" width=\"0\" height=\"0\" style=\"opacity: 0; position: absolute;\"></svg>", this.resourceHeader = this.hookedElem.querySelector(".typst-svg-resources"), this.docKernel = await this.plugin.renderer.mount_dom(this.kModule[r], this.hookedElem), this.docKernel.bind_functions({ populateGlyphs: (e) => {
				let t = this.createElement(e).firstElementChild;
				this.resourceHeader.append(t);
			} });
		}
		async cancelAnyway$dom() {
			if (this.current_task) {
				let e = this.current_task;
				this.current_task = void 0, await e.cancel();
			}
		}
		retrieveDOMPages() {
			return Array.from(this.hookedElem.querySelectorAll(".typst-dom-page"));
		}
		postRender$dom() {}
		rescale$dom() {}
		getDomViewport(e, t) {
			let n = t.left, r = -t.top, i = t.right, a = e.innerHeight - t.top, o = {
				x: 0,
				y: r / this.domScale,
				width: Math.max(i - n, 0) / this.domScale,
				height: Math.max(a - r, 0) / this.domScale
			};
			return (o.width <= 0 || o.height <= 0) && (o.x = o.y = o.width = o.height = 0), o;
		}
		async rerender$dom() {
			let e = this.retrieveDOMState(), { x: t, y: n, width: r, height: i } = this.getDomViewport(e.window, e.boundingRect);
			if (!await this.docKernel.relayout(t, n, r, i)) return;
			let a = new A();
			this.doRender$dom(a), this.current_task = a;
		}
		async doRender$dom(e) {
			let t = (t, n) => {
				if (t && !e.isCancelRequested() && n) return n();
			}, n = this.retrieveDOMPages().map((e) => {
				let { innerWidth: t, innerHeight: n } = window, r = e.getBoundingClientRect();
				return {
					inWindow: !(r.left > t || r.right < 0 || r.top > n || r.bottom < 0),
					page: e
				};
			}), r = async (r) => {
				if (await j(), e.isCancelRequested()) return;
				let i = n[r].page, a = i.getBoundingClientRect(), o = this.getDomViewport(window, a), s = (e) => this.docKernel.need_repaint(r, o.x, o.y, o.width, o.height, e), c = (e) => this.docKernel.repaint(r, o.x, o.y, o.width, o.height, e), l = (n) => {
					if (!e.isCancelRequested()) return t(s(n), () => c(n));
				};
				await l(N.Layout);
				let u = (a.width ? Number.parseFloat(i.getAttribute("data-width")) / a.width : 1) * this.domScale, d = (a.height ? Number.parseFloat(i.getAttribute("data-height")) / a.height : 1) * this.domScale;
				o.x *= u, o.y *= d, o.y -= 100, o.width *= u, o.height *= d, o.height += 200, await l(N.Svg), await l(N.Semantics), !e.isCancelRequested() && (s(N.PrepareCanvas) ? (async () => {
					if (await c(N.PrepareCanvas), !e.isCancelRequested()) return l(N.Canvas);
				})() : await l(N.Canvas));
			}, i = async (t) => {
				for (let i = 0; i < n.length; ++i) {
					if (e.isCancelRequested()) return;
					n[i].inWindow === t && await r(i);
				}
			};
			this.cancelAnyway$dom(), await i(!0), await i(!1), e.isCancelRequested();
		}
	};
}
var F = class extends O(k(D, P)) {}, I = class {
	plugin;
	[r];
	constructor(e, t) {
		this.plugin = e, this[r] = t;
	}
	set backgroundColor(e) {
		e !== void 0 && (this[r].background_color = e);
	}
	get backgroundColor() {
		return this[r].background_color;
	}
	set pixelPerPt(e) {
		e !== void 0 && (this[r].pixel_per_pt = e);
	}
	get pixelPerPt() {
		return this[r].pixel_per_pt;
	}
	reset() {
		this.plugin.resetSession(this);
	}
	get doc_width() {
		return this[r].doc_width;
	}
	get docWidth() {
		return this[r].doc_width;
	}
	get doc_height() {
		return this[r].doc_height;
	}
	get docHeight() {
		return this[r].doc_height;
	}
	retrievePagesInfo() {
		let e = this[r].pages_info, t = [], n = e.page_count;
		for (let r = 0; r < n; r++) {
			let n = e.page(r);
			t.push({
				pageOffset: n.page_off,
				width: n.width_pt,
				height: n.height_pt
			});
		}
		return t;
	}
	getSourceLoc(e) {
		return this[r].source_span(e);
	}
	renderSvg(e) {
		return this.plugin.renderSvg({
			renderSession: this,
			...e
		});
	}
	renderToSvg(e) {
		return this.plugin.renderToSvg({
			renderSession: this,
			...e
		});
	}
	renderCanvas(e) {
		return this.plugin.renderCanvas({
			renderSession: this,
			...e
		});
	}
	manipulateData(e) {
		this.plugin.manipulateData({
			renderSession: this,
			...e
		});
	}
	renderSvgDiff(e) {
		return this.plugin.renderSvgDiff({
			renderSession: this,
			...e
		});
	}
	get_source_loc(e) {
		return this[r].source_span(e);
	}
	render_in_window(e, t, n, i) {
		return this[r].render_in_window(e, t, n, i);
	}
	merge_delta(e) {
		this.plugin.manipulateData({
			renderSession: this,
			action: "merge",
			data: e
		});
	}
}, L;
(function(e) {
	e[e.Delete = 0] = "Delete", e[e.New = 1] = "New", e[e.Update = 2] = "Update";
})(L ||= {});
var R = class {
	plugin;
	[r];
	constructor(e, t) {
		this.plugin = e, this[r] = t;
	}
	manipulateData(e, t) {
		return this[r].manipulate_data(e, t);
	}
	managedCanvasElemList = /* @__PURE__ */ new Map();
	canvasCounter = Math.random();
	renderCanvas(e) {
		let t = this.managedCanvasElemList;
		for (let [e, n] of t) n[0] = L.Delete;
		for (let n of e) {
			let e = n.canvas, r = e.dataset.manageId, i = L.Update;
			r || (r = this.canvasCounter.toFixed(5), this.canvasCounter += 1, e.dataset.manageId = r, i = L.New);
			let a = t.get(r);
			if (a && a[0] !== L.Delete) throw Error("cannot update a canvas for two times in batch");
			t.set(r, [i, { ...n }]);
		}
		let n = Array.from(t.entries()), i = new Uint8Array(n.length), a = Array(n.length), o = n.map(([e, [n, r]], o) => (n || t.delete(e), i[o] = n, a[o] = r.canvas, this.plugin.canvasOptionsToRust(r)));
		return this[r].render_canvas(i, a, o);
	}
	async retrievePagesInfo() {
		let e = await this[r].get_pages_info();
		console.log(e);
		let t = [], n = e.page_count;
		for (let r = 0; r < n; r++) {
			let n = e.page(r);
			t.push({
				pageOffset: n.page_off,
				width: n.width_pt,
				height: n.height_pt
			});
		}
		return t;
	}
}, z = (e) => new i(async (t) => await e.default(t));
function B() {
	return new H();
}
var V = !0, H = class {
	renderer;
	rendererJs;
	constructor() {}
	async init(e) {
		this.rendererJs = await (e?.getWrapper?.() || import("./wasm-pack-shim-Dt3d8uI0.js"));
		let n = this.rendererJs.TypstRendererBuilder;
		this.renderer = await t(e, z(this.rendererJs), n, {});
	}
	loadGlyphPack(e) {
		return Promise.resolve();
	}
	createOptionsToRust(e) {
		let t = new this.rendererJs.CreateSessionOptions();
		return e.format !== void 0 && (t.format = e.format), e.artifactContent !== void 0 && (t.artifact_content = e.artifactContent), t;
	}
	canvasOptionsToRust(e) {
		let t = new this.rendererJs.RenderPageImageOptions();
		if (e.pageOffset === void 0) throw Error("pageOffset is required in reflexo v0.5.0");
		if (t.page_off = e.pageOffset, e.cacheKey !== void 0 && (t.cache_key = e.cacheKey), e.backgroundColor !== void 0 && (t.background_color = e.backgroundColor), e.pixelPerPt !== void 0 && (t.pixel_per_pt = e.pixelPerPt), e.dataSelection !== void 0) {
			let n = 0;
			e.dataSelection.body ? n |= 1 : e.canvas && V && (V = !1, console.warn("dataSelection.body is not set but providing canvas for body")), (e.dataSelection.text || e.dataSelection.annotation) && console.error("dataSelection.text and dataSelection.annotation are deprecated"), e.dataSelection.semantics && (n |= 8), t.data_selection = n;
		}
		return t;
	}
	retrievePagesInfoFromSession(e) {
		return e.retrievePagesInfo();
	}
	renderCanvas(e) {
		return this.withinOptionSession(e, async (t) => this.renderer.render_page_to_canvas(t[r], e.canvas || void 0, this.canvasOptionsToRust(e)));
	}
	async inAnimationFrame(e) {
		return new Promise((t, n) => {
			requestAnimationFrame(() => {
				try {
					t(e());
				} catch (e) {
					n(e);
				}
			});
		});
	}
	async renderDisplayLayer(e, t, n) {
		let i = e[r].pages_info.page_count, a = async (r, i) => {
			let a = t[r].getContext("2d");
			if (!a) throw Error("canvas context is null");
			return await this.renderCanvas({
				...n,
				canvas: a,
				renderSession: e,
				pageOffset: i
			});
		}, o = performance.now(), s = await (async () => {
			let e = [];
			for (let t = 0; t < i; t++) e.push(await this.inAnimationFrame(() => a(t, t)));
			return e;
		})(), c = performance.now();
		return console.log(`display layer used: render = ${(c - o).toFixed(1)}ms`), s;
	}
	renderTextLayer(e, t) {
		let n = performance.now();
		e.forEach((e, n) => {
			e.innerHTML = t[n].htmlSemantics[0];
		});
		let r = performance.now();
		console.log(`text layer used: render = ${(r - n).toFixed(1)}ms`);
	}
	async render(e) {
		if ("format" in e && e.format !== "vector" && [
			"serde_json",
			"js",
			"ir"
		].includes(e.format)) throw Error(`deprecated format ${e.format}, please use vector format`);
		return this.renderToCanvas(e);
	}
	async renderDom(e) {
		if ("format" in e && e.format !== "vector" && [
			"serde_json",
			"js",
			"ir"
		].includes(e.format)) throw Error(`deprecated format ${e.format}, please use vector format`);
		return this.withinOptionSession(e, async (t) => {
			let n = new F({
				...e,
				renderMode: "dom",
				hookedElem: e.container,
				kModule: t,
				renderer: this
			});
			return await n.impl.mountDom(e.pixelPerPt), n;
		});
	}
	async renderToCanvas(e) {
		let t, i, a = e.container;
		a.style.visibility = "hidden";
		let o = async (n, r) => {
			try {
				i = await this.renderDisplayLayer(t, n, e), r();
			} finally {
				a.style.visibility = "visible";
			}
		};
		return this.withinOptionSession(e, async (s) => {
			if (t = s, t[r].pages_info.page_count === 0) throw Error("No page found in session");
			if (e.pixelPerPt !== void 0 && e.pixelPerPt <= 0) throw Error("Invalid typst.RenderOptions.pixelPerPt, should be a positive number " + e.pixelPerPt);
			let c = e.backgroundColor;
			if (c !== void 0 && !/^#[0-9a-f]{6}$/.test(c)) throw Error("Invalid typst.backgroundColor color for matching ^#?[0-9a-f]{6}$ " + c);
			t.pixelPerPt = e.pixelPerPt ?? n.PIXEL_PER_PT, t.backgroundColor = c ?? "#ffffff";
			let l = performance.now(), u = new T(this.retrievePagesInfoFromSession(t), a, e), d = performance.now();
			console.log(`layer used: retrieve = ${(d - l).toFixed(1)}ms`), await o(u.canvasList, () => u.resetLayout()), this.renderTextLayer(u.textLayerList, i);
		});
	}
	createModule(e) {
		return Promise.resolve(new I(this, this.renderer.create_session(e && this.createOptionsToRust({
			format: "vector",
			artifactContent: e
		}))));
	}
	async createWorkerV0(e) {
		return new R(this, await this.renderer.create_worker(e));
	}
	workerBridge() {
		return this.renderer.create_worker_bridge();
	}
	renderSvg(e, t) {
		if (e instanceof I || t) throw Error("removed api, please use renderToSvg({ renderSession, container }) instead");
		return this.withinOptionSession(e, async (t) => {
			let n;
			return e.data_selection && (n = 0, e.data_selection.body && (n |= 1), e.data_selection.defs && (n |= 2), e.data_selection.css && (n |= 4), e.data_selection.js && (n |= 8)), Promise.resolve(this.renderer.svg_data(t[r], n));
		});
	}
	renderSvgDiff(e) {
		return e.window ? this.renderer.render_svg_diff(e.renderSession[r], e.window.lo.x, e.window.lo.y, e.window.hi.x, e.window.hi.y) : this.renderer.render_svg_diff(e.renderSession[r], 0, 0, 1e33, 1e33);
	}
	renderToSvg(e) {
		return this.withinOptionSession(e, async (t) => Promise.resolve(this.renderer.render_svg(t[r], e.container)));
	}
	getCustomV1(e) {
		return Promise.resolve(this.renderer.get_customs(e.renderSession[r]));
	}
	resetSession(e) {
		return this.renderer.reset(e[r]);
	}
	manipulateData(e) {
		return this.renderer.manipulate_data(e.renderSession[r], e.action ?? "reset", e.data);
	}
	withinOptionSession(e, t) {
		function n(e) {
			return "artifactContent" in e;
		}
		if ("renderSession" in e) return t(e.renderSession);
		if (n(e)) return this.runWithSession(e, t);
		throw Error("Invalid render options, should be one of RenderByContentOptions|RenderBySessionOptions");
	}
	async runWithSession(e, t) {
		let n = e, r = t;
		t || (n = void 0, r = e);
		let i = this.renderer.create_session(n && this.createOptionsToRust(n));
		try {
			let e = await r(new I(this, i));
			return i.free(), e;
		} catch (e) {
			throw i.free(), e;
		}
	}
}, U = class {
	mTimes = /* @__PURE__ */ new Map();
	mData = /* @__PURE__ */ new Map();
	constructor() {}
	reset() {
		this.mTimes.clear(), this.mData.clear();
	}
	insertFile(e, t, n) {
		this.mTimes.set(e, n), this.mData.set(e, t);
	}
	removeFile(e) {
		this.mTimes.delete(e), this.mData.delete(e);
	}
	getMTime(e) {
		if (e.startsWith("/@memory/") && this.mTimes.has(e)) return this.mTimes.get(e);
	}
	isFile() {
		return !0;
	}
	getRealPath(e) {
		return e;
	}
	readAll(e) {
		if (e.startsWith("/@memory/") && this.mData.has(e)) return this.mData.get(e);
	}
}, W = class {
	am;
	cache = /* @__PURE__ */ new Map();
	constructor(e) {
		this.am = e;
	}
	resolvePath(e) {
		return `https://packages.typst.org/preview/${e.name}-${e.version}.tar.gz`;
	}
	pullPackageData(e) {
		let t = new XMLHttpRequest();
		if (t.overrideMimeType("text/plain; charset=x-user-defined"), t.open("GET", this.resolvePath(e), !1), t.send(null), t.status === 200 && (t.response instanceof String || typeof t.response == "string")) return Uint8Array.from(t.response, (e) => e.charCodeAt(0));
	}
	resolve(e, t) {
		if (e.namespace !== "preview") return;
		let n = this.resolvePath(e);
		if (this.cache.has(n)) return this.cache.get(n)();
		let r = this.pullPackageData(e);
		if (!r) return;
		let i = `/@memory/fetch/packages/${e.namespace}/${e.name}/${e.version}`, a = [];
		t.untar(r, (e, t, n) => {
			a.push([
				i + "/" + e,
				t,
				new Date(n)
			]);
		});
		let o = () => {
			for (let [e, t, n] of a) this.am.insertFile(e, t, n);
			return i;
		};
		return this.cache.set(n, o), o();
	}
};
//#endregion
//#region node_modules/@myriaddreamin/typst.ts/dist/esm/utils.mjs
function G(e) {
	return Math.random().toString(36).replace("0.", e || "");
}
//#endregion
//#region node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs
var K = typeof process < "u" && process.versions != null && process.versions.node != null, q = class t {
	mainFilePath;
	cc;
	fr;
	ex;
	constructor(e) {
		this.cc = e?.compiler || t.buildLocalCompiler, this.fr = e?.fontResolver || t.buildLocalFontResolver, this.ex = e?.renderer || t.buildLocalRenderer, this.mainFilePath = "/main.typ", this.providers = [];
	}
	setCompiler(e) {
		this.cc = e;
	}
	async getFontResolver() {
		return typeof this.fr == "function" ? this.fr = await this.fr() : this.fr;
	}
	async getCompiler() {
		return typeof this.cc == "function" ? this.cc = await this.cc() : this.cc;
	}
	async getCompilerReset() {
		let e = await this.getCompiler();
		return await e.reset(), e;
	}
	setRenderer(e) {
		this.ex = e;
	}
	async getRenderer() {
		return typeof this.ex == "function" ? this.ex = await this.ex() : this.ex;
	}
	providers;
	use(...e) {
		if (!this.providers) throw Error("already prepare uses for instances");
		this.providers.push(...e);
	}
	static preloadFontFromUrl(e) {
		return t.preloadFonts([e]);
	}
	static preloadFontData(e) {
		return t.preloadFonts([e]);
	}
	static preloadFonts(e) {
		return {
			key: "access-model",
			forRoles: ["compiler"],
			provides: [d(e)]
		};
	}
	static disableDefaultFontAssets() {
		return {
			key: "access-model",
			forRoles: ["compiler"],
			provides: [c()]
		};
	}
	static preloadFontAssets(e) {
		return {
			key: "access-model",
			forRoles: ["compiler"],
			provides: [l(e)]
		};
	}
	static withAccessModel(e) {
		return {
			key: "access-model",
			forRoles: ["compiler"],
			provides: [p(e)]
		};
	}
	static withPackageRegistry(e) {
		return {
			key: "package-registry",
			forRoles: ["compiler"],
			provides: [f(e)]
		};
	}
	static fetchPackageRegistry(e) {
		let t = e || new U();
		return {
			key: "package-registry$fetch",
			forRoles: ["compiler"],
			provides: [...e ? [] : [p(t)], f(new W(t))]
		};
	}
	static fetchPackageBy(e, t) {
		class n extends W {
			pullPackageData(e) {
				return t(e, this.resolvePath(e));
			}
		}
		return {
			key: "package-registry$lambda",
			forRoles: ["compiler"],
			provides: [f(new n(e))]
		};
	}
	ccOptions;
	setCompilerInitOptions(e) {
		this.requireIsUninitialized("compiler", this.cc), this.ccOptions = e;
	}
	exOptions;
	setRendererInitOptions(e) {
		this.requireIsUninitialized("renderer", this.ex), this.exOptions = e;
	}
	setMainFilePath(e) {
		this.mainFilePath = e;
	}
	getMainFilePath() {
		return this.mainFilePath;
	}
	removeTmp(e) {
		return e.mainFilePath.startsWith("/tmp/") ? this.unmapShadow(e.mainFilePath) : Promise.resolve();
	}
	async setFonts(t) {
		let n = await this.getFontResolver();
		for (let r of t) await n.addLazyFont(r, "blob" in r ? r.blob : e(r), r);
		let r = await this.getCompiler();
		await n.build(async (e) => r.setFonts(e));
	}
	async addSource(e, t) {
		(await this.getCompiler()).addSource(e, t);
	}
	async resetShadow() {
		(await this.getCompiler()).resetShadow();
	}
	async mapShadow(e, t) {
		(await this.getCompiler()).mapShadow(e, t);
	}
	async unmapShadow(e) {
		(await this.getCompiler()).unmapShadow(e);
	}
	async vector(e) {
		let t = await this.getCompileOptions(e);
		return (await this.getCompilerReset()).compile(t).then((e) => e.result).finally(() => this.removeTmp(t));
	}
	async pdf(e) {
		let t = await this.getCompileOptions(e);
		return t.format = m.pdf, (await this.getCompilerReset()).compile(t).then((e) => e.result).finally(() => this.removeTmp(t));
	}
	async svg(e) {
		return this.transientRender(e, (t, n) => t.renderSvg({
			...e,
			renderSession: n
		}));
	}
	async canvas(e, t) {
		return this.transientRender(t, (n, r) => n.renderToCanvas({
			container: e,
			...t,
			renderSession: r
		}));
	}
	async query(e) {
		let t = await this.getCompileOptions(e);
		return (await this.getCompilerReset()).query({
			...e,
			...t
		}).finally(() => this.removeTmp(t));
	}
	async getSemanticTokenLegend() {
		return (await this.getCompilerReset()).getSemanticTokenLegend();
	}
	async getSemanticTokens(e) {
		let t = await this.getCompileOptions(e);
		return (await this.getCompilerReset()).getSemanticTokens({
			mainFilePath: t.mainFilePath,
			resultId: e.resultId
		}).finally(() => this.removeTmp(t));
	}
	async getCompileOptions(e) {
		if (e === void 0) return {
			mainFilePath: this.mainFilePath,
			diagnostics: "none"
		};
		if (typeof e == "string") throw Error("please specify opts as {mainContent: '...'} or {mainFilePath: '...'}");
		if ("mainFilePath" in e) return {
			...e,
			diagnostics: "none"
		};
		{
			let t = `/tmp/${G()}.typ`;
			return await this.addSource(t, e.mainContent), {
				mainFilePath: t,
				inputs: e.inputs,
				diagnostics: "none"
			};
		}
	}
	async getVector(e) {
		if (e && "vectorData" in e) return e.vectorData;
		let t = await this.getCompileOptions(e);
		return (await this.getCompiler()).compile(t).then((e) => e.result).finally(() => this.removeTmp(t));
	}
	async transientRender(e, t) {
		let n = await this.getRenderer();
		if (!n) throw Error("does not provide renderer instance");
		let r = await this.getVector(e);
		return await n.runWithSession(async (e) => (n.manipulateData({
			renderSession: e,
			action: "reset",
			data: r
		}), t(n, e)));
	}
	prepareUseOnce = void 0;
	async prepareUse() {
		return this.prepareUseOnce ? this.prepareUseOnce : this.prepareUseOnce = this.doPrepareUse();
	}
	async doPrepareUse() {
		if (!this.providers) return;
		let e = await Promise.all(this.providers.map((e) => typeof e == "function" ? e() : e));
		if (this.providers = [], J == this && !e.some((e) => e.key.includes("package-registry") || e.key.includes("access-model"))) {
			if (K) {
				let e = Function("m", "return import(m)");
				try {
					let n = new U(), { default: r } = await e("sync-request");
					J.use(t.withAccessModel(n), t.fetchPackageBy(n, (e, t) => {
						let n = r("GET", t);
						if (n.statusCode === 200) return n.getBody(void 0);
					}));
				} catch {}
			} else J.use(t.fetchPackageRegistry());
		}
		let n = await Promise.all(this.providers.map((e) => typeof e == "function" ? e() : e)), r = this.ccOptions ||= {}, i = r.beforeBuild ||= [], a = this.exOptions ||= {}, o = a.beforeBuild ||= [];
		for (let t of [...e, ...n]) t.forRoles.includes("compiler") && (this.requireIsUninitialized("compiler", this.cc), i.push(...t.provides)), t.forRoles.includes("renderer") && (this.requireIsUninitialized("renderer", this.ex), o.push(...t.provides));
		this.providers = void 0;
	}
	requireIsUninitialized(e, t, n) {
		if (t && typeof t != "function") throw Error(`${e} has been initialized: ${t}`);
	}
	static async buildLocalCompiler() {
		let { createTypstCompiler: e } = await import("./compiler-BU90ciqR.js");
		await this.prepareUse();
		let t = e();
		return await t.init(this.ccOptions), t;
	}
	static async buildLocalFontResolver() {
		let { createTypstFontBuilder: e } = await import("./compiler-BU90ciqR.js");
		await this.prepareUse();
		let t = e();
		return await t.init(this.ccOptions), t;
	}
	static async buildGlobalCompiler() {
		let { createGlobalCompiler: e } = await import("./global-compiler-D_nF-JaV.js"), { createTypstCompiler: t } = await import("./compiler-BU90ciqR.js");
		return await this.prepareUse(), e(t, this.ccOptions);
	}
	static async buildLocalRenderer() {
		let { createTypstRenderer: e } = await import("./renderer-BvJCCLo7.js");
		await this.prepareUse();
		let t = e();
		return await t.init(this.exOptions), t;
	}
	static async buildGlobalRenderer() {
		let { createGlobalRenderer: e } = await import("./global-renderer-gyshX_QF.js"), { createTypstRenderer: t } = await import("./renderer-BvJCCLo7.js");
		return await this.prepareUse(), e(t, this.exOptions);
	}
}, J = new q({
	compiler: q.buildGlobalCompiler,
	renderer: q.buildGlobalRenderer
});
//#endregion
export { J as $typst, m as a, v as c, B as i, b as l, H as n, h as o, R as r, x as s, I as t, _ as u };
