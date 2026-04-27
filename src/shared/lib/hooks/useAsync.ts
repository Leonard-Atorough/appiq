import { useState, useEffect, useCallback, useRef } from "react";

export interface AsyncState<T> {
  loading: boolean;
  status: "idle" | "pending" | "success" | "error";
  error: Error | null;
  data: T | null;
}

interface UseAsyncOptions<T> {
  /** Whether to automatically execute the async function on mount or when dependencies change */
  autoExecute?: boolean;
  /** Optional callback for successful execution */
  onSuccess?: (data: T) => void;
  /** Optional callback for error handling */
  onError?: (error: Error) => void;
  /** Optional callback for when the async function settles (either success or error) */
  onSettle?: () => void;
}

/**
 * Custom React hook to manage the state of an asynchronous operation.
 * @param asyncFunction The asynchronous function to execute
 * @param options Optional configuration for auto execution and callbacks
 * @returns An object containing the async state and an execute function to manually trigger the async operation
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  options?: UseAsyncOptions<T>,
): AsyncState<T> & { execute: () => Promise<T> };

export function useAsync<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  options?: UseAsyncOptions<T>,
): AsyncState<T> & { execute: (...args: Args) => Promise<T> };

export function useAsync<T, Args extends unknown[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions<T> = {},
) {
  const { autoExecute = true, onSuccess, onError, onSettle } = options;

  const [state, setState] = useState<AsyncState<T>>({
    loading: autoExecute,
    status: autoExecute ? "pending" : "idle",
    error: null,
    data: null,
  });

  // Use refs to avoid including callbacks in dependency array
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onSettleRef = useRef(onSettle);
  const hasExecutedRef = useRef(false);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onSettleRef.current = onSettle;
  }, [onSuccess, onError, onSettle]);

  const execute = useCallback(
    async (...args: Args) => {
      setState({ loading: true, status: "pending", error: null, data: null });
      try {
        const result = await asyncFunction(...args);
        setState({ loading: false, status: "success", error: null, data: result });
        onSuccessRef.current?.(result);
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setState({ loading: false, status: "error", error: err, data: null });
        onErrorRef.current?.(err);
        throw err;
      } finally {
        onSettleRef.current?.();
      }
    },
    [asyncFunction],
  );

  useEffect(() => {
    if (autoExecute && !hasExecutedRef.current) {
      hasExecutedRef.current = true;
      (async () => {
        try {
          await (execute as () => Promise<T>)();
        } catch {
          // Errors are already handled in execute's catch block
        }
      })();
    } else if (!autoExecute) {
      hasExecutedRef.current = false;
    }
  }, [autoExecute, execute]);

  return { ...state, execute };
}
