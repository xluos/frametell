//#region src/utils/logger.ts
var e = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3
}, t = typeof process < "u" ? process.env?.LOG_LEVEL : void 0, n = t && Object.prototype.hasOwnProperty.call(e, t) ? t : "info";
function r(t) {
	return e[t] >= e[n];
}
var i = "[REDACTED]", a = [
	/Bearer\s+[A-Za-z0-9\-._~+/]+=*/gi,
	/eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
	/AKIA[0-9A-Z]{16}/g,
	/gh[pousr]_[A-Za-z0-9_]{36,}/g,
	/[sp]k_(live|test)_[A-Za-z0-9]{24,}/g,
	/(?:api[_-]?key|api[_-]?secret|access[_-]?token|auth[_-]?token|secret[_-]?key|password)\s*[:=]\s*['"]?[A-Za-z0-9\-._~+/]{8,}['"]?/gi,
	/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
], o = /pass(?:word|wd)|secret|token|authorization|api[_-]?key|access[_-]?key|private[_-]?key|credential/i;
function s(e) {
	let t = e;
	for (let e of a) e.lastIndex = 0, t = t.replace(e, i);
	return t;
}
function c(e, t = /* @__PURE__ */ new WeakSet()) {
	if (typeof e == "string") return s(e);
	if (e instanceof Error) return s(e.stack ?? `${e.name}: ${e.message}`);
	if (Array.isArray(e)) {
		if (t.has(e)) return "[Circular]";
		t.add(e);
		try {
			return e.map((e) => c(e, t));
		} finally {
			t.delete(e);
		}
	}
	if (typeof e == "object" && e) {
		if (t.has(e)) return "[Circular]";
		t.add(e);
		try {
			let n = {};
			for (let [r, a] of Object.entries(e)) n[r] = o.test(r) ? i : c(a, t);
			return n;
		} finally {
			t.delete(e);
		}
	}
	return e;
}
function l(e) {
	return e.map((e) => c(e));
}
var u = /* @__PURE__ */ new Set(), d = !1;
function f(e) {
	let t = /* @__PURE__ */ new WeakSet();
	try {
		return JSON.stringify(e, (e, n) => {
			if (typeof n == "bigint") return n.toString();
			if (typeof n == "object" && n) {
				if (t.has(n)) return "[Circular]";
				t.add(n);
			}
			return n;
		}) ?? String(e);
	} catch {
		return String(e);
	}
}
function p(e) {
	return typeof e == "string" ? e : e instanceof Error ? e.stack ?? `${e.name}: ${e.message}` : typeof e == "object" && e ? f(e) : String(e);
}
function m(e) {
	return s(e.map((e) => e instanceof Error ? p(e) : p(c(e))).join(" "));
}
function h(e) {
	return u.add(e), () => {
		u.delete(e);
	};
}
function g(e, t) {
	if (u.size === 0 || d) return;
	d = !0;
	let n = {
		level: e,
		message: m(t),
		timestamp: Date.now()
	};
	try {
		for (let e of u) try {
			e(n);
		} catch (e) {
			console.error("[manim-web] log listener threw:", m([e]));
		}
	} finally {
		d = !1;
	}
}
function _(e, t) {
	r(e) && (console[e]("[manim-web]", ...l(t)), g(e, t));
}
var v = {
	debug: (...e) => _("debug", e),
	info: (...e) => _("info", e),
	warn: (...e) => _("warn", e),
	error: (...e) => _("error", e)
}, y = class {
	_scene;
	_panel;
	_options;
	constructor(e, t = {}) {
		this._scene = e, this._options = {
			position: t.position ?? "top-right",
			theme: t.theme ?? "dark",
			width: t.width ?? 250
		}, this._panel = this._createPanel();
	}
	get panel() {
		return this._panel;
	}
	get scene() {
		return this._scene;
	}
	_createPanel() {
		let e = document.createElement("div");
		e.className = "manimweb-controls", e.style.cssText = `
      position: absolute;
      ${this._getPositionStyles()}
      width: ${this._options.width}px;
      max-height: calc(100% - 24px);
      overflow-y: auto;
      padding: 12px;
      background: ${this._options.theme === "dark" ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.95)"};
      color: ${this._options.theme === "dark" ? "#ffffff" : "#000000"};
      border-radius: 8px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      z-index: 1000;
      box-sizing: border-box;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      user-select: none;
      -webkit-user-select: none;
    `;
		let t = this._scene.getContainer();
		return t.style.position = "relative", t.appendChild(e), e;
	}
	_getPositionStyles() {
		let e = "12px";
		switch (this._options.position) {
			case "top-left": return `top: ${e}; left: ${e};`;
			case "top-right": return `top: ${e}; right: ${e};`;
			case "bottom-left": return `bottom: ${e}; left: ${e};`;
			case "bottom-right": return `bottom: ${e}; right: ${e};`;
			default: return `top: ${e}; right: ${e};`;
		}
	}
	_getAccentColor() {
		return this._options.theme === "dark" ? "#4a90d9" : "#3b7fc4";
	}
	_getHoverColor() {
		return this._options.theme === "dark" ? "#5a9fe9" : "#4b8fd4";
	}
	_getBorderColor() {
		return this._options.theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
	}
	addSlider(e) {
		let t = document.createElement("div");
		t.style.cssText = "margin-bottom: 12px;";
		let n = document.createElement("label");
		n.style.cssText = "\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 6px;\n      cursor: default;\n    ";
		let r = document.createElement("span");
		r.textContent = e.label, r.style.cssText = "font-weight: 500;";
		let i = e.value ?? e.min, a = document.createElement("span");
		a.textContent = this._formatNumber(i), a.style.cssText = "\n      font-family: 'SF Mono', Monaco, Consolas, monospace;\n      font-size: 12px;\n      opacity: 0.8;\n    ", n.appendChild(r), n.appendChild(a);
		let o = document.createElement("input");
		return o.type = "range", o.min = String(e.min), o.max = String(e.max), o.step = String(e.step ?? (e.max - e.min) / 100), o.value = String(i), o.style.cssText = `
      width: 100%;
      height: 6px;
      appearance: none;
      -webkit-appearance: none;
      background: ${this._getBorderColor()};
      border-radius: 3px;
      outline: none;
      cursor: pointer;
    `, this._styleSliderThumb(o), o.addEventListener("input", () => {
			let t = parseFloat(o.value);
			a.textContent = this._formatNumber(t), e.onChange(t);
		}), t.appendChild(n), t.appendChild(o), this._panel.appendChild(t), t;
	}
	_styleSliderThumb(e) {
		let t = this._getAccentColor(), n = "manimweb-slider-styles";
		if (!document.getElementById(n)) {
			let e = document.createElement("style");
			e.id = n, e.textContent = `
        .manimweb-controls input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          background: ${t};
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }
        .manimweb-controls input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: ${t};
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }
        .manimweb-controls input[type="range"]:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.3);
        }
      `, document.head.appendChild(e);
		}
	}
	_formatNumber(e) {
		return Number.isInteger(e) ? String(e) : e.toFixed(2);
	}
	addButton(e) {
		let t = document.createElement("button");
		t.textContent = e.label;
		let n = this._getAccentColor(), r = this._getHoverColor();
		return t.style.cssText = `
      width: 100%;
      padding: 10px 16px;
      margin-bottom: 8px;
      border: none;
      border-radius: 6px;
      background: ${n};
      color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      transition: background-color 0.15s ease, transform 0.1s ease;
      outline: none;
      touch-action: manipulation;
    `, t.addEventListener("mouseenter", () => {
			t.style.background = r;
		}), t.addEventListener("mouseleave", () => {
			t.style.background = n;
		}), t.addEventListener("mousedown", () => {
			t.style.transform = "scale(0.98)";
		}), t.addEventListener("mouseup", () => {
			t.style.transform = "scale(1)";
		}), t.addEventListener("click", e.onClick), this._panel.appendChild(t), t;
	}
	addCheckbox(e) {
		let t = document.createElement("label");
		t.style.cssText = "\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      margin-bottom: 10px;\n      cursor: pointer;\n      padding: 4px 0;\n    ";
		let n = document.createElement("div");
		n.style.cssText = "\n      position: relative;\n      width: 20px;\n      height: 20px;\n      flex-shrink: 0;\n    ";
		let r = document.createElement("input");
		r.type = "checkbox", r.checked = e.checked ?? !1, r.style.cssText = "\n      position: absolute;\n      opacity: 0;\n      width: 100%;\n      height: 100%;\n      margin: 0;\n      cursor: pointer;\n    ";
		let i = document.createElement("div"), a = this._getAccentColor(), o = () => {
			i.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 2px solid ${r.checked ? a : this._getBorderColor()};
        background: ${r.checked ? a : "transparent"};
        transition: all 0.15s ease;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
      `, i.innerHTML = r.checked ? "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\"><path d=\"M2 6L5 9L10 3\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>" : "";
		};
		o(), r.addEventListener("change", () => {
			o(), e.onChange(r.checked);
		}), n.appendChild(r), n.appendChild(i);
		let s = document.createElement("span");
		return s.textContent = e.label, s.style.cssText = "font-weight: 500;", t.appendChild(n), t.appendChild(s), this._panel.appendChild(t), t;
	}
	addColorPicker(e) {
		let t = document.createElement("div");
		t.style.cssText = "margin-bottom: 12px;";
		let n = document.createElement("div");
		n.style.cssText = "\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 6px;\n    ";
		let r = document.createElement("span");
		r.textContent = e.label, r.style.cssText = "font-weight: 500;";
		let i = e.value ?? "#ffffff", a = document.createElement("span");
		a.textContent = i.toUpperCase(), a.style.cssText = "\n      font-family: 'SF Mono', Monaco, Consolas, monospace;\n      font-size: 12px;\n      opacity: 0.8;\n    ", n.appendChild(r), n.appendChild(a);
		let o = document.createElement("div");
		o.style.cssText = "\n      display: flex;\n      align-items: center;\n      gap: 8px;\n    ";
		let s = document.createElement("input");
		s.type = "color", s.value = i, s.style.cssText = `
      width: 40px;
      height: 32px;
      padding: 0;
      border: 2px solid ${this._getBorderColor()};
      border-radius: 6px;
      cursor: pointer;
      background: transparent;
    `;
		let c = document.createElement("input");
		return c.type = "text", c.value = i, c.style.cssText = `
      flex: 1;
      padding: 6px 10px;
      border: 2px solid ${this._getBorderColor()};
      border-radius: 6px;
      background: transparent;
      color: inherit;
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-size: 13px;
      outline: none;
    `, c.addEventListener("focus", () => {
			c.style.borderColor = this._getAccentColor();
		}), c.addEventListener("blur", () => {
			c.style.borderColor = this._getBorderColor();
		}), s.addEventListener("input", () => {
			let t = s.value;
			c.value = t, a.textContent = t.toUpperCase(), e.onChange(t);
		}), c.addEventListener("input", () => {
			let t = c.value;
			/^#[0-9A-Fa-f]{6}$/.test(t) && (s.value = t, a.textContent = t.toUpperCase(), e.onChange(t));
		}), o.appendChild(s), o.appendChild(c), t.appendChild(n), t.appendChild(o), this._panel.appendChild(t), t;
	}
	addSeparator() {
		let e = document.createElement("hr");
		e.style.cssText = `
      border: none;
      border-top: 1px solid ${this._getBorderColor()};
      margin: 14px 0;
    `, this._panel.appendChild(e);
	}
	addLabel(e) {
		let t = document.createElement("div");
		return t.textContent = e, t.style.cssText = "\n      font-weight: 600;\n      font-size: 13px;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      opacity: 0.7;\n      margin-bottom: 10px;\n      margin-top: 4px;\n    ", this._panel.appendChild(t), t;
	}
	show() {
		this._panel.style.display = "block";
	}
	hide() {
		this._panel.style.display = "none";
	}
	toggle() {
		this._panel.style.display === "none" ? this.show() : this.hide();
	}
	isVisible() {
		return this._panel.style.display !== "none";
	}
	dispose() {
		this._panel.remove();
	}
}, b = class extends y {
	_timeline = null;
	_playPauseBtn = null;
	_speedSelect = null;
	_timeDisplay = null;
	_durationDisplay = null;
	_isPlaying = !1;
	_playbackRate = 1;
	_updateInterval = null;
	_onTimeUpdate = null;
	constructor(e, t = {}) {
		super(e, t), this._createPlaybackUI(t), this._startUpdateLoop();
	}
	onTimeUpdate(e) {
		this._onTimeUpdate = e;
	}
	get playbackRate() {
		return this._playbackRate;
	}
	set playbackRate(e) {
		this._playbackRate = e, this._speedSelect && (this._speedSelect.value = String(e));
	}
	_createPlaybackUI(e) {
		this.addLabel("Playback"), e.showPlayPause !== !1 && (this._playPauseBtn = this._createPlayPauseButton()), e.showTimeline !== !1 && (this._timeline = this._createTimelineScrubber()), e.showSpeed !== !1 && (this._speedSelect = this._createSpeedControl());
	}
	_createPlayPauseButton() {
		let e = document.createElement("div");
		e.style.cssText = "\n      display: flex;\n      gap: 8px;\n      margin-bottom: 12px;\n    ";
		let t = document.createElement("button");
		t.innerHTML = this._getPlayIcon();
		let n = this._getAccentColor(), r = this._getHoverColor();
		t.style.cssText = `
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      background: ${n};
      color: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      font-family: inherit;
      transition: background-color 0.15s ease;
      outline: none;
      touch-action: manipulation;
    `, t.addEventListener("mouseenter", () => {
			t.style.background = r;
		}), t.addEventListener("mouseleave", () => {
			t.style.background = n;
		}), t.addEventListener("click", () => {
			this._togglePlayPause();
		});
		let i = document.createElement("button");
		return i.innerHTML = this._getStopIcon(), i.style.cssText = `
      padding: 10px 14px;
      border: 2px solid ${this._getBorderColor()};
      border-radius: 6px;
      background: transparent;
      color: inherit;
      cursor: pointer;
      transition: border-color 0.15s ease;
      outline: none;
      touch-action: manipulation;
    `, i.addEventListener("mouseenter", () => {
			i.style.borderColor = n;
		}), i.addEventListener("mouseleave", () => {
			i.style.borderColor = this._getBorderColor();
		}), i.addEventListener("click", () => {
			this._scene.stop(), this._isPlaying = !1, this._updatePlayPauseButton();
		}), e.appendChild(t), e.appendChild(i), this._panel.appendChild(e), t;
	}
	_togglePlayPause() {
		this._isPlaying ? (this._scene.pause(), this._isPlaying = !1) : (this._scene.resume(), this._isPlaying = !0), this._updatePlayPauseButton();
	}
	_updatePlayPauseButton() {
		this._playPauseBtn && (this._playPauseBtn.innerHTML = this._isPlaying ? this._getPauseIcon() : this._getPlayIcon());
	}
	_createTimelineScrubber() {
		let e = document.createElement("div");
		e.style.cssText = "margin-bottom: 12px;";
		let t = document.createElement("div");
		t.style.cssText = "\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      margin-bottom: 6px;\n      font-family: 'SF Mono', Monaco, Consolas, monospace;\n      font-size: 12px;\n    ", this._timeDisplay = document.createElement("span"), this._timeDisplay.textContent = "0:00.00", this._timeDisplay.style.opacity = "0.8";
		let n = document.createElement("span");
		n.textContent = "0:00.00", n.style.opacity = "0.6", n.id = "manimweb-duration-display", t.appendChild(this._timeDisplay), t.appendChild(n);
		let r = document.createElement("input");
		return r.type = "range", r.min = "0", r.max = "100", r.step = "0.1", r.value = "0", r.style.cssText = `
      width: 100%;
      height: 8px;
      appearance: none;
      -webkit-appearance: none;
      background: ${this._getBorderColor()};
      border-radius: 4px;
      outline: none;
      cursor: pointer;
    `, r.addEventListener("input", () => {
			let e = this._scene.timeline;
			if (e) {
				let t = e.getDuration(), n = parseFloat(r.value) / 100 * t;
				this._scene.seek(n), this._updateTimeDisplay(n, t);
			}
		}), this._durationDisplay = n, e.appendChild(t), e.appendChild(r), this._panel.appendChild(e), r;
	}
	_createSpeedControl() {
		let e = document.createElement("div");
		e.style.cssText = "\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      margin-bottom: 8px;\n    ";
		let t = document.createElement("span");
		t.textContent = "Speed", t.style.cssText = "font-weight: 500;";
		let n = document.createElement("select");
		n.style.cssText = `
      flex: 1;
      padding: 8px 12px;
      border: 2px solid ${this._getBorderColor()};
      border-radius: 6px;
      background: transparent;
      color: inherit;
      font-size: 14px;
      font-family: inherit;
      cursor: pointer;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M3 4l3 4 3-4H3z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 10px center;
      padding-right: 30px;
    `;
		for (let e of [
			{
				value: .25,
				label: "0.25x"
			},
			{
				value: .5,
				label: "0.5x"
			},
			{
				value: .75,
				label: "0.75x"
			},
			{
				value: 1,
				label: "1x"
			},
			{
				value: 1.25,
				label: "1.25x"
			},
			{
				value: 1.5,
				label: "1.5x"
			},
			{
				value: 2,
				label: "2x"
			}
		]) {
			let t = document.createElement("option");
			t.value = String(e.value), t.textContent = e.label, e.value === 1 && (t.selected = !0), n.appendChild(t);
		}
		return n.addEventListener("change", () => {
			this._playbackRate = parseFloat(n.value);
		}), n.addEventListener("focus", () => {
			n.style.borderColor = this._getAccentColor();
		}), n.addEventListener("blur", () => {
			n.style.borderColor = this._getBorderColor();
		}), e.appendChild(t), e.appendChild(n), this._panel.appendChild(e), n;
	}
	updateTime(e, t) {
		this._updateTimeDisplay(e, t), this._updateTimelineSlider(e, t), this._onTimeUpdate && this._onTimeUpdate(e, t);
	}
	_updateTimeDisplay(e, t) {
		this._timeDisplay && (this._timeDisplay.textContent = this._formatTime(e)), this._timeline && this._durationDisplay && (this._durationDisplay.textContent = this._formatTime(t));
	}
	_updateTimelineSlider(e, t) {
		if (this._timeline && t > 0) {
			let n = e / t * 100;
			this._timeline.value = String(n);
		}
	}
	_formatTime(e) {
		return `${Math.floor(e / 60)}:${(e % 60).toFixed(2).padStart(5, "0")}`;
	}
	_startUpdateLoop() {
		let e = () => {
			let t = this._scene.timeline;
			if (t) {
				let e = t.getCurrentTime(), n = t.getDuration();
				this.updateTime(e, n);
			}
			let n = this._isPlaying;
			this._isPlaying = this._scene.isPlaying, n !== this._isPlaying && this._updatePlayPauseButton(), this._updateInterval = requestAnimationFrame(e);
		};
		this._updateInterval = requestAnimationFrame(e);
	}
	_getPlayIcon() {
		return "\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n        <path d=\"M4 2l10 6-10 6V2z\"/>\n      </svg>\n      <span>Play</span>\n    ";
	}
	_getPauseIcon() {
		return "\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n        <rect x=\"3\" y=\"2\" width=\"4\" height=\"12\"/>\n        <rect x=\"9\" y=\"2\" width=\"4\" height=\"12\"/>\n      </svg>\n      <span>Pause</span>\n    ";
	}
	_getStopIcon() {
		return "\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"currentColor\">\n        <rect x=\"3\" y=\"3\" width=\"10\" height=\"10\"/>\n      </svg>\n    ";
	}
	dispose() {
		this._updateInterval !== null && (cancelAnimationFrame(this._updateInterval), this._updateInterval = null), super.dispose();
	}
}, x = 800, S = 450, C = { importModule: (e) => import(
	/* @vite-ignore */
	e
) };
function w(e) {
	return typeof e.togglePlayPause == "function";
}
function T(e) {
	try {
		e.dispose();
	} catch (e) {
		v.error("<manim-scene> failed to dispose instance:", e);
	}
}
function E(e, t) {
	let n = e?.trim();
	return n ? /^\d+(\.\d+)?$/.test(n) ? `${n}px` : n : `${t}px`;
}
function D(e) {
	let t = e?.trim();
	return !t || !/^\d+(\.\d+)?$/.test(t) ? null : Number(t);
}
var O = typeof HTMLElement < "u" ? HTMLElement : class {}, k = class extends O {
	static get observedAttributes() {
		return [
			"width",
			"height",
			"background",
			"src",
			"autoplay",
			"controls",
			"loop"
		];
	}
	_container = null;
	_instance = null;
	_controls = null;
	_sceneFactory = null;
	_connected = !1;
	_loadToken = 0;
	_mountPromise = Promise.resolve();
	get scene() {
		return this._sceneFactory;
	}
	set scene(e) {
		this._sceneFactory = e, this._connected && this._mount();
	}
	async whenReady() {
		await new Promise((e) => setTimeout(e, 0)), await this._mountPromise;
	}
	connectedCallback() {
		this._connected = !0, this._ensureContainer(), this._mount();
	}
	disconnectedCallback() {
		this._connected = !1, this._loadToken++, this._teardownInstance();
	}
	attributeChangedCallback(e, t, n) {
		this._connected && t !== n && (e === "width" || e === "height" || e === "background" ? (this._applyContainerStyle(), this._resizeInstance()) : e === "src" ? this._mount() : this._applyPlaybackOptions());
	}
	_ensureContainer() {
		if (!this._container) {
			let e = document.createElement("div");
			this._container = e, this.appendChild(e);
		}
		return this._applyContainerStyle(), this._container;
	}
	_applyContainerStyle() {
		let e = this._container;
		e && (e.style.width = E(this.getAttribute("width"), x), e.style.height = E(this.getAttribute("height"), S), e.style.position = "relative", e.style.overflow = "hidden", e.style.background = this.getAttribute("background") ?? "");
	}
	_mount() {
		return this._mountPromise = this._doMount(), this._mountPromise;
	}
	async _doMount() {
		this._teardownInstance();
		let e = ++this._loadToken, t = this._ensureContainer();
		this._clearContainerChildren();
		let n = await this._resolveFactory(e);
		if (n === null || e !== this._loadToken) return;
		let r;
		try {
			r = await n(t);
		} catch (e) {
			v.error("<manim-scene> scene factory threw:", e);
			return;
		}
		e === this._loadToken ? (this._instance = r, this._applyPlaybackOptions()) : T(r);
	}
	async _resolveFactory(e) {
		if (this._sceneFactory) return this._sceneFactory;
		let t = this.getAttribute("src");
		if (!t) return null;
		let n = await C.importModule(t);
		if (e !== this._loadToken) return null;
		let r = n.default;
		return typeof r == "function" ? r : (v.error(`<manim-scene> module "${t}" has no default-export factory function.`), null);
	}
	_applyPlaybackOptions() {
		let e = this._instance;
		if (!e) return;
		let t = w(e);
		t && (e.loop = this.hasAttribute("loop")), t || this._syncSceneControls(e), this.hasAttribute("autoplay") && !e.isPlaying && (t ? e.play() : e.resume());
	}
	_syncSceneControls(e) {
		let t = this.hasAttribute("controls");
		t && !this._controls ? this._controls = new b(e) : !t && this._controls && (this._controls.dispose(), this._controls = null);
	}
	_resizeInstance() {
		let e = this._instance;
		if (!e) return;
		let t = D(this.getAttribute("width")), n = D(this.getAttribute("height"));
		if (t === null || n === null) return;
		let r = w(e) ? e.scene : e;
		try {
			r.resize(t, n);
		} catch (e) {
			v.error("<manim-scene> failed to resize scene:", e);
		}
	}
	_teardownInstance() {
		if (this._controls) {
			try {
				this._controls.dispose();
			} catch (e) {
				v.error("<manim-scene> failed to dispose controls:", e);
			}
			this._controls = null;
		}
		this._instance &&= (T(this._instance), null);
	}
	_clearContainerChildren() {
		let e = this._container;
		if (e) for (; e.firstChild;) e.removeChild(e.firstChild);
	}
};
function A(e = "manim-scene") {
	typeof customElements < "u" && typeof HTMLElement < "u" && (customElements.get(e) || customElements.define(e, k));
}
//#endregion
export { y as a, b as i, C as n, v as o, A as r, h as s, k as t };
