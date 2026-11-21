// Build assets/captions.js from hand-curated phrases plus word timings.
//   node tools/build-captions.mjs <duration-seconds>
// Inputs:  assets/words.json   [{ "w": "word", "s": start, "e": end }, ...] (from the transcript)
//          tools/phrases.json  [[startSeconds, "html"], ...]. Each phrase starts at its first word's start.
//                              Put 1–3 words in each phrase. Wrap the key word in <em>; use <em class='bad'>
//                              for wrong and <em class='ok'> for done.
// Each phrase ends at the next one, or 0.3 s after its last spoken word when the gap is longer.
import { readFileSync, writeFileSync } from "node:fs";

const END = Number(process.argv[2]);
if (!END) throw new Error("usage: node tools/build-captions.mjs <duration-seconds>");
const words = JSON.parse(readFileSync(new URL("../assets/words.json", import.meta.url)));
const P = JSON.parse(readFileSync(new URL("./phrases.json", import.meta.url)));
const out = P.map(([t, html], i) => {
  const next = i + 1 < P.length ? P[i + 1][0] : END;
  const spoken = words.filter((w) => w.s >= t - 0.01 && w.s < next - 0.01);
  if (!spoken.length) throw new Error(`no word at ${t} (${html})`);
  const lastEnd = spoken[spoken.length - 1].e;
  const e = Math.min(next, Math.max(lastEnd + 0.3, t + 0.35), END);
  return { t, e: +e.toFixed(2), html };
});
writeFileSync(new URL("../assets/captions.js", import.meta.url), "window.CAPTIONS = " + JSON.stringify(out) + ";\n");
console.log(`${out.length} phrases; longest on screen ${Math.max(...out.map((p) => p.e - p.t)).toFixed(2)}s`);
