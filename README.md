# LBC Edit Kit

The video-editing kit of **Akash Malhotra** ([@leftbraincoder](https://instagram.com/leftbraincoder),
Left Brain Coder) at **Otoma8**, for **Codex and Claude Code**, built on HyperFrames.
Bring your own footage. Cut dead air, review mistakes, plan the story, and build
motion graphics with HyperFrames and GSAP.

## What's included

- **[Editing playbook](docs/EDITING-PLAYBOOK.md):** how Left Brain Coder videos get edited with AI, the measured house reel style, the B-roll, caption, and sound rules, and how every note becomes a rule in a skill.
- **Left Brain Coder house style:** the [brand identity](brand/leftbraincoder/DESIGN.md),
  the [Graphite Glass](style-library/03-graphite-glass/DESIGN.md) card style, and the
  [leftbraincoder split](style-templates/leftbraincoder-split/README.md) reel template (`npm run new-split -- my-reel`).
- **15 skills**, mirrored for both assistants, with their helper scripts and references, including
  **`effects`**: 51 face-tracked video effects (orbit, spotlight, glass widgets, iMessage pop-ups and more) that
  can sit behind the speaker's head. First use: `cd .claude/skills/effects && bash scripts/setup.sh`.
- **Motion-graphics cards** across three styles, with manifests, CSS tokens, and editable slots.
- **Scene templates:** leftbraincoder split, dark graph paper, and a left glass popout.
- Transcription, silence cutting, mistake detection, reviewed cut rendering,
  transcript retiming, EDL review, beat-sync validation, and preflight tools.
- **Short-form editing:** reels, YouTube Shorts, hook and payoff planning, precise captions, moving B-roll, and audio review.
- A synthetic starter composition and editing fixture that need no footage or API key.

## Tools and optional services

**Akash uses ElevenLabs Scribe or local Whisper to transcribe and Kie.ai to generate
videos and image assets.** Bring your own API keys and credits when using paid services.
You can also use OpenAI Whisper, or supply an existing word-level transcript.
Generated assets are optional.

The local starter needs no paid transcription or generation API. See the
[tools, accounts, and API-key guide](docs/TOOLS-AND-API-KEYS.md) for required tools,
optional services, setup details, and prompts you can copy.

## Install

Install Node.js **22 or newer**, Git, FFmpeg (including ffprobe), and Chrome or
Chromium. Make `node`, `ffmpeg`, and `ffprobe` available in your terminal. Then run:

```sh
git clone https://github.com/akashmalhotra1/lbc-edit-kit.git
cd lbc-edit-kit
npm ci
npm run setup
npm test
```

Setup checks the tools and creates `.env` only if it is absent. Add only the keys
for services you choose. The included transcription helper uses ElevenLabs;
Whisper and Kie.ai integrations need the setup described in the
[tools guide](docs/TOOLS-AND-API-KEYS.md). [Setup and troubleshooting](docs/SETUP.md).

## Render your first example

```sh
npm run demo
cd video-projects/demo
npx hyperframes lint
npx hyperframes preview
```

Scrub the eight-second animation in Studio. After reviewing it, stop the preview
with Ctrl+C, then render:

```sh
npx hyperframes render --quality draft --output renders/demo.mp4
```

The demo uses local GSAP. HyperFrames may download and cache its font substitutions on the first render. It has no voiceover. The separate
[synthetic transcript](examples/editing/source.json) exercises the cutting tools;
it is fictional test data, not a transcript of the title animation.

## Create a Left Brain Coder reel

```sh
npm run new-split -- my-reel
```

Then open the folder in Claude Code or Codex and say:

> Use short-form-edit to turn my recording at [local path] into a 9:16 reel in the
> leftbraincoder split style. Build a truthful hook and payoff, preserve my meaning,
> tighten mistakes, and add precise captions and sound design. Prepare a draft for review.

Codex: `$short-form-edit`. Claude Code: `/short-form-edit`.
The skill includes planning references and validators for caption timing, source
mapping, scene coverage, and footage reuse. Review the actual motion and audio
before publishing. [Short-form walkthrough and validation commands](docs/SHORT-FORM.md).

## Edit long-form footage

> Use edit-video to edit my recording at [local path]. Tighten dead air, show me the
> proposed mistake cuts, and use Graphite Glass cards. Produce a reviewed draft.

Codex: `$edit-video`. Claude Code: `/edit-video`. For a single operation use
`cut-silences`, `cut-mistakes`, `video-storytelling`, or `style-library`.
See the [step-by-step workflow](docs/WORKFLOW.md), [prompt recipes](docs/PROMPTS.md),
and [storytelling workbook](docs/STORYTELLING-WORKBOOK.md).

## Make a motion-design showreel

> Use motion-showreel to make a 15-second showreel for [brand]. Study my reference
> reel at [local path] if I give one. Pick one motif that transforms through every
> chapter, cut on the music's beat grid, and end on the logo. Show me the storyboard
> and beat sheet before building, and confirm before any paid music or asset generation.

Codex: `$motion-showreel`. Claude Code: `/motion-showreel`.
The skill includes a measured breakdown of a reference reel, a chapter technique
library, a HUD template, and Node tools to analyze a reference video, measure a
music take's beat grid, splice it onto the cut grid, and premix sound effects.

## Explore and customize

| Resource | Start here |
| --- | --- |
| How Left Brain Coder edits (style, rules, lessons) | [Editing playbook](docs/EDITING-PLAYBOOK.md) |
| Left Brain Coder brand | [Brand DESIGN.md](brand/leftbraincoder/DESIGN.md), [Graphite Glass](style-library/03-graphite-glass/DESIGN.md), [split template](style-templates/leftbraincoder-split/README.md) |
| Shared agent instructions | [AGENTS.md](AGENTS.md) |
| Motion and transition vocabulary | [MOTION_PHILOSOPHY.md](MOTION_PHILOSOPHY.md) |
| Card library and design tokens | [Library guide](style-library/GUIDE.md) |
| Searchable card metadata | [registry.json](style-library/registry.json) |
| Whole-scene templates | [Template guide](style-templates/README.md) |
| Codex setup and mirroring | [.codex/README.md](.codex/README.md) |
| Release checks and limits | [Verification](docs/VERIFICATION.md) |
| Third-party resources | [Notices](THIRD_PARTY_NOTICES.md) |

The cards are reusable **draft assets**. Test the cards you choose with your text
and footage. Library templates may load GSAP and Google Fonts from their public
CDNs; localize these dependencies when assembling a final project.

Folders under `video-projects/` and `raw-media/` are gitignored, so footage,
transcripts, and renders stay local. Create a new project for each video.

© 2026 Akash Malhotra (Left Brain Coder), Otoma8.
