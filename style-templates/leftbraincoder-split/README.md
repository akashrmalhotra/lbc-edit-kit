# leftbraincoder split: the standard reel template

This is the house style for @leftbraincoder reels, approved on 2026-11-20 from `video-projects/all-lang-tools-split` (v2). It uses Graphite Glass (`style-library/03-graphite-glass`) in its **split layout**:

- a white canvas lit by slow drifting blue light
- dark smoked-glass graphics in the top half
- graphite caption pills on the seam
- the speaker in a blue-rimmed rounded card in the bottom half

Keep the style. Per video, change only the content, the card beats and the timings.

## Start a reel

```bash
npm run new-split -- my-reel            # optional: --profile path/to/profile.png
```

This creates `video-projects/my-reel/` with:

- `index.html`
- the Graphite tokens
- GSAP
- the caption and sound-effect tools
- your profile photo, used as the avatar in the comment-box reply

## Build it

1. **Transcribe** with local Whisper (see `docs/TOOLS-AND-API-KEYS.md`), then normalize to `assets/words.json` (`[{w, s, e}]`).
2. **Cut** silences and mistakes as usual (`cut-silences`, `cut-mistakes`). Never cut inside a phrase.
3. **Effects** (the `/effects` skill in `.claude/skills/effects`; run `bash scripts/setup.sh` there once): bake only the effects that sit **behind the head** (for example `backdrop-word` on the hook and `spotlight` on the big reveal).
   - Leave overlay effects such as `comment-box` out of the footage: the card crop would clip them, so this template draws the comment box in HTML.
   - Re-encode the result with a keyframe every 30 frames, as `assets/footage.mp4`:
     ```bash
     ffmpeg -i fx.mp4 -c:v libx264 -crf 14 -g 30 -keyint_min 30 -pix_fmt yuv420p -c:a copy assets/footage.mp4
     ```
4. **Configure** in `index.html`:
   - **Durations:** set `data-duration` on the root, the video, both audio tags and `#ui`.
   - **`CONFIG` block:**
     - `duration`
     - camera `sections`
     - `items` (3–6) and their `steps` (the time each name is spoken)
     - `allDone`
     - `spotlight` (`null` turns it off)
     - `cta` (word, handle, reply, chip and the action times; `null` turns it off)
   - **Hook text:** edit it in `#title`. It's readable from frame 0, with a one-line kicker.
5. **Card beats:** replace the example `.layer`s (designed at 690×262) and the PER-VIDEO CARD BEATS section.
   - Use `layerIn(id, t)` and `layerOut(id, t)` to bring layers in and out.
   - Call `turn(t)` on every item change.
   - Time every action to a spoken word.
6. **Captions:** write `tools/phrases.json` (`[[start, "html"], …]`, 1–3 words each, key word in `<em>`), then run `node tools/build-captions.mjs <duration>`.
7. **Sound:** write `tools/sfx-events.json` (see the `.example`; use soft click, tick, tap, air, type and stop, each on a visible action), then run `python3 tools/make-sfx.py <duration>`.
8. **Verify and render:**
   - Run `npx hyperframes lint`.
   - Render a draft: `npx hyperframes render . --quality draft --crf 15`.
   - Inspect hero frames and transitions.
   - Master the audio with two-pass loudnorm to −14 LUFS.
   - Write VERIFY.md.

## What makes it premium (don't remove)

- **Drifting light:** four soft blue and cyan orbs drift slowly (sine, 5.6–8 s), so the glass refracts color and the canvas is never still.
- **3D float:** the card, list and sheet drift gently (±2.5°, ±6 px), so something moves on every frame.
- **Item changes:** the panel turns −7° in Y with a light sheen, and the new content staggers in with a blur and a slight slide.
- **Depth:** panels rise out of depth at the start, sink into the dark for the spotlight, and hand over to the comment sheet at the end.
- **Highlight:** one blue highlight glides between list items with a slight stretch, and finished items get a green tick (the only overshoot).
- **Transforms vs opacity:** wrappers (`#cardF/#cardT`, …) take only transforms. Opacity and blur stay on the glass element itself, because opacity on an ancestor breaks `backdrop-filter`.

## Limits

- **Pinned version:** HyperFrames 0.7.109. Newer CLIs (0.9.x) warn that `tl.set` initial hides at 0 may not apply on frame 0; a 0.9.72 test render still had a clean frame 0.
- **Preflight:** `scripts/preflight.mjs` flags root `data-start` with an inline video. That rule is stale for 0.7.109 (lint requires root `data-start`).
- **Fonts:** SF Pro comes from macOS. On another machine it falls back to Inter.
