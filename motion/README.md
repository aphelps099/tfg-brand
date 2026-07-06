# TFG Motion

Tech Futures Group's in-browser motion graphics studio — a brand port of the
`mysbdc-tools` Motion Studio Pro (see that repo's
`docs/motion-studio-porting-guide.md` for the full porting playbook).

Storyboard a short promo as a sequence of typographic scenes, preview it live,
and export an MP4 — all client-side (WebCodecs + `mp4-muxer`), no video backend.
Optionally paste a script or transcript and let AI storyboard it into scenes.

## TFG brand tokens (baked in)

- Colors: near-black `#0a0a0a`, charcoal `#272727`, electric green `#4EFF00`,
  cream `#F7F6F2`, muted green `#48524B` — encoded as the five scheme swatches
- Fonts: **GT America Extended** (display/body) and **Tobias** (serif moments),
  self-hosted in `public/fonts/` from the brand-house woff files, plus
  Roboto Mono from Google Fonts
- Logos: `public/tfg-logo-white.svg` (dark backgrounds) and
  `public/tfg-logo-dark.svg` (light backgrounds) on end cards; the Brand panel
  can override both at runtime

## Run

```bash
npm install
npm run dev        # http://localhost:3000
```

Optional, for the Script → Scenes AI panel:

```bash
echo 'ANTHROPIC_API_KEY=sk-ant-...' > .env
```

Without a key the endpoint returns a clear 503 the UI surfaces; everything
else works.

## Deploy

`next.config.js` uses `output: 'standalone'`. Standalone output does **not**
include static assets — the deploy step must copy:

- `.next/static` → `.next/standalone/.next/static`
- `public` → `.next/standalone/public`

then start with `node .next/standalone/server.js`. If you skip the copy, the
page loads but nothing is interactive (chunks 404).

Browser note: MP4 export needs WebCodecs (Chrome/Edge; Safari 16.4+ usually
works). Firefox gets the WebM fallback button.
