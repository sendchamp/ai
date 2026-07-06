import { buildIndex } from "./index.js";
import type { SearchResult } from "./types.js";

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "to", "for", "in", "on", "with", "how", "do", "i", "is", "my",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9_+\-/]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

export interface SearchOptions {
  query: string;
  source?: "api" | "docs" | "guide" | "all";
  limit?: number;
}

export function searchEntries(options: SearchOptions): SearchResult[] {
  const { query, source = "all", limit = 8 } = options;
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const entry of buildIndex()) {
    if (source !== "all" && entry.source !== source) continue;

    const haystack = [
      entry.title,
      entry.summary,
      entry.tags.join(" "),
      entry.path ?? "",
      entry.method ?? "",
      entry.content.slice(0, 2000),
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (entry.id.toLowerCase().includes(token)) score += 8;
      if (entry.title.toLowerCase().includes(token)) score += 5;
      if (entry.tags.some((t) => t.includes(token))) score += 4;
      if (entry.summary.toLowerCase().includes(token)) score += 3;
      if (haystack.includes(token)) score += 1;
    }

    if (score <= 0) continue;

    const firstMatch = tokens.find((t) => haystack.includes(t)) ?? tokens[0];
    const idx = haystack.indexOf(firstMatch);
    const snippet =
      idx >= 0
        ? entry.content.slice(Math.max(0, idx - 40), idx + 120).replace(/\s+/g, " ").trim()
        : entry.summary;

    results.push({
      id: entry.id,
      source: entry.source,
      title: entry.title,
      snippet: snippet.slice(0, 200),
      score,
    });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
