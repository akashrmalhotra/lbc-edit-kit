# Graphite Glass: design spec

> Source of truth: the approved still mockups from the all-lang-tools reel
> (2026-11-19). Akash chose this palette over Frost, Mono, Sand, and Midnight.
> It's a personal reel system: clean, minimal, premium, Apple-like.

## Style prompt

Dark smoked-glass panels float over live talking-head footage, like macOS dark
mode or visionOS. The speaker stays the hero: graphics live above the head and
beside it, never on the face. One blue accent marks the active item. Green means
done, red means wrong, and nothing else gets color. Motion is calm and
physical: things glide and settle with no bounce, no shake, and no flash. It
should feel expensive because it's restrained.

## Two modes: choose by the footage, not by taste

The glass must contrast with what's behind it:

| Footage | Mode | Surface |
|---|---|---|
| **Light or bright** (daylight office, white walls) | **Graphite · Blue** (default) | Dark smoked glass |
| **Dark** (night setup, dim room, black background) | **Frost · Blue** (`data-mode="frost"`) | White frosted glass |

Run `node style-library/03-graphite-glass/scripts/pick-mode.mjs <video>`. It
samples the area where the graphics sit (the top 40% of the frame) and prints
`graphite` or `frost`. One reel uses one mode throughout; don't switch modes
mid-reel unless the footage itself changes (for example, a B-roll section).

## Colors

| Role | Graphite (light footage) | Frost (dark footage) | Use |
|---|---|---|---|
| Glass | `rgba(28,28,30,.58)` | `rgba(255,255,255,.66)` | Every card and the list panel, with 30px blur and 180% saturate |
| Text | `#F5F5F7` | `#1D1D1F` | Titles, active text |
| Muted | `rgba(235,235,245,.60)` | `rgba(60,60,67,.62)` | Labels, inactive rows |
| Accent | `#0A84FF` (text: `#4DA3FF`) | `#0071E3` | The active row, chip, node, or key caption word |
| Done | `#30D158` | `#34C759` | Ticks, saved, success |
| Wrong | `#FF453A` | `#FF3B30` | Errors, "recording", the wrong way |

Never add a second accent. A brand color appears only in that brand's own logo.

## Typography

- **Display and body:** SF Pro (`-apple-system`), with Inter as the portable fallback. Weights 600 to 700 only. Tight tracking (`-0.02em`) on titles and captions.
- **Mono:** SF Mono, only for code and JSON.
- **Case:** sentence case everywhere, never all caps, including captions.
- **Minimum sizes at 1080×1920:** captions 56px, titles 40px, rows 27px, labels 21px (never below 18px).

## Layout (1080×1920 vertical)

- **The footage stays full-frame and unmoved.** Solve safe-zone problems by moving or shrinking graphics, never by reframing the shot or adding a blurred fill.
- **Insets:** 60px from the sides, and at least 160px from the top (the Reels UI).
- **Card:** top-left, 690×262 at 0.86 scale, so content ends above the hair line. Keep all meaningful content in the top 220px of the card.
- **List panel:** top-right, 268px wide at 0.9 scale.
- **Caption pill:** centered at y 1390, on the chest. Never on the mouth or chin.
- **Layering:** if a card meets the hair, the speaker cut-out sits in front, so the card tucks behind the head and never covers it.

## Motion

- **Entrance:** `autoAlpha 0→1`, `y 16→0`, `scale .98→1`, `filter blur(8px)→0`, 0.6s, `expo.out`. Stagger children 0.06–0.08s.
- **Card to card:** the old content cross-fades out while the new content blurs in, inside a glass panel that stays put. The panel resizes over 0.5s with `power2.inOut`. No hard cuts between cards.
- **Active state:** the accent pill slides between rows (one shared highlight moving), with `power2.inOut` over 0.45s. A tick pops in with `back.out(1.4)`, the only overshoot allowed.
- **Camera:** a slow push of 1.00→1.06 per section (`sine.inOut`), eased back on section change. Never above 1.12.
- **Captions:** hard-swap per 1–3 word phrase, appearing 2 frames before the word. No pop animation.
- **Exit:** only at the end of the reel: 0.35s fade with `power2.in`.

## Split layout: the leftbraincoder standard (approved 2026-11-20)

The default for @leftbraincoder reels. Template: `style-templates/leftbraincoder-split` (`npm run new-split -- <slug>`). Reference: `video-projects/all-lang-tools-split` v2.

The full-frame layout above stays available. Use the split layout unless the brief asks otherwise.

### Layout (1080×1920)
- **Canvas:** white (`#fff`), lit by four slow-drifting radial light orbs in the blue family (`#0A84FF`, `#64D2FF`, `#5E5CE6` at low alpha). They give the glass something to refract. They're ambient light, not a second accent.
- **Glass:** Graphite, always, even on white; never switch to Frost because the canvas is white. Raise the glass to `rgba(24,24,28,.78)` and the caption pills to `.80`, because the canvas is brighter than footage.
- **Card:** x 60, y 170, designed at 690×262 and scaled to 960 wide.
- **List panel:** one glass panel at y 552, 960 wide, holding the items in a 2×3 grid.
- **Captions:** graphite pills at y 726, on the seam between graphics and speaker.
- **Speaker card:** x 60, y 860, 960×1000, radius 48, 6 px `--accent` rim with a soft blue shadow. The video is cropped from source y 240, so words baked behind the head show above it. The camera breathes 1.00↔1.05 inside the card.
- **Hook (frame 0):** a one-line kicker, a 150 px headline and a glass pill, centered in the top half.
- **Spotlight:** the whole canvas goes dark, and the top half shows a kicker plus a warm-glow title.
- **CTA:** a graphite-glass Instagram comment sheet in the top half, drawn in HTML.

### Motion (premium, never slide-like)
- **Always moving:** the card, list and sheet float in 3D (`transformPerspective 1600`, ±2.5° in X/Y, ±6 px, 3.4–3.9 s sine segments).
- **Item change:** the panel turns −7° in Y over 0.38 s (`power2.inOut`) and returns with `expo.out`. A diagonal sheen sweeps across over 1.0 s. The old layer slides out to the left with a blur; the new layer's children stagger in (0.08 s) with a blur, a 16 px rise and an 18 px slide.
- **Depth moves:** panels enter rising from `rotationX 22°` and `y 70` (1.0 s, `expo.out`). For the spotlight and the CTA they sink or recede, rather than fading in place.
- **Highlight:** it glides between grid cells (0.6 s, `power3.inOut`) with a 1.08/0.92 stretch at mid-move.
- **Transforms vs opacity:** transforms go on wrapper elements only. Opacity and blur stay on the glass element itself, because opacity on an ancestor breaks `backdrop-filter`.
- **Effects pairing:** bake only behind-the-head effects (`backdrop-word`, `spotlight`) into the footage. Draw overlay effects (`comment-box`) in HTML.

## Cards

| Card | Purpose | File |
|---|---|---|
| `graphite-glass.t2.list.rail` | A persistent index of N items that advances: active, done, upcoming | `cards/tier2/t2-list-rail.html` |
| `graphite-glass.t2.definition.card` | A glass card with a label, a pill tag, a title, and a body or visual slot | `cards/tier2/t2-definition-card.html` |
| `graphite-glass.custom.caption.pill` | A sentence-case caption in a glass pill with one key word | `cards/custom/caption-pill.html` |

## What NOT to do

- Don't use all-caps captions, heavy display fonts (Montserrat Black), or outlined text.
- Don't use more than one accent, gradients on text, or neon glows. The glow is only the accent's soft shadow.
- Don't use bounce, elastic, shake, flash, or whip-pan transitions. The one overshoot allowed is the tick.
- Don't put graphics on the face or mouth, or within 60px of the side edges.
- Don't shift or letterbox the footage to make room for graphics.
- Don't leave small UI floating in empty glass. Size the content to fill the card.
