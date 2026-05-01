import { useState } from "react";
import { searchStrategyConfig } from "../config/searchStrategyConfig";
import { fuzzyMatch } from "../levenshteinDistance";

export function useSearch<
  T extends keyof typeof searchStrategyConfig,
  TData extends Record<string, unknown> = Record<string, unknown>,
>(strategy: T, data: TData[], searchableProperties: (keyof (typeof searchStrategyConfig)[T])[], fuzzy: boolean = false) {
  const [results, setResults] = useState<TData[]>([]);
  const [query, setQuery] = useState("");

  const strategyConfig = searchStrategyConfig[strategy];

  const search = (searchTerm: string) => {
    setQuery(searchTerm);
    const terms = searchTerm.toLowerCase().split(" ").filter(Boolean);
    const rankedResults = data
      .map((item) => {
        let rank = 0;
        for (const prop of searchableProperties) {
          const value = String(item[prop as keyof TData]).toLowerCase();
          for (const term of terms) {
            // Exact match is preferred.
            if (value && value.includes(term)) {
              rank += (strategyConfig[prop] as number) || 0;
            } else if (fuzzy && value && fuzzyMatch(term, value)) {
              rank += ((strategyConfig[prop] as number) || 0) / 2; // Fuzzy match gets half the rank
            }
          }
        }
        return { item, rank };
      })
      .filter(({ rank }) => rank > 0)
      .sort((a, b) => b.rank - a.rank)
      .map(({ item }) => item);

    setResults(rankedResults);
  };

  return { results, query, search };
}
