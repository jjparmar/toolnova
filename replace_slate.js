const fs = require('fs');
const path = require('path');

const folders = [
  'image-compressor',
  'image-crop',
  'image-pdf-tools',
  'image-to-pdf',
  'jpg-to-png',
  'png-to-jpg',
  'resize-image'
];

const basePath = path.join(__dirname, 'src', 'app', 'tools');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace text colors
  content = content.replace(/text-slate-900 dark:text-white/g, 'text-foreground');
  content = content.replace(/text-slate-800 dark:text-slate-200/g, 'text-foreground');
  content = content.replace(/text-slate-[6-8]00 dark:text-slate-[3-4]00/g, 'text-muted-foreground');
  content = content.replace(/text-slate-[0-9]+ dark:text-slate-[0-9]+/g, 'text-muted-foreground');

  // Replace bg colors
  content = content.replace(/bg-white dark:bg-slate-900/g, 'bg-card/40 backdrop-blur-md');
  content = content.replace(/bg-white dark:bg-slate-800/g, 'bg-card/40 backdrop-blur-md');
  content = content.replace(/bg-white\/80 dark:bg-slate-800\/80/g, 'bg-background/60');
  content = content.replace(/bg-slate-100 dark:bg-slate-800/g, 'bg-muted');
  content = content.replace(/bg-slate-50 dark:bg-slate-800\/50/g, 'bg-muted/50');
  content = content.replace(/bg-slate-50 dark:bg-slate-900/g, 'bg-background');

  // Replace border colors
  content = content.replace(/border-slate-200 dark:border-slate-800/g, 'border-border/40');
  content = content.replace(/border-slate-200 dark:border-slate-700/g, 'border-border/50');
  content = content.replace(/border-slate-200\/60 dark:border-slate-800\/60/g, 'border-border/60');
  content = content.replace(/border-slate-100 dark:border-slate-800/g, 'border-border/40');

  // Replace prose
  content = content.replace(/prose-slate dark:prose-invert/g, 'prose-neutral dark:prose-invert');

  // Replace loose slate references that might have been missed (be careful here)
  content = content.replace(/text-slate-900/g, 'text-foreground');
  content = content.replace(/text-slate-[6-8]00/g, 'text-muted-foreground');
  content = content.replace(/bg-slate-[1-9]00\/[0-9]+/g, 'bg-muted/50');
  content = content.replace(/bg-slate-[1-2]00/g, 'bg-muted');

  // Any remaining dark:text-slate-xxx
  content = content.replace(/dark:text-slate-[0-9]+/g, '');
  content = content.replace(/dark:bg-slate-[0-9]+/g, '');
  content = content.replace(/dark:border-slate-[0-9]+/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

folders.forEach(folder => {
  const dir = path.join(basePath, folder);
  if (fs.existsSync(dir)) {
    ['client.tsx', 'page.tsx'].forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.existsSync(filePath)) {
        processFile(filePath);
      }
    });
  }
});
