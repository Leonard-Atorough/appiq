import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useApplicationActions } from "./useApplicationActions";
import { ToastProvider } from "@/app/providers/ToastProvider";

/**
 * useApplicationActions Tests
 *
 * These tests verify that the hook:
 * 1. Creates all four operations (create, update, delete, move)
 * 2. Returns proper async operation signatures
 *
 * All tests are wrapped in ToastProvider since the hook
 * unconditionally calls useToast (rules of hooks).
 */

describe("useApplicationActions", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ToastProvider>{children}</ToastProvider>
  );

  it("should export all four operations", () => {
    const { result } = renderHook(() => useApplicationActions(), { wrapper });
    const { createAsync, updateAsync, deleteAsync, moveAsync } = result.current;

    expect(createAsync).toBeDefined();
    expect(updateAsync).toBeDefined();
    expect(deleteAsync).toBeDefined();
    expect(moveAsync).toBeDefined();
  });

  it("should have execute methods on all operations", () => {
    const { result } = renderHook(() => useApplicationActions(), { wrapper });
    const { createAsync, updateAsync, deleteAsync, moveAsync } = result.current;

    expect(typeof createAsync.execute).toBe("function");
    expect(typeof updateAsync.execute).toBe("function");
    expect(typeof deleteAsync.execute).toBe("function");
    expect(typeof moveAsync.execute).toBe("function");
  });
});
