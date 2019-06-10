import { useState, useEffect, useLayoutEffect, useRef } from 'react';

import { FetchState, AbortableFetchResult } from './types';
import fetchData from './fetchData';

const useAbortableFetch = <T>(
  url: string | null,
  init?: RequestInit
): AbortableFetchResult<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: 0,
    error: null,
    controller: null
  });

  const isMounted = useRef(false);
  useLayoutEffect((): (() => void) => {
    isMounted.current = true;
    return (): void => {
      isMounted.current = false;
    };
  }, []);

  useEffect((): (() => void) => {
    const controller = new AbortController();
    if (url) {
      fetchData<T>(url, init, controller, (state): void => {
        if (isMounted.current) {
          setState(state);
        }
      });
    }

    return (): void => controller.abort();
  }, [init, url]);

  return {
    data: state.data,
    loading: !!state.loading,
    error: state.error,
    abort: (): null | void => state.controller && state.controller.abort()
  };
};

export default useAbortableFetch;
