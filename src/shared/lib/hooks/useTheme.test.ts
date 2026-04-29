import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
    vi.clearAllMocks();
    document.documentElement.className = "";
  });

  afterEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: originalMatchMedia,
    });
    document.documentElement.className = "";
  });

  describe("initialization", () => {
    it("should initialize with localStorage value (dark)", () => {
      const spy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue("dark");
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe("dark");
      spy.mockRestore();
    });

    it("should initialize with localStorage value (light)", () => {
      const spy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue("light");
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe("light");
      spy.mockRestore();
    });

    it("should fall back to system preference when localStorage is null", () => {
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
      });
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe("dark");
      getSpy.mockRestore();
    });

    it("should fall back to system preference (light) when localStorage is null", () => {
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockReturnValue({ matches: false } as MediaQueryList),
      });
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe("light");
      getSpy.mockRestore();
    });

    it("should ignore invalid localStorage values and use system preference", () => {
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue("invalid");
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
      });
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe("dark");
      getSpy.mockRestore();
    });

    it("should return object with theme and toggleTheme function", () => {
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue("light");
      const { result } = renderHook(() => useTheme());
      expect(result.current).toHaveProperty("theme");
      expect(result.current).toHaveProperty("toggleTheme");
      expect(typeof result.current.toggleTheme).toBe("function");
      getSpy.mockRestore();
    });
  });

  describe("toggleTheme", () => {
    it("should toggle from light to dark", () => {
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue("light");
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe("light");
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe("dark");
      getSpy.mockRestore();
    });

    it("should toggle from dark to light", () => {
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue("dark");
      const { result } = renderHook(() => useTheme());
      expect(result.current.theme).toBe("dark");
      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe("light");
      getSpy.mockRestore();
    });

    it("should support multiple consecutive toggles", () => {
      let storageValue = "light";
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => storageValue);
      const setSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
        if (key === "theme") storageValue = value;
      });
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme(); // light → dark
        result.current.toggleTheme(); // dark → light
        result.current.toggleTheme(); // light → dark
      });

      expect(result.current.theme).toBe("dark");
      getSpy.mockRestore();
      setSpy.mockRestore();
    });
  });

  describe("side effects", () => {
    it("should add dark class to HTML when theme is dark", () => {
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue("dark");
      renderHook(() => useTheme());
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      getSpy.mockRestore();
    });

    it("should remove dark class from HTML when theme is light", () => {
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockReturnValue("light");
      renderHook(() => useTheme());
      expect(document.documentElement.classList.contains("dark")).toBe(false);
      getSpy.mockRestore();
    });

    it("should update HTML class when toggling theme", () => {
      let storageValue = "light";
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => storageValue);
      const setSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
        if (key === "theme") storageValue = value;
      });
      const { result } = renderHook(() => useTheme());

      expect(document.documentElement.classList.contains("dark")).toBe(false);

      act(() => {
        result.current.toggleTheme();
      });

      expect(document.documentElement.classList.contains("dark")).toBe(true);

      act(() => {
        result.current.toggleTheme();
      });

      expect(document.documentElement.classList.contains("dark")).toBe(false);

      getSpy.mockRestore();
      setSpy.mockRestore();
    });

    it("should persist theme to localStorage when toggled", () => {
      let storageValue = "light";
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => storageValue);
      const setSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
        if (key === "theme") storageValue = value;
      });
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(localStorage.getItem("theme")).toBe("dark");

      act(() => {
        result.current.toggleTheme();
      });

      expect(localStorage.getItem("theme")).toBe("light");

      getSpy.mockRestore();
      setSpy.mockRestore();
    });

    it("should persist initial theme to localStorage on mount", () => {
      let storageValue: string | null = null;
      const getSpy = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => storageValue);
      const setSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation((key, value) => {
        if (key === "theme") storageValue = value;
      });

      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockReturnValue({ matches: true } as MediaQueryList),
      });

      renderHook(() => useTheme());

      // Should persist the derived theme (dark from system preference)
      expect(localStorage.getItem("theme")).toBe("dark");

      getSpy.mockRestore();
      setSpy.mockRestore();
    });
  });
});
