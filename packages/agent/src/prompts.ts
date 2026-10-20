// System prompts for each stage, assembled from prompts/*.md and the chosen style's grammar card, and the per-stage
// user messages. Stable text first (system), changing text last (user), so provider prompt caches stay warm.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { ENGINE_DIR } from '@frametell/engine/tools/project.mjs';
import { Type } from 'typebox';
import type { PageTiming, Storyboard, LintIssue } from './project.js';
import type { AnswerTool } from './runtime/types.js';

import { pagePack } from './pagepack.js';
import { continuityNote, recurringNote } from './continuity.js';
import { brandFilesOn, brandPageNote, brandReviewNote, brandSection, type BrandBrief } from './brand.js';

// found through the package itself, so it still resolves when the code is bundled (the desktop app)
const DIR = path.join(path.dirname(createRequire(import.meta.url).resolve('@frametell/agent/package.json')), 'prompts');
const read = (f: string) => fs.readFileSync(path.join(DIR, f), 'utf8');
const grammar = (style: string) => {
  const f = path.join(ENGINE_DIR, 'styles', style, 'GRAMMAR.md');
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : `Style: ${style}`;
};

/** fallback names; the panel shows its own translated names for these ids */
export const STYLES: { id: string; name: string; summary: string; swatch: string[] }[] = [
  { id: 'vector', name: 'Vector Science', summary: "Glowing flat worlds on a midnight sky, and a tiny bird to show you the scale", swatch: ["#120A3C", "#32BAEE", "#FFA62B", "#FF5D8F"] },
  { id: 'math', name: 'Math animation', summary: "Precise lines and typeset formulas on black: one colour per variable, terms that slide into the next line, a circle that unrolls into a triangle", swatch: ["#0E0F12", "#ECEEF2", "#58B9E6", "#F4D66B"] },
  { id: 'ink-wash', name: 'Ink wash', summary: "A few strokes of ink and the empty paper becomes sky, water and distance", swatch: ["#F3ECDC", "#1A1714", "#8A8178", "#B8321F"] },
  { id: 'swiss', name: 'Swiss Grid', summary: "Giant type lands on the beat across a strict grid; one signal red for the point", swatch: ["#F3F1EC", "#111111", "#E3321D", "#8A8984"] },
  { id: 'pop', name: 'Pop comic', summary: "Ben-Day dots, heavy ink and a POW! on every big idea: your explainer as a 1960s comic that moves", swatch: ["#F4E6C2", "#E3221B", "#FFD60A", "#1F5FD1"] },
  { id: 'neon', name: 'Neon Noir', summary: "Neon tubes flicker on with the voice, numbers glitch into place, a grid floor runs to the horizon", swatch: ["#07060D", "#FF2E88", "#22E5FF", "#9B5CFF"] },
  { id: 'watercolor', name: 'Watercolor', summary: "Pencil first, then colour blooms on the beat and dries with soft dark edges", swatch: ["#FBF8F1", "#3C7DBA", "#5B9A5A", "#F0BF45"] },
  { id: 'broadsheet', name: 'Broadsheet', summary: "The financial front page come alive: salmon newsprint, serif headlines, charts that land on the spoken word", swatch: ["#FFF1E5", "#990F3D", "#0F5499", "#262A33"] },
  { id: 'isotype', name: 'Isotype', summary: "One figure stands for a million people: rows of flat pictograms count themselves in, then walk across to show the shift", swatch: ["#F1EADA", "#1F1D1A", "#B23C29", "#2F5B86"] },
  { id: 'clay', name: 'Clay Studio', summary: "Plasticine buddies and props move frame by frame on a pastel studio set: soft, thumb-pressed, with real shadows", swatch: ["#F5D7C6", "#F39A3E", "#4D9AD9", "#F7C843"] },
  { id: 'collage', name: 'Paper Collage', summary: "Your argument laid out on an investigator\\'s desk: cuttings, halftone prints, red marker, highlighter and thread", swatch: ["#E2DBCD", "#1D1B19", "#B8433F", "#DACF08"] },
  { id: 'one-line', name: 'One line', summary: "A pen that never leaves the paper: a hand lets go, and the same line redraws itself as a bird", swatch: ["#F5F0E7", "#1C1A17", "#D9694E", "#93B4CF"] },
  { id: 'tech-dark', name: 'Tech dark', summary: "Architecture and code on graphite, with data that really flows", swatch: ["#15171A", "#E8E6E1", "#4FBFAE", "#E3A64B"] },
  { id: 'screencast', name: 'Screencast', summary: "A polished product demo: the cursor glides to a control and clicks, the camera eases in as the app answers, then pulls back to show the result", swatch: ["#E4E8F0", "#FFFFFF", "#151823", "#4F55F1"] },
  { id: 'isometric', name: 'Isometric', summary: "A tiny 30\u00b0 world where blocks rise from the ground and goods flow between stations", swatch: ["#EEF0F8", "#FFFFFF", "#9D8CF5", "#FF6B3D"] },
  { id: 'blueprint', name: 'Blueprint', summary: "White lines drafted on cyanotype blue: dimensions, exploded parts, a red pencil on the point", swatch: ["#0F3B78", "#F2F7FF", "#FFD866", "#FF6B5B"] },
  { id: 'instrument', name: 'Mechanism', summary: "Real machines, cut open: engines, gearboxes, brakes. Parts settle into place, pistons and gears run, and the readout moves with the mechanism", swatch: ["#FBFBFA", "#26262A", "#D3D3CE", "#FF4F00"] },
  { id: 'inked', name: 'Inked Gadgets', summary: "A hand-inked isometric gadget that does each step as it is named: the door opens, the water boils, the working part\\'s label lights up", swatch: ["#F2EFE7", "#93D3B0", "#F4B829", "#41538F"] },
  { id: 'engraving', name: 'Copperplate Engraving', summary: "The burin cuts the specimen line by line, figure labels arrive on their leaders, then hand-laid watercolour floods the lines", swatch: ["#F1E8D2", "#1E1712", "#B4513C", "#557A98"] },
  { id: 'midcentury', name: 'Mid-century Cartoon', summary: "A 1950s classroom film: geometric presenters and off-register flat colour, and every step slams in on a spinning sunburst", swatch: ["#F6EDDA", "#E3AE36", "#3A9A94", "#D9553A"] },
  { id: 'crayon', name: 'Crayon Picture Book', summary: "Wax crayon scribbles colour onto toothy paper, round little friends act out the idea, and the page turns like a book", swatch: ["#F8F0DD", "#E2453A", "#F7C62E", "#3A8BDB"] },
  { id: 'mascot', name: 'Mascot Explainer', summary: "Cute sticker cartoons on cream paper and a little animal host who does the maths with you: coins drop into the pouch, the total counts up, and the verdict stamp slams down", swatch: ["#FFF8EC", "#FF9A3C", "#3DB57D", "#4A9BE0"] },
  { id: 'chat', name: 'Chat Screen', summary: "The story plays out on a phone: messages pop in with the voice, the typing dots hang, and at the turn a message is unsent", swatch: ["#DCEFE6", "#95E3A6", "#FFFFFF", "#E5484D"] },
  { id: 'manga', name: 'Manga', summary: "G-pen ink, screentone and speed lines: panels cut in one by one, and the moment it clicks slams to full frame with a giant DON", swatch: ["#FAFAF8", "#111111", "#9A9A9A", "#D7262E"] },
  { id: 'old-map', name: 'Antique Map', summary: "An old chart on parchment: a route inks itself across the sea with a little ship sailing at its head, and a realm\\'s colour spreads over the land year by year", swatch: ["#EBDDBC", "#2B1D12", "#B0442C", "#5E7F55"] },
  { id: 'metro', name: 'Transit Map', summary: "A train draws each coloured line as it runs; every station lights up on its spoken word, and interchanges pulse where lines meet", swatch: ["#F7F6F1", "#E1251B", "#0A6FC2", "#00965E"] },
  { id: 'warm-story', name: 'Warm illustration', summary: "Warm flat illustration, one metaphor carried through the film", swatch: ["#F4E7D3", "#C8603C", "#E0A23B", "#7E9F7A"] },
  { id: 'whiteboard', name: 'Whiteboard', summary: "A marker that draws as it talks, until the idea is obvious", swatch: ["#F7F8F7", "#1E2226", "#D0342C", "#1F5DBA"] },
  { id: 'chalkboard', name: 'Chalkboard', summary: "Chalk on a green board, worked out one step at a time", swatch: ["#223029", "#F1ECE1", "#F3DD86", "#F0A3A0"] },
  { id: 'study', name: 'Quiet study', summary: "Hand-drawn on paper, ink lines and light washes; for books, history and methods", swatch: ['#F4EEE2', '#2B2520', '#3D6D93', '#C0782E'] },
  { id: 'editorial', name: 'Editorial explainer', summary: 'A visual lesson with a palette, typography and composition designed for each film; follows your visual notes', swatch: ['#F7F4ED', '#242724', '#24766F', '#B54F3C'] },
];

/**
 * 「创作偏好」: what the user wrote once in Settings for every film. Last in the system prompt, so the stable part above
 * still caches across users; below the engine's rules, which it never overrides.
 */
export function preferencesSection(preferences?: string) {
  const p = preferences?.trim();
  return p ? `---\n# The user's standing preferences\n\nThe user wrote these in Settings, for every film they make. Follow them wherever they bear on your part of the work. This film's own request, and anything the user says while it is made, come first; the technical rules above always hold.\n\n<preferences>\n${p}\n</preferences>` : '';
}

/** A film's own look on top of its style: notes the user keeps with a style they shaped (in Frametell Cloud, from their
 *  own films). After the style card, so they are read as that style's details, not as a new style. */
export function styleNotesSection(notes?: string) {
  const n = notes?.trim();
  return n ? `---\n# This film's own look\n\nThe user shaped the style above for their films, and keeps these notes with it: how they like it drawn and told. Follow them wherever they bear on your part of the work, as long as the style's rules above still hold. This film's own request, and anything the user says while it is made, come first.\n\n<style-notes>\n${n}\n</style-notes>` : '';
}

/** A designed style's film (one whose style has no look of its own): the style card the director wrote for it in
 *  storyboard.json. After the style's own card, which says how to read it; binding on every page. */
export function filmCardSection(card?: string) {
  const c = card?.trim();
  return c ? `---\n# This film's style card\n\nThe director designed this film's look, and wrote it here. It is this film's style: hold every page to it, as you would a style's own card. The palette and the typeface it names are already set for the film (\`ink\`, \`paper\` and the other colour names, the hand and latin faces): use them by name, don't restate them as hex. This film's own request, and anything the user says while it is made, come first.\n\n<style-card>\n${c}\n</style-card>` : '';
}

/** `brand`: the brand the film is made for, after the style card and its notes */
export function plannerSystem(style: string, preferences?: string, styleNotes?: string, brand?: BrandBrief) {
  return [read('PLANNER.md'), '---\n# This film\'s style (the page agent draws to it, so the storyboard must be drawable in it)\n\n' + grammar(style), styleNotesSection(styleNotes), brandSection(brand), '---\n' + read('LIB.md'), preferencesSection(preferences)].filter(Boolean).join('\n\n');
}
/** the page agent's system prompt: process, the style's grammar, the drawing API, the style's components with a worked
 *  example page, and the wider component library (the stable part of every page session, so it caches well) */
export function pageSystem(style: string, extras: string[] = [], preferences?: string, styleNotes?: string, card?: string) {
  return [read('PAGE.md'), '---\n# This film\'s style\n\n' + grammar(style), filmCardSection(card), styleNotesSection(styleNotes), '---\n' + read('API.md'), '---\n' + pagePack(style, extras), '---\n' + read('LIB.md'), preferencesSection(preferences)].filter(Boolean).join('\n\n');
}

/** the film's language (narration, on-screen text) and the language the director reports in (the user's) */
export type Lang = 'zh' | 'en';
/** `voice`: the service that voices the narration; absent when the film has no voice. `preferences`: what the user
 *  wants in every film (Settings), read by every session. `styleNotes`: the user's notes for the style this film is
 *  drawn in (a style they shaped), read after the style card. `brand`: the brand the film is made for */
export interface Brief { topic?: string; audience?: string; durationSec: number; notes?: string; lang?: Lang; replyLang?: Lang; voice?: 'volcengine' | 'elevenlabs'; preferences?: string; styleNotes?: string; brand?: BrandBrief }

const LANG_NAME: Record<Lang, string> = { zh: 'Simplified Chinese', en: 'English' };
/** the language everything said to the user is written in: the user's own, never the prompts' */
export const replyNote = (replyLang?: Lang, lang?: Lang) => `Write everything you say to the user in ${LANG_NAME[replyLang ?? lang ?? 'zh']}.`;

/** What a stage must know about the language: the film's (narration, on-screen text) and the user's (the reports). It goes
 *  in the user messages, never the system prompts, so every film shares the cached part whatever its language. */
export function langNote(stage: 'storyboard' | 'script' | 'page' | 'revise', lang: Lang = 'zh', replyLang?: Lang) {
  const film = {
    zh: {
      storyboard: 'Film language: **Chinese**. In storyboard.json write `"lang": "zh"`; write title, summary, section, say and each beat\'s object / action / text in Simplified Chinese: on-screen text at most 8 characters per element, and a beat tied to a word names the Chinese word as spoken (`c2:三十年`).',
      script: 'Film language: **Chinese**. A cue is one subtitle line in Simplified Chinese, at most about 16 characters, cut at a comma or a full stop; a sentence may run over several cues. Write measured quantities in Arabic digits and units as they are spoken (年, 元); a counting word inside a phrase stays in characters (一次、一遍、一个问题).',
      page: 'This is a Chinese film: all text on screen (titles, labels, units) is in Simplified Chinese, matching the narration.',
      revise: 'This is a Chinese film: rewrite narration in Simplified Chinese, keeping the number of cues; your notes to the page agent can be in English.',
    },
    en: {
      storyboard: 'Film language: **English**. In storyboard.json write `"lang": "en"`; write title, summary, section, say and each beat\'s object / action / text in English: on-screen text at most 5 English words per element, and a beat tied to a word names the English word (`c2:thirty`).',
      script: 'Film language: **English**. A cue is one subtitle line in English, at most about 12 words, cut at a clause boundary; a sentence may run over several cues. Write numbers in Arabic digits (1,000, 30%) and units as they are spoken (years, dollars).',
      page: 'This is an English film: all text on screen (titles, labels, units) is in English, matching the narration. English runs longer than Chinese, so leave enough width for text.',
      revise: 'This is an English film: rewrite narration in English, keeping the number of cues; your notes to the page agent can be in English.',
    },
  }[lang][stage];
  // the page agent's one sentence is shown to the user too
  return `\n${film}\n${replyNote(replyLang, lang)}`;
}

/** What a stage must know about the voice. Volcengine reads a tone instruction with each take (ElevenLabs ignores one);
 *  a film with no voice is timed by its cues and may be watched without subtitles, so its picture carries the meaning.
 *  In the user messages, like langNote, so the system prompts stay shared. */
export function voiceNote(stage: 'storyboard' | 'script' | 'revise', voice?: Brief['voice']) {
  if (!voice) return {
    storyboard: 'This film has no voice, and may be watched without subtitles: the picture alone must tell the story, so key words and numbers go on screen as text.',
    script: 'This film has no voice: nobody hears the cues. They time the picture, and become the subtitles if the user turns them on, so cut each page\'s say into short captions that each read well on their own, ending each with its own punctuation.',
    revise: 'This film has no voice: the cues only time the picture and serve as subtitles.',
  }[stage];
  if (voice !== 'volcengine') return '';
  return {
    storyboard: '',
    script: [
      "The narrator takes a tone instruction with each page. Give every page an `instruction`: one Chinese sentence on how that page is said (pace, warmth, where the weight falls). It replaces the film's default tone, so write it as a whole direction, e.g. `instruction: '放慢一点，像在揭晓答案，最后一句加重'`. Follow the film's arc: the hook curious and quick, the intuition relaxed, the key page slower and firmer, the close calm.",
      "When one line turns sharply from the rest of its page (a question to the viewer, a punchline, someone else's words quoted), give that cue its own: `{ t: '你猜结果是多少？', solo: { instruction: '真诚地发问，尾音上扬' } }`. A solo line is voiced as a separate take and loses the flow of its page, so use at most one per page and only where the tone really turns; most pages need none.",
    ].join('\n'),
    revise: "When you change a page's cues, keep its `instruction` (and any cue's `solo`) in step with the new lines.",
  }[stage];
}
const withVoice = (stage: 'storyboard' | 'script' | 'revise', brief?: Brief) => { const n = voiceNote(stage, brief?.voice); return n ? `\n${n}` : ''; };

export function storyboardPrompt(brief: Brief, style: string, materials: string[]) {
  return [
    'Stage 1: storyboard.',
    `The request: ${materials.length ? 'turn the material into' : 'make'} an explainer film of about ${Math.round(brief.durationSec / 60 * 10) / 10} minutes.` + (brief.topic ? ` Topic: ${brief.topic}.` : '') + (brief.audience ? ` Audience: ${brief.audience}.` : ''),
    materials.length ? '' : 'There is no material: explain it from your own knowledge. Use only well-established, checkable facts and numbers; when unsure, leave the number out. Every number on screen must also appear in that page\'s say (the server checks where numbers come from against say).',
    brief.notes ? `Further notes from the user: ${brief.notes}` : '',
    materials.includes('research.md') ? 'materials/research.md is a research brief prepared for this film from what the request points at (and the web): use its facts, the code and quotes it gives for the screen, and heed its Careful section. It is your main source for facts; the user\'s own words and material come first where they differ.' : '',
    `Style: ${style} (write "${style}" as the style in storyboard.json).`,
    `Material: ${materials.map((m) => 'materials/' + m).join(', ') || '(none; write from the topic)'}`,
    'Stop and report once storyboard.json is written.' + withVoice('storyboard', brief) + langNote('storyboard', brief.lang, brief.replyLang),
  ].filter(Boolean).join('\n');
}

/** What the narration check found (narration.ts), sent back to the director once before the narration is voiced:
 *  `fix` must be fixed (a beat that would wait for a word no line says), `advice` is how it will sound to a listener */
export function narrationFixPrompt(found: { level: 'fix' | 'advice'; page?: string; msg: string }[], brief?: Brief) {
  const fix = found.filter((f) => f.level === 'fix'), advice = found.filter((f) => f.level === 'advice');
  const line = (f: { page?: string; msg: string }) => `- ${f.page ?? 'whole film'}: ${f.msg}`;
  return [
    'The server read the narration the way a listener will hear it, before it is voiced.',
    fix.length ? `Must fix (the picture is timed by these):\n${fix.map(line).join('\n')}` : '',
    advice.length ? `How it will sound (fix it where a listener would hear the problem; leave a false alarm as it is):\n${advice.map(line).join('\n')}` : '',
    'Change only the lines named, with edit, keeping the page\'s facts, its beats\' words and its approved meaning; when a change moves a beat\'s word to another line, change that beat\'s `at` in storyboard.json. Then run node engine/tools/script.mjs and stop, saying in one sentence what you changed.',
    [voiceNote('script', brief?.voice), langNote('script', brief?.lang, brief?.replyLang).trim()].filter(Boolean).join('\n'),
  ].filter(Boolean).join('\n');
}

export function storyboardFixPrompt(issues: { level: string; page?: string; beat?: number; msg: string }[], brief?: Brief) {
  return ['The server checked storyboard.json; fix the issues below (red must be fixed, yellow at your judgement):', ...issues.map((i) => `- [${i.level === 'red' ? 'red' : 'yellow'}] ${i.page ?? 'whole film'}${i.beat != null ? ` beat ${i.beat + 1}` : ''}: ${i.msg}`), 'Stop once fixed and say in one sentence what you changed. ' + replyNote(brief?.replyLang, brief?.lang)].join('\n');
}

export function scriptPrompt(feedback?: string, brief?: Brief) {
  return [feedback ? `The user's changes to the storyboard: ${feedback}\nFirst update storyboard.json to match, then write the narration.` : 'The user approved the storyboard without changes.', 'Stage 2: write script.js, run node engine/tools/script.mjs to see the estimated length, then stop and report.' + withVoice('script', brief) + langNote('script', brief?.lang, brief?.replyLang)].join('\n');
}

/** `brand`: the brand the film is made for; the files of it this page places are listed, with how to place them */
export function pagePrompt(sb: Storyboard, id: string, t: PageTiming, lang: Lang | undefined = sb.lang, replyLang?: Lang, revising = false, brand?: BrandBrief) {
  const p = sb.pages.find((x) => x.id === id);
  const outline = sb.pages.map((x) => `- ${x.id} ${x.section}`).join('\n');
  return `You own page **${id}**.

The film: ${sb.title} — ${sb.summary}
Its structure:
${outline}

## This page's storyboard
- Section: ${p?.section ?? ''}
- What it says: ${p?.say ?? ''}
- Key page: ${p?.core ? 'yes' : 'no'}
- Beats:
${(p?.beats || []).map((b, i) => `  ${i + 1}. [${b.at}] ${b.object} — ${b.action}${b.camera ? ` (camera: ${b.camera})` : ''}${b.text ? `, on-screen text "${b.text}"` : ''}`).join('\n')}

## This page's narration and timing (real voice)
The page lasts ${(t.end - t.start).toFixed(2)}s; its narration ends at ${(t.speechEnd - t.start).toFixed(2)}s (P.endT).
${t.cues.map((c) => `- c${c.i}: at ${c.at}s in the page, "${c.text}"`).join('\n')}${brandPageNote(brandFilesOn(brand, sb.pages, id), brand?.emphasis)}${recurringNote(sb, id)}${continuityNote(sb, id)}

${revising ? `pages/${id}.js is already written; stop once the change below is made in it and say in one sentence what you changed.` : `Stop once pages/${id}.js is written and say in one sentence what you drew.`}${langNote('page', lang, replyLang)}`;
}

const lintLines = (issues: LintIssue[]) => issues.map((i) => `- ${i.local}s: ${i.msg}`).join('\n');
const sheetLine = (times: { local: number }[]) => `The attached sheet shows the page at these moments within it (left to right, top to bottom): ${times.map((x) => x.local.toFixed(1) + 's').join(', ')}.`;

/** the reviewer's system prompt: how to judge a page, and the film's style (the stable part, shared by every page) */
export function reviewerSystem(style: string, styleNotes?: string, card?: string) {
  return [read('REVIEW.md'), '---\n# This film\'s style\n\n' + grammar(style), filmCardSection(card), styleNotesSection(styleNotes)].filter(Boolean).join('\n\n');
}

/** a problem the reviewer sees on the page, and the change it asks for */
export interface Problem { at: number; what: string; fix: string }
/** the reviewer's answer tool */
export const VERDICT: AnswerTool = {
  name: 'verdict',
  description: 'Your verdict on the page: pass, or fail with the problems a viewer would see.',
  parameters: Type.Object({
    pass: Type.Boolean(),
    problems: Type.Array(Type.Object({
      at: Type.Number({ description: 'the still\'s time within the page, in seconds' }),
      what: Type.String({ description: 'what is wrong, as the viewer sees it' }),
      fix: Type.String({ description: 'the change that fixes it' }),
    }), { maxItems: 5 }),
  }),
};
/** the page agent's answer tool: a problem it leaves as it is */
export const FLAG: AnswerTool = {
  name: 'flag',
  description: 'Leave the page as it is: the problems reported are intended or a false alarm (or, for a change the user asked for, the page already shows it or cannot do it). Give the reason in one sentence. The page is settled as it is.',
  parameters: Type.Object({ reason: Type.String() }),
};

/** what the reviewer is shown each round: the page's storyboard and timing, the checker's findings, the sheet */
export function reviewerPrompt(sb: Storyboard, id: string, t: PageTiming, round: number, issues: LintIssue[], times: { local: number }[], change?: string, brand?: BrandBrief) {
  const p = sb.pages.find((x) => x.id === id);
  const must = issues.filter((i) => i.level === 'error'), advice = issues.filter((i) => i.level === 'warn');
  return `${round > 1 ? `Round ${round}: the artist has changed the page since you last saw it.\n\n` : ''}## The page (${id} of ${sb.pages.length}, in the film "${sb.title}")
- Section: ${p?.section ?? ''}
- What it says: ${p?.say ?? ''}
- Beats:
${(p?.beats || []).map((b, i) => `  ${i + 1}. [${b.at}] ${b.object} — ${b.action}${b.text ? `, on-screen text "${b.text}"` : ''}`).join('\n')}
- The page lasts ${(t.end - t.start).toFixed(1)}s. Narration:
${t.cues.map((c) => `  - c${c.i} at ${c.at.toFixed(1)}s: "${c.text}"`).join('\n')}
${change ? `\nThe user asked for this change to the page: ${change}\nFail the page if the pictures don't show it.\n` : ''}${brandReviewNote(brand, brandFilesOn(brand, sb.pages, id))}${recurringNote(sb, id)}${continuityNote(sb, id)}
## The checker
${must.length ? `Must-fix (already sent to the artist):\n${lintLines(must)}` : 'Nothing must be fixed.'}
${advice.length ? `Advice (a measurement; fail on it only if the picture shows a problem):\n${lintLines(advice)}` : ''}

${sheetLine(times)}
Call verdict.`;
}

/** the reviewer did not call verdict: asked once more */
export const verdictAgain = 'Answer by calling verdict, with nothing else.';

/** what the page agent is asked to fix after a check: the checker's must-fix findings and the reviewer's problems */
export function fixPrompt(round: number, errors: LintIssue[], problems: Problem[], times: { local: number }[], change?: string) {
  return `Check round ${round}: the page needs changes.

${errors.length ? `The checker, must fix:\n${lintLines(errors)}\n\n` : ''}${problems.length ? `The reviewer, looking at the attached sheet:\n${problems.map((p) => `- ${p.at.toFixed(1)}s: ${p.what} → ${p.fix}`).join('\n')}\n\n` : ''}${change ? `The user asked for this change to the page: ${change}\nIf the pictures don't show it yet, make it now.\n\n` : ''}${sheetLine(times)}
Fix each problem with edit, only where it is (a size, a position, a moment). **Never rewrite the whole file with write**: a full rewrite takes minutes, one edit takes seconds. No need to read the file again afterwards.
**Put all of this round's edits in one reply** (one reply can call edit several times), each with finish: true: the round ends once they apply, no reply needed, and the page is checked again.
If the problems should stay as they are (intended, or a false alarm), call flag with the reason instead of changing the page.`;
}

export function reviewPrompt(issues: LintIssue[], flagged: string[], replyLang?: Lang) {
  return `All pages are done. Now check the **whole film** (not one page). The attached sheet shows each page in the middle and at the end, in page order.
${issues.length ? 'Lint for the whole film:\n' + issues.map((i) => `- ${i.page} ${i.local}s: ${i.msg}`).join('\n') : 'Lint found nothing.'}
${flagged.length ? '\nThese pages still had problems after their own checks: ' + flagged.join('; ') : ''}

Fix locally with edit; never rewrite a whole page file. Fix only problems across pages and obvious defects (styles that don't match, a page that is clearly empty, text off the page or overlapping), at most 2 pages; leave small blemishes. When done, stop and tell the user in one plain sentence which page you changed and how it looks different (e.g. "The timer on page 5 flickered in its second half; that's fixed"), without terms like lint, determinism or p05. If nothing needs changing, change nothing and stop. ${replyNote(replyLang)}`;
}
