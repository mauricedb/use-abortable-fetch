import { useState, useEffect, useLayoutEffect, useRef } from 'react';

import FetchState from './FetchState';
import fetchData from './fetchData';

const useAbortableFetch = <T>(
  url: string | null,
  init: RequestInit = {}
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  abort: () => void;
} => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: 0,
    error: null,
    controller: null
  });

  const isMounted = useRef(false);
  useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (url) {
      setState((oldState: FetchState<T>) => ({
        data: null,
        loading: oldState.loading + 1,
        error: null,
        controller
      }));

      fetchData<T>(url, init, controller.signal, state => {
        if (isMounted.current) {
          setState(state);
        }
      });
    }

    return () => controller.abort();
  }, [url]);

  return {
    data: state.data,
    loading: !!state.loading,
    error: state.error,
    abort: () => state.controller && state.controller.abort()
  };
};

export default useAbortableFetch;
