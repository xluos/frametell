// The narration read the way a listener hears it, before any of it is paid to be voiced. No model: a few measurements
// that tell a lesson someone hears from a slide deck read aloud, and the one thing that silently breaks a film (a beat
// timed to a word no line says: the engine falls back to the line's start, and the picture lands early).
//
// `fix` must be fixed; `advice` goes back to the director as how it will sound, for it to judge. Advice that only makes
// sense for speech (a page with no reasons, every line its own sentence) is skipped for a silent film, whose cues are
// captions that should each stand alone.
import type { Storyboard } from './project.js';

type Cue = string | { t: string };
export interface NarrationPage { id: string; section?: string; title?: string; cues: Cue[] }
export interface NarrationFinding { level: 'fix' | 'advice'; page?: string; kind: NarrationKind; msg: string }
export type NarrationKind = 'anchor' | 'reads-labels' | 'parallel-list' | 'no-reasons' | 'clipped' | 'signpost' | 'caveats';

const text = (c: Cue) => (typeof c === 'string' ? c : c.t);
/** what is spoken: no spaces, punctuation or symbols (a % stays: it is said) */
const bare = (s: string) => s.replace(/[\s\p{P}\p{S}]/gu, (ch) => (ch === '%' ? ch : '')).toLowerCase();
const CJK = /[㐀-鿿]/;
/** a cue that ends its sentence */
const ENDS = /[。！？!?.…]["”’）)]*$/;

// words that carry reasoning (a cause, a consequence, a turn, a condition, a test)
const LINKS_ZH = /因为|所以|但是?|可是|不过|然而|而是|却|如果|要是|假如|假设|只要|只有|除非|于是|因此|结果|这样一来|这样|这就|也就是说|就是说|换句话说|意味着|那么|那就|就会|就能|就得|就要|才能|才会|才|用来|用于|据此|由此|通过这|为什么|怎么会|原来|其实|既然|反而|否则|不然|比如|例如|而/;
const LINKS_EN = /\b(because|so that|so|thus|thereby|but|if|then|which|means|that's why|to make|to keep|instead|since|therefore|although|though|yet|unless|otherwise|why|how|for example|say|imagine|suppose|until|when|while|whereas|rather)\b/i;
// small print at a page's close
const CAVEAT_ZH = /不保证|不能保证|无法保证|并不保证|并非|不一定|未必|不代表|不等于|不能证明|并不证明|仍需|仍要|还要核|仍在研究|也可能|可能会|不构成|风险/;
const CAVEAT_EN = /\b(not guarantee|no guarantee|doesn't guarantee|does not guarantee|doesn't mean|does not mean|may not|might not|not always|still being studied|not advice|at your own risk)\b/i;
// a page that opens by announcing the next topic
const SIGNPOST_ZH = /^(接下来|下面|我们来看|我们再看|再来看|来看看|让我们|首先我们|然后我们来)/;
const SIGNPOST_EN = /^(next|now let's|let's (?:look|see|move)|moving on|first,? let's)/i;

/** the longest run both ends of every sentence share (a list says "A takes 25%. B takes 25%. C takes 25%.") */
function sharedEdge(sentences: string[], fromEnd: boolean): string {
  const s = sentences.map((x) => (fromEnd ? [...x].reverse().join('') : x));
  let n = 0;
  while (s.every((x) => n < x.length && x[n] === s[0][n])) n++;
  const edge = s[0].slice(0, n);
  return fromEnd ? [...edge].reverse().join('') : edge;
}

/** sentences of a page, as spoken (cues joined, cut at the full stops) */
const sentencesOf = (cues: string[], en: boolean) => cues.join(en ? ' ' : '').split(/[。！？!?]|\.(?=\s|$)/).map(bare).filter((x) => x.length >= 3);

export function checkNarration(sb: Storyboard, pages: NarrationPage[], o: { voiced: boolean }): NarrationFinding[] {
  const out: NarrationFinding[] = [];
  const en = sb.lang === 'en' || (!sb.lang && !CJK.test(JSON.stringify(pages)));
  const LINKS = en ? LINKS_EN : LINKS_ZH, CAVEAT = en ? CAVEAT_EN : CAVEAT_ZH, SIGNPOST = en ? SIGNPOST_EN : SIGNPOST_ZH;
  const byId = new Map(pages.map((p) => [p.id, p]));
  const quote = (s: string) => (en ? `"${s}"` : `「${s}」`);
  let caveatPages = 0;

  for (const sp of sb.pages) {
    const page = byId.get(sp.id);
    if (!page) continue;   // a page with no narration is the completeness check's to report
    const cues = page.cues.map(text);
    const n = cues.length;

    // ── beats waiting for a line or a word that isn't there ──
    (sp.beats || []).forEach((b, bi) => {
      const m = /^c(\d+)(?::(.+))?$/.exec(String(b.at ?? '').trim());
      if (!m) { out.push({ level: 'fix', page: sp.id, kind: 'anchor', msg: `beat ${bi + 1} (${b.object}) has the cue "${b.at}", which names no line: write cN or cN:word` }); return; }
      const i = +m[1], word = m[2]?.trim();
      if (i >= n) { out.push({ level: 'fix', page: sp.id, kind: 'anchor', msg: `beat ${bi + 1} (${b.object}) is timed to line c${i}, but the page has only ${n} lines (c0–c${n - 1})` }); return; }
      if (word && !cues[i].includes(word)) {
        const elsewhere = cues.findIndex((c) => c.includes(word));
        out.push({ level: 'fix', page: sp.id, kind: 'anchor', msg: `beat ${bi + 1} (${b.object}) waits for the word ${quote(word)} in line c${i} ${quote(cues[i])}, which doesn't say it${elsewhere >= 0 ? `; it is in c${elsewhere}: change the beat to c${elsewhere}:${word}` : ': put the word in the line, or tie the beat to a word the line says'}` });
      }
    });

    // ── lines that only read out what is already on screen ──
    const labels = (sp.beats || []).flatMap((b) => String(b.text || '').split(/\s*[\/／|｜]\s*/)).map(bare).filter((x) => x.length >= (en ? 3 : 2)).sort((a, b) => b.length - a.length);
    if (labels.length) {
      const reading = cues.filter((c) => {
        const full = bare(c);
        // a label named on the way to a point ("股票、长期国债、") is fine; a line that is nothing but the label, said as its own statement, is the slide read aloud
        if (full.length < (en ? 6 : 3) || !ENDS.test(c.trim())) return false;
        let rest = full;
        for (const l of labels) rest = rest.split(l).join('');
        return rest.length <= (en ? 6 : 3) && rest.length < full.length * 0.4;
      });
      if (reading.length >= 2 || (reading.length && reading.length * 2 >= n)) out.push({ level: 'advice', page: sp.id, kind: 'reads-labels', msg: `${reading.map(quote).join(' ')} only read out the labels the picture already shows; say what the viewer should notice about them, or why` });
    }

    // ── a list read aloud: three or more sentences in a row built the same way ──
    const sentences = sentencesOf(cues, en);
    const short = (x: string) => (en ? x.length <= 70 : x.length <= 18);   // a list is short sentences; long ones that happen to end alike are not
    for (let k = 0; k + 3 <= sentences.length; k++) {
      if (!sentences.slice(k, k + 3).every(short)) continue;
      let j = k + 3;
      const edge = (from: number, to: number) => { const run = sentences.slice(from, to); const a = sharedEdge(run, true), b = sharedEdge(run, false); return a.length >= b.length ? a : b; };
      if (edge(k, j).length < (en ? 4 : 2)) continue;
      while (j < sentences.length && short(sentences[j]) && edge(k, j + 1).length >= (en ? 4 : 2)) j++;
      out.push({ level: 'advice', page: sp.id, kind: 'parallel-list', msg: `${j - k} sentences in a row are built the same way (each with ${quote(edge(k, j))}): a list read aloud. Let the picture hold the list and say what the items have in common, or why they differ` });
      break;
    }

    // ── speech only: the reasons, and the way sentences run ──
    const spoken = bare(cues.join(''));
    if (o.voiced && n >= 4 && spoken.length >= (en ? 120 : 40) && !LINKS.test(cues.join(en ? ' ' : ''))) out.push({ level: 'advice', page: sp.id, kind: 'no-reasons', msg: 'a page of flat statements: no line says why, so, but or what if. Explain the step (what causes what) instead of stating its parts' });
    if (o.voiced && n >= 4 && cues.filter((c) => ENDS.test(c.trim())).length >= n * 0.8) out.push({ level: 'advice', page: sp.id, kind: 'clipped', msg: `${cues.filter((c) => ENDS.test(c.trim())).length} of ${n} lines end their own sentence, so the voice stops after every line like a list of conclusions. Join the thought into longer sentences that run across lines (a comma at the end of a line that continues)` });

    // ── a page that opens by announcing itself ──
    if (n && SIGNPOST.test(cues[0].trim())) out.push({ level: 'advice', page: sp.id, kind: 'signpost', msg: `opens with ${quote(cues[0])}: open from what the last page found instead of announcing the next topic` });
    if (n && CAVEAT.test(cues[n - 1])) caveatPages++;
  }

  if (o.voiced && caveatPages >= 3 && caveatPages >= sb.pages.length * 0.4) out.push({ level: 'advice', kind: 'caveats', msg: `${caveatPages} of ${sb.pages.length} pages end on a caveat; it sounds like small print. Keep each qualification once, where its claim is made, and let pages end on what they found` });
  return foldRepeats(out);
}

/** the same advice on many pages is one habit: said once for the film, naming the pages, so a long film's list stays
 *  short enough to act on (a beat to fix is always named on its own page) */
const FOLD: Partial<Record<NarrationKind, string>> = {
  clipped: 'most lines end their own sentence, so the voice stops after every line like a list of conclusions. Join each thought into longer sentences that run across lines (a comma at the end of a line that continues)',
  'no-reasons': 'pages of flat statements: no line says why, so, but or what if. Explain each step (what causes what) instead of stating its parts',
};
function foldRepeats(found: NarrationFinding[]): NarrationFinding[] {
  const out: NarrationFinding[] = [];
  const seen = new Set<NarrationKind>();
  for (const f of found) {
    const same = found.filter((x) => x.kind === f.kind && x.level === 'advice');
    if (f.level !== 'advice' || !FOLD[f.kind] || same.length < 3) { out.push(f); continue; }
    if (seen.has(f.kind)) continue;
    seen.add(f.kind);
    out.push({ level: 'advice', kind: f.kind, msg: `on ${same.length} pages (${same.map((x) => x.page).join(', ')}): ${FOLD[f.kind]}` });
  }
  return out;
}
