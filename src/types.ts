export type FetchState<T> = {
  data: T | null;
  loading: number;
  error: Error | null;
  controller: AbortController | null;
};
