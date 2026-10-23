# 新增风格的来源与修正

核对及接入记录：2026-10-22、2026-10-23。工作分支：`feature/teaching-and-flexible-styles`，修正前版本 `80c8561`。下文保留各阶段记录，当前接入状态见文末。

## 为什么试跑不像原项目

`a6d7cde` 的 25 套新增风格由 `.local/style-gen/gen_styles.mjs` 从官网目录生成。它读取四格色卡、文案和母题，再生成配色、CSS、说明卡和三页样片；没有导入被署名项目的绘图引擎。示例主要调用同一套 RoughJS 基础图形，改变色卡和提示词不足以产生蜡笔笔压、雕刻排线、等距遮挡或统一角色。

更直接的问题是语义色错配。生成器按色卡位置分配颜色名：`metro` 的 `red` 其实是蓝、`blue` 其实是绿；`mascot` 的 `orange` 是绿；`crayon` 的 `ink` 是红、`red` 是黄。页面按正确的颜色名作画，渲染器却给出了错误颜色。官网海报和远程悬停视频进一步放大了预期差距。

旧蜡笔样片还有内容错误：讲月相时写成“地球的影子盖住月亮”，画的却是房子。新样片改为实际绘图能力演示，不再承载这段错误科普。

“官网署名某项目的技法”不能推导为“整套模板源代码已经公开或已移植”。本分支原来文档中的“与官网一致”和无依据的“Frametell 自有”已改正。

## 哪些风格能对应到公开项目

以下对应关系来自用户提供的共享会话及其中整理的官网署名。这一列描述官网参考关系，右列才是本轮真正接入的代码或本地实现。

| 官网风格 / 本地 id | 对应项目 | 本轮实际实现与边界 |
| --- | --- | --- |
| `vector` | huashu-art-motion | 两色扁平小鸟组件；接入原项目 PAINT 工具。鸟与场景是本地适配，未搬运原片全套场景 |
| `ink-wash` | huashu-art-motion | 淡墨山形、浓墨轮廓；接入原项目确定性 roughPath / noise 工具。未移植整套水墨镜头 |
| `swiss` | huashu-art-motion | 网格标题、字号与镜头节奏组件；PAINT 可用。排版与编舞为本地适配 |
| `pop` | huashu-art-motion | 网点填色、重墨分镜、爆炸框；PAINT 可用。未移植完整原片 |
| `broadsheet` | huashu-art-motion | 衬线报纸标题、同尺度数据列、口播时序；PAINT 可用。未移植原项目金融场景 |
| `collage` | huashu-art-motion | 带种子的毛边剪纸、胶带、阴影、线索连接；PAINT 可用。照片仍由影片提供 |
| `instrument` | Anatomy | 原生 `iso-kit.mjs` 的投影、挤出、可见面与明暗；新增啮合齿轮。没有声称移植完整发动机/变速箱仿真 |
| `inked` | April Zhu 官方 Colorfigures | 官方下载包 `assets/core.js` 中的投影、几何、受光与墨线；隔离原页面壳，适配 Frametell 时序 |
| `engraving` | Lemo-Opuscar `styles/engraving` | 原生 `burin.js`：有顺序的刻线、形体明暗场、排线和交叉线。未移植整套铜版、刻刀音效、湿染与片尾 |
| `midcentury` | Lemo-Opuscar `styles/midcentury-toon` | 原生 `toon.js`：色版/墨线分离、断线、纸齿、12fps 错版抖动与双版文字。未搬运原片人物资产和完整转场 |
| `crayon` | Lemo-Opuscar `styles/crayon-book` | 原生 `crayon.js` 与 `core/lib.js`：笔压带、收尖、条纹、来回涂色、越界和 12fps 沸腾；纸齿附着公式适配到透明 Canvas2D。未移植整套 WebGL 湿染/拒水与翻书引擎 |
| `old-map` | Natural Earth，经 world-atlas | world-atlas 2.0.2 的真实陆地轮廓，解码并简化后接入航船路线。小岛省略，无国界；只作总览插画 |

公开项目地址：

- huashu-art-motion：<https://github.com/alchaincyf/huashu-art-motion>
- Anatomy：<https://github.com/wheresryan22/anatomy>
- 官方 Colorfigures：<https://april-zhu.com/colorfigures>，下载包 <https://april-zhu.com/colorfigures/colorfigures.zip>
- Lemo-Opuscar：<https://github.com/lemomo-ai/lemo-opuscar>
- world-atlas：<https://github.com/topojson/world-atlas>
- 用户参考会话：<https://chatgpt.com/s/cx_6ad717c5e2788191a0614d693e8c8459>

另外 13 套 `math, neon, watercolor, isotype, clay, one-line, screencast, isometric, blueprint, mascot, chat, manga, metro` 没有从参考会话确认到完整官网源码。本轮为它们实现本地组件，不能把这些组件叫作官网完整复刻。本地 `isometric` 也复用了 Anatomy 投影，这是本轮的实现选择，不证明官网该风格使用 Anatomy。

开源 Frametell 原有五套是 `warm-story, study, chalkboard, whiteboard, tech-dark`。其中 `study` 不在官网 29 项里；本分支另有每片设计外观的 `editorial`。31 个可选 id 与 31 套完整官网引擎是不同概念。

## devbox3 实跑记录

部署目录 `/home/xushuaiwu/frametell` 是无 `.git` 的快照；本轮调查时服务由 `.local/bin/frametell-serve.mjs` 启动，监听 5317。已查询的 home 与常用 skills 目录没有发现上述上游项目的独立部署，因此这里确认的是 Frametell 作品记录，不把官网署名当作 devbox3 的部署凭据。

| 项目 id | 模板 | 主题 | 现场记录 |
| --- | --- | --- | --- |
| `2026-10-20-007eff97d866` | watercolor | 财富自由分类定义 | 无分镜，未完成 |
| `2026-10-21-4f98b8b5b354` | crayon | 为什么有闰年 | 4 页，有配音；第二页时间块拼接仍被审片标记；没有最终 mp4 |
| `2026-10-21-de905faf4c19` | mascot | 财富自由 | 无分镜 |
| `2026-10-21-7d2e17ed67b1` | metro | 为什么天空是蓝色的 | 2 页；两页仍 flagged，却已导出字幕/无字幕 mp4；颜色与文字范围有问题 |
| `2026-10-21-41427273956c` | mascot | 财富自由 | 无分镜 |
| `2026-10-21-bad871bd4916` | mascot | 财富自由，要自由到哪一步？ | 8 页，有配音；橙色对象变绿、角色裁切、文字重叠、字幕区越界；没有最终 mp4 |

已将三部完成绘图的作品复制到本地 `.local/style-repair/films/{leap-year,blue-sky,financial-freedom}`，保留原讲稿与配音时间轴，重画视觉页。闰年片复用太阳/轨道/日历，并让四块约 6 小时独立积木拼成一天；财富自由片复用同一只橙色熊、账本和钱袋；天空片复用线路组件，红光为红、蓝光为蓝。远程原片不作为修改工作目录。

原调度器在自检轮数用完后允许页面 `flagged`，全片复查结束仍进入 `done`；因此 `done` 或 `exported` 不是视觉验收通过的证据。本轮模板修正没有扩大为调度/导出策略重写。交付分别核对颜色、画材、角色、机制、布局、字幕与跳播确定性。

## 接入方式

- `style.js` 明确命名色，不再从色卡顺序推导；文字墨色与纸面有可读对比。
- `runtime/material.js` 同时处理静态图元和 `liveRough`，避免动态绘图绕开画材。
- `runtime/style-kit.js` 在 `style.js` 执行后加载 `STYLE.assets`、共享组件和 `STYLE.kit`；文件预览、浏览器预览和导出走同一路径。
- 画页上下文自动提取当前 `kit.js` 的接口注释；不依赖导演猜出一个没有提供的组件。
- 25 套说明卡和样片改为实际可调用的组件；样片海报来自本地引擎渲染。移除默认官网悬停视频。
- 视频缓存加入 vendor 画材、boot 与影片独立组件文件的内容；这些源文件变化后会重画，避免复用修正前的画面。
- 布局检查测量透明 Canvas 的实际颜料范围，避免把原生画材误判为背景；原有 SVG 与文字检查继续使用。

完整原项目通常还包含角色资产、镜头、声音、数据与操作语法。要继续向原项目靠近，应逐套选一部代表性作品，移植其真实能力并做视觉对照，不再通过批量色卡生成器扩目录数量。

## 本轮验证与交付

- 30 套有样片的风格通过分镜、布局与跳播确定性检查，包含新增的 25 套及原有样片。最后一轮仅 midcentury 占幅不足，调整样片后定向复验通过；没有放宽检查标准。
- 25 套组件与原生依赖均通过 `file://` 自动加载验证；命名色和正文对比通过检查。显式把 kit 写进 `META.extras` 的情况也已验证，组件只加载一次。共享适配层放在 runtime，原组件库的名称与样片覆盖检查通过。
- agent/core 测试没有失败项；最后修改的组件上下文单独重新编译并通过 4 项 pagepack 测试。视频缓存的集成测试确认：未改源码时复用，vendor 或影片独立组件改变后重画。
- 三部重绘作品的布局与确定性检查均为 `[]`。25 套样片海报已经用本地引擎更新，可通过 `.local/style-repair/style-overview.html` 查看全部预览；前后对照在 `.local/style-repair/before-after.jpg`。
- 三部 1920×1080、12fps 预览已导出字幕和无字幕两个版本，位于 `.local/style-repair/films/<name>/out/`。闰年约 50.8 秒，蓝天约 21.8 秒，财富自由约 139.2 秒；两部有原配音的作品从 devbox3 补齐音频后合成，蓝天沿用原作无配音设置。
- 从最终 mp4 解码检查，三部均没有片中空白段。蓝天最长静止约 8.7 秒，财富自由约 15.7 秒；这些是保留原讲稿时序的修复预览，仍有继续编排动作和镜头的空间。原生蜡笔持续有笔触沸腾，因此不能拿静止比例直接比较三种画材的质量。

当前交付是本地分支及重绘副本。devbox3 原服务和作品没有被覆盖，本轮没有提交或推送。模板样片检验了实际绘图能力，未替代新一轮模型自主生成的完整验收，也未证明与官网原片在角色、镜头和声音上完全一致。

## 接续检查

2026-10-22 接续原会话时，补查发现透明 Canvas 即使没有颜料，也会被开场和结尾检查计为可见画面。检查现已读取实际透明度；新增回归覆盖空白开场、提前清空的结尾和正常绘制的页面。受跨域限制无法读取像素的画布保留原几何检查，避免一块画布中断全片检查。

服务端目录和英文界面中的 25 套新增风格说明已对齐实际组件。数学公式变形、器具开门烧水、整套翻书引擎等尚未提供的效果，不再作为内置能力展示。

本地默认模型的真实探测返回 `overloaded_error`，提示请求超过限额，没有生成输出。因此自主生成验收仍需单独记录；该结果不代表模板渲染失败，也不能用现有人工重绘视频代替。

devbox3 当前选择 `anthropic/claude-gpt-6-astra`。一次最小请求收到了文本，但在 30 秒超时后以 `aborted` 结束，未取得正常完成状态。只收到文本片段同样不能判为完整生成成功；没有改动远端模型配置或原部署。

随后通过现有远端配置请求新画一页蜡笔画面，使用本地更新后的组件说明，并将完成等待延长到 180 秒。返回的 296 个字符全是 TRAE 排队通知，队位从 376 到 311，请求最后以 `aborted` 结束，没有输出页面源码。原始结果保存在 `.local/style-repair/autonomous-generation-result.json`；本轮没有新增可验收的模型生成影片。后续自主生成验收需要先确认网关已进入模型执行，排队通知不能当作模型正文。

修改后的检查已重新跑完全部 30 套样片，全部通过。组件上下文和 Studio 的 26 项测试、视频检测与缓存的 5 项测试、透明画布的新回归均通过，agent 与 UI 构建成功。服务端路由验证返回 31 个风格和 30 张可读取的本地海报，未附官网悬停视频。

## 固定来源与许可

保留的第三方模块在 `packages/engine/vendor/`，许可证在 `vendor/licenses/`。模块改为隔离的经典脚本，避免 `file://` ES 模块加载问题；原网站页面壳不接管 Frametell 的 DOM、播放器或时间轴。

| 来源 | 固定版本 |
| --- | --- |
| huashu-art-motion | `8a0d7d72ca65fcce6f8ba82c4a6c8dfe35b8422c`，MIT |
| Lemo-Opuscar | `b5e8ef93930b6d828f352055a689320f138237b1`，MIT |
| Anatomy | `1482e8469b0a9e0d8cc18ea2740a01423d29ae80`，MIT |
| Colorfigures | 官方下载包，2026-10-22 获取；`assets/core.js` SHA256 `a78aab94ab7396b99080bf72673d5d4d689d771764d76cb08f1a0d28033f7fc3`，MIT，保留三位作者声明 |
| world-atlas | `2.0.2/land-110m.json`，SHA256 `ead5f68119c49a9250902e7da303bcb209341bbb8fefe7369a439b48b704658a`，ISC；Natural Earth 数据为公有领域 |

`crayon.js` SHA256 `a756b3f06a6f850785b888e3871170a5c50877bc881816a4209126d6978d5f00`；`toon.js` 为 `261c79fa7aff5489a98d9e44f91659eae10e90d3bcb13a6e23e84098b709b0bf`；`burin.js` 为 `0c96d24e39b5ed275816fbaa8de993bc9a2a658d067e680728171150e5352242`；PAINT 原文件为 `95ccd1945a4a19b6e2d89a422d7ea7de96174acdbae1801090ca9ee48131f9a3`。

## 2026-10-23 逐套调用复核

当前工作树没有实现“每套新增模板都接入对应项目的完整画图引擎”。源码存在、脚本被加载、绘图时实际调用、完整模板移植是不同证据。下面按实际调用重新列明 25 套新增模板的状态。

核对方法：从 GitHub 的上述固定版本重新读取 PAINT、crayon、toon、burin、Anatomy 源码，与之前保存的来源文件逐一比较，五份内容全部一致。在临时作品副本中，通过 Frametell 的真实 `boot.js` 加载每套样片，代理记录第三方导出 API 的调用；每页取三个时间点，共 225 个采样时间点，25 套均未发现加载错误或引擎异常。原作品、模型配置与运行服务未改动。

| 模板 id | 实际调用或实现 | 判定 |
| --- | --- | --- |
| `crayon` | `CRAYON.fill/line/handCircle/text` | 复用原生蜡笔笔触；纸齿改为 Canvas2D 适配。缺少原项目 `gl.js` 合成、`rig.js` 角色遮挡、`sheet.js` 设定表、`end.js` 翻书系统 |
| `engraving` | `BURIN.shape/Ink/formTone/outline/hatch` | 复用原生形体明暗与刻线；未移植整部影片的材质、声音和片尾 |
| `midcentury` | `TOON.setClock/rect/shape/ellipse/text` | 复用原生色版与墨线模块；人物资产及镜头仍需影片自己编写 |
| `instrument` | `ANATOMY.roundedPlan/extrude` | 复用原生投影与挤出；齿轮动画是本地组件，没有接入完整机械仿真 |
| `inked` | `COLORFIGURES.box` | 复用官方几何、受光与墨线模块；当前封装只提供立体盒组件 |
| `isometric` | `ANATOMY.roundedPlan/extrude` | 复用 Anatomy 绘制块体；这是本地实现选择，尚无证据证明它对应官网该风格的原引擎 |
| `vector` | `PAINT.grain` | 只复用颗粒叠层；小鸟是本地 SVG 组件 |
| `ink-wash` | `PAINT.roughPath` | 只复用手绘线工具；山形及水墨滤镜是本地实现 |
| `old-map` | 读取 `LAND_OUTLINES` | 使用真实陆地数据；投影、航线、船与材质由本地代码绘制，属于数据接入 |
| `swiss` | PAINT 已加载，导出 API 调用为零 | 样片使用本地标题与线条组件 |
| `pop` | PAINT 已加载，导出 API 调用为零 | 样片使用本地漫画框、爆炸框与 SVG 网点 |
| `broadsheet` | PAINT 已加载，导出 API 调用为零 | 样片使用本地标题与柱形图组件 |
| `collage` | PAINT 已加载，导出 API 调用为零 | 样片使用本地毛边剪纸组件 |
| `watercolor` | 没有专属第三方引擎依赖 | 本地山丘、太阳、SVG 噪声位移与模糊；未接入原生水彩颜料合成 |
| `mascot` | 没有专属第三方引擎依赖 | 本地椭圆拼成的橙色熊、钱袋与账本；与官网猫角色不同 |
| `metro` | 没有专属第三方引擎依赖 | 本地路径、站点、标签和小车组件 |
| `math` | 没有专属第三方引擎依赖 | 本地坐标轴与曲线组件 |
| `neon` | 没有专属第三方引擎依赖 | 本地节点、连线与 SVG 发光滤镜 |
| `isotype` | 没有专属第三方引擎依赖 | 本地重复人物图元 |
| `clay` | 没有专属第三方引擎依赖 | 本地二维角色、渐变与阴影 |
| `one-line` | 没有专属第三方引擎依赖 | 本地等长点列插值 |
| `screencast` | 没有专属第三方引擎依赖 | 本地浏览器框与鼠标路径 |
| `blueprint` | 没有专属第三方引擎依赖 | 本地尺寸线与标签 |
| `chat` | 没有专属第三方引擎依赖 | 本地消息气泡 |
| `manga` | 没有专属第三方引擎依赖 | 本地漫画框与网点材质 |

计数：6 套复用部分原生绘图模块，2 套只调用辅助绘图工具，1 套使用地图数据，4 套只加载库而样片没有调用，12 套使用本地组件。原有五套风格和本分支的 `editorial` 不在本次新增 25 套的统计内。各套均仍由 Frametell 管理页面、时间轴、镜头和导出。

“样片没有调用”限定于本次运行的现有样片，不能推导为该 API 永远不会被未来生成页调用；反过来，API 可用也不能证明某部成片已经使用它。本轮记录初始化与采样渲染期间的导出 API 调用，不能用调用次数衡量画面质量。采样结果不替代逐帧视频检查或同题原片视觉验收。

复验脚本与原始证据：`.local/original-drawing-audit-20261023/trace-renderers.mjs`、`runtime-trace.json`、`source-verification.json`。本次仅增加核对记录，没有补齐缺失引擎。后续应先对蜡笔、水彩、萌系讲解员和地铁图逐套确认可获取的源码与许可，再完成一页同题原片对照；通过之后再重跑整片。官网角色和模板能否取得源码，需要单独确认。

## 2026-10-23 原生绘图后端改造

用户要求允许各套风格使用对应项目的原生绘图机制。本轮在前述核对之后改了实际接入方式。共享会话正文已通过浏览器读回：它只确认 12 套署名关系，其余 13 套没有提供来源链接。继续查询 Lemo 完整目录后，找到水彩、蓝图、一笔画、象形统计、录屏的可用实现，因此为它们明确选用这些后端；这项选择不证明官网使用同一实现。

| 风格 | 本轮后端 | 原生能力与接入范围 |
| --- | --- | --- |
| `crayon` | Lemo `crayon-book` | 原始笔触、WebGL 纸面/笔压/拒水/浮雕合成、角色遮挡、设定表与翻书模块；样片实际调用纸面、遮挡分组和拒水合成 |
| `engraving` | Lemo `engraving` | 原始刻线、明暗、排线、纸张、铜板、湿染与装帧 API；样片调用刻线与原生纸张 |
| `midcentury` | Lemo `midcentury-toon` | 原始色版、墨线、字符、角色与图标模块；样片直接调用错版及文字 API |
| `vector, ink-wash, swiss, pop, broadsheet, collage` | huashu-art-motion | 独立的原始工具、画笔、渲染、角色、图表、拼贴、排版、相机、动作和画材命名空间；样片分别调用对应 API，绘图不再转换为通用组件 |
| `instrument, isometric` | Anatomy | 完整 `iso-kit.mjs` 导出，包括原生投影、挤出、可见面、SVG 与主题 CSS；`isometric` 为本地选用 |
| `inked` | Colorfigures 官方核心 | 保存完整官方核心，开放几何、材质、受光、相机、文字及墨线 API；原页面壳没有自动启动 |
| `watercolor` | Lemo `watercolor`，本次选用 | 原始笔触宽度、飞白、分叉、叠色、种子与逐笔绘制 API |
| `blueprint` | Lemo `blueprint`，本次选用 | 原始制图、几何、投影、标注、纸面与 WebGL 晒图纸合成 |
| `one-line` | Lemo `one-line`，本次选用 | 原始路径采样、笔速、笔压、积墨、纸纹与相机模块 |
| `isotype` | Lemo `pictogram-motion`，本次选用 | 原始人形关节、步态、统计图元、图案与排版 API |
| `screencast` | Lemo `living-screencast`，本次选用 | 原始窗口、消息、侧栏、角色与 CSS；页面内容由影片编写 |

共 11 个后端、17 套风格。`old-map` 继续使用地图数据；`math, neon, clay, mascot, chat, manga, metro` 尚未找到官网对应源码，保留现有实现，等待进一步的源项目入口。没有将相近名称或相似画面写成来源证明。

### 渲染与生成方式

`P.nativeScene((N, host) => render)` 为每页创建独立模块实例和 Shadow DOM。`N` 直接暴露对应上游 API，`host` 只提供输出容器、画布、SVG、时间锚点与生命周期。各引擎保留自己的调色板、坐标、纸面、字体接口、角色、相机与合成顺序。模块实例和 CSS 不跨页串用；重建时释放输出画布和 WebGL 上下文。

原生场景默认切镜，绘制与翻书由原引擎控制，宿主不再追加通用滑入、模糊和相机预设。预览与导出经过同一入口。旧页的通用组件继续可用，以便读取既有作品；新样片和原生生成提示词使用新的入口。

生成端按 `native/renderers.json` 选择独立的规划、画页与审图契约，提供原始 `STYLE.md`、原始 API 摘要与实际接入示例。原生页不再收到“只能使用指定色名”“必须使用通用相机”或通用图元文档。质量检查保留渲染错误、跳播一致性、可见内容与审图；通用占幅和文字面积比例不用于改写原生构图。原生 Canvas 与 WebGL 的像素检查可穿过 Shadow DOM，截图仍由实际浏览器采集。

### 来源与复现

上游文件保存在 `packages/engine/native/sources/`，固定版本和逐文件 Git blob 身份在 `native/source-lock.json`，来源说明和 SHA256 在 `native/sources.json`。第三方源码保留原文，绝对 `/core/` 导入在构建时解析，经典脚本在独立作用域中运行；源文件未被改写。各项目许可证与原仓库提供的字体许可一并保存。

执行 `node packages/engine/tools/build-native.mjs` 可离线重新打包。包内同时带源码、原始风格说明、API 资料与浏览器 bundle。视频缓存包含原生 bundle 和后端登记，修改后不会继续复用旧绘图缓存。

### 本轮验证范围

17 套原生后端通过实际浏览器加载、页面实例隔离、画面跳播一致性、重建清理检查；原有 Canvas 对齐、空白开场/结尾和缓存回归通过。原始源文件的 Git blob 校验通过。17 张目录海报已经从新入口重新渲染，人工复核时补上了 Anatomy 的原生主题 CSS，修复了初版块体全黑的问题。

另通过 devbox3 已配置的远程中转与 `openai/gpt-6.1-sol` 请求生成一页全新蜡笔画面，正常完成并实际调用 `N.C`、`N.GL.makeComp`、`N.Rig`。人工看图发现生成代码把字体回退列表误传给只接受单个字体名的原生接口，导致文字缩小；已修正该页，并把原始接口语义补进生成参考。模型初始输出与修正页分别保留，不能将修正后的结果称为模型首次输出就完全合格。

本轮的能力样片与短片用于验证代码接入、生成接口和导出；未完整重跑此前六部作品，也未完成官网同题长片的视觉还原验收。改动位于本地分支，尚未部署到 devbox3、提交或推送。预览与原始检查结果位于 `.local/native-engine-migration/`。

## 2026-10-23 新项目接入与目录调整

按用户要求，新增候选限定为近期创建、可通过代码运行的项目。这次接入下列四项，来源是本分支选用的替代项目，不能据此认定为官网模板源码。

| 风格 | 接入项目及固定版本 | 实际绘图路径 |
| --- | --- | --- |
| `math` | manim-web 0.39.4，项目创建于 2026-01-29 | 原生 Scene、Axes、FunctionGraph、MathTex、Create、Write、MasterTimeline；MathJax 随浏览器包离线打包 |
| `mascot` | doodle-anim，`bfc4c257151450c03f13013dec5585ebb935aeb4`，创建于 2026-08-29 | 从原 HTML 提取完整角色与 Canvas 引擎，原生 CrowdScene、人物、表情、步态和纸纹 |
| `chat` | chat-rap-video，`546d0ea7bbe14ee5ca58620255a8363d95246fdf`，创建于 2026-08-13 | 原始 v11 HTML、CSS、消息数据与 renderAt；保留 1080×1920 原生画幅，按比例放入输出画面 |
| `metro` | nf-metro 2.1.0，项目创建于 2026-02-15 | 原 Python CLI 计算 Mermaid 线路布局并生成 SVG；页面使用原 SVG 的 SMIL 动画，通过 setCurrentTime 跳播 |

四项均为 MIT 许可，源码及分发文件位于 `packages/engine/native/sources/`；登记信息在 `recent-upstreams.json`、`sources.json` 和 `source-lock.json`。manim-web 的 npm 分发完整性与官方 registry 一致。当前共 15 个原生后端、21 套原生风格；`old-map` 继续使用真实地图数据，另有原有通用风格。

`clay`、`neon`、`manga` 暂从页面风格目录隐藏，目录返回 28 项。旧作品的风格 id、代码和预览入口保留。首页遇到已隐藏的默认风格或查询参数时，回到可选风格。

线路图只在编写或修改页面时需要 Python：先执行 `node engine/tools/native-metro.mjs --setup` 安装固定依赖，再写 `materials/p01.mmd`，执行 `node engine/tools/native-metro.mjs materials/p01.mmd --page p01`。生成的页面已嵌入原 SVG，预览和导出不调用 Python，也不依赖 Blender。此命令已在实际画页沙箱中运行通过。

宿主增加异步就绪等待，用于公式字形加载。聊天适配只隔离 DOM/CSS，并在下一帧前清理原模板的临时叠层，避免依赖墙上时钟。数学适配使用原生 VGroup 同步复制已生成字形作为动画快照：0.39.4 的 MathTex.copy 会复制已有字形后再次异步生成字形，使连续导出时的点数翻倍。绘制和动画仍调用原库，保存的上游文件没有改写。

四种风格已通过实际横屏预览、随机跳播、独立页面状态、重建清理、离线竖屏加载；公式增加连续逐帧检查，聊天增加叠层反复跳播检查。已有 17 套原生风格的兼容检查通过。四种风格各导出 6 秒、1920×1080、12fps、72 帧 H.264 视频，并从实际 mp4 解码核对画面。页面目录、隐藏风格回退、生成提示词、类型检查和 UI 构建通过。扩展 Studio 测试发现“模型失效后导出”一项失败，本次未修改该流程；没有将该扩展测试记作全部通过。

能力验证文件位于 `.local/recent-engine-research/`，包括短片、`export-contact-sheet.jpg`、`catalog-results.json`、浏览器和提示词检查日志。此次验证覆盖后端接入和示例导出，尚未运行新一轮模型自主生成的四部完整影片，也未部署到 devbox3。
