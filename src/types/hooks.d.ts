/**
 * Type definitions for custom React hooks
 */

/**
 * Status enum for async operations
 */
export type AsyncStatus = "idle" | "pending" | "success" | "error";

/**
 * Return type for useAsync hook
 */
export interface AsyncState<T, Args extends unknown[] = any[]> {
  /** Current status of the async operation */
  status: AsyncStatus;
  /** Result data from successful operation */
  data: T | null;
  /** Error from failed operation */
  error: Error | null;
  /** Function to execute the async operation */
  execute: (...args: Args) => Promise<void>;
  /** Reset the state back to idle */
  reset: () => void;
}
