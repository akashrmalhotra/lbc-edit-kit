#!/usr/bin/env node
// Pick the Graphite Glass mode for a video by measuring the footage behind the graphics.
// Light footage -> "graphite" (dark glass). Dark footage -> "frost" (white glass).
// usage: node pick-mode.mjs <video> [--region 0.4] [--threshold 0.42]
import { execFileSync } from "node:child_process";
import { argv, exit } from "node:process";

const args = argv.slice(2);
const video = args.find((a) => !a.startsWith("--"));
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? Number(args[i + 1]) : d; };
const region = opt("--region", 0.4);       // top fraction of the frame where cards and the list sit
const threshold = opt("--threshold", 0.42); // mean luma (0..1) at or above this counts as light footage
if (!video) { console.error("usage: pick-mode.mjs <video> [--region 0.4] [--threshold 0.42]"); exit(1); }

// one frame per second, cropped to the top region, mean luma per frame via signalstats
const out = execFileSync("ffmpeg", [
  "-v", "error", "-i", video,
  "-vf", `fps=1,crop=iw:ih*${region}:0:0,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-`,
  "-f", "null", "-",
], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const ys = [...out.matchAll(/YAVG=([\d.]+)/g)].map((m) => Number(m[1]) / 255);
if (!ys.length) { console.error("no frames measured"); exit(1); }
const mean = ys.reduce((a, b) => a + b, 0) / ys.length;
const darkShare = ys.filter((y) => y < threshold).length / ys.length;
const mode = mean >= threshold ? "graphite" : "frost";
console.log(JSON.stringify({ mode, meanLuma: +mean.toFixed(3), threshold, region, frames: ys.length, darkFrameShare: +darkShare.toFixed(2) }));
if (darkShare > 0.25 && darkShare < 0.75) console.error("note: footage brightness is mixed; review a mid frame before committing to a mode");
