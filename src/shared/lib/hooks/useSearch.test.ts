
import { renderHook, act } from "@testing-library/react";
import { useSearch } from "./useSearch";
import { describe, test } from "vitest";
import { expect } from "vitest";


const mockApplications = [
  {
    id: "1",
    position: "React Engineer", // Matches "React", "Engineer"
    company: "Google", // Matches "Google"
    notes: "Full-time position", // Matches "Full", "time", "position"
    other: "Remote available", // Matches "Remote"
  },
  {
    id: "2",
    position: "Frontend Developer", // Matches "Frontend", "Developer"
    company: "Microsoft", // Matches "Microsoft"
    notes: "Contract position", // Matches "Contract", "position"
    other: "On-site required", // Matches "On", "site", "required"
  },
  {
    id: "3",
    position: "React Developer", // Matches "React", "Developer"
    company: "Facebook", // Matches "Facebook"
    notes: "Full-time benefits", // Matches "Full", "time", "benefits"
    other: "Hybrid work", // Matches "Hybrid", "work"
  },
  {
    id: "4",
    position: "Backend Engineer", // Matches "Backend", "Engineer"
    company: "Google", // Matches "Google"
    notes: "Full-time remote", // Matches "Full", "time", "remote"
    other: "Senior level", // Matches "Senior", "level"
  },
  {
    id: "5",
    position: "Design Engineer", // Matches "Design", "Engineer"
    company: "Apple", // Matches "Apple"
    notes: "Focused role design", // Matches "Focused", "role", "design"
    other: "Remote first culture", // Matches "Remote", "first", "culture"
  },
];

describe("useSearch - Single Word Substring Matching", () => {
  test("should find single result matching search term in highest priority field (position)", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );

    act(() => result.current.search("React"));

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(2);
    expect(result.current.results.data[0].id).toBe("1"); // React Engineer
    expect(result.current.results.data[1].id).toBe("3"); // React Developer
  });

  test("should find result when search term matches lower priority field (company)", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );

    act(() => result.current.search("Google"));

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(2);
    expect(result.current.results.data[0].id).toBe("1");
  });

  test("should find result matching lowest priority field (other)", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );

    act(() => result.current.search("Remote"));

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(3); // app1+app5 in other, app4 in notes
  });

  test("should be case-insensitive", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("react"));
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("1");

    act(() => result.current.search("REACT"));
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("1");

    act(() => result.current.search("ReAcT"));
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("1");
  });

  test("should return success:false when search term has no matches", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );

    act(() => result.current.search("Kubernetes"));

    expect(result.current.results.success).toBe(false);
    expect(result.current.results.data).toHaveLength(0);
  });

  test("should strip special characters before matching", () => {
    const specialCharApp = {
      id: "6",
      position: "Senior@React#Engineer",
      company: "TestCorp",
      notes: "",
      other: "",
    };
    const { result } = renderHook(() =>
      useSearch([...mockApplications, specialCharApp], ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("React"));

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data.some((app) => app.id === "6")).toBe(true);
  });

  test("should normalize whitespace (spaces, tabs, newlines)", () => {
    const whitespaceApp = {
      id: "7",
      position: "Senior\tReact\nEngineer",
      company: "TestCorp",
      notes: "",
      other: "",
    };
    const { result } = renderHook(() =>
      useSearch([...mockApplications, whitespaceApp], ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("Senior React"));

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data.some((app) => app.id === "7")).toBe(true);
  });

  test("should match substring, not just whole words", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("ngine")); // substring of "Engineer"

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("1");
  });
});

describe("useSearch - Multi-Word Substring Matching", () => {
  test("should use AND logic: all words must match somewhere in searchable fields", () => {
    // Given: Applications
    // When: Searching for "React Engineer"
    // Then: Should return only results that have BOTH "React" AND "Engineer"
    // App 1 has both in position; App 3 has "React" but not "Engineer" anywhere
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("React Engineer"));
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(1);
    expect(result.current.results.data[0].id).toBe("1");
  });

  test("should match multi-word query even if terms are in different fields", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );

    act(() => result.current.search("React Google")); // "React" in position, "Google" in company

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(1);
    expect(result.current.results.data[0].id).toBe("1");
  });

  test("should handle multiple spaces between search terms as single delimiter", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("React  Engineer")); // two spaces
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(1);
    expect(result.current.results.data[0].id).toBe("1");
  });

  test("should handle leading and trailing whitespace in search term", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );

    act(() => result.current.search("  React Engineer  "));

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(1);
    expect(result.current.results.data[0].id).toBe("1");
  });

  test("should return no results if any required term is missing", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );

    act(() => result.current.search("React Python")); // "Python" matches nothing

    expect(result.current.results.success).toBe(false);
    expect(result.current.results.data).toHaveLength(0);
  });
});

describe("useSearch - Multi-Result Ranking & Multi-Field Accumulation", () => {
  test("should accumulate score when the same term matches multiple fields", () => {
    // multiFieldApp: "React" in position (1000) + notes (10) = 1010
    // singleFieldApp: "React" in position (1000) only = 1000
    const multiFieldApp = { id: "mf1", position: "React Engineer", notes: "React team focus", company: "", other: "" };
    const singleFieldApp = { id: "mf2", position: "React Developer", notes: "Team focus", company: "", other: "" };
    const { result } = renderHook(() =>
      useSearch([multiFieldApp, singleFieldApp], ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("React"));

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("mf1"); // 1010 > 1000
    expect(result.current.results.data[1].id).toBe("mf2");
  });

  test("should rank results by total accumulated score across fields", () => {
    const highRankingResult = {
      id: "8",
      position: "Engineer",          // weight 1000
      company: "Engineer Corp",      // weight 100
      notes: "Engineer role",        // weight 10
      other: "Engineering focused",  // weight 1
    };
    const { result } = renderHook(() =>
      useSearch(
        [...mockApplications, highRankingResult],
        ["position", "company", "notes", "other"],
      ),
    );
    act(() => result.current.search("Engineer"));

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(4);
    expect(result.current.results.data[0].id).toBe("8"); // 1000+100+10+1 = 1111
    expect(result.current.results.data[1].id).toBe("1"); // position only = 1000 (stable sort)
    expect(result.current.results.data[2].id).toBe("4");
    expect(result.current.results.data[3].id).toBe("5");
  });

  test("should preserve input order when scores are equal (stable sort)", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );

    act(() => result.current.search("Developer")); // tied at 1000 pts each; stable sort preserves input order

    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data).toHaveLength(2);
    expect(result.current.results.data[0].id).toBe("2");
    expect(result.current.results.data[1].id).toBe("3");
  });

  test("should score a field match once even if the term appears multiple times", () => {
    const duplicateTermApp = {
      id: "9",
      position: "React React", // "React" appears twice but includes() returns true once → scores 1000, not 2000
      company: "TestCorp",
      notes: "",
      other: "",
    };
    const { result } = renderHook(() =>
      useSearch([...mockApplications, duplicateTermApp], ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("React"));

    expect(result.current.results.success).toBe(true);
    // All React apps score 1000; stable sort puts app1 (index 0) before app9 (last index)
    expect(result.current.results.data[0].id).toBe("1");
    expect(result.current.results.data.some((app) => app.id === "9")).toBe(true);
  });
});

describe("useSearch - Single Word Fuzzy Matching", () => {
  // fuzzyMatch compares the query term against the entire field value string.
  // Single-word field values ensure Levenshtein distance reflects word similarity only.
  const fuzzyWordData = [
    { id: "fw1", term: "React" },
    { id: "fw2", term: "Google" },
    { id: "fw3", term: "Engineer" },
  ];

  test("should find match with Levenshtein distance=1 (substitution)", () => {
    const { result } = renderHook(() =>
      useSearch(fuzzyWordData, ["term"], { fuzzy: true }),
    );
    act(() => result.current.search("Reect")); // "reect" vs "react" = distance 1
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("fw1");
  });

  test("should find match with Levenshtein distance=1 (deletion)", () => {
    const { result } = renderHook(() =>
      useSearch(fuzzyWordData, ["term"], { fuzzy: true }),
    );
    act(() => result.current.search("Rect")); // "rect" vs "react" = distance 1 (missing 'a')
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("fw1");
  });

  test("should find match with Levenshtein distance=1 (insertion)", () => {
    const { result } = renderHook(() =>
      useSearch(fuzzyWordData, ["term"], { fuzzy: true }),
    );
    act(() => result.current.search("Reacct")); // "reacct" vs "react" = distance 1 (extra 'c')
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("fw1");
  });

  test("should find match at Levenshtein distance=2 boundary", () => {
    const { result } = renderHook(() =>
      useSearch(fuzzyWordData, ["term"], { fuzzy: true }),
    );
    act(() => result.current.search("Rcaact")); // "rcaact" vs "react" = distance 2
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("fw1");
  });

  test("should NOT find match when Levenshtein distance exceeds threshold of 2", () => {
    const { result } = renderHook(() =>
      useSearch(fuzzyWordData, ["term"], { fuzzy: true }),
    );
    act(() => result.current.search("Rxxxct")); // "rxxxct" vs "react" = distance 3
    expect(result.current.results.success).toBe(false);
  });
});

describe("useSearch - Multi-Word Fuzzy Matching", () => {
  const twoFieldData = [
    { id: "tf1", term1: "React", term2: "Google" },
    { id: "tf2", term1: "Engineer", term2: "Microsoft" },
  ];

  test("should apply fuzzy AND logic: all words must match (exact or fuzzy)", () => {
    const { result } = renderHook(() =>
      useSearch(twoFieldData, ["term1", "term2"], { fuzzy: true }),
    );
    // "Reect" fuzzy-matches "React" (distance 1), "Gogle" fuzzy-matches "Google" (distance 1)
    act(() => result.current.search("Reect Gogle"));
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("tf1");
  });

  test("should mix exact and fuzzy terms in same query", () => {
    const { result } = renderHook(() =>
      useSearch(twoFieldData, ["term1", "term2"], { fuzzy: true }),
    );
    act(() => result.current.search("React Gogle")); // "React" exact, "Gogle" fuzzy-matches "Google"
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("tf1");
  });

  test("should return no results when any term exceeds the fuzzy threshold", () => {
    const { result } = renderHook(() =>
      useSearch(twoFieldData, ["term1", "term2"], { fuzzy: true }),
    );
    act(() => result.current.search("React Xyzabc")); // "Xyzabc" is distance >2 from all field values
    expect(result.current.results.success).toBe(false);
  });
});

describe("useSearch - Edge Cases", () => {
  test("should return success:false for empty search string", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search(""));
    expect(result.current.results.success).toBe(false);
    expect(result.current.results.data).toHaveLength(0);
  });

  test("should skip null/undefined field values without crashing", () => {
    const nullFieldApp = { id: "n1", position: null as unknown as string, company: "Google", notes: "", other: "" };
    const { result } = renderHook(() =>
      useSearch([nullFieldApp], ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("Google"));
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("n1");
  });

  test("should convert numeric field values to string for matching", () => {
    const numericApp = { id: "num1", position: 12345 as unknown as string, company: "", notes: "", other: "" };
    const { result } = renderHook(() =>
      useSearch([numericApp], ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("123"));
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("num1");
  });

  test("should strip special characters from search term before matching", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("@React#")); // stripped to "React"
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("1");
  });

  test("should strip special characters from field values before matching", () => {
    const punctuatedApp = { id: "p1", position: "", company: "Google, Inc.", notes: "", other: "" };
    const { result } = renderHook(() =>
      useSearch([punctuatedApp], ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("Google"));
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("p1");
  });

  test("should return success:false when data array is empty", () => {
    const { result } = renderHook(() =>
      useSearch([] as typeof mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("React"));
    expect(result.current.results.success).toBe(false);
    expect(result.current.results.data).toHaveLength(0);
  });
});

describe("useSearch - Keys Configuration", () => {
  test("should only search fields listed in the keys array", () => {
    const data = [{ id: "1", searchable: "React", hidden: "Kubernetes" }];
    const { result } = renderHook(() =>
      useSearch(data, ["searchable"]),
    );
    act(() => result.current.search("Kubernetes")); // "hidden" is not in keys
    expect(result.current.results.success).toBe(false);
  });

  test("should rank items higher when their match is in an earlier key", () => {
    const data = [
      { id: "1", primary: "React", secondary: "Other" },
      { id: "2", primary: "Other", secondary: "React" },
    ];
    // keys=["primary","secondary"], n=2, factor=10: primary=10, secondary=1
    const { result } = renderHook(() =>
      useSearch(data, ["primary", "secondary"]),
    );
    act(() => result.current.search("React"));
    expect(result.current.results.data[0].id).toBe("1"); // primary match (10) > secondary match (1)
    expect(result.current.results.data[1].id).toBe("2");
  });

  test("should respect a custom factor when computing weights", () => {
    // factor=2, 3 keys: a=2^2=4, b=2^1=2, c=2^0=1
    const data = [
      { id: "1", a: "React", b: "", c: "" },
      { id: "2", a: "", b: "React", c: "" },
      { id: "3", a: "", b: "", c: "React" },
    ];
    const { result } = renderHook(() =>
      useSearch(data, ["a", "b", "c"], { factor: 2 }),
    );
    act(() => result.current.search("React"));
    expect(result.current.results.data[0].id).toBe("1"); // weight 4
    expect(result.current.results.data[1].id).toBe("2"); // weight 2
    expect(result.current.results.data[2].id).toBe("3"); // weight 1
  });

  test("should not use fuzzy matching by default", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => result.current.search("Reect")); // distance-1 from "React", but fuzzy is off
    expect(result.current.results.success).toBe(false);
  });

  test("should enable fuzzy matching when fuzzy option is true", () => {
    const data = [{ id: "1", term: "React" }];
    const { result } = renderHook(() =>
      useSearch(data, ["term"], { fuzzy: true }),
    );
    act(() => result.current.search("Reect")); // distance-1 from "React"
    expect(result.current.results.success).toBe(true);
  });
});

describe("useSearch - Performance", () => {
  test("should search 1000 items in under 50ms", () => {
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: String(i),
      position: i % 10 === 0 ? "React Engineer" : "Frontend Developer",
      company: "Company",
      notes: "",
      other: "",
    }));
    const { result } = renderHook(() =>
      useSearch(largeDataset, ["position", "company", "notes", "other"]),
    );

    const start = performance.now();
    act(() => result.current.search("React"));
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(50);
    expect(result.current.results.data).toHaveLength(100);
  });

  test("should handle repeated searches without degradation", () => {
    const { result } = renderHook(() =>
      useSearch(mockApplications, ["position", "company", "notes", "other"]),
    );
    act(() => {
      result.current.search("React");
      result.current.search("Engineer");
      result.current.search("React");
    });
    expect(result.current.results.success).toBe(true);
    expect(result.current.results.data[0].id).toBe("1");
  });
});
