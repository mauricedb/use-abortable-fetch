type SharedFetchState<T> = {
  data: T | string | null;
  error: Error | null;
};

export type FetchState<T> = SharedFetchState<T> & {
  controller: AbortController | null;
  loading: number;
};

export type AbortableFetchResult<T> = SharedFetchState<T> & {
  abort: () => void;
  loading: boolean;
};
