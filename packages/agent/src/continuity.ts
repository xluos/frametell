// What a film keeps on screen across pages: the storyboard's recurring objects (each with the look every page draws it
// with, and the pages it appears on), and how each page should open from where the previous one left the picture.
//
// Pages are drawn in parallel, each by its own agent that never sees its neighbours. Without these, the same running
// example came back with its quadrants swapped from one page to the next, and every page wiped what the last had built.
import type { Storyboard } from './project.js';

/** one thing the film keeps drawing: `look` fixes its shape, layout, labels, colours and place in the frame */
export interface Recurring { name: string; look: string; pages: string[] }

/** the recurring objects as written, keeping only well-formed entries */
export function recurringObjects(sb: Storyboard): Recurring[] {
  const raw = (sb as { objects?: unknown }).objects;
  if (!Array.isArray(raw)) return [];
  const ids = new Set(sb.pages.map((p) => p.id));
  return raw.flatMap((o) => {
    if (!o || typeof o !== 'object') return [];
    const x = o as Record<string, unknown>;
    const name = typeof x.name === 'string' ? x.name.trim() : '', look = typeof x.look === 'string' ? x.look.trim() : '';
    const pages = Array.isArray(x.pages) ? x.pages.filter((p): p is string => typeof p === 'string' && ids.has(p)) : [];
    return name && look && pages.length ? [{ name, look, pages }] : [];
  });
}

/** what the storyboard check says about the recurring objects: a film of three pages or more that carries one example
 *  needs them written down (red), and an entry that is unusable is named (yellow) */
export function recurringIssues(sb: Storyboard): { level: 'red' | 'yellow'; msg: string }[] {
  const raw = (sb as { objects?: unknown }).objects;
  const ok = recurringObjects(sb);
  const out: { level: 'red' | 'yellow'; msg: string }[] = [];
  if (sb.pages.length >= 3 && !ok.length) out.push({ level: 'red', msg: '`objects` is missing: list the things that appear on more than one page (the running example first), each with `name`, `look` (its fixed shape, layout, labels in their places, colours, where it sits in the frame) and `pages`' });
  if (Array.isArray(raw) && raw.length > ok.length) out.push({ level: 'yellow', msg: `${raw.length - ok.length} of the objects lack a name, a look, or pages that exist in the storyboard` });
  for (const o of ok) if (o.look.length < 20) out.push({ level: 'yellow', msg: `the look of "${o.name}" is too thin to redraw the same way on another page: say its shape, where each part sits, its labels and colours` });
  return out;
}

/** the recurring objects a page draws, for its agent and its reviewer */
export function recurringNote(sb: Storyboard, id: string): string {
  const on = recurringObjects(sb).filter((o) => o.pages.includes(id));
  if (!on.length) return '';
  return `\n## Recurring objects on this page\nThese also appear on other pages, drawn by other agents. Draw each exactly as described (same layout, same labels in the same places, same colours, same place in the frame), so the viewer recognises it from page to page:\n${on.map((o) => `- **${o.name}**: ${o.look}`).join('\n')}\n`;
}

/** what the previous page left on screen, and that this page opens from it */
export function continuityNote(sb: Storyboard, id: string): string {
  const i = sb.pages.findIndex((p) => p.id === id);
  if (i <= 0) return '';
  const prev = sb.pages[i - 1];
  const kept = recurringObjects(sb).filter((o) => o.pages.includes(prev.id) && o.pages.includes(id)).map((o) => o.name);
  const last = prev.beats.slice(-2).map((b) => `${b.object} (${b.action})`).join('; ');
  return `\n## Where the previous page left off\nPage ${prev.id} (${prev.section}) ended on: ${last || prev.say}.${kept.length ? ` ${kept.join(', ')} ${kept.length > 1 ? 'were' : 'was'} on screen then and ${kept.length > 1 ? 'are' : 'is'} on this page too: have ${kept.length > 1 ? 'them' : 'it'} there in its finished state from the first frame (what the last page established stays established), then change it. Don't redraw it from nothing.` : ' Open on this page\'s own scene, already set.'}\n`;
}
