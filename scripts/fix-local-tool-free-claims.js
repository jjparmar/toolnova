const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "src/data/tools.ts");
let s = fs.readFileSync(p, "utf8");
const wrong =
  "Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.";

// Local browser tools should not use AI freemium copy
const pairs = [
  [
    /("png-to-jpg"[\s\S]*?question:"Is the tool free to use\?",\s*answer:")Yes\. Free daily AI use is included without sign-up\. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access\.(")/,
    '$1Yes. Browser image conversion is free and unlimited—no sign-up required.$2',
  ],
  [
    /("reorder-pdf"[\s\S]*?question:"Is reordering free\?",\s*answer:")Yes\. Free daily AI use is included without sign-up\. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access\.(")/,
    '$1Yes. Reorder PDF is free and unlimited in your browser—no account required.$2',
  ],
];

let n = 0;
for (const [re, rep] of pairs) {
  if (re.test(s)) {
    s = s.replace(re, rep);
    n++;
  }
}
fs.writeFileSync(p, s);
console.log("fixed local free claims:", n);
