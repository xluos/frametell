/* Generated from pinned sources; see native/sources.json and each source LICENSE. */
(window.NATIVE_FACTORIES ||= {})["chat-rap-video"] = function(environment = {}) {
const document = environment.document || globalThis.document;
var NativeModule = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/engine/native/chat-rap-video.entry.js
  var chat_rap_video_entry_exports = {};
  __export(chat_rap_video_entry_exports, {
    create: () => create
  });
  function create(host, script, assets = {}) {
    host.style('\n:host{\n  --bg:#ededed;\n  --nav-bg:#ededed;\n  --bubble-left:#ffffff;\n  --bubble-right:#95ec69;\n  --text:#1a1a1a;\n  --hook-yellow:#ffe600;\n  --beam-green:#7fff00;\n}\n*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;}\n:host{\n  width:1080px;height:1920px;\n  overflow:hidden;background:#000;\n  font-family:-apple-system,"PingFang SC","Microsoft YaHei","Heiti SC",sans-serif;\n}\n#canvas{\n  width:1080px;height:1920px;\n  position:relative;overflow:hidden;\n  background:#000;\n}\n\n/* \u804A\u5929\u7A97\uFF1A\u56FA\u5B9A\u5C45\u4E2D\uFF0C\u5360\u603B\u753B\u9762 ~52%\uFF08\u7528\u6237\u8981\u6C42 40-60%\uFF09 */\n#phone{\n  position:absolute;left:0;top:460px;\n  width:1080px;height:1000px;\n  background:transparent;\n  overflow:hidden;\n}\n\n/* \u72B6\u6001\u680F */\n#status-bar .time{font-size:30px;letter-spacing:1px;}\n#status-bar .icons{display:flex;align-items:center;gap:10px;}\n#status-bar .signal{display:flex;align-items:flex-end;gap:4px;height:22px;}\n#status-bar .signal i{display:block;width:7px;background:#000;border-radius:1px;}\n#status-bar .signal i:nth-child(1){height:7px;opacity:.35;}\n#status-bar .signal i:nth-child(2){height:11px;opacity:.55;}\n#status-bar .signal i:nth-child(3){height:15px;opacity:.75;}\n#status-bar .signal i:nth-child(4){height:19px;opacity:1;}\n#status-bar .wifi{width:30px;height:24px;position:relative;}\n#status-bar .wifi::before{content:"";position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:8px;height:8px;background:#000;border-radius:50%;}\n#status-bar .wifi::after{content:"";position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:26px;height:26px;border:4px solid #000;border-top-color:transparent;border-radius:50%;}\n#status-bar .battery{display:flex;align-items:center;gap:6px;}\n#status-bar .battery .case{width:32px;height:16px;border:2px solid #000;border-radius:3px;position:relative;padding:2px;}\n#status-bar .battery .case::after{content:"";position:absolute;right:-5px;top:50%;transform:translateY(-50%);width:3px;height:8px;background:#000;border-radius:0 1px 1px 0;}\n#status-bar .battery .fill{width:100%;height:100%;background:#000;border-radius:1px;}\n#status-bar .battery .num{font-size:24px;}\n\n/* \u5BFC\u822A\u680F */\n#nav-bar .back{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:44px;color:#000;font-weight:300;width:70px;text-align:center;}\n#nav-bar .name{font-size:40px;color:#000;font-weight:600;max-width:720px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}\n#nav-bar .more{position:absolute;right:24px;top:50%;transform:translateY(-50%);font-size:42px;color:#000;letter-spacing:3px;}\n\n/* \u6D88\u606F\u6EDA\u52A8\u5BB9\u5668\uFF08\u6A21\u62DF\u5FAE\u4FE1\u5411\u4E0A\u6EDA\u52A8\uFF0Cz-index:0 \u786E\u4FDD\u4E0D\u76D6 #nav-bar\uFF09 */\n#messages{\n  position:absolute;left:0;right:0;top:156px;bottom:110px;\n  overflow:hidden;\n  z-index:0;\n}\n/* v11\uFF1A\u6BCF\u6761\u6D88\u606F\u5143\u7D20\u81EA\u5E26"\u767D\u5E26"\u80CC\u666F\uFF08\u53C2\u8003\u6296\u97F3\u300C\u738B\u603B\u4F5C\u5996\u300D\u804A\u5929\u6761\u6A2A\u8DE8\u5168\u5C4F\uFF09 */\n.msg{\n  position:absolute;\n  left:-40px;right:-40px;\n  display:flex;align-items:center;\n  justify-content:center;\n  opacity:0;\n  background:#ededed;\n  padding:30px 50px;\n  box-shadow:0 4px 20px rgba(0,0,0,0.3);\n  will-change:transform,opacity;\n  pointer-events:none;\n  /* \u4E0D\u7528 CSS transition\uFF1ArenderAt \u6BCF\u5E27\u91CD\u7F6E opacity \u4F1A\u5BFC\u81F4\u6BCF\u5E27\u90FD\u5728\u8FC7\u6E21\u4E2D\uFF0C\u622A\u56FE\u65F6\u51E0\u4E4E\u4E0D\u53EF\u89C1 */\n}\n.msg.left .row{flex-direction:row;}\n.msg .row{display:flex;align-items:flex-start;width:100%;padding:0 26px;}\n.msg.right .row{flex-direction:row-reverse;}\n.msg .avatar{\n  width:126px;height:126px;border-radius:16px;\n  background:#d9d9d9;flex:none;\n  background-size:cover;background-position:center;\n}\n.msg.left .avatar{margin-right:26px;}\n.msg.right .avatar{margin-left:26px;}\n.msg .bubble{\n  padding:30px 38px;\n  font-size:50px;line-height:1.4;font-weight:500;\n  position:relative;\n  max-width:920px;word-break:break-word;white-space:pre-wrap;\n  box-shadow:0 2px 4px rgba(0,0,0,0.08);\n}\n.msg.left .bubble{background:var(--bubble-left);color:var(--text);border-radius:12px 16px 16px 16px;}\n.msg.left .bubble::before{content:"";position:absolute;left:-10px;top:26px;border:8px solid transparent;border-right-color:var(--bubble-left);}\n.msg.right .bubble{background:var(--bubble-right);color:var(--text);border-radius:16px 12px 16px 16px;}\n.msg.right .bubble::after{content:"";position:absolute;right:-10px;top:26px;border:8px solid transparent;border-left-color:var(--bubble-right);}\n\n/* \u8F93\u5165\u680F */\n\n/* \u5F00\u573A 3-5s \u540E\u9690\u85CF UI\uFF08\u7528\u6237 2026-08-11 \u5B9A\u7A3F\uFF1A\u53EA\u7559\u5934\u50CF+\u6C14\u6CE1\u6D88\u606F\u6761\uFF09 */\n.ui-hidden{ opacity:0 !important; transform:translateY(-40px); pointer-events:none; }\n#input-bar.ui-hidden{ transform:translateY(40px); }\n#input-bar .voice-btn{width:66px;height:66px;border-radius:50%;border:2px solid #888;display:flex;align-items:center;justify-content:center;font-size:32px;color:#555;}\n#input-bar .input-box{flex:1;height:66px;background:#fff;border-radius:8px;border:1px solid #ddd;}\n#input-bar .emoji{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:38px;color:#555;}\n#input-bar .plus{width:56px;height:56px;border-radius:50%;border:2px solid #888;display:flex;align-items:center;justify-content:center;font-size:40px;color:#555;}\n\n/* \u906E\u7F69\u53D8\u6697 */\n#dim{\n  position:absolute;left:0;right:0;top:0;bottom:0;\n  background:rgba(0,0,0,0);\n  pointer-events:none;z-index:80;\n}\n\n/* hook \u5927\u9EC4\u5B57\uFF1A\u4E0A\u65B9\u91CD\u70B9\u4FE1\u606F\u533A\uFF08\u4E0B\u79FB\uFF0Ctop 240 \u9644\u8FD1\uFF09 */\n.hook{\n  position:absolute;\n  left:0;right:0;top:240px;\n  text-align:center;\n  font-size:230px;font-weight:900;\n  color:var(--hook-yellow);\n  text-shadow:\n    -7px -7px 0 #000, 7px -7px 0 #000,\n    -7px 7px 0 #000, 7px 7px 0 #000,\n    0 0 60px rgba(0,0,0,0.95);\n  opacity:0;\n  letter-spacing:-8px;\n  pointer-events:none;\n  white-space:nowrap;overflow:hidden;\n  text-overflow:ellipsis;\n  padding:0 40px;\n  /* v7 \u6296\u97F3\u98CE\uFF1A\u5165\u573A\u5E26\u503E\u659C\uFF08renderAt \u91CC\u901A\u8FC7 transform rotate \u5B9E\u65F6\u53E0\u52A0\uFF09 */\n  transform:translateY(-50%) scale(0.4) rotate(-3deg);\n  z-index:100;\n}\n\n/* \u8868\u60C5\u5305 sticker\uFF1A\u53EF\u6A2A\u8DE8\u4E0A\u4E0B\u9ED1\u8FB9\u5F39\u51FA\uFF08v7 \u6296\u97F3\u98CE\uFF09\n   y < 80 \u6216 y > 1700 \u65F6\u4F1A\u51FA\u73B0\u5728\u9ED1\u8FB9\u533A\uFF0C\u914D\u5408\u503E\u659C\u5165\u573A */\n.sticker{\n  position:absolute;\n  width:380px;height:380px;  /* v7 \u7565\u653E\u5927\uFF0C\u66F4\u50CF\u6296\u97F3\u539F\u7248 */\n  opacity:0;\n  pointer-events:none;\n  transform:scale(0.3) rotate(-12deg);  /* v7 \u6296\u97F3\u98CE\uFF1A\u9ED8\u8BA4\u503E\u659C 12\xB0\uFF0CrenderAt \u91CC\u52A8\u6001\u65CB\u8F6C */\n  z-index:90;\n  background-size:contain;background-repeat:no-repeat;background-position:center;\n}\n\n/* \u7EFF\u8272\u5149\u67F1\uFF1A\u4E0A\u65B9\u91CD\u70B9\u533A\u964D\u4E0B */\n.light-beam{\n  position:absolute;\n  left:50%;top:200px;\n  width:180px;height:0;\n  transform:translateX(-50%);\n  background:linear-gradient(to bottom, rgba(127,255,0,0.9), rgba(127,255,0,0));\n  filter:blur(18px);\n  opacity:0;\n  pointer-events:none;z-index:70;\n}\n\n/* \u6587\u5B57\u7279\u5199\u5C42\uFF1A\u4E0A\u65B9\u91CD\u70B9\u4FE1\u606F\u533A */\n.text-zoom{\n  position:absolute;\n  left:0;right:0;top:330px;\n  text-align:center;\n  font-size:170px;font-weight:900;\n  color:var(--text);\n  opacity:0;\n  pointer-events:none;\n  transform:translateY(-50%) scale(0.5);\n  z-index:95;\n}\n.text-zoom.left{color:#fff;text-shadow:0 4px 20px rgba(0,0,0,0.5);}\n.text-zoom.right{color:#95ec69;text-shadow:0 4px 20px rgba(0,0,0,0.5);}\n\n/* \u767D\u6761\u8F6C\u573A */\n.flash-bar{\n  position:absolute;left:-200px;right:-200px;top:50%;\n  height:0;background:#fff;\n  transform:translateY(-50%) rotate(-5deg);\n  opacity:0;pointer-events:none;z-index:200;\n}\n\n/* v8 \u5927\u52A8\u753B\uFF1A\u5168\u5C4F\u51B2\u51FB\u6CE2\uFF08\u5927\u52A8\u753B\u6D88\u606F\u8FDB\u5165\u65F6\u6269\u6563\u4E00\u5708\uFF0C\u827A\u672F\u611F\uFF09 */\n.shockwave{\n  position:absolute;left:50%;top:50%;\n  width:60px;height:60px;\n  border-radius:50%;\n  background:radial-gradient(circle, rgba(255,230,0,0.55) 0%, rgba(255,230,0,0.15) 45%, rgba(255,230,0,0) 70%);\n  transform:translate(-50%,-50%) scale(0.1);\n  opacity:0;pointer-events:none;z-index:150;\n}\n\n/* v8 \u5927\u52A8\u753B\uFF1A\u5168\u5C4F\u659C\u5207\u5149\u5E26\uFF08\u5927\u52A8\u753B\u6D88\u606F\u8FDB\u5165\u65F6\u626B\u8FC7\uFF09 */\n.light-sweep{\n  position:absolute;left:-40%;right:-40%;top:-20%;bottom:-20%;\n  background:linear-gradient(100deg, transparent 42%, rgba(255,255,255,0.14) 50%, transparent 58%);\n  transform:translateX(-110%) rotate(-8deg);\n  opacity:0;pointer-events:none;z-index:140;\n}\n\n/* \u5B57\u5E55\u5C42\uFF08\u7528\u6237 2026-08-11 \u5B9A\u7A3F\uFF09\uFF1A\u8BF4\u5531\u6B4C\u8BCD\u5B57\u5E55 = \u804A\u5929\u6587\u5B57\uFF0C\u6BCF\u6761 \u226415 \u5B57\uFF1B\u4E0A\u79FB\u5230\u804A\u5929\u6846\u4E0B\u65B9 */\n#subtitle{\n  position:absolute;left:0;right:0;bottom:340px;\n  text-align:center;\n  font-size:60px;font-weight:800;\n  color:#ffffff;\n  text-shadow:\n    -4px -4px 0 #000, 4px -4px 0 #000,\n    -4px 4px 0 #000, 4px 4px 0 #000,\n    0 0 24px rgba(0,0,0,0.9);\n  opacity:0;\n  pointer-events:none;\n  z-index:110;\n  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\n  padding:0 60px;\n  letter-spacing:2px;\n}\n');
    const node = document.createElement("div");
    node.innerHTML = '\n<div id="canvas">\n  <div id="phone">\n    <div id="messages"></div>\n  </div>\n  <div id="dim"></div>\n  <div id="overlays"></div>\n  <div class="flash-bar"></div>\n  <div class="shockwave" id="shockwave"></div>\n  <div class="light-sweep" id="lightSweep"></div>\n  <div id="subtitle"></div>\n</div>\n\n';
    host.root.appendChild(node);
    const window = { __SCRIPT__: script, __ASSETS__: assets, __CURRENT_MS__: 0 };
    const retired = [];
    const setTimeout = (fn) => {
      retired.push(fn);
    };
    const SCRIPT = window.__SCRIPT__ || {};
    const ASSETS = window.__ASSETS__ || {};
    const HEADER = SCRIPT.header || { back: "<", name: "\u4E13\u5BB6\u8001\u5F20" };
    const AVATARS = SCRIPT.avatars || {};
    const CHARACTERS = {};
    (SCRIPT.characters || []).forEach((c) => CHARACTERS[c.id] = c);
    const nameEl = document.querySelector("#nav-bar .name");
    if (nameEl) nameEl.textContent = HEADER.name || "\u4E13\u5BB6\u8001\u5F20";
    const timeEl = document.querySelector("#status-bar .time");
    if (timeEl && SCRIPT.statusTime) timeEl.textContent = SCRIPT.statusTime;
    const batteryEl = document.querySelector("#status-bar .battery .num");
    if (batteryEl && SCRIPT.battery) batteryEl.textContent = SCRIPT.battery;
    function setAvatar(el, charId) {
      const src = ASSETS[AVATARS[charId]];
      if (src) el.style.backgroundImage = `url(${src})`;
      else el.textContent = CHARACTERS[charId] && CHARACTERS[charId].name ? CHARACTERS[charId].name[0] : "?";
    }
    const msgMap = {};
    const msgsContainer = document.getElementById("messages");
    const elements = SCRIPT.elements || [];
    const MSG_CENTER_Y = 280;
    let msgIndex = 0;
    const bubbleList = [];
    elements.forEach((el) => {
      if (el.type === "bubble" || el.type === "stack") {
        const char = CHARACTERS[el.from] || { side: "left" };
        const side = char.side || "left";
        const div = document.createElement("div");
        div.className = `msg ${side}`;
        const y = MSG_CENTER_Y;
        div.style.position = "absolute";
        div.style.left = "0";
        div.style.right = "0";
        div.style.top = y + "px";
        div.innerHTML = `<div class="row"><div class="avatar"></div><div class="bubble">${el.text || ""}</div></div>`;
        setAvatar(div.querySelector(".avatar"), el.from);
        msgsContainer.appendChild(div);
        msgMap[el.id] = { el, node: div, y };
        bubbleList.push({ id: el.id, node: div, y, side });
        el._msgIndex = msgIndex;
        msgIndex++;
      }
    });
    const overlays = document.getElementById("overlays");
    const hookMap = {};
    const stickerMap = {};
    const beamMap = {};
    const zoomMap = {};
    elements.forEach((el) => {
      if (el.type === "hook") {
        const div = document.createElement("div");
        div.className = "hook";
        div.textContent = el.text || "";
        overlays.appendChild(div);
        hookMap[el.id] = { el, node: div };
      } else if (el.type === "sticker") {
        const div = document.createElement("div");
        div.className = "sticker";
        const src = ASSETS[el.src];
        if (src) {
          div.style.backgroundImage = `url(${src})`;
        } else if (el.emoji) {
          div.textContent = el.emoji;
          div.style.display = "flex";
          div.style.alignItems = "center";
          div.style.justifyContent = "center";
          div.style.fontSize = (el.emojiSize || 200) + "px";
          div.style.lineHeight = "1";
        }
        div.style.left = (el.x !== void 0 ? el.x : 100) + "px";
        div.style.top = (el.y !== void 0 ? el.y : 300) + "px";
        overlays.appendChild(div);
        stickerMap[el.id] = { el, node: div };
      } else if (el.type === "beam") {
        const div = document.createElement("div");
        div.className = "light-beam";
        overlays.appendChild(div);
        beamMap[el.id] = { el, node: div };
      } else if (el.type === "textzoom") {
        const div = document.createElement("div");
        div.className = "text-zoom " + (el.side || "left");
        div.textContent = el.text || "";
        overlays.appendChild(div);
        zoomMap[el.id] = { el, node: div };
      }
    });
    let dimOpacity = 0;
    function applyDim() {
      const dim = document.getElementById("dim");
      if (dim) dim.style.background = `rgba(0,0,0,${dimOpacity})`;
    }
    function applyPhoneMotion(emotion, t, dur, breathPhase) {
      const phone = document.getElementById("phone");
      if (!phone) return;
      const em = emotion || "normal";
      const decay = Math.max(0, 1 - t / (dur * 0.8));
      let breath = 1 + 8e-3 * Math.sin(breathPhase % 4e3 / 4e3 * Math.PI * 2);
      let pulse = 1;
      if (t >= 0 && t < 450) {
        const p = t / 450;
        pulse = 1 + 0.03 * Math.sin(p * Math.PI);
      }
      let transform = "";
      let extra = {};
      if (em === "surprise") {
        if (t < 700 && decay > 0) {
          const s = Math.sin(t / 38) * 0.07 * decay;
          transform = `scaleX(${breath + s})`;
        } else {
          transform = `scale(${breath * pulse})`;
        }
        if (t > 180 && t < 900) extra.boxShadow = "inset 0 0 0 6px #000, 14px 0 0 -3px #fff, -14px 0 0 -3px #fff, 0 0 40px rgba(0,0,0,0.5)";
      } else if (em === "excited") {
        transform = `scale(${breath * pulse})`;
        extra.borderRadius = "0 0 140px 140px";
      } else if (em === "angry") {
        transform = `scale(${breath * pulse})`;
        extra.filter = "saturate(1.2) brightness(0.92) contrast(1.05)";
      } else if (em === "sad") {
        transform = `scale(${breath * pulse * 0.98})`;
        extra.filter = "saturate(0.75) brightness(0.96)";
      } else if (em === "laugh") {
        transform = `scale(${breath * pulse})`;
      } else if (em === "zoom") {
        const z = 1 + 0.05 * decay * Math.max(0, Math.sin(Math.PI * Math.min(1, t / 900)));
        transform = `scale(${breath * pulse * z})`;
      } else {
        const wobbleScale = 1 + 0.012 * Math.sin(breathPhase % 1800 / 1800 * Math.PI * 2);
        transform = `scale(${breath * pulse * wobbleScale})`;
      }
      phone.style.transform = transform;
      phone.style.boxShadow = extra.boxShadow || "none";
      phone.style.borderRadius = extra.borderRadius || "0";
      phone.style.filter = extra.filter || "none";
    }
    function easeOutBack(t) {
      const c1 = 1.70158, c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    function easeOutElastic(t) {
      const c4 = 2 * Math.PI / 3;
      return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    }
    function easeOutBounce(t) {
      const n1 = 7.5625, d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
    const ANIM_IN = 80;
    const UI_HIDE_AT = 3500;
    const KEEP_LIMIT = 5;
    const WOBBLE_AMP = 1.6;
    const ROT_AMP = 1.5;
    const ENTER_TYPES = ["drop-in", "fly-left", "fly-right", "spin-in", "slam", "zoom-punch", "pop", "flip-in", "bounce-in", "slide-up"];
    const ENTER_MS = 550;
    const EXIT_TYPES = ["fly-out-left", "fly-out-right", "drop-out", "fade-out"];
    const EXIT_MS = 450;
    function enterTypeFor(idx) {
      return ENTER_TYPES[(idx * 2654435761 >>> 0) % ENTER_TYPES.length];
    }
    function exitTypeFor(idx) {
      return EXIT_TYPES[(idx * 40503 + idx * idx * 17 >>> 0) % EXIT_TYPES.length];
    }
    function enterTransform(type, side, t, scrollY) {
      const p = Math.min(1, t / ENTER_MS);
      const s = side === 1 ? 1 : -1;
      let tx = 0, ty = 0, rot = 0, sc = 1;
      if (type === "drop-in") {
        const e = easeOutBounce(p);
        ty = (1 - e) * -900;
        rot = s * 12 * (1 - p);
        sc = 0.7 + 0.3 * e;
      } else if (type === "fly-left") {
        const e = easeOutBack(p);
        tx = (1 - e) * -1100;
        rot = 10 * (1 - p);
        sc = 0.5 + 0.5 * e;
      } else if (type === "fly-right") {
        const e = easeOutBack(p);
        tx = (1 - e) * 1100;
        rot = -10 * (1 - p);
        sc = 0.5 + 0.5 * e;
      } else if (type === "spin-in") {
        const e = easeOutBack(p);
        rot = s * 540 * (1 - e);
        ty = (1 - e) * 260;
        sc = 0.3 + 0.7 * e;
      } else if (type === "slam") {
        const e = easeOutBounce(p);
        ty = (1 - e) * 900;
        rot = s * 14 * (1 - p);
        sc = 0.6 + 0.4 * e;
      } else if (type === "zoom-punch") {
        const e = easeOutCubic(p);
        const punch = Math.sin(p * Math.PI);
        sc = 0.3 + 0.85 * e + 0.12 * punch * (1 - p);
        rot = s * 6 * (1 - p);
      } else if (type === "flip-in") {
        const e = easeOutBack(p);
        sc = 0.4 + 0.6 * e;
        rot = s * 180 * (1 - e);
        ty = (1 - e) * -120;
      } else if (type === "bounce-in") {
        const e = easeOutBounce(p);
        ty = (1 - e) * -240;
        sc = 0.5 + 0.5 * e;
      } else if (type === "slide-up") {
        const e = easeOutCubic(p);
        ty = (1 - e) * 300;
        rot = s * 8 * (1 - p);
        sc = 0.6 + 0.4 * e;
      } else {
        const e = easeOutBack(Math.min(1, t / ANIM_IN));
        tx = s * 60 * (1 - e);
        rot = s * ROT_AMP * (1 - e);
        sc = 0.85 + 0.15 * e;
      }
      return `translateY(${-scrollY + ty}px) translateX(${tx}px) scale(${sc}) rotate(${rot}deg)`;
    }
    function exitTransform(type, side, t, scrollY) {
      const p = Math.min(1, t / EXIT_MS);
      const s = side === 1 ? 1 : -1;
      let tx = 0, ty = 0, rot = 0, sc = 1;
      if (type === "fly-out-left") {
        tx = p * -1e3;
        rot = -12 * p;
        sc = 1 - 0.2 * p;
      } else if (type === "fly-out-right") {
        tx = p * 1e3;
        rot = 12 * p;
        sc = 1 - 0.2 * p;
      } else if (type === "drop-out") {
        ty = p * 900;
        rot = s * 20 * p;
        sc = 1 - 0.1 * p;
      } else {
        sc = 1 - 0.3 * p;
      }
      return `translateY(${-scrollY + ty}px) translateX(${tx}px) scale(${sc}) rotate(${rot}deg)`;
    }
    const HOOK_ROT = 3;
    const BIG_EVERY = 4;
    const BIG_ANIM_MS = 650;
    const BIG_TYPES = ["fly-in", "spin-in", "slam", "zoom-punch"];
    function bigTransform(type, side, t, scrollY) {
      const p = Math.min(1, t / BIG_ANIM_MS);
      let tx = 0, ty = 0, rot = 0, sc = 1;
      const s = side === 1 ? 1 : -1;
      if (type === "fly-in") {
        const e = easeOutBack(p);
        tx = s * 1100 * (1 - e);
        ty = (1 - e) * -180;
        rot = s * 28 * (1 - e);
        sc = 0.5 + 0.5 * e;
      } else if (type === "spin-in") {
        const e = easeOutBack(p);
        rot = s * 540 * (1 - e);
        ty = (1 - e) * 260;
        sc = 0.3 + 0.7 * e;
      } else if (type === "slam") {
        const e = easeOutBounce(p);
        ty = (1 - e) * 900;
        rot = s * 14 * (1 - p);
        sc = 0.6 + 0.4 * e;
      } else if (type === "zoom-punch") {
        const e = easeOutCubic(p);
        const punch = Math.sin(p * Math.PI);
        sc = 0.3 + 0.85 * e + 0.12 * punch * (1 - p);
        rot = s * 6 * (1 - p);
      }
      return `translateY(${-scrollY + ty}px) translateX(${tx}px) scale(${sc}) rotate(${rot}deg)`;
    }
    const BEATS = (SCRIPT._beats || []).map((b) => b.t_ms);
    function nearestBeat(ms) {
      if (!BEATS.length) return ms;
      let best = BEATS[0];
      for (const bt of BEATS) {
        if (Math.abs(bt - ms) < Math.abs(best - ms)) best = bt;
      }
      return best;
    }
    window.renderAt = function(currentMs) {
      const uiHidden = currentMs > UI_HIDE_AT;
      ["#status-bar", "#nav-bar", "#input-bar"].forEach((sel) => {
        const el = document.querySelector(sel);
        if (el) {
          if (uiHidden) {
            el.style.display = "none";
          } else {
            el.style.display = "";
          }
        }
      });
      const msgsC = document.getElementById("messages");
      if (msgsC) {
        if (uiHidden) {
          msgsC.style.top = "30px";
          msgsC.style.bottom = "30px";
        } else {
          msgsC.style.top = "156px";
          msgsC.style.bottom = "110px";
        }
      }
      const phoneEl = document.getElementById("phone");
      if (phoneEl) phoneEl.style.background = uiHidden ? "transparent" : "";
      const flashBar = document.querySelector(".flash-bar");
      if (flashBar) {
        flashBar.style.height = "0";
        flashBar.style.opacity = "0";
      }
      const shockEl = document.getElementById("shockwave");
      const sweepEl = document.getElementById("lightSweep");
      if (shockEl) {
        shockEl.style.opacity = "0";
        shockEl.style.transform = "translate(-50%,-50%) scale(0.1)";
      }
      if (sweepEl) {
        sweepEl.style.opacity = "0";
        sweepEl.style.transform = "translateX(-110%) rotate(-8deg)";
      }
      Object.values(hookMap).forEach((h) => {
        h.node.style.opacity = "0";
        h.node.style.transform = "translateY(-50%) scale(0.4)";
      });
      Object.values(stickerMap).forEach((s) => {
        s.node.style.opacity = "0";
        s.node.style.transform = "scale(0.3) rotate(-20deg)";
      });
      Object.values(beamMap).forEach((b) => {
        b.node.style.opacity = "0";
        b.node.style.height = "0";
      });
      Object.values(zoomMap).forEach((z) => {
        z.node.style.opacity = "0";
        z.node.style.transform = "translateY(-50%) scale(0.5)";
      });
      dimOpacity = 0;
      let activeEl = null;
      let activeElT = -Infinity;
      elements.forEach((el) => {
        const t = currentMs - el.start_ms;
        const dur = el.duration_ms || 2e3;
        if ((el.type === "bubble" || el.type === "stack") && msgMap[el.id] && t >= 0 && t < dur + ANIM_IN + 300) {
          if (el.start_ms > activeElT) {
            activeElT = el.start_ms;
            activeEl = el;
          }
        }
      });
      const activeIdx = activeEl ? activeEl._msgIndex : -1;
      let scrollY = 0;
      bubbleList.forEach((b) => {
        const el = msgMap[b.id].el;
        const side = b.side === "right" ? 1 : -1;
        const t = currentMs - el.start_ms;
        const enterEnd = ENTER_MS;
        const stayEnd = enterEnd + (el.duration_ms || 2e3);
        const exitEnd = stayEnd + EXIT_MS;
        const keepDecided = (el._msgIndex * 13 + 5) % 2 === 0;
        const keepSlot = el._msgIndex % 4;
        const keepLift = 40 + keepSlot * 120;
        if (t < 0) {
          b.node.style.opacity = "0";
          b.node.style.transform = `translateY(${-scrollY}px)`;
        } else if (t < enterEnd) {
          const eType = enterTypeFor(el._msgIndex);
          b.node.style.opacity = "1";
          b.node.style.transform = enterTransform(eType, side, t, scrollY);
          const shock = document.getElementById("shockwave");
          const sweep = document.getElementById("lightSweep");
          if (shock) {
            const sp = t / 420;
            shock.style.opacity = String(Math.max(0, 1 - sp) * 0.9);
            shock.style.transform = `translate(-50%,-50%) scale(${0.1 + 14 * Math.min(1, sp)})`;
          }
          if (sweep) {
            const swp = Math.min(1, t / 500);
            sweep.style.opacity = String(Math.sin(swp * Math.PI) * 0.8);
            sweep.style.transform = `translateX(${-110 + 220 * swp}%) rotate(-8deg)`;
          }
        } else if (t < stayEnd) {
          const wobbleX = Math.sin(t / 80) * WOBBLE_AMP * Math.max(0, 1 - t / 900);
          const wobbleY = Math.cos(t / 90) * WOBBLE_AMP * Math.max(0, 1 - t / 900);
          b.node.style.opacity = "1";
          b.node.style.transform = `translateY(${-scrollY + wobbleY}px) translateX(${wobbleX}px)`;
        } else if (t < exitEnd) {
          if (keepDecided) {
            const kt = t - stayEnd;
            const kp = Math.min(1, kt / EXIT_MS);
            const e = easeOutCubic(kp);
            const wb = Math.sin(kt / 110) * 2.2;
            const swayX = side * Math.sin(kt / 130) * 14 * kp;
            const rot = side * 4 * kp + Math.sin(kt / 150) * 1.5;
            b.node.style.opacity = String(1 - 0.25 * kp);
            b.node.style.transform = `translateY(${-scrollY - keepLift * e + wb}px) translateX(${swayX}px) scale(${1 - 0.05 * kp}) rotate(${rot}deg)`;
          } else {
            const xType = exitTypeFor(el._msgIndex);
            const xt = t - stayEnd;
            const xp = Math.min(1, xt / EXIT_MS);
            b.node.style.opacity = String(1 - xp);
            b.node.style.transform = exitTransform(xType, side, xt, scrollY);
          }
        } else {
          if (keepDecided) {
            const ageFromActive = activeIdx >= 0 && el._msgIndex !== void 0 ? activeIdx - el._msgIndex : 0;
            if (ageFromActive > KEEP_LIMIT - 1) {
              b.node.style.opacity = "0";
              b.node.style.transform = `translateY(${-scrollY}px)`;
            } else {
              const wb = Math.sin(t / 130) * 2.5;
              const swayX = side * Math.sin(t / 160) * 8;
              const rot = side * 3 + Math.sin(t / 170) * 2;
              b.node.style.opacity = "0.75";
              b.node.style.transform = `translateY(${-scrollY - keepLift + wb}px) translateX(${swayX}px) scale(0.95) rotate(${rot}deg)`;
            }
          } else {
            b.node.style.opacity = "0";
            b.node.style.transform = `translateY(${-scrollY}px)`;
          }
        }
      });
      if (activeEl) {
        const t = currentMs - activeEl.start_ms;
        applyPhoneMotion(activeEl.emotion, t, activeEl.duration_ms || 2e3, currentMs);
      } else {
        const phone = document.getElementById("phone");
        if (phone) {
          phone.style.transform = "";
          phone.style.boxShadow = "none";
          phone.style.borderRadius = "0";
          phone.style.filter = "none";
        }
      }
      const subtitleEl = document.getElementById("subtitle");
      if (subtitleEl) {
        if (activeEl && msgMap[activeEl.id]) {
          let subText = msgMap[activeEl.id].el.text || "";
          subText = subText.split("\n")[0].replace(/[？？!！.。…]+$/, "");
          if (subText.length > 15) subText = subText.slice(0, 15) + "\u2026";
          const subStart = nearestBeat(activeEl.start_ms);
          let subEnd = subStart + (activeEl.duration_ms || 2e3);
          const nextEl = elements.filter((e) => (e.type === "bubble" || e.type === "stack") && msgMap[e.id] && e.start_ms > activeEl.start_ms).sort((a, b) => a.start_ms - b.start_ms)[0];
          if (nextEl) subEnd = nearestBeat(nextEl.start_ms);
          if (currentMs >= subStart && currentMs < subEnd) {
            subtitleEl.textContent = subText;
            subtitleEl.style.opacity = "1";
          } else {
            subtitleEl.style.opacity = "0";
          }
        } else {
          subtitleEl.style.opacity = "0";
        }
      }
      elements.forEach((el) => {
        const t = currentMs - el.start_ms;
        const dur = el.duration_ms || 2e3;
        if (el.type === "stack" && msgMap[el.id]) {
          const m = msgMap[el.id];
          const repeat = el.repeat || 1;
          const step = el.step_ms || 200;
          for (let i = 0; i < repeat; i++) {
            const st = t - i * step;
            if (st >= 0 && st < dur + ANIM_IN) {
              const clone = m.node.cloneNode(true);
              clone.style.position = "absolute";
              const sideOff = (m.node.classList.contains("right") ? 1 : -1) * i * 25;
              clone.style.left = parseFloat(m.node.style.left || 0) + sideOff + "px";
              clone.style.top = m.y + i * 45 + "px";
              clone.style.zIndex = 10 + i;
              const p = Math.min(1, st / ANIM_IN);
              const e = easeOutBack(p);
              const rotOff = (m.node.classList.contains("right") ? 1 : -1) * 8 * (1 - e);
              clone.style.transform = `translateY(${-scrollY + (1 - e) * 40}px) scale(${0.6 + 0.4 * e}) rotate(${rotOff}deg)`;
              clone.style.opacity = String(e * 0.95);
              msgsContainer.appendChild(clone);
              setTimeout(() => {
                if (clone.parentNode) clone.parentNode.removeChild(clone);
              }, 50);
            }
          }
        }
        if (el.type === "hook" && hookMap[el.id]) {
          if (t >= 0 && t < dur + 600) {
            const p = Math.min(1, t / 380);
            const e = easeOutElastic(p);
            const h = hookMap[el.id].node;
            h.style.opacity = String(Math.min(1, e));
            const hookRot = -14 * (1 - Math.min(1, t / 300)) + Math.sin(t / 90) * 1.5;
            const hookScale = 0.3 + 0.85 * e;
            h.style.transform = `translateY(-50%) scale(${hookScale}) rotate(${hookRot}deg)`;
            dimOpacity = Math.max(dimOpacity, 0.5);
          }
        }
        if (el.type === "sticker" && stickerMap[el.id]) {
          if (t >= 0 && t < dur + 400) {
            const p = Math.min(1, t / 200);
            const e = easeOutBack(p);
            const s = stickerMap[el.id].node;
            s.style.opacity = String(e);
            const stickerRot = (1 - e) * -20 + Math.sin(t / 120) * 4;
            s.style.transform = `scale(${0.3 + 0.7 * e}) rotate(${stickerRot}deg)`;
          }
        }
        if (el.type === "beam" && beamMap[el.id]) {
          if (t >= 0 && t < dur + 800) {
            const p = Math.min(1, t / 500);
            const e = easeOutCubic(p);
            const b = beamMap[el.id].node;
            b.style.opacity = String(0.8 * e);
            b.style.height = 500 * e + "px";
          }
        }
        if (el.type === "textzoom" && zoomMap[el.id]) {
          if (t >= 0 && t < dur + 500) {
            const p = Math.min(1, t / 300);
            const e = easeOutBack(p);
            const z = zoomMap[el.id].node;
            z.style.opacity = String(e);
            z.style.transform = `translateY(-50%) scale(${0.5 + 0.5 * e})`;
            dimOpacity = Math.max(dimOpacity, 0.35);
          }
        }
        if (el.type === "flash" && t >= 0 && t < dur) {
          const fb = document.querySelector(".flash-bar");
          const p = t / dur;
          const fade = Math.sin(p * Math.PI);
          fb.style.height = 80 * fade + "px";
          fb.style.opacity = String(fade);
        }
      });
      applyDim();
    };
    window.renderAt(window.__CURRENT_MS__ || 0);
    return { renderAt(ms) {
      for (const fn of retired.splice(0)) fn();
      window.renderAt(ms);
    }, dispose() {
      for (const fn of retired.splice(0)) fn();
      node.remove();
    } };
  }
  return __toCommonJS(chat_rap_video_entry_exports);
})();

return NativeModule;
};
