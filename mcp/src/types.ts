export type IndexSource = "api" | "docs" | "guide";

export interface IndexEntry {
  id: string;
  source: IndexSource;
  title: string;
  summary: string;
  tags: string[];
  content: string;
  method?: string;
  path?: string;
}

export interface SearchResult {
  id: string;
  source: IndexSource;
  title: string;
  snippet: string;
  score: number;
}
