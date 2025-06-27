import {useState, useCallback, useEffect, useRef, DependencyList} from "react";
import type {AsyncStatus, AsyncState} from "../types/hooks";

/**
 * Hook for handling asynchronous operations with status tracking
 *
 * @param asyncFunction The async function to execute
 * @param immediate Whether to execute the function immediately
 * @param dependencies Dependencies that trigger re-execution when changed
 * @returns AsyncState object with status, data, error, and control functions
 *
 * @example
 * // Basic usage
 * const fetchUser = async (id: string) => {
 *   const response = await fetch(`/api/users/${id}`);
 *   return response.json();
 * };
 *
 * const { status, data, error, execute } = useAsync(fetchUser);
 *
 * // Execute when needed
 * const handleClick = () => {
 *   execute(userId);
 * };
 */
export function useAsync<T = unknown, Args extends unknown[] = any[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  immediate = false,
  dependencies: DependencyList = [],
): AsyncState<T, Args> {
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Use ref to track if the component is mounted
  const isMounted = useRef(true);

  // Reset state
  const reset = useCallback(() => {
    setStatus("idle");
    setData(null);
    setError(null);
  }, []);

  // Execute the async function
  const execute = useCallback(
    async (...args: Args): Promise<void> => {
      setStatus("pending");
      setData(null);
      setError(null);

      try {
        const result = await asyncFunction(...args);

        // Only update state if component is still mounted
        if (isMounted.current) {
          setData(result);
          setStatus("success");
        }
      } catch (error) {
        // Only update state if component is still mounted
        if (isMounted.current) {
          setError(error instanceof Error ? error : new Error(String(error)));
          setStatus("error");
        }
      }
    },
    [asyncFunction],
  );

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      // Using empty array cast to Args to handle immediate execution
      // This is safe because we're only using it when immediate is true
      // and the expectation is that the function can be called with no arguments
      void execute(...([] as unknown as Args));
    }

    return () => {
      isMounted.current = false;
    };
  }, [immediate, ...dependencies]);

  return {status, data, error, execute, reset};
}
