"use client";

import EnhancedToolLayout from "@/components/EnhancedToolLayout";

export default function PlagiarismCheckerClient() {
  const promptTemplate = (input: string) => {
    return `You are an expert writing coach analyzing text for AI-like patterns and generic phrasing.

IMPORTANT LIMITS (state these clearly in your response):
- This is NOT a database plagiarism checker (no web crawl comparison).
- This is NOT a legal or academic-integrity verdict.
- Percentages are rough heuristic estimates only.

Analyze the text for:
1) AI-like uniformity / low burstiness
2) Buzzwords and template phrasing
3) Vague claims without specifics
4) Repetitive sentence openings/structure

Text to analyze:
"""
${input}
"""

Respond in Markdown with exactly these sections:

## AI-pattern estimate
- Probability band (Low / Medium / High) and a rough % range (e.g. 20–40%)
- One-sentence confidence note (heuristic only)

## Patterns found
Bullet list of specific issues with short quoted examples from the text (if any)

## Specificity & voice
What would make this sound more human and original (details, examples, varied rhythm)

## Humanization checklist
3–6 concrete rewrite steps the author can apply today

## Disclaimer
Remind the user this is educational feedback only—not Turnitin/plagiarism database proof.`;
  };

  return (
    <EnhancedToolLayout
      toolSlug="plagiarism-checker"
      toolName="AI Writing Detector"
      placeholder="Paste your essay or article to check for AI-like patterns and get humanization tips..."
      promptTemplate={promptTemplate}
      systemPrompt="You analyze writing for AI-like patterns and generic phrasing. Be direct, structured, and constructive. Use Markdown headings. Never claim legal certainty. Never claim database plagiarism matches. Always include a clear disclaimer."
      inputRows={12}
      generateButtonText="Analyze writing"
      resultLabel="Analysis"
      showFreeTierNote={true}
    />
  );
}
