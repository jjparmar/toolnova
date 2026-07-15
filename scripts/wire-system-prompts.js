const fs = require("fs");
const path = require("path");

const toolsDir = path.join(__dirname, "..", "src", "app", "tools");
const dirs = fs
  .readdirSync(toolsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let fixed = 0;
for (const name of dirs) {
  const f = path.join(toolsDir, name, "client.tsx");
  if (!fs.existsSync(f)) continue;
  let t = fs.readFileSync(f, "utf8");
  if (!/const systemPrompt\s*=/.test(t)) continue;
  if (/systemPrompt=\{systemPrompt\}/.test(t)) continue;

  // Insert after toolSlug="..." or toolSlug={...}
  const patterns = [
    /(toolSlug\s*=\s*"[^"]+"\s*\n)/,
    /(toolSlug\s*=\s*\{[^}]+\}\s*\n)/,
  ];
  let done = false;
  for (const re of patterns) {
    if (re.test(t)) {
      t = t.replace(re, (m) => `${m}        systemPrompt={systemPrompt}\n`);
      done = true;
      break;
    }
  }
  if (!done) {
    // after EnhancedToolLayout opening first prop block toolName=
    if (/toolName=/.test(t)) {
      t = t.replace(
        /(toolName\s*=\s*"[^"]+"\s*\n)/,
        (m) => `${m}        systemPrompt={systemPrompt}\n`,
      );
      done = /systemPrompt=\{systemPrompt\}/.test(t);
    }
  }

  if (done && /systemPrompt=\{systemPrompt\}/.test(t)) {
    fs.writeFileSync(f, t);
    fixed++;
    console.log("wired", name);
  } else {
    console.log("needs-manual", name);
  }
}
console.log("total fixed", fixed);
