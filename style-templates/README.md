# Scene templates

- `dark-graph-paper-template/`: animated background; no footage required. Copy
  the HTML and config into a new video project, then add your story content.
- `left-glass-popout/`: a camera reframe with an animated glass panel. Supply
  your own `assets/source.mp4` with video and audio, and adjust source duration,
  crop, card copy, and timings before rendering.

- `leftbraincoder-split/`: **the @leftbraincoder standard reel**. Graphite glass on a
  white drifting-light canvas, graphics on top, speaker card below, comment-box CTA.
  Start with `npm run new-split -- <slug>`.

These are standalone scene starting points, while style-library contains cards.
Templates currently reference a public GSAP CDN. For a self-contained project,
copy `node_modules/gsap/dist/gsap.min.js` into its assets folder and change the
script source to `assets/gsap.min.js`, as the starter setup does.
