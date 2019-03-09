type FetchState<T> = {
    data: T | null;
    loading: number;
    error: null | Error;
    controller: AbortController | null;
  };

  export default FetchState