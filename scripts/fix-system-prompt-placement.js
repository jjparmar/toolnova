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

  // Remove systemPrompt from PremiumToolWrapper (wrong place)
  // Pattern: toolSlug=...\n        systemPrompt={systemPrompt}\n        tagline=
  const wrong =
    /(toolSlug="[^"]+"\s*\n)\s*systemPrompt=\{systemPrompt\}\s*\n(\s*tagline=)/g;
  if (wrong.test(t)) {
    t = t.replace(wrong, "$1$2");
  }

  // Also wrong if between toolName and tagline on wrapper
  const wrong2 =
    /(toolName="[^"]+"\s*\n)\s*systemPrompt=\{systemPrompt\}\s*\n(\s*tagline=)/g;
  if (wrong2.test(t)) {
    t = t.replace(wrong2, "$1$2");
  }

  // Ensure EnhancedToolLayout gets systemPrompt after its toolSlug=
  // Find EnhancedToolLayout block
  if (
    /const systemPrompt\s*=/.test(t) &&
    /EnhancedToolLayout/.test(t) &&
    !/<EnhancedToolLayout[\s\S]*?systemPrompt=\{systemPrompt\}/.test(t)
  ) {
    // After EnhancedToolLayout's toolSlug=
    t = t.replace(
      /(<EnhancedToolLayout\s*\n(?:[\s\S]*?))(toolSlug="[^"]+"\s*\n)/,
      (m, a, b) => {
        if (m.includes("systemPrompt={systemPrompt}")) return m;
        return a + b + "        systemPrompt={systemPrompt}\n";
      },
    );
  }

  // ToolLayout variant
  if (
    /const systemPrompt\s*=/.test(t) &&
    /<ToolLayout[\s\S]*?systemPrompt=\{systemPrompt\}/.test(t) === false &&
    /<ToolLayout/.test(t)
  ) {
    t = t.replace(
      /(<ToolLayout\s*\n(?:[\s\S]*?))(toolSlug="[^"]+"\s*\n)/,
      (m, a, b) => {
        if (m.includes("systemPrompt={systemPrompt}")) return m;
        return a + b + "        systemPrompt={systemPrompt}\n";
      },
    );
  }

  // Clean double systemPrompt lines
  t = t.replace(
    /(systemPrompt=\{systemPrompt\}\s*\n)\s*systemPrompt=\{systemPrompt\}\s*\n/g,
    "$1",
  );

  fs.writeFileSync(f, t);
  if (/systemPrompt=\{systemPrompt\}/.test(t)) {
    // verify it's near EnhancedToolLayout not only PremiumToolWrapper
    const idx = t.indexOf("systemPrompt={systemPrompt}");
    const before = t.slice(Math.max(0, idx - 200), idx);
    if (before.includes("EnhancedToolLayout") || before.includes("ToolLayout")) {
      fixed++;
      console.log("ok", name);
    } else if (before.includes("PremiumToolWrapper")) {
      console.log("still-wrong", name);
    } else {
      console.log("ok?", name);
    }
  }
}
console.log("done", fixed);
