declare type SharedFetchState<T> = {
    data: T | string | null;
    error: Error | null;
};
export declare type FetchState<T> = SharedFetchState<T> & {
    controller: AbortController | null;
    loading: number;
};
export declare type AbortableFetchResult<T> = SharedFetchState<T> & {
    abort: () => void;
    loading: boolean;
};
export {};
