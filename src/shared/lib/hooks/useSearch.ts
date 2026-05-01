import { useState } from "react";
import { fuzzyMatch } from "../levenshteinDistance";

function stripSpecialCharacters(str: string): string {
  return str.replace(/[^a-z0-9\s]/gi, " ");
}

function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, " ");
}

/**
 * A custom hook for performing a weighted search on a dataset.
 *
 * Keys are listed in descending priority order. Weights are computed as
 * `factor^(n - 1 - index)`, so the first key is the most important.
 * With the default factor of 10 and 4 keys: 1000, 100, 10, 1.
 *
 * All terms in a multi-word query must match (AND logic).
 * Fuzzy matching uses Levenshtein distance ≤ 2 at 50% weight.
 *
 * @param data - The dataset to search.
 * @param keys - Ordered priority list of fields to search, validated against TData.
 * @param options.factor - Base for exponential weight decay. Default: 10.
 * @param options.fuzzy - Enable fuzzy matching. Default: false.
 */
export function useSearch<TData extends Record<string, unknown>>(
  data: TData[],
  keys: readonly (keyof TData)[],
  options?: { factor?: number; fuzzy?: boolean },
) {
  const factor = options?.factor ?? 10;
  const fuzzy = options?.fuzzy ?? false;
  const n = keys.length;

  // key at index 0 → factor^(n-1), ..., last key → factor^0 = 1
  const weights = new Map<keyof TData, number>(
    keys.map((key, i) => [key, Math.pow(factor, n - 1 - i)]),
  );

  const [results, setResults] = useState<{ success: boolean; data: TData[] }>({ success: false, data: [] });
  const [query, setQuery] = useState("");

  const search = (searchTerm: string) => {
    if (!searchTerm || !searchTerm.trim()) {
      setQuery("");
      setResults({ success: false, data: [] });
      return;
    }

    setQuery(searchTerm);

    const cleanedTerm = normalizeWhitespace(stripSpecialCharacters(searchTerm.toLowerCase()));
    const terms = cleanedTerm.split(/\s+/).filter(Boolean);

    const rankedResults = data
      .map((item) => {
        let totalRank = 0;

        // AND logic: every term must match at least one field
        for (const term of terms) {
          let termRank = 0;

          for (const key of keys) {
            const value = String(item[key] ?? "").toLowerCase();
            const cleanedValue = normalizeWhitespace(stripSpecialCharacters(value));
            const weight = weights.get(key) ?? 0;

            if (cleanedValue.includes(term)) {
              termRank += weight;
            } else if (fuzzy && fuzzyMatch(term, cleanedValue)) {
              termRank += weight * 0.5;
            }
          }

          // If this term matched nothing, exclude the item entirely
          if (termRank === 0) return { item, rank: 0 };
          totalRank += termRank;
        }

        return { item, rank: totalRank };
      })
      .filter(({ rank }) => rank > 0)
      .sort((a, b) => b.rank - a.rank)
      .map(({ item }) => item);

    setResults({
      success: rankedResults.length > 0,
      data: rankedResults,
    });
  };

  return { results, query, search };
}
