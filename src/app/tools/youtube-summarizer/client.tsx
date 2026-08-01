"use client";

import EnhancedToolLayout from"@/components/EnhancedToolLayout";

export default function YoutubeSummarizerClient() {
  const fetchAndSummarize = async (input: string) => {
    const url = input.trim();
    if (!url) {
      throw new Error("Please paste a YouTube video URL.");
    }

    // 1. Fetch transcript from internal API
    const res = await fetch("/api/youtube/transcript", {
      method:"POST",
      headers: {"Content-Type":"application/json" },
      body: JSON.stringify({ url }),
    });

    const errorData = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(
        typeof errorData?.error ==="string"
          ? errorData.error
          :"Failed to fetch video transcript. Try a public video with captions.",
      );
    }

    const text = errorData?.text;
    if (!text || typeof text !=="string") {
      throw new Error("No transcript available for this video. Try one with captions enabled.",
      );
    }

    // 2. Summarize transcript via AI (counts toward daily free allowance)
    const prompt =`Summarize this YouTube transcript for a student/professional who did not watch the video.

## Required Markdown structure
### Overview
2–4 sentences on what the video is about.

### Key points
- 6–12 bullet points of the main ideas (accurate to the transcript)
- Preserve important names, numbers, steps, and claims

### Outline
Numbered high-level sections of the talk (if the content supports it).

### Takeaways
3–5 practical conclusions or actions.

### Who this is for
One short line on the ideal audience.

Rules:
- Do not invent timestamps unless clearly present in the text
- Do not invent facts not in the transcript
- No"Here is a summary" intro — start with ### Overview

## Transcript
${text}`;

    const aiRes = await fetch("/api/ai", {
      method:"POST",
      headers: {"Content-Type":"application/json" },
      body: JSON.stringify({
        prompt,
        toolSlug:"youtube-summarizer",
        systemPrompt:"You are an expert lecture summarizer. Produce accurate, structured Markdown summaries from transcripts. Never invent content not supported by the transcript. Be complete and useful.",
      }),
    });

    const data = await aiRes.json().catch(() => ({}));
    if (!aiRes.ok) {
      throw new Error(
        typeof data?.error ==="string"
          ? data.error
          :"AI summarization failed. Please try again.",
      );
    }
    if (!data?.result || typeof data.result !=="string") {
      throw new Error("Empty summary from AI. Please try again.");
    }

    // Usage counter refresh is handled by EnhancedToolLayout for youtube-summarizer
    return data.result;
  };

  return (
    <EnhancedToolLayout
      toolSlug="youtube-summarizer"
      toolName="YouTube Video Summarizer"
      placeholder="Paste a YouTube video link here (e.g., https://www.youtube.com/watch?v=...)"
      isNonAITool={true}
      nonAIHandler={fetchAndSummarize}
      showFreeTierNote={true}
      generateButtonText="Summarize video"
      resultLabel="Summary"
      inputLabel="YouTube URL"
      options={[]}
    />
  );
}
