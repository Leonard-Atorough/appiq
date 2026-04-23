import { useState, useEffect, useCallback } from "react";

export interface AsyncState<T> {
  loading: boolean;
  status: "idle" | "pending" | "success" | "error";
  error: Error | null;
  data: T | null;
}

interface UseAsyncOptions {
  autoExecute?: boolean; // Whether to automatically execute the async function on mount or when dependencies change
  onSuccess?: (data: any) => void; // Optional callback for successful execution
  onError?: (error: Error) => void; // Optional callback for error handling
  onSettle?: () => void; // Optional callback for when the async function settles (either success or error)
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  options?: UseAsyncOptions,
): AsyncState<T> & { execute: () => Promise<T> };

export function useAsync<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options?: UseAsyncOptions,
): AsyncState<T> & { execute: (...args: Args) => Promise<T> };

export function useAsync<T, Args extends unknown[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions = {},
  dependencies: unknown[] = [],
) {
  const { autoExecute = true, onSuccess, onError, onSettle } = options;

  const [state, setState] = useState<AsyncState<T>>({
    loading: autoExecute,
    status: autoExecute ? "pending" : "idle",
    error: null,
    data: null,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState({ loading: true, status: "pending", error: null, data: null });
      try {
        const result = await asyncFunction(...args);
        setState({ loading: false, status: "success", error: null, data: result });
        onSuccess?.(result);
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setState({ loading: false, status: "error", error: err, data: null });
        onError?.(err);
        throw err;
      } finally {
        onSettle?.();
      }
    },
    [asyncFunction, onSuccess, onError, onSettle],
  );

  useEffect(() => {
    if (autoExecute) {
      (execute as any)();
    }
  }, [execute, autoExecute, ...dependencies]);

  return { ...state, execute };
}
