# ToolNova SEO Recovery Guide — Manual Steps

## Priority 1: Request Indexing in Google Search Console (Do This TODAY)

Step-by-step instructions for:
1. Go to Google Search Console (https://search.google.com/search-console)
2. Select the property for `https://www.toolnovahub.com/`
3. Use the URL Inspection tool to submit these URLs for indexing, IN THIS ORDER:

### Tier 1 — Submit First (Homepage + Money Pages)
```text
https://www.toolnovahub.com/
https://www.toolnovahub.com/tools
https://www.toolnovahub.com/tools/merge-pdf
https://www.toolnovahub.com/tools/compress-pdf
https://www.toolnovahub.com/tools/grammar-fix
https://www.toolnovahub.com/tools/flashcard-maker
https://www.toolnovahub.com/tools/paraphraser
https://www.toolnovahub.com/tools/essay-writer
https://www.toolnovahub.com/tools/homework-solver
https://www.toolnovahub.com/tools/text-summarizer
```

### Tier 2 — Submit Next (Category Hubs + More Tools)
```text
https://www.toolnovahub.com/tools/writing-tools
https://www.toolnovahub.com/tools/study-tools
https://www.toolnovahub.com/tools/exam-prep-tools
https://www.toolnovahub.com/tools/image-pdf-tools
https://www.toolnovahub.com/tools/career-tools
https://www.toolnovahub.com/tools/utility-tools
https://www.toolnovahub.com/tools/image-compressor
https://www.toolnovahub.com/tools/split-pdf
https://www.toolnovahub.com/tools/image-to-pdf
https://www.toolnovahub.com/tools/quiz-generator
https://www.toolnovahub.com/tools/notes-generator
https://www.toolnovahub.com/tools/resume-bullets
https://www.toolnovahub.com/tools/cover-letter-writer
```

### Tier 3 — Submit After (Blog + Remaining)
```text
https://www.toolnovahub.com/blog
https://www.toolnovahub.com/blog/student-pdf-submission-workflow-portal-limits
https://www.toolnovahub.com/blog/essay-polish-workflow-grammar-paraphrase-summarize
https://www.toolnovahub.com/blog/lecture-notes-to-exam-ready-flashcards-quiz
https://www.toolnovahub.com/blog/job-application-kit-resume-bullets-cover-letter
https://www.toolnovahub.com/blog/merge-pdf-without-losing-formatting
https://www.toolnovahub.com/about
https://www.toolnovahub.com/pricing
```

## Priority 2: Submit Sitemap
- In GSC, go to Sitemaps section
- Submit: `https://www.toolnovahub.com/sitemap.xml`
- Also submit: `https://www.toolnovahub.com/sitemap-images.xml`
- Also submit: `https://www.toolnovahub.com/sitemap-news.xml`

## Priority 3: Bing Webmaster Tools
- Go to https://www.bing.com/webmasters
- Add the site if not already added
- Submit the sitemap
- Use URL submission to submit the same Tier 1 URLs

## Priority 4: Check for Manual Actions
- In GSC, go to Security & Manual Actions → Manual Actions
- If there are any, document them and address immediately
- Common issues: Thin content, Unnatural links, Spammy structured data

## Priority 5: Backlink Strategy (Week 2-8)

1. **Free directory submissions**: Product Hunt, AlternativeTo, SaaSHub, ToolPilot, G2, Capterra (free listing), BetaList, LaunchingNext, StartupLift
2. **Reddit communities**: r/productivity, r/college, r/students, r/GetStudying, r/HomeworkHelp, r/writing, r/resumehelp, r/ArtificialIntelligence, r/tools
3. **Quora topics**: Answer questions about 'free PDF merge', 'AI study tools', 'free essay writer' etc.
4. **Social media**: Create profiles on Twitter/X, LinkedIn company page, Pinterest (for infographic tools)
5. **Guest posting targets**: Education blogs, productivity blogs, student resource sites
6. **YouTube**: Create 60-second tool demo videos

## Priority 6: Content Calendar (Ongoing)

Suggest 10 blog post titles targeting long-tail keywords that ToolNova can realistically rank for as a new site:
1. "How to Merge PDF Files on Phone Free Without Watermark (2026)"
2. "5 Ways to Compress Images for Assignment Submission Under 2MB"
3. "Free Flashcard Maker vs Anki vs Quizlet — Which is Best for Students?"
4. "How to Fix Grammar in Your Essay Without Paying for Grammarly"
5. "Step-by-Step: Convert JPG to PDF Free Online (No Signup)"
6. "How to Use AI to Write a Cover Letter That Gets Interviews"
7. "Best Free PDF Tools for Students — No Watermark, No Signup"
8. "How to Summarize a 20-Page Research Paper in 2 Minutes"
9. "AI Homework Solver: Is It Cheating? How Students Can Use It Ethically"
10. "How to Create Study Notes from Textbook Chapters with AI"

## Priority 7: Google Discover Optimization

Google Discover shows content to users on mobile BEFORE they search — based on their interests. It can drive massive traffic spikes. Here's how to optimize for it:

### Requirements Already Met ✅
- `max-image-preview:large` meta tag (set globally)
- Large OG images (1200x630) on blog posts
- `X-Robots-Tag` header with `max-image-preview:large`
- RSS feed at `/feed.xml`
- Atom feed at `/feed.atom` (newly added)
- Structured data (BlogPosting, FAQPage, etc.)
- PWA manifest with screenshots
- Good Core Web Vitals setup

### Content Strategy for Discover

Google Discover favors content that is:
1. **Timely and trending** — Write about current events in education/AI
2. **Visually rich** — Every blog post MUST have a unique, high-quality cover image (min 1200px wide)
3. **Emotionally engaging** — Use titles that spark curiosity without being clickbait
4. **E-E-A-T compliant** — Show expertise, experience, authoritativeness, trustworthiness

### Discover-Optimized Blog Title Formulas
Use these patterns for blog titles that Discover tends to surface:
- "I Tried [Tool] for [Time Period] — Here's What Happened"
- "[Number] [Topic] Tips That [Specific Audience] Wish They Knew"
- "The [Adjective] Way Students Are Using AI to [Benefit] in 2026"
- "Why [Common Practice] Is Actually Hurting Your [Goal]"
- "How to [Desirable Outcome] in [Short Time] (Free Method)"

### Image Requirements for Discover
- **Minimum width**: 1200px (CRITICAL — images under 1200px are rejected)
- **Recommended**: 1200x900 (4:3) or 1200x1200 (1:1) — Discover cards use these
- **Format**: WebP preferred for speed, PNG/JPG accepted
- **Content**: Avoid stock photos — use custom graphics, screenshots, infographics
- **Alt text**: Descriptive, keyword-rich alt text on all images
- **Do NOT use the site logo as the article image**

### Discover-Specific Blog Post Ideas
1. "This Free AI Tool Helped Me Write My College Essay in 30 Minutes"
2. "Students Are Secretly Using This PDF Trick for Assignment Submissions"
3. "The 5-Minute Study Method That's Replacing Quizlet for Gen Z"
4. "I Made 200 Flashcards in 3 Minutes — Here's the Free Tool I Used"
5. "Why Teachers Are Recommending This Free Grammar Checker Over Grammarly"

### How to Track Discover Traffic
1. In GSC, go to **Performance** → Change **Search type** dropdown to **Discover**
2. If you don't see a Discover tab, your site hasn't appeared in Discover yet
3. Once Discover traffic starts, you'll see a separate report with impressions and clicks

### Tips to Get Picked Up by Discover
- **Publish 3-5x per week** — Discover rewards consistent publishing
- **Update old posts** — Refresh dates and content on existing popular posts
- **Use eye-catching cover images** — This is the #1 factor for Discover CTR
- **Write 1500+ word articles** — Longer, comprehensive content performs better
- **Share on social media immediately** — Early engagement signals help
- **Avoid clickbait** — Google penalizes misleading titles in Discover

## Expected Timelines
- **Indexing**: 1-4 weeks
- **First Discover appearance**: 4-12 weeks (after building some authority)
- **Ranking improvements**: 2-6 months
- **Consistent Discover traffic**: 3-6 months with regular publishing
