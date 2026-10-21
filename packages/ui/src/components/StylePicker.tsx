import { useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import type { StyleInfo } from '../lib/client';
import { STYLE_SWATCH, styleLabel } from '../lib/styles';
import { t } from '../i18n';

// The film's style. When the styles come with pictures (a still and a short loop from a real film in each style), every
// style sits in one horizontally scrolling strip of 16:9 thumbnails, like the hosted studio's film strip: scroll it with
// the wheel, a trackpad, the arrow buttons or the keyboard; hovering or focusing a thumbnail plays its loop. Without
// pictures, a row of chips with each style's colours.

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

export function StylePicker({ styles, value, onChange, locked }: { styles: StyleInfo[]; value: string; onChange: (id: string) => void; locked: (id: string) => boolean }) {
  if (!styles.some((s) => s.poster)) {
    return (
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={t('home.style')}>
        {styles.map((s) => (
          <button key={s.id} type="button" role="radio" aria-checked={value === s.id} className={`fs-chip ${locked(s.id) ? 'text-ink-3' : ''}`} onClick={() => onChange(s.id)}>
            <span className={`flex -space-x-1 ${locked(s.id) ? 'opacity-60' : ''}`} aria-hidden>{(STYLE_SWATCH[s.id] || s.swatch || []).map((c) => <span key={c} className="h-3 w-3 rounded-full ring-1 ring-black/15" style={{ background: c }} />)}</span>
            {styleLabel(s).name}
            {locked(s.id) && <><Lock size={11} className="text-ink-3" aria-hidden /><span className="sr-only">{t('home.styleMembers')}</span></>}
          </button>
        ))}
      </div>
    );
  }
  return <Strip styles={styles} value={value} onChange={onChange} locked={locked} />;
}

function Strip({ styles, value, onChange, locked }: { styles: StyleInfo[]; value: string; onChange: (id: string) => void; locked: (id: string) => boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  // which ends are reachable decides whether each arrow and fade shows
  const measure = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  };
  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [styles.length]);

  // the chosen style is always in view: on first paint and whenever it changes (it may come from saved settings)
  useEffect(() => {
    const el = track.current;
    const on = el?.querySelector<HTMLElement>('[aria-checked="true"]');
    if (!el || !on) return;
    const left = on.offsetLeft - el.offsetLeft, right = left + on.offsetWidth;
    if (left < el.scrollLeft || right > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left: left - (el.clientWidth - on.offsetWidth) / 2, behavior: reduced() ? 'auto' : 'smooth' });
    }
  }, [value]);

  // a vertical wheel scrolls the strip sideways (a trackpad's horizontal swipe already does), until it reaches an end,
  // so the page still scrolls once the strip has nothing more to show
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      if ((e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft >= max)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => el.removeEventListener('wheel', wheel);
  }, []);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduced() ? 'auto' : 'smooth' });
  };

  // arrow keys move the choice along the strip, as a radio group should
  const keys = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = styles.findIndex((s) => s.id === value);
    const next = styles[Math.min(styles.length - 1, Math.max(0, i + (e.key === 'ArrowRight' ? 1 : -1)))];
    if (next) {
      onChange(next.id);
      requestAnimationFrame(() => track.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus());
    }
  };

  const arrow = 'absolute top-[calc(50%-14px)] z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-paper/95 text-ink shadow-[var(--fs-shadow-lg)] ring-1 ring-line transition-opacity duration-150 hover:bg-paper-2';
  // fade the thumbnails out at an edge that has more to scroll to; a mask (not an overlay) so it matches any background
  const fade = `linear-gradient(to right, ${edge.start ? '#000' : 'transparent'}, #000 40px, #000 calc(100% - 40px), ${edge.end ? '#000' : 'transparent'})`;
  // contain:inline-size keeps the strip's own width out of its parents' sizing: a fieldset or grid cell would otherwise
  // grow to fit all thumbnails side by side instead of letting the strip scroll
  return (
    <div className="relative -mx-1 min-w-0 [contain:inline-size]">
      <div ref={track} onScroll={measure} onKeyDown={keys} role="radiogroup" aria-label={t('home.style')}
        style={{ maskImage: fade, WebkitMaskImage: fade }}
        className="flex snap-x snap-proximity gap-2.5 overflow-x-auto scroll-px-1 px-1 pb-1.5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {styles.map((s) => (
          <div key={s.id} className="w-[148px] shrink-0 snap-start sm:w-[168px]">
            <Tile s={s} on={value === s.id} locked={locked(s.id)} pick={() => onChange(s.id)} />
          </div>
        ))}
      </div>
      {/* arrows only where there is more to scroll to */}
      <button type="button" tabIndex={-1} onClick={() => page(-1)} aria-label={t('home.stylePrev')}
        className={`${arrow} left-0 ${edge.start ? 'pointer-events-none opacity-0' : 'opacity-100'}`}><ChevronLeft size={16} aria-hidden /></button>
      <button type="button" tabIndex={-1} onClick={() => page(1)} aria-label={t('home.styleNext')}
        className={`${arrow} right-0 ${edge.end ? 'pointer-events-none opacity-0' : 'opacity-100'}`}><ChevronRight size={16} aria-hidden /></button>
    </div>
  );
}

function Tile({ s, on, locked, pick }: { s: StyleInfo; on: boolean; locked: boolean; pick: () => void }) {
  const [hot, setHot] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const { name, poster, loop } = styleLabel(s);
  const play = hot && !!loop && !reduced();
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (play) { v.currentTime = 0; v.play().catch(() => {}); } else v.pause();
  }, [play]);
  return (
    <button type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1} onClick={pick} title={name}
      onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)} onFocus={() => setHot(true)} onBlur={() => setHot(false)}
      className="group flex w-full flex-col gap-1.5 rounded-[12px] text-left outline-none focus-visible:ring-4 focus-visible:ring-accent/25">
      <span className={`relative block aspect-video w-full overflow-hidden rounded-[10px] bg-paper-2 ring-1 transition-[box-shadow,transform] duration-200 ease-[var(--fs-ease)]
        ${on ? 'ring-2 ring-accent shadow-[var(--fs-shadow-lg)]' : 'ring-line group-hover:-translate-y-0.5 group-hover:shadow-[var(--fs-shadow-lg)]'}`}>
        {poster
          ? <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          : <span className="absolute inset-0 grid place-items-center" aria-hidden>
              <span className="flex -space-x-1.5">{(STYLE_SWATCH[s.id] || s.swatch || []).map((c) => <span key={c} className="h-5 w-5 rounded-full ring-2 ring-paper" style={{ background: c }} />)}</span>
            </span>}
        {loop && hot && <video ref={video} src={loop} muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" />}
        {locked && (
          <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-[3px] text-[10.5px] font-medium leading-none text-white">
            <Lock size={10} aria-hidden />{t('home.styleMembers')}
          </span>
        )}
        {on && <span className="absolute bottom-1.5 right-1.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-fg shadow-sm" aria-hidden><Check size={12} strokeWidth={3} /></span>}
      </span>
      <span className={`truncate px-0.5 text-[12.5px] ${on ? 'font-medium text-ink' : 'text-ink-2 group-hover:text-ink'}`}>{name}</span>
    </button>
  );
}
