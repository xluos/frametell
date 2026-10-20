# 风格与讲稿：怎么改、改哪里

风格管画面怎么画，讲稿管观众怎么听懂。两件事在不同的地方，改的时候不要混在一起：换配色、换字体，解决不了“照着 PPT 念”的问题。

## 一套风格由什么组成

每套风格是 `packages/engine/styles/<id>/` 下的一个目录。浏览器靠代码文件画图，模型靠说明文件决定怎么画，两边缺一不可：只改 CSS 不会教模型怎么构图，只改说明也改不了浏览器里的底色和字体。

| 文件 | 给谁用 | 定义什么 |
| --- | --- | --- |
| `GRAMMAR.md`（风格说明卡） | 导演、画页 Agent、审页 Agent | 一句话气质、画面（底色、主笔、颜色各代表什么、线条、文字大小）、动作与镜头、节奏（每页时长、多久变一次）、禁止项 |
| `style.js` | 浏览器 | `window.STYLE`：调色板（`ink soft muted faint red orange green blue purple yellow paper` 和对应浅色 `*F`）、背景函数、线条粗细 `sw`、抖动 `roughScale`、弧度 `bowScale`、是否单笔 `single` |
| `style.css` | 浏览器 | 字体（`--hand` 中文、`--latin` 西文）和少量外观覆盖 |
| `kit.js`（可选） | 浏览器 + 画页 Agent | 这套风格专属的绘图组件；注释会自动整理成接口说明交给画页 Agent |
| `example/`（强烈建议） | 回归测试 + 画页 Agent | 一部可运行的样片。30 行以内、拍点最多的一页会作为范例页放进画页 Agent 的上下文；`pnpm test` 会对每套样片跑分镜检查和布局检查 |
| `fonts.json`（可选） | 导演 | 有这个文件，就表示这套风格“没有固定外观”：导演要在分镜里为每部片设计 `look`（风格卡、配色、字体、线条），服务端会校验并应用到每一页 |

现有 31 套（29 套与 frametell.ai 官网一致，外加开源仓库原有的 `study` 和每部片单独设计的 `editorial`）：

| id | 界面名 | 一句话 | 上游来源 |
| --- | --- | --- | --- |
| `vector` | 扁平科普 | 深夜蓝扁平世界，一个比喻物贯穿 | adapted from Two-tone flat fill and the bird adapted from huashu-art-motion (MIT) |
| `math` | 数学动画 | 黑底精确线条与公式，术语滑到下一行 | Frametell 自有 |
| `ink-wash` | 水墨 | 墨线、留白与淡彩 | adapted from Brush, ink-bloom and mountain techniques adapted from huashu-art-motion (MIT, © 2026 alchaincyf) |
| `swiss` | 瑞士网格 | 粗标题、细分隔线、超大数字 | adapted from Motion ideas adapted from huashu-art-motion (MIT, alchaincyf) |
| `pop` | 波普漫画 | 网点、爆炸框、对话气泡 | adapted from Halftone, burst and balloon techniques adapted from huashu-art-motion (MIT) |
| `neon` | 霓虹赛博 | 深色底发光节点与数据流 | Frametell 自有 |
| `watercolor` | 水彩 | 半透明水色晕染 | Frametell 自有 |
| `broadsheet` | 财经报纸 | 报纸栏宽、衬线标题与图表 | adapted from Chart grammar adapted from huashu-art-motion (MIT, © 2026 alchaincyf) |
| `isotype` | 象形统计图 | 重复象形小人做计数 | Frametell 自有 |
| `clay` | 黏土动画 | 圆润黏土身体，挤压变形 | Frametell 自有 |
| `collage` | 剪报拼贴 | 撕纸、胶带、剪报拼贴 | adapted from Collage techniques adapted from huashu-art-motion (MIT, © 2026 alchaincyf) |
| `one-line` | 一笔画 | 一笔不断的线画出整页 | Frametell 自有 |
| `tech-dark` | 科技深色 | 石墨底、规整线条、一个青绿主色 | Frametell 自有 |
| `screencast` | 屏幕演示 | 真实软件界面与光标操作 | Frametell 自有 |
| `isometric` | 等距插画 | 网格地面等距方块 | Frametell 自有 |
| `blueprint` | 蓝图工程图 | 蓝图白线与尺寸标注 | Frametell 自有 |
| `instrument` | 机械图解 | 带引线编号的机械爆炸图 | adapted from Figure techniques adapted from Anatomy (MIT, © 2026 Ryan) |
| `inked` | 手绘物件图解 | 手绘墨线等距物件与注释 | adapted from Hand-inked isometric drawing adapted from Colorfigures (MIT, © 2026 April Zhu) |
| `engraving` | 铜版画博物志 | 旧纸铜版排线 | adapted from Engraving techniques adapted from LemoLab lemo-opuscar (MIT, © 2026 LemoLab) |
| `midcentury` | 50 年代教育片 | 错版色块与几何讲解员 | adapted from Off-register cels, broken ink line, two-plate lettering, the manual arrow and the ornaments adapted from Lemo-Opuscar's midcentury-toon (MIT, © 2026 LemoLab) |
| `crayon` | 蜡笔绘本 | 蜡笔笔触与涂填 | adapted from Wax-on-paper crayon strokes and scribbled fills adapted from crayon-book by LemoLab (MIT) |
| `mascot` | 萌系讲解员 | 圆乎乎的讲解员演示 | Frametell 自有 |
| `chat` | 聊天界面 | 手机聊天界面与消息气泡 | Frametell 自有 |
| `manga` | 日式黑白漫画 | 黑白分镜、网点、速度线 | Frametell 自有 |
| `old-map` | 古地图 | 旧纸海岸线、罗盘、航线 | adapted from Coastlines, rivers and borders from Natural Earth (public domain) via world-atlas (ISC, © 2013-2019 Michael Bostock) |
| `metro` | 地铁线路图 | 45/90 度线路与站点 | Frametell 自有 |
| `warm-story` | 暖调叙事插画 | 米色底扁平插画，一个比喻物贯穿 | Frametell 自有 |
| `whiteboard` | 白板手绘 | 白板马克笔边讲边画 | Frametell 自有 |
| `chalkboard` | 黑板 | 深绿黑板粉笔推导 | Frametell 自有 |
| `study` | 安静书房 | 暖纸墨线淡彩，物体旁注释 | Frametell 自有 |
| `editorial` | 知识杂志 | 导演按主题与视觉偏好每片单独设计配色、字体、线条 | Frametell 自有 |


## 加一套新风格

1. 复制最接近的一套目录（固定外观参考 `whiteboard`，每片自定外观参考 `editorial`），改 `style.js` 的调色板和背景、`style.css` 的字体。
2. 重写 `GRAMMAR.md`。写清楚的颜色语义（每种颜色只代表一件事）、主画法、动作方式、每页节奏和禁止项，比写形容词有用得多。
3. 做一部 `example/`：至少有开头、中间变化、结尾三种状态，跑 `pnpm --filter @frametell/engine test` 确认分镜和布局检查都干净。
4. 登记：`packages/agent/src/prompts.ts` 的 `STYLES`（服务端风格列表）、`packages/ui/src/lib/styles.ts` 的 `KNOWN` 和 `STYLE_SWATCH`（色卡）、`packages/ui/src/i18n/{zh,en}/common.ts` 的名称和简介。
5. `pnpm build` 后重启 `node apps/cli/dist/cli.js serve`。

不登记 `STYLES` 的风格目录也能用（命令行 `--style <id>`），只是首页列表里看不到。

## 想更灵活、更好看

按改动大小排：

- **不改代码**：创建影片时填“这部影片的视觉偏好”。固定风格会在自己的底色和笔触范围内调整构图与强调；选“知识杂志”时，偏好会变成整片的配色、字体和线条。长期通用的要求写进设置里的“创作偏好”。
- **改一套风格**：最有效的是改 `GRAMMAR.md` 和 `example/`。模型照着范例页画，范例页的构图、留白、字号直接决定成片下限；说明卡里“禁止项”写得越具体，越少出现“标题加三张卡片”的 PPT 版式。
- **加组件**：在风格目录放 `kit.js`，把这个风格反复用到的画法（比如一种图表、一种物体）做成函数，画页 Agent 会拿到它们的签名直接调用。比让模型每页从零画稳定得多。
- **每片自定外观**：参考 `editorial` 加 `fonts.json`，在说明卡里规定导演该怎么写 `look`。外观的自由度更大，但效果更依赖模型，样片和说明卡要更严格。

## 讲稿为什么像在念 PPT，以及现在怎么生成

看本地两部片的讲稿，问题不在语气，在结构：

- 每页 4–6 条字幕，几乎每条都以句号结尾。配音按整页一口气读，但每个句号都是一次停顿，听起来就是一串结论。大模型那部 19 页、98 条字幕，几乎全是这样。
- 讲稿在复述画面上的字：“股票占25%。长期国债占25%。黄金也占25%。现金同样占25%。”画面上已经写着，声音没说为什么这样分。
- 按教科书目录排页：词元、向量、注意力、计算层、概率……每页一个名词加定义，例子在页与页之间更换。
- 分镜阶段的 `say` 只是“这页说什么”的摘要，讲稿阶段再按“每条 16 字以内、每页 3–8 条”写一遍，等于逼着模型写成短句清单。

之前的改法是在提示词里补规则，再在配音前加一轮无条件的“讲稿审读”。问题是规则互相打架（比如无配音影片也被要求写连贯段落），审读每部片都要多一轮模型调用，而真正决定讲法的分镜阶段没有变。

现在的做法：

1. **分镜里的 `say` 就是完整口播**。导演按“老师讲题”的方式写：从能看到的现象出发，先让观众感到问题，再给概念；声音解释画面，不复述画面；页与页靠因果衔接；限定语只在需要的那一页说一次。你在分镜确认时看到、拍板的就是最终要讲的话。
2. **讲稿阶段只负责切字幕**：按逗号和句号把 `say` 切成字幕行，不重写内容。句号只放在真正的句末，让配音连贯。
3. **服务端读一遍讲稿**（`packages/agent/src/narration.ts`，不调用模型）：
   - 必须修：拍点指向不存在的字幕行，或指向的词不在那一行里（引擎会退回到行首，画面会提前出现）。
   - 建议：只在念画面标签的行、三句以上同一句式的罗列、一页里没有任何“因为/所以/但/如果”的平铺陈述、几乎每行都句号结尾、以“接下来我们看”开头、多数页以免责声明结尾。同一问题出现在三页以上时合并成一条说明。
   - 只有查出问题才回给导演改一轮；没问题就直接配音。无配音影片只检查拍点和罗列，不要求连贯成段。

拿这套检查回看现有讲稿：

| 讲稿 | 查出的问题 |
| --- | --- |
| 永久投资组合（本地） | 第 2 页念标签、四句同句式罗列；3 页每行句号；3 页没有因果词 |
| 大模型为什么能表现出智能（本地） | 19 页都是每行句号结尾；3 页没有因果词 |
| 知识杂志样片 `editorial/example` | 无 |
| 用新规则生成的再平衡讲稿（`.local/teaching-check`） | 无 |

规则写在 `packages/agent/prompts/PLANNER.md`。想调整讲法时改这里；想调整“什么算念 PPT”时改 `narration.ts` 和它的测试 `narration.test.ts`。

## 旧片怎么办

已经生成的影片不会自动重做。分镜和讲稿的规则变了，旧片的 `say` 只是摘要，最省事的是用同样的主题新建一部。只改字幕不重新配音，会导致音画错位。
