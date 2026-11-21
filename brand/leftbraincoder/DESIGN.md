# Left Brain Coder — Visual Identity

Instagram: @leftbraincoder. Reels on tech, AI, and everything tech-related.
Copy this file into each new reel project as its `DESIGN.md`. Every composition
traces its palette, typography, and motion choices back to this file.

## Style Prompt

Terminal Neon. The reel feels like a developer's terminal coming alive: a
near-black canvas, one electric-green highlight, monospaced labels, and crisp,
quick motion. Technical and confident, never cluttered. Green means "the key
idea" or "the payoff" — if everything is green, nothing is. No rainbow
gradients, no glitter, no stock "hacker" clichés (falling Matrix code, hoodies).

## Format

- 1080x1920 (9:16), 30 fps.
- Instagram safe zone: keep text and logos out of the top 220 px, the bottom
  420 px, and the right 140 px (likes, comments, caption overlay).
- Captions never cover the mouth or chin, especially in the first 2.5 seconds.

## Colors

| Token | Hex | Role |
|---|---|---|
| `--lbc-bg` | `#0A0F0D` | Primary background (near-black, green tint) |
| `--lbc-surface` | `#111A16` | Cards, caption boxes, panels |
| `--lbc-border` | `#1F3A2C` | Hairlines, thin box edges |
| `--lbc-accent` | `#39FF88` | Neon green — keyword, payoff, progress |
| `--lbc-accent-2` | `#00D1FF` | Cyan — tool names, concepts (use sparingly) |
| `--lbc-warn` | `#FF4D6D` | Red — the wrong way, a loss, a warning |
| `--lbc-text` | `#F2F5F3` | Primary text |
| `--lbc-text-dim` | `#8A9A92` | Labels, meta text |

Green glow on accent text only: `text-shadow: 0 0 18px rgba(57, 255, 136, 0.45);`

## Typography

- **Inter (ExtraBold 800)** — captions and headlines. All caps for captions.
- **JetBrains Mono (Medium 500)** — labels, code, numbers, the handle, prompts.
- Pair them: a small mono label above a bold Inter headline is the house pattern.
- Use bundled local font files in each project's `assets/fonts/`.

## Captions

- Inter ExtraBold, all caps, about 64 px, 2–4 words per chunk, synced to speech.
- Every caption sits in the same dark box (`--lbc-surface`, 88% opacity) with a
  1 px `--lbc-border` edge and 14 px radius, so it reads on face, screen, and footage.
- Color the whole chunk on 25–45% of chunks: green for the keyword or payoff,
  cyan for a tool or concept, red for the wrong way. Never color part of a word.
- Never white text on a light background.

## Signature elements

- **Handle tag:** `> leftbraincoder_` in JetBrains Mono, dim text, with a
  blinking green block cursor. Shown on the first frame and the last frame.
- **Code/terminal card:** surface panel with three dim dots, mono text typed in
  character by character (0.03 s per character) — for prompts, commands, code.
- **Tool pop:** when a tool or app is named, its real logo pops in beside the
  speaker with a quiet tap sound. Never invent logos.
- Subtle 48 px grid on full-screen graphic backgrounds, 6% opacity.

## Motion Rules

- Entrances: `power3.out`, `expo.out`, `back.out(1.4)`. Hand-offs: `power2.in`.
- Snappy: UI entrances 0.25–0.4 s, headlines 0.4–0.6 s.
- Every layout change is a hard cut; no slow crossfades between scenes.
- Speech carries the pace: give an explanation room to land before the next beat.

## Sound

- Subtle music bed under the voice (ducked well below speech).
- Soft keyboard ticks for typing cards, a quiet tap for tool pops. Nothing loud
  or cartoonish.

## Reel structure

1. **Hook (0–2 s):** the bold claim or question, in a caption and on the face.
2. **Proof / steps:** one idea per beat, each with a visual.
3. **Payoff:** the takeaway in green.
4. **CTA (only if spoken):** "Follow for more" with the handle tag.
