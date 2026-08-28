# TFG motion scene grammar

The design language of the TFG Promotions Studio (`mysbdc-tools` → `/motion/tfg`), written down so any design session can produce frames that match the motion tool. The single source of truth for geometry is the studio's canvas renderer (`mysbdc-tools/src/lib/motion/render.ts`); this file restates its values at 16:9 — 1920×1080, where the renderer's design unit `u = 1`, so every number below is a straight CSS pixel. For other aspects multiply by `u = min(W,H)/1080`.

The living, editable version of this grammar is the **TFG Motion Scenes** canvas (`build-canvas.mjs` here regenerates its artboards). Copy an artboard, retype the copy in place, flip the scheme tweak — don't rebuild frames from scratch.

## Frame

- Canvas 1920×1080 (or 1080×1080, 1080×1920, 1080×1350). Content frame: 110px padding on every side.
- One idea per frame. Frames are read in 2–5 seconds: few words, strong hierarchy, generous negative space.
- No icons, no emoji, no photos floating unframed. Film grain is a renderer-level finish — don't fake it in mockups.

## Color — the five approved schemes

Every frame uses exactly one scheme; a sequence is dark-led with at most one green punch frame.

| Scheme | Background | Text | Accent |
| --- | --- | --- | --- |
| Dark | `#0a0a0a` | `#ffffff` | `#4EFF00` |
| Charcoal | `#272727` | `#ffffff` | `#4EFF00` |
| Green | `#4EFF00` | `#0a0a0a` | `#0a0a0a` |
| Cream | `#F7F6F2` | `#0a0a0a` | `#48524B` |
| White | `#ffffff` | `#0a0a0a` | `#48524B` |

Derived tones (from the text color): muted = fg at 55%, hairline = fg at 16%, soft panel fill = fg at 5.5%.

## Type

- **GT America Extended** — everything by default. Display lines at weight 300; kickers at 700.
- **Tobias** (serif) — statements and quotes only; italic for quotes.
- **Michroma** — the logo lockup only, never running text.
- Kickers: 24px (22px in dense frames), weight 700, uppercase, letter-spacing 0.17em, accent color. Left-aligned kickers carry a 46×3px accent dash before the text.
- Dividers: 52×2px in muted (under titles); short thick rule 64×4.5px in accent (Save the Date).

### Stacking discipline

- **Title stack rhythm (center-aligned):** kicker → 36px gap → title 88px/1.14 → 40px gap → 52×2px muted divider → 40px gap → subtitle 32px/1.45 muted. The whole stack is vertically centered as one block.
- **No orphan wraps, ever.** A display line never auto-wraps to leave a word alone: break titles into 2 balanced lines when they exceed the measure (`Early Stage / Tech Series`); break subtitles at punctuation (after an em dash or comma), never mid-phrase. If the last word of a wrap would sit alone, force the break one word earlier. (The renderer enforces the widow fix and balances two-line title wraps; write clean breaks anyway.)
- **Kickers, dates, and time lines never wrap.** If a kicker exceeds the measure, shorten the copy, not the tracking.
- **Max measures:** statement lines 92% of frame width; stat labels 66%; agenda and save-the-date text columns stop 420px short of the right edge.

## Text placement

Horizontal and vertical placement are independent. Six positions: center, upper left, center left, lower left, lower center, lower right. Lists and photo frames usually read best lower left; titles and statements center.

## Scene anatomy (the eight templates)

- **Title** — kicker (accent caps) · title 88px/300, line-height 1.14 · 52×2 muted divider · subtitle 32px/400 muted, line-height 1.45.
- **Statement** — one Tobias line, 108px/400, line-height 1.12, max-width 92% of frame. Nothing else.
- **Stat** — number 230px/300 (`$70M+`) · 56×3 accent divider · label 34px muted, max-width 66%.
- **Agenda** — kicker with accent dash · 2–4 rows at 50px/300, 95px row pitch, lower left.
- **Quote** — Tobias italic 68px, line-height 1.28, typographic quotes, max-width 84% · attribution 26px/600 in accent with an em dash.
- **Save the Date** — date tile 290×310, radius 6, soft fill + hairline border, month 26px caps accent over day 158px/300 · beside it: kicker · event title 64px · 64×4.5 accent rule · weekday/time/location 30px/600 · registration line 26px muted.
- **Presenter card** — portrait frame 475×594 at frame left, top at 14% of height; the photo is ALWAYS grayscale at 50% opacity, no overlay, no motion · lower left: `PRESENTER` kicker, name 88px, divider, `Title · Organization` 32px muted.
- **End card** — centered: ring lockup (96px ring, 15px accent stroke, `TECH FUTURES GROUP` stacked in Michroma 15px at 0.32em beside it) · CTA kicker · `techfuturesgroup.org` 64px · fine print 22px muted at 70%.

## Backdrops

Optional, behind text, in scheme colors, on one or two punch frames only: grid, starburst, ring, arc, hero-ring, star, hero, split blocks, spirograph, escher, dot-wave, wave-field, growth-bars, rounds, TFG type cascade. In static design work, suggest a backdrop with restraint or leave frames clean — the motion renderer owns the animated versions.

**Hero ring** (the SeriesPromoV2 title-shot circle): a thin accent circle behind the text — center of frame, radius 520px, stroke 2.5px, accent at 28% alpha (`rgba(78,255,0,0.28)` on Dark). In motion it draws itself closed (starting 0.15s before the scene's first text, complete by ~1.35s, easeOutCubic) and then its start angle drifts from −90° by +24° across the scene, so it is never static. The techfuturesgroup.org thick sage gradient band this id used to name lives under the `hero` backdrop.

## Motion

- **Entrance (all elements):** opacity 0→1 over 0.6s and translateY 36px→0 over 0.8s, both easeOutCubic, staggered top-to-bottom 0.15s apart. The scene's first element begins 0.15s before the scene cut, so a cut never lands on an empty frame.
- **Subtle zoom (every scene):** the content group (text, tiles, dividers — not the backdrop, not the grain) scales 1 → 1.03 linearly across the scene. Transform origin: canvas center for centered layouts; (0.18 × width, 0.5 × height) for left-aligned layouts, so the anchor stays on the text column. Linear and ≤3%, it never fights the entrances.

## Voice

Plain, specific, founder-facing. Real numbers over adjectives (`$70M+ in SBIR/STTR and grant funding`). Facts (dates, times, names, URLs) are never invented — a missing fact is a visible gap to resolve, not something to fill in.

## Rebuilding the canvas

```bash
cd design/motion-scenes
node build-canvas.mjs   # regenerates the eight .dc.html artboards + canvas.json
```

Fonts embed from `fonts/` (GT America Extended woff, Tobias woff2 — the same self-hosted faces the studio serves). The generated `tfg-motion-scenes.html` bundle is disposable output; the `.dc.html` files, `canvas.json`, and this grammar are the sources.
