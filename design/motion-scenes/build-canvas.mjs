/* ═══════════════════════════════════════════════════════
   TFG Motion Scenes — builder-set generator
   Emits one .dc.html artboard per motion scene template in
   the TFG Promotions Studio (mysbdc-tools /motion/tfg),
   plus canvas.json. Geometry, type sizes, and colors are
   lifted verbatim from the studio's canvas renderer
   (mysbdc-tools src/lib/motion/render.ts) at 16:9
   1920×1080 where the design unit u = 1: frame padding
   110px, title 88px/300, kicker 24px/700 at 0.17em, stat
   number 230px, quote 68px Tobias italic, date tile
   290×310, presenter frame 475×594 grayscale at 50%.
   Every artboard carries one tweak: the approved TFG
   scheme (dark · charcoal · green · cream · white).
   Run:  node build-canvas.mjs
   ═══════════════════════════════════════════════════════ */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const b64 = (f) => fs.readFileSync(path.join(here, 'fonts', f)).toString('base64');

const GT_REG = b64('gt-america-extended-regular.woff');
const GT_BOLD = b64('gt-america-extended-bold.woff');
const TOBIAS = b64('TobiasTRIAL-Regular.woff2');
const TOBIAS_ITALIC = b64('TobiasTRIAL-RegularItalic.woff2');

const GT_FACES = `
    @font-face { font-family: 'GT America Extended'; src: url(data:font/woff;base64,${GT_REG}) format('woff'); font-weight: 300 500; font-style: normal; }
    @font-face { font-family: 'GT America Extended'; src: url(data:font/woff;base64,${GT_BOLD}) format('woff'); font-weight: 600 800; font-style: normal; }`;
const TOBIAS_FACE = `
    @font-face { font-family: 'Tobias'; src: url(data:font/woff2;base64,${TOBIAS}) format('woff2'); font-weight: 400; font-style: normal; }`;
const TOBIAS_ITALIC_FACE = `
    @font-face { font-family: 'Tobias'; src: url(data:font/woff2;base64,${TOBIAS_ITALIC}) format('woff2'); font-weight: 400; font-style: italic; }`;

/** Shared scheme logic — every artboard duplicates it (artboards share nothing at runtime). */
const logic = (defaultScheme) => `<script data-dc-script data-props='{"scheme":{"editor":"enum","options":["dark","charcoal","green","cream","white"],"default":"${defaultScheme}"},"$preview":{"width":1920,"height":1080}}'>
class Component extends DCLogic {
  renderVals() {
    var schemes = {
      dark:     { bg: '#0a0a0a', fg: '#ffffff', accent: '#4EFF00' },
      charcoal: { bg: '#272727', fg: '#ffffff', accent: '#4EFF00' },
      green:    { bg: '#4EFF00', fg: '#0a0a0a', accent: '#0a0a0a' },
      cream:    { bg: '#F7F6F2', fg: '#0a0a0a', accent: '#48524B' },
      white:    { bg: '#ffffff', fg: '#0a0a0a', accent: '#48524B' }
    };
    var s = schemes[this.props.scheme] || schemes['${defaultScheme}'];
    var rgba = function (hex, a) {
      var n = parseInt(hex.slice(1), 16);
      return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
    };
    return {
      bg: s.bg, fg: s.fg, accent: s.accent,
      muted: rgba(s.fg, 0.55), line: rgba(s.fg, 0.16), soft: rgba(s.fg, 0.055)
    };
  }
}
</script>`;

const page = ({ helmetExtra = '', body, defaultScheme }) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>${helmetExtra ? `\n  ${helmetExtra}` : ''}
  <style>${GT_FACES}${body.includes("'Tobias'") ? TOBIAS_FACE : ''}${body.includes('font-style: italic') ? TOBIAS_ITALIC_FACE : ''}
    body { margin: 0; }
    a { color: #4EFF00; } a:hover { color: #3fd400; }
  </style>
</helmet>
<div style="width: 1920px; height: 1080px; background: {{bg}}; position: relative; overflow: hidden; font-family: 'GT America Extended', Arial, sans-serif;">
${body}
</div>
</x-dc>
${logic(defaultScheme)}
</body>
</html>
`;

const boards = {};

// ── Title (Main) — kicker · title · divider · subtitle, centered ──
boards['Main.dc.html'] = page({
  defaultScheme: 'dark',
  body: `  <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
    <div style="font-size: 24px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: {{accent}};">TFG Office Hours</div>
    <div style="margin-top: 26px; font-size: 88px; font-weight: 300; line-height: 1.14; color: {{fg}}; max-width: 1520px;">Scale Your Tech Startup</div>
    <div style="margin-top: 18px; width: 52px; height: 2px; background: {{muted}};"></div>
    <div style="margin-top: 16px; font-size: 32px; font-weight: 400; line-height: 1.45; color: {{muted}}; max-width: 1180px;">No-cost advising from Tech Futures Group</div>
  </div>`,
});

// ── Statement — one big serif line ──
boards['Statement.dc.html'] = page({
  defaultScheme: 'dark',
  body: `  <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center;">
    <div style="font-family: 'Tobias', Georgia, serif; font-size: 108px; font-weight: 400; line-height: 1.12; color: {{fg}}; max-width: 1560px;">Specialist advising. Founder speed.</div>
  </div>`,
});

// ── Stat — big number · accent divider · label ──
boards['Stat.dc.html'] = page({
  defaultScheme: 'green',
  body: `  <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
    <div style="font-size: 230px; font-weight: 300; line-height: 1.02; color: {{fg}}; font-variant-numeric: tabular-nums;">$70M+</div>
    <div style="margin-top: 24px; width: 56px; height: 3px; background: {{accent}};"></div>
    <div style="margin-top: 22px; font-size: 34px; font-weight: 400; line-height: 1.45; color: {{muted}}; max-width: 1120px;">in SBIR/STTR and grant funding secured by TFG clients</div>
  </div>`,
});

// ── Agenda — kicker line + staggered rows, lower left ──
boards['Agenda.dc.html'] = page({
  defaultScheme: 'dark',
  body: `  <div style="position: absolute; left: 110px; bottom: 110px; width: 1600px; display: flex; flex-direction: column;">
    <div style="display: flex; align-items: center; gap: 20px;">
      <div style="width: 46px; height: 3px; background: {{accent}};"></div>
      <div style="font-size: 24px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: {{accent}};">What TFG Delivers</div>
    </div>
    <div style="margin-top: 44px; display: flex; flex-direction: column; gap: 45px;">
      <div style="font-size: 50px; font-weight: 300; line-height: 1; color: {{fg}};">Fundraising strategy that closes</div>
      <div style="font-size: 50px; font-weight: 300; line-height: 1; color: {{fg}};">SBIR/STTR grant support</div>
      <div style="font-size: 50px; font-weight: 300; line-height: 1; color: {{fg}};">Go-to-market with real traction</div>
    </div>
  </div>`,
});

// ── Quote — serif italic pull quote + accent attribution ──
boards['Quote.dc.html'] = page({
  defaultScheme: 'charcoal',
  body: `  <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
    <div style="font-family: 'Tobias', Georgia, serif; font-style: italic; font-size: 68px; font-weight: 400; line-height: 1.28; color: {{fg}}; max-width: 1420px;">“TFG helped us sharpen the pitch and close our seed round.”</div>
    <div style="margin-top: 46px; font-size: 26px; font-weight: 600; color: {{accent}};">— Startup Founder · TFG Client</div>
  </div>`,
});

// ── Save the Date — date tile + text column ──
boards['SaveTheDate.dc.html'] = page({
  defaultScheme: 'charcoal',
  body: `  <div style="position: absolute; left: 110px; right: 110px; top: 0; bottom: 0; display: flex; align-items: center;">
    <div style="display: flex; align-items: center; gap: 70px;">
      <div style="width: 290px; height: 310px; border-radius: 6px; background: {{soft}}; border: 1px solid {{line}}; display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
        <div style="margin-top: 44px; font-size: 26px; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; color: {{accent}};">Sept</div>
        <div style="margin-top: 6px; font-size: 158px; font-weight: 300; line-height: 1; color: {{fg}};">24</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <div style="font-size: 22px; font-weight: 700; letter-spacing: 3.7px; text-transform: uppercase; color: {{accent}};">Free Training</div>
        <div style="margin-top: 26px; font-size: 64px; font-weight: 300; line-height: 1.14; color: {{fg}}; max-width: 1150px;">Scale Your Tech Startup</div>
        <div style="margin-top: 18px; width: 64px; height: 4.5px; background: {{accent}};"></div>
        <div style="margin-top: 24px; font-size: 30px; font-weight: 600; line-height: 1.4; color: {{fg}};">Tuesday · 10:00 AM–11:00 AM · Online</div>
        <div style="margin-top: 12px; font-size: 26px; font-weight: 400; line-height: 1.4; color: {{muted}};">Register at techfuturesgroup.org</div>
      </div>
    </div>
  </div>`,
});

// ── Presenter Card — inset portrait frame (grayscale at 50%) + lower-left text ──
boards['PresenterCard.dc.html'] = page({
  defaultScheme: 'dark',
  body: `  <div style="position: absolute; left: 110px; top: 151px; width: 475px; height: 594px; overflow: hidden; background: {{soft}};">
    <svg viewBox="0 0 475 594" style="width: 100%; height: 100%; display: block; filter: grayscale(1); opacity: 0.5;" aria-hidden="true">
      <rect width="475" height="594" fill="#48524B"></rect>
      <circle cx="237" cy="230" r="96" fill="#9aa09b"></circle>
      <path d="M 70 594 C 70 430 150 380 237 380 C 324 380 405 430 405 594 Z" fill="#9aa09b"></path>
    </svg>
  </div>
  <div style="position: absolute; left: 110px; bottom: 110px; display: flex; flex-direction: column; align-items: flex-start;">
    <div style="display: flex; align-items: center; gap: 20px;">
      <div style="width: 46px; height: 3px; background: {{accent}};"></div>
      <div style="font-size: 24px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: {{accent}};">Presenter</div>
    </div>
    <div style="margin-top: 26px; font-size: 88px; font-weight: 300; line-height: 1.14; color: {{fg}};">Presenter Name</div>
    <div style="margin-top: 18px; width: 52px; height: 2px; background: {{muted}};"></div>
    <div style="margin-top: 16px; font-size: 32px; font-weight: 400; color: {{muted}};">Title · Organization</div>
  </div>`,
});

// ── End Card — ring + Michroma lockup · CTA · url · fine print ──
boards['EndCard.dc.html'] = page({
  defaultScheme: 'dark',
  helmetExtra: `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Michroma&amp;display=swap">`,
  body: `  <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
    <div style="display: flex; align-items: center; gap: 26px;">
      <div style="width: 96px; height: 96px; border: 15px solid {{accent}}; border-radius: 50%; box-sizing: border-box; flex-shrink: 0;"></div>
      <div style="display: flex; flex-direction: column; align-items: flex-start; text-align: left;">
        <div style="font-family: 'Michroma', 'GT America Extended', Arial, sans-serif; font-size: 15px; letter-spacing: 5px; line-height: 32px; text-transform: uppercase; color: {{fg}};">Tech</div>
        <div style="font-family: 'Michroma', 'GT America Extended', Arial, sans-serif; font-size: 15px; letter-spacing: 5px; line-height: 32px; text-transform: uppercase; color: {{fg}};">Futures</div>
        <div style="font-family: 'Michroma', 'GT America Extended', Arial, sans-serif; font-size: 15px; letter-spacing: 5px; line-height: 32px; text-transform: uppercase; color: {{fg}};">Group</div>
      </div>
    </div>
    <div style="margin-top: 56px; font-size: 22px; font-weight: 700; letter-spacing: 4.4px; text-transform: uppercase; color: {{accent}};">Book a Session</div>
    <div style="margin-top: 30px; font-size: 64px; font-weight: 300; color: {{fg}};">techfuturesgroup.org</div>
    <div style="margin-top: 40px; font-size: 22px; font-weight: 400; color: {{muted}}; opacity: 0.7;">A specialty program of the NorCal SBDC network</div>
  </div>`,
});

// ── Canvas layout: two rows of four 16:9 frames ──
const order = [
  'Main.dc.html', 'Statement.dc.html', 'Stat.dc.html', 'Agenda.dc.html',
  'Quote.dc.html', 'SaveTheDate.dc.html', 'PresenterCard.dc.html', 'EndCard.dc.html',
];
const canvas = {
  artboards: order.map((file, i) => ({
    file,
    ...(file === 'Main.dc.html' ? { title: 'Title' } : {}),
    x: (i % 4) * 2040,
    y: Math.floor(i / 4) * 1300,
    w: 1920,
    h: 1080,
  })),
  annotations: [
    {
      id: 'grammar',
      x: 0,
      y: -470,
      w: 640,
      text: 'TFG Motion Scenes — builder set\nOne artboard per scene template of the TFG Promotions Studio (mysbdc-tools /motion/tfg), matched to its canvas renderer at 1920x1080 (frame padding 110px).\n\nEvery artboard has one tweak: the approved TFG scheme (dark / charcoal / green / cream / white). Copy an artboard to start a new frame; retype the copy in place — kickers stay short caps, one idea per frame.\n\nType: GT America Extended (body, 300 for display lines, 700 caps kickers at wide tracking) - Tobias serif for statements and quotes - Michroma only in the lockup.\nFull grammar: tfg-brand/design/motion-scenes/GRAMMAR.md',
    },
  ],
  launch: { view: 'canvas' },
};

for (const [name, html] of Object.entries(boards)) {
  fs.writeFileSync(path.join(here, name), html);
}
fs.writeFileSync(path.join(here, 'canvas.json'), JSON.stringify(canvas, null, 2) + '\n');
console.log(`wrote ${Object.keys(boards).length} artboards + canvas.json`);
