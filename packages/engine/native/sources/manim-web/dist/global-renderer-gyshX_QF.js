//#region node_modules/@myriaddreamin/typst.ts/dist/esm/contrib/global-renderer.mjs
var e = void 0, t;
function n(n, r) {
	let i = e || n();
	return t === void 0 ? t = (async () => (await i.init(r), e = i))() : t;
}
//#endregion
export { n as createGlobalRenderer };
