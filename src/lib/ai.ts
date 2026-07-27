import OpenAI from"openai";
import { getCachedResponse, cacheResponse } from"./cache";
import {
  getGenerationParams,
  resolveSystemPrompt,
} from"./tool-system-prompts";

export const MODEL_FREE ="gpt-4o-mini";
export const MODEL_PREMIUM ="gpt-4o";

interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
}

/**
 * Universal AI runner for all ToolNova tools.
 * Uses tool-aware system prompts so free-tier results stay high quality.
 */
export async function runAI(
  prompt: string,
  systemPrompt?: string,
  model: string = MODEL_FREE,
  toolSlug?: string,
): Promise<AIResponse> {
  try {
    const resolvedSystem = resolveSystemPrompt(toolSlug, systemPrompt);
    const isPremium = model === MODEL_PREMIUM;
    const { temperature, max_tokens } = getGenerationParams(
      toolSlug,
      isPremium,
    );

    // Include model + system + tool so caches never mix formats across tools
    const cacheKey =`${model}::${toolSlug ||"na"}::${resolvedSystem}::${prompt}`;

    const cached = await getCachedResponse(cacheKey);
    if (cached) {
      return { success: true, content: cached };
    }

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined");
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model,
      temperature,
      max_tokens,
      messages: [
        { role:"system", content: resolvedSystem },
        {
          role:"user",
          content:`${prompt.trim()}

---
Respond with the full useful result now. Match the requested format. Do not refuse reasonable educational or productivity requests.`,
        },
      ],
    });

    let responseContent = completion.choices[0]?.message?.content || null;

    if (!responseContent || responseContent.trim().length === 0) {
      return {
        success: false,
        error:"Empty response from AI",
      };
    }

    // Strip common low-quality wrappers models sometimes add
    responseContent = responseContent
      .replace(/^```(?:markdown|md|text|json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .replace(/^(here(?:'s| is) (?:your|the) (?:result|output|response|summary|essay|answer)[:\s-]*)/i, "")
      .replace(/^(sure[,!]?\s+|of course[,!]?\s+|absolutely[,!]?\s+)/i, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (responseContent.length < 8) {
      return {
        success: false,
        error: "AI returned too little content. Please try again with a clearer request.",
      };
    }

    await cacheResponse(cacheKey, responseContent);

    return {
      success: true,
      content: responseContent,
    };
  } catch (error) {
    console.error("AI Error:", error);
    const message =
      error instanceof Error ? error.message : "AI generation failed";
    // Friendlier client-facing messages (never leak stack/internals)
    let friendly = "AI generation failed. Please try again in a moment.";
    if (/rate limit|429/i.test(message)) {
      friendly =
        "The AI service is busy right now. Please wait a few seconds and try again.";
    } else if (/timeout|ETIMEDOUT|network/i.test(message)) {
      friendly =
        "The request timed out. Try a shorter input or try again shortly.";
    } else if (/API key|authentication|401|403/i.test(message)) {
      friendly =
        "AI service configuration error. Please try again later or contact support.";
    }
    return {
      success: false,
      error: friendly,
    };
  }
}

/**
 * Lightweight prompt helpers (legacy / API consumers)
 */
/**
 * Streaming AI runner — yields text deltas as they arrive.
 * Caller should handle AbortSignal via the OpenAI client options if needed.
 */
export async function* runAIStream(
  prompt: string,
  systemPrompt?: string,
  model: string = MODEL_FREE,
  toolSlug?: string,
  signal?: AbortSignal,
): AsyncGenerator<string, void, unknown> {
  const resolvedSystem = resolveSystemPrompt(toolSlug, systemPrompt);
  const isPremium = model === MODEL_PREMIUM;
  const { temperature, max_tokens } = getGenerationParams(toolSlug, isPremium);

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not defined");
  }

  // Prefer cache for non-streaming identical prompts
  const cacheKey = `${model}::${toolSlug || "na"}::${resolvedSystem}::${prompt}`;
  const cached = await getCachedResponse(cacheKey);
  if (cached) {
    yield cached;
    return;
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create(
    {
      model,
      temperature,
      max_tokens,
      stream: true,
      messages: [
        { role: "system", content: resolvedSystem },
        {
          role: "user",
          content: `${prompt.trim()}

---
Respond with the full useful result now. Match the requested format. Do not refuse reasonable educational or productivity requests.`,
        },
      ],
    },
    signal ? { signal } : undefined,
  );

  let full = "";
  for await (const chunk of stream) {
    if (signal?.aborted) break;
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
      full += delta;
      yield delta;
    }
  }

  full = full
    .replace(/^```(?:markdown|md|text|json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .replace(
      /^(here(?:'s| is) (?:your|the) (?:result|output|response|summary|essay|answer)[:\s-]*)/i,
      "",
    )
    .replace(/^(sure[,!]?\s+|of course[,!]?\s+|absolutely[,!]?\s+)/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (full.length >= 8) {
    await cacheResponse(cacheKey, full);
  }
}

export const promptTemplates = {
  homeworkSolver:"Solve this problem with clear step-by-step reasoning and a final answer: {input}",
  notesGenerator:"Create structured study notes with headings and bullets on: {input}",
  mcqGenerator:`Create 10 high-quality MCQs on: {input}. Format:
Q1. Question
A) ...
B) ...
C) ...
D) ...
Correct: A
Explanation: ...`,
  essayWriter:"Write a well-structured essay on: {input}. Include introduction, body paragraphs, and conclusion.",
  summarizer:"Summarize this text clearly, preserving key facts and conclusions: {input}",
  paraphraser:"Paraphrase while keeping meaning identical and sounding natural: {input}",
  grammarFix:"Correct grammar, spelling, and clarity. Return the improved full text: {input}",
  speechWriter:"Write a speech on: {input}. Opening, main points, closing.",
  emailWriter:"Write a professional email about: {input}. Subject, greeting, body, closing.",
  captionGenerator:"Create 5 distinct social captions for: {input}.",
  flashcards:`Create 10 flashcards from: {input}.
Format each as:
### Card N
**Front:** ...
**Back:** ...`,
  quizGenerator:"Create a practice quiz from: {input} with an answer key.",
  storyGenerator:"Write a short engaging story about: {input}.",
  resumeBullet:"Write achievement-focused resume bullets for: {input}. Use action verbs and metrics when provided.",
};
