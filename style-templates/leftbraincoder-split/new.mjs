#!/usr/bin/env node
// Scaffold a new leftbraincoder split-screen reel from this template.
//   npm run new-split -- <slug> [--profile path/to/profile.png]
import { cpSync, mkdirSync, existsSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const pi = args.indexOf("--profile");
if (!slug) { console.log("Usage: npm run new-split -- <kebab-slug> [--profile path/to/profile.png]"); process.exit(1); }
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Use a lowercase kebab-case slug, not a path.");
const dest = join(root, "video-projects", slug);
if (existsSync(dest)) throw new Error(`Project already exists: ${slug}. Choose a new name.`);
const gsap = join(root, "node_modules/gsap/dist/gsap.min.js");
if (!existsSync(gsap)) throw new Error("Run npm ci in the kit root first.");

for (const d of ["assets", "renders", "review", "archive", "tools"]) mkdirSync(join(dest, d), { recursive: true });
for (const f of ["index.html", "hyperframes.json"]) copyFileSync(join(here, f), join(dest, f));
cpSync(join(here, "tools"), join(dest, "tools"), { recursive: true });
copyFileSync(gsap, join(dest, "assets/gsap.min.js"));
copyFileSync(join(root, "style-library/03-graphite-glass/tokens.css"), join(dest, "assets/graphite-glass.css"));
const meta = JSON.parse(readFileSync(join(here, "meta.json"), "utf8")); meta.name = slug;
writeFileSync(join(dest, "meta.json"), JSON.stringify(meta, null, 2) + "\n");

const profile = pi > -1 ? resolve(args[pi + 1]) : join(root, "video-projects/all-lang-tools/assets/profile.png");
if (existsSync(profile)) copyFileSync(profile, join(dest, "assets/profile.png"));
else console.warn("No profile photo found: add assets/profile.png for the comment-box reply avatar.");

writeFileSync(join(dest, "DESIGN.md"), `# ${slug}: design

Style: leftbraincoder standard, the Graphite · Blue split screen
(\`style-templates/leftbraincoder-split\`; spec in \`style-library/03-graphite-glass/DESIGN.md\`, "Split layout").
Keep the style. Only the content, the card beats and the timings change.

## Story
- Hook (frame 0):
- Items:
- Spotlight:
- CTA:
`);
console.log(`Created video-projects/${slug} from the leftbraincoder split template.
Next: put the footage (effects baked in, 1 s keyframes) at assets/footage.mp4, then follow
style-templates/leftbraincoder-split/README.md.`);
