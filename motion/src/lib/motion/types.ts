/* ═══════════════════════════════════════════════════════
   Motion Studio — core types
   A MotionDoc is a sequence of scenes rendered
   deterministically as a pure function of time, so the
   same code drives the live preview and the MP4 export.
   ═══════════════════════════════════════════════════════ */

// ── Canvas aspect presets ──
export const ASPECTS = [
  { id: '16:9', label: 'Landscape', hint: 'YouTube · Slides', w: 1920, h: 1080 },
  { id: '1:1',  label: 'Square',    hint: 'Feed posts',       w: 1080, h: 1080 },
  { id: '9:16', label: 'Vertical',  hint: 'Reels · Stories',  w: 1080, h: 1920 },
  { id: '4:5',  label: 'Portrait',  hint: 'Instagram feed',   w: 1080, h: 1350 },
] as const;

export type AspectId = typeof ASPECTS[number]['id'];

// ── Brand color schemes (Tech Futures Group brand house) ──
export const SCHEMES = [
  { id: 'dark',     label: 'Dark',     bg: '#0a0a0a', fg: '#ffffff', accent: '#4EFF00', muted: 'rgba(255,255,255,0.5)',  line: 'rgba(255,255,255,0.1)' },
  { id: 'charcoal', label: 'Charcoal', bg: '#272727', fg: '#ffffff', accent: '#4EFF00', muted: 'rgba(255,255,255,0.45)', line: 'rgba(255,255,255,0.12)' },
  { id: 'green',    label: 'Green',    bg: '#4EFF00', fg: '#0a0a0a', accent: '#0a0a0a', muted: 'rgba(10,10,10,0.5)',     line: 'rgba(10,10,10,0.16)' },
  { id: 'cream',    label: 'Cream',    bg: '#F7F6F2', fg: '#0a0a0a', accent: '#48524B', muted: 'rgba(10,10,10,0.45)',    line: 'rgba(10,10,10,0.12)' },
  { id: 'white',    label: 'White',    bg: '#ffffff', fg: '#0a0a0a', accent: '#48524B', muted: 'rgba(10,10,10,0.4)',     line: 'rgba(0,0,0,0.08)' },
] as const;

export type SchemeId = typeof SCHEMES[number]['id'];
export type Scheme = typeof SCHEMES[number];

export function getScheme(id: SchemeId): Scheme {
  return SCHEMES.find((s) => s.id === id) ?? SCHEMES[0];
}

/**
 * A program-defined color scheme (Motion Studio Pro). muted/line are
 * derived from fg so a brand only has to pick three colors.
 */
export interface CustomScheme {
  bg: string;
  fg: string;
  accent: string;
}

export interface ResolvedScheme {
  bg: string;
  fg: string;
  accent: string;
  muted: string;
  line: string;
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(255,255,255,${alpha})`;
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/** The scheme a scene actually renders with — custom colors win over the preset. */
export function resolveScheme(scene: Pick<Scene, 'scheme' | 'customScheme'>): ResolvedScheme {
  if (scene.customScheme) {
    const { bg, fg, accent } = scene.customScheme;
    return { bg, fg, accent, muted: hexToRgba(fg, 0.55), line: hexToRgba(fg, 0.16) };
  }
  return getScheme(scene.scheme);
}

// ── Scene templates ──
export const TEMPLATES = [
  { id: 'title',     label: 'Title',     hint: 'Kicker · title · subtitle' },
  { id: 'statement', label: 'Statement', hint: 'One big line' },
  { id: 'stat',      label: 'Stat',      hint: 'Animated number + label' },
  { id: 'list',      label: 'Agenda',    hint: 'Staggered list of lines' },
  { id: 'quote',     label: 'Quote',     hint: 'Pull quote + attribution' },
  { id: 'image',     label: 'Image',     hint: 'Photo + text overlay' },
  { id: 'endcard',   label: 'End Card',  hint: 'Logo · CTA · date' },
] as const;

export type TemplateId = typeof TEMPLATES[number]['id'];

// ── Text animation presets ──
export const TEXT_ANIMS = [
  { id: 'rise',           label: 'Rise' },
  { id: 'word-stagger',   label: 'Word Stagger' },
  { id: 'letter-cascade', label: 'Letter Cascade' },
  { id: 'typewriter',     label: 'Typewriter' },
  { id: 'wipe',           label: 'Wipe' },
  { id: 'blur-in',        label: 'Blur In' },
  { id: 'scale-in',       label: 'Scale In' },
  { id: 'mask-reveal',    label: 'Mask Reveal' },
] as const;

export type TextAnimId = typeof TEXT_ANIMS[number]['id'];

// ── Scene transitions (into the scene) ──
export const TRANSITIONS = [
  { id: 'cut',   label: 'Cut' },
  { id: 'fade',  label: 'Fade' },
  { id: 'wipe',  label: 'Wipe' },
  { id: 'slide', label: 'Slide' },
] as const;

export type TransitionId = typeof TRANSITIONS[number]['id'];

// ── Image motion (Ken Burns) ──
export const KEN_BURNS = [
  { id: 'none',      label: 'Still' },
  { id: 'zoom-in',   label: 'Zoom In' },
  { id: 'zoom-out',  label: 'Zoom Out' },
  { id: 'pan-left',  label: 'Pan ←' },
  { id: 'pan-right', label: 'Pan →' },
] as const;

export type KenBurnsId = typeof KEN_BURNS[number]['id'];

// ── Image overlays for text legibility ──
export const OVERLAYS = [
  { id: 'none',            label: 'None' },
  { id: 'scrim',           label: 'Scrim' },
  { id: 'gradient-bottom', label: 'Grad ↓' },
  { id: 'gradient-left',   label: 'Grad ←' },
  { id: 'brand',           label: 'Brand' },
] as const;

export type OverlayId = typeof OVERLAYS[number]['id'];

// ── Alignment ──
export const ALIGNMENTS = [
  { id: 'center',       label: 'Center' },
  { id: 'lower-left',   label: 'Lower Left' },
  { id: 'lower-center', label: 'Lower Center' },
] as const;

export type AlignId = typeof ALIGNMENTS[number]['id'];

// ── Scene ──
export interface Scene {
  id: string;
  template: TemplateId;
  /** Total scene duration in ms (enter + hold + exit). */
  duration: number;
  scheme: SchemeId;
  /** Program colors (Pro studio) — overrides `scheme` when set. */
  customScheme?: CustomScheme | null;
  anim: TextAnimId;
  /** Transition INTO this scene from the previous one. */
  transition: TransitionId;
  align: AlignId;
  /** Use the serif (heading) font for the main line of this scene. */
  serifTitle: boolean;

  // Text content (used per-template)
  kicker: string;
  title: string;
  subtitle: string;
  /** Agenda/list lines, newline separated. */
  body: string;
  /** Quote attribution / stat label. */
  attribution: string;

  // Stat template
  statPrefix: string;
  statValue: number;
  statSuffix: string;

  // Image template
  imageId: string | null;
  kenBurns: KenBurnsId;
  overlay: OverlayId;
  /** 0–1 overlay strength. */
  overlayOpacity: number;
}

// ── Document ──
export interface MotionDoc {
  aspect: AspectId;
  fps: number;
  scenes: Scene[];
  /** CSS font-family for big display text. */
  fontHeading: string;
  /** CSS font-family for kickers, labels, body. */
  fontBody: string;
  watermark: string;
  showGrain: boolean;
}

// ── Loaded image assets, keyed by imageId ──
export interface ImageAsset {
  id: string;
  name: string;
  url: string;
  img: HTMLImageElement;
}

export type AssetMap = Record<string, ImageAsset>;

let sceneCounter = 0;

export function makeScene(template: TemplateId, overrides: Partial<Scene> = {}): Scene {
  sceneCounter += 1;
  const base: Scene = {
    id: `scene-${Date.now().toString(36)}-${sceneCounter}`,
    template,
    duration: 4000,
    scheme: 'dark',
    customScheme: null,
    anim: 'word-stagger',
    transition: 'fade',
    align: 'center',
    serifTitle: false,
    kicker: '',
    title: '',
    subtitle: '',
    body: '',
    attribution: '',
    statPrefix: '$',
    statValue: 0,
    statSuffix: '',
    imageId: null,
    kenBurns: 'zoom-in',
    overlay: 'gradient-bottom',
    overlayOpacity: 0.65,
  };

  const defaults: Partial<Record<TemplateId, Partial<Scene>>> = {
    title: {
      kicker: 'TFG OFFICE HOURS',
      title: 'Scale Your Tech Startup',
      subtitle: 'No-cost advising from Tech Futures Group',
    },
    statement: {
      title: 'Specialist advising. Founder speed.',
      anim: 'mask-reveal',
      serifTitle: true,
    },
    stat: {
      statPrefix: '$',
      statValue: 70,
      statSuffix: 'M+',
      attribution: 'in SBIR/STTR and grant funding secured by TFG clients',
      anim: 'rise',
      duration: 3500,
    },
    list: {
      kicker: 'WHAT TFG DELIVERS',
      body: 'Fundraising strategy that closes\nSBIR/STTR grant support\nGo-to-market with real traction',
      anim: 'rise',
      align: 'lower-left',
      duration: 5000,
    },
    quote: {
      title: 'TFG helped us sharpen the pitch and close our seed round.',
      attribution: 'Startup Founder — TFG Client',
      serifTitle: true,
      anim: 'blur-in',
      duration: 5000,
    },
    image: {
      kicker: 'PITCH NIGHT · 6PM',
      title: 'Demo Day',
      subtitle: 'Apply at techfuturesgroup.org',
      align: 'lower-left',
      anim: 'rise',
    },
    endcard: {
      title: 'techfuturesgroup.org',
      subtitle: 'A specialty program of the NorCal SBDC network',
      kicker: 'BOOK A SESSION',
      duration: 3500,
      anim: 'rise',
    },
  };

  return { ...base, ...(defaults[template] ?? {}), ...overrides };
}

export function defaultDoc(): MotionDoc {
  return {
    aspect: '16:9',
    fps: 30,
    scenes: [
      makeScene('title'),
      makeScene('list'),
      makeScene('endcard'),
    ],
    fontHeading: 'Tobias',
    fontBody: 'GT America Extended',
    watermark: '',
    showGrain: true,
  };
}

export function getAspect(id: AspectId) {
  return ASPECTS.find((a) => a.id === id) ?? ASPECTS[0];
}

export function docDuration(doc: MotionDoc): number {
  return doc.scenes.reduce((sum, s) => sum + s.duration, 0);
}

/** Locate the active scene + local time for a global time t (ms). */
export function sceneAt(doc: MotionDoc, t: number): { index: number; local: number } {
  let acc = 0;
  for (let i = 0; i < doc.scenes.length; i++) {
    const d = doc.scenes[i].duration;
    if (t < acc + d || i === doc.scenes.length - 1) {
      return { index: i, local: Math.min(t - acc, d) };
    }
    acc += d;
  }
  return { index: 0, local: 0 };
}
