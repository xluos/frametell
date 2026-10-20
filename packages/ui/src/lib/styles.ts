// Style names and swatches for the panel (the ids match packages/engine/styles/<id>).
import { getLocale, t, type MessageKey } from '../i18n';
import type { StyleInfo } from './client';

const KNOWN = [
  'vector',
  'math',
  'ink-wash',
  'swiss',
  'pop',
  'neon',
  'watercolor',
  'broadsheet',
  'isotype',
  'clay',
  'collage',
  'one-line',
  'tech-dark',
  'screencast',
  'isometric',
  'blueprint',
  'instrument',
  'inked',
  'engraving',
  'midcentury',
  'crayon',
  'mascot',
  'chat',
  'manga',
  'old-map',
  'metro',
  'warm-story',
  'whiteboard',
  'chalkboard',
  'study',
  'editorial',
];
/** a style's name in the interface language; undefined for a style the panel doesn't know */
export const styleName = (id: string): string | undefined => (KNOWN.includes(id) ? t(`common.styles.${id}` as MessageKey) : undefined);
/** a built-in style's one-line summary in the interface language; undefined for others */
export const styleSummary = (id: string): string | undefined => (KNOWN.includes(id) ? t(`common.styleSummaries.${id}` as MessageKey) : undefined);
/** STYLE_NAME[id], read at use time so it follows the language */
export const STYLE_NAME: Record<string, string | undefined> = new Proxy({}, { get: (_, id) => (typeof id === 'string' ? styleName(id) : undefined) });
export const STYLE_SWATCH: Record<string, string[]> = {
  'vector': ["#120A3C", "#32BAEE", "#FFA62B", "#FF5D8F"],
  'math': ["#0E0F12", "#ECEEF2", "#58B9E6", "#F4D66B"],
  'ink-wash': ["#F3ECDC", "#1A1714", "#8A8178", "#B8321F"],
  'swiss': ["#F3F1EC", "#111111", "#E3321D", "#8A8984"],
  'pop': ["#F4E6C2", "#E3221B", "#FFD60A", "#1F5FD1"],
  'neon': ["#07060D", "#FF2E88", "#22E5FF", "#9B5CFF"],
  'watercolor': ["#FBF8F1", "#3C7DBA", "#5B9A5A", "#F0BF45"],
  'broadsheet': ["#FFF1E5", "#990F3D", "#0F5499", "#262A33"],
  'isotype': ["#F1EADA", "#1F1D1A", "#B23C29", "#2F5B86"],
  'clay': ["#F5D7C6", "#F39A3E", "#4D9AD9", "#F7C843"],
  'collage': ["#E2DBCD", "#1D1B19", "#B8433F", "#DACF08"],
  'one-line': ["#F5F0E7", "#1C1A17", "#D9694E", "#93B4CF"],
  'tech-dark': ["#15171A", "#E8E6E1", "#4FBFAE", "#E3A64B"],
  'screencast': ["#E4E8F0", "#FFFFFF", "#151823", "#4F55F1"],
  'isometric': ["#EEF0F8", "#FFFFFF", "#9D8CF5", "#FF6B3D"],
  'blueprint': ["#0F3B78", "#F2F7FF", "#FFD866", "#FF6B5B"],
  'instrument': ["#FBFBFA", "#26262A", "#D3D3CE", "#FF4F00"],
  'inked': ["#F2EFE7", "#93D3B0", "#F4B829", "#41538F"],
  'engraving': ["#F1E8D2", "#1E1712", "#B4513C", "#557A98"],
  'midcentury': ["#F6EDDA", "#E3AE36", "#3A9A94", "#D9553A"],
  'crayon': ["#F8F0DD", "#E2453A", "#F7C62E", "#3A8BDB"],
  'mascot': ["#FFF8EC", "#FF9A3C", "#3DB57D", "#4A9BE0"],
  'chat': ["#DCEFE6", "#95E3A6", "#FFFFFF", "#E5484D"],
  'manga': ["#FAFAF8", "#111111", "#9A9A9A", "#D7262E"],
  'old-map': ["#EBDDBC", "#2B1D12", "#B0442C", "#5E7F55"],
  'metro': ["#F7F6F1", "#E1251B", "#0A6FC2", "#00965E"],
  'warm-story': ["#F4E7D3", "#C8603C", "#E0A23B", "#7E9F7A"],
  'whiteboard': ["#F7F8F7", "#1E2226", "#D0342C", "#1F5DBA"],
  'chalkboard': ["#223029", "#F1ECE1", "#F3DD86", "#F0A3A0"],
  study: [],
  editorial: ['#F7F4ED', '#242724', '#24766F', '#B54F3C'],
};

/** a style's name, summary and pictures in the interface language: the panel's own translation, then the style's, then its own */
export const styleLabel = (s: StyleInfo) => {
  const own = s.i18n?.[getLocale() as 'zh' | 'en'];
  return { name: styleName(s.id) ?? own?.name ?? s.name, summary: styleSummary(s.id) ?? own?.summary ?? s.summary, poster: own?.poster ?? s.poster, loop: own?.loop ?? s.loop };
};
