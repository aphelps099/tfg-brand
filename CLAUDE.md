# tfg-brand — Tech Futures Group brand house

Static brand deliverables for TFG (a specialty program of the NorCal SBDC network). Sessions doing ANY TFG visual or design work start from the brand tokens and the motion scene grammar below — never invent new colors, faces, or layouts.

## Brand tokens

- **Colors:** near-black `#0a0a0a` · charcoal `#272727` · electric green `#4EFF00` · cream `#F7F6F2` · muted green `#48524B`. Green is the accent and the single punch background — never body text on white. The five approved scheme pairings live in `design/motion-scenes/GRAMMAR.md`.
- **Type:** GT America Extended (display at weight 300, caps kickers at 700 with 0.17em tracking) · Tobias serif for statements and quotes (italic for quotes) · Michroma only in the logo lockup. Self-hosted faces in `design/motion-scenes/fonts/` and `motion/public/fonts/`.
- **Logos:** `tfg_logo_white.svg` / `tfg_logo_neon.svg`; ring-lockup construction (accent ring + stacked Michroma caps) documented in the grammar.
- **No icons, no emoji.** Plain, specific, founder-facing copy; real numbers over adjectives.

## Where things live

- `design/motion-scenes/` — **the motion scene grammar + Claude Design builder set.** `GRAMMAR.md` is the written design language of the TFG Promotions Studio (`mysbdc-tools` → `/motion/tfg`); the eight `.dc.html` artboards are pixel-matched to its renderer, each with the five-scheme tweak. For any new TFG frame, social graphic, or video mockup: copy an artboard from the builder set and retype it — don't design from scratch. `node build-canvas.mjs` regenerates the set.
- `motion/` — standalone brand-ported Motion Studio app (older port; the production studio lives in `mysbdc-tools`).
- Root `tfg-*.html` — brand-house pieces: pattern studio, social templates, event pages, email signatures, impact report, LinkedIn assets. Follow their existing vocabulary when editing.
- `wordpress/` — site theme assets.

## Working rules

- The motion renderer (`mysbdc-tools/src/lib/motion/render.ts`) is the source of truth for scene geometry; the grammar restates it at 1920×1080. If they disagree, the renderer wins — update the grammar.
- Presenter photos are always grayscale at 50% opacity in the portrait frame — no exceptions, no overlays.
- Facts (dates, times, names, URLs) are never invented in deliverables; a missing fact stays a visible gap to resolve.
