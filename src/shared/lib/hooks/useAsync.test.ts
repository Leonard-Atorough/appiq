import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useAsync } from "./useAsync";

describe("useAsync", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("should start with idle state when autoExecute is false", () => {
      const asyncFn = vi.fn().mockResolvedValue("data");
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      expect(result.current.loading).toBe(false);
      expect(result.current.status).toBe("idle");
      expect(result.current.error).toBeNull();
      expect(result.current.data).toBeNull();
    });

    it("should start with pending state when autoExecute is true (default)", () => {
      const asyncFn = vi.fn().mockResolvedValue("data");
      const { result } = renderHook(() => useAsync(asyncFn));

      expect(result.current.loading).toBe(true);
      expect(result.current.status).toBe("pending");
      expect(result.current.error).toBeNull();
      expect(result.current.data).toBeNull();
    });
  });

  describe("auto execution", () => {
    it("should execute async function on mount when autoExecute is true", async () => {
      const asyncFn = vi.fn().mockResolvedValue("test data");
      const { result } = renderHook(() => useAsync(asyncFn));

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(asyncFn).toHaveBeenCalledOnce();
      expect(result.current.data).toBe("test data");
      expect(result.current.loading).toBe(false);
    });

    it("should not execute async function on mount when autoExecute is false", async () => {
      const asyncFn = vi.fn().mockResolvedValue("test data");
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      // Give it time to check if it's executing
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(asyncFn).not.toHaveBeenCalled();
      expect(result.current.status).toBe("idle");
    });

    it("should only auto-execute once even if dependencies change", async () => {
      const asyncFn = vi.fn().mockResolvedValue("test data");
      const { result, rerender } = renderHook(({ fn }) => useAsync(fn), {
        initialProps: { fn: asyncFn },
      });

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      const callCountAfterFirst = asyncFn.mock.calls.length;

      // Rerender with same function
      rerender({ fn: asyncFn });

      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(asyncFn.mock.calls.length).toBe(callCountAfterFirst);
    });
  });

  describe("manual execution", () => {
    it("should execute async function when execute is called", async () => {
      const asyncFn = vi.fn().mockResolvedValue("manual execution data");
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(asyncFn).toHaveBeenCalledOnce();
      expect(result.current.data).toBe("manual execution data");
    });

    it("should pass arguments to async function", async () => {
      const asyncFn = vi.fn((a: number, b: string) => Promise.resolve(`${a}-${b}`));
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      act(() => {
        result.current.execute(42, "test");
      });

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(asyncFn).toHaveBeenCalledWith(42, "test");
      expect(result.current.data).toBe("42-test");
    });

    it("should allow multiple manual executions", async () => {
      const asyncFn = vi.fn().mockResolvedValue("result");
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(asyncFn).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("success state", () => {
    it("should update state to success when async function resolves", async () => {
      const asyncFn = vi.fn().mockResolvedValue("success data");
      const { result } = renderHook(() => useAsync(asyncFn));

      expect(result.current.loading).toBe(true);
      expect(result.current.status).toBe("pending");

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.data).toBe("success data");
    });

    it("should call onSuccess callback when execution succeeds", async () => {
      const onSuccess = vi.fn();
      const asyncFn = vi.fn().mockResolvedValue("success data");
      const { result } = renderHook(() => useAsync(asyncFn, { onSuccess }));

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(onSuccess).toHaveBeenCalledWith("success data");
    });

    it("should call onSettle callback when execution succeeds", async () => {
      const onSettle = vi.fn();
      const asyncFn = vi.fn().mockResolvedValue("success data");
      const { result } = renderHook(() => useAsync(asyncFn, { onSettle }));

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(onSettle).toHaveBeenCalled();
    });
  });

  describe("error state", () => {
    it("should update state to error when async function rejects", async () => {
      const testError = new Error("test error");
      const asyncFn = vi.fn().mockRejectedValue(testError);
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: true }));

      expect(result.current.loading).toBe(true);
      expect(result.current.status).toBe("pending");

      await waitFor(() => {
        expect(result.current.status).toBe("error");
      });

      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(testError);
      expect(result.current.data).toBeNull();
    });

    it("should convert non-Error rejections to Error", async () => {
      const asyncFn = vi.fn().mockRejectedValue("string error");
      const { result } = renderHook(() => useAsync(asyncFn));

      await waitFor(() => {
        expect(result.current.status).toBe("error");
      });

      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe("string error");
    });

    it("should call onError callback when execution fails", async () => {
      const onError = vi.fn();
      const testError = new Error("test error");
      const asyncFn = vi.fn().mockRejectedValue(testError);
      const { result } = renderHook(() => useAsync(asyncFn, { onError }));

      await waitFor(() => {
        expect(result.current.status).toBe("error");
      });

      expect(onError).toHaveBeenCalledWith(testError);
    });

    it("should call onSettle callback when execution fails", async () => {
      const onSettle = vi.fn();
      const asyncFn = vi.fn().mockRejectedValue(new Error("test error"));
      const { result } = renderHook(() => useAsync(asyncFn, { onSettle }));

      await waitFor(() => {
        expect(result.current.status).toBe("error");
      });

      expect(onSettle).toHaveBeenCalled();
    });

    it("should allow recovery after error", async () => {
      const asyncFn = vi
        .fn()
        .mockRejectedValueOnce(new Error("first error"))
        .mockResolvedValueOnce("recovered data");

      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      // First execution fails
      act(() => {
        result.current.execute().catch(() => {
          // Ignore caught error
        });
      });

      await waitFor(() => {
        expect(result.current.status).toBe("error");
      });

      expect(result.current.data).toBeNull();

      // Second execution succeeds
      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(result.current.data).toBe("recovered data");
      expect(result.current.error).toBeNull();
    });
  });

  describe("state transitions", () => {
    it("should transition from idle to pending to success", async () => {
      const asyncFn = vi.fn().mockResolvedValue("data");
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      expect(result.current.status).toBe("idle");

      act(() => {
        result.current.execute();
      });

      expect(result.current.status).toBe("pending");
      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(result.current.loading).toBe(false);
    });

    it("should reset state when execute is called after previous success", async () => {
      const asyncFn = vi.fn().mockResolvedValueOnce("first").mockResolvedValueOnce("second");

      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      // First execution
      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.data).toBe("first");
      });

      expect(result.current.error).toBeNull();

      // Second execution
      act(() => {
        result.current.execute();
      });

      expect(result.current.data).toBeNull(); // Data is cleared during pending
      expect(result.current.error).toBeNull(); // Error cleared during pending
      expect(result.current.loading).toBe(true);
      expect(result.current.status).toBe("pending");

      await waitFor(() => {
        expect(result.current.data).toBe("second");
      });
    });
  });

  describe("callback updates", () => {
    it("should update callback references without re-executing", async () => {
      const firstOnSuccess = vi.fn();
      const secondOnSuccess = vi.fn();
      const asyncFn = vi.fn().mockResolvedValue("data");

      const { result, rerender } = renderHook(
        ({ onSuccess }) => useAsync(asyncFn, { onSuccess, autoExecute: false }),
        { initialProps: { onSuccess: firstOnSuccess } },
      );

      // First execute
      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(firstOnSuccess).toHaveBeenCalledWith("data");
      expect(secondOnSuccess).not.toHaveBeenCalled();

      // Update callback
      rerender({ onSuccess: secondOnSuccess });

      // Second execute with new callback
      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(secondOnSuccess).toHaveBeenCalledWith("data");
      });

      expect(asyncFn).toHaveBeenCalledTimes(2);
    });
  });

  describe("type safety", () => {
    it("should work with generic types", async () => {
      interface User {
        id: number;
        name: string;
      }

      const asyncFn = vi.fn().mockResolvedValue({
        id: 1,
        name: "John",
      } as User);

      const { result } = renderHook(() => useAsync(asyncFn));

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect((result.current.data as { id: number; name: string }).id).toBe(1);
      expect((result.current.data as { id: number; name: string }).name).toBe("John");
    });

    it("should work with no arguments function", async () => {
      const asyncFn = vi.fn(() => Promise.resolve("no args"));
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      act(() => {
        result.current.execute();
      });

      await waitFor(() => {
        expect(result.current.data).toBe("no args");
      });
    });

    it("should work with multiple arguments", async () => {
      const asyncFn = vi.fn((a: number, b: number, c: string) => Promise.resolve(`${a + b}:${c}`));

      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      act(() => {
        result.current.execute(10, 20, "sum");
      });

      await waitFor(() => {
        expect(result.current.data).toBe("30:sum");
      });
    });
  });

  describe("execute function return value", () => {
    it("should return resolved value from execute", async () => {
      const asyncFn = vi.fn().mockResolvedValue("returned value");
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      let returnedValue: unknown;
      act(() => {
        result.current.execute().then((val: unknown) => {
          returnedValue = val;
        });
      });

      await waitFor(() => {
        expect(returnedValue).toBe("returned value");
      });
    });

    it("should throw error from execute", async () => {
      const testError = new Error("execution error");
      const asyncFn = vi.fn().mockRejectedValue(testError);
      const { result } = renderHook(() => useAsync(asyncFn, { autoExecute: false }));

      let thrownError: Error | undefined;
      act(() => {
        result.current.execute().catch((err) => {
          thrownError = err;
        });
      });

      await waitFor(() => {
        expect(thrownError).toBe(testError);
      });
    });
  });
});
