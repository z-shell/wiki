/**
 * Type declarations for custom hooks
 */

declare module "@site/src/hooks/useAsync" {
  import type {AsyncState} from "@site/src/types/hooks";
  import type {DependencyList} from "react";

  export function useAsync<T = unknown, Args extends unknown[] = any[]>(
    asyncFunction: (...args: Args) => Promise<T>,
    immediate?: boolean,
    dependencies?: DependencyList,
  ): AsyncState<T, Args>;
}
