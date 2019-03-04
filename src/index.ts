import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  Dispatch,
  SetStateAction
} from 'react';

interface RequestInitStream extends RequestInit {
  streaming?: boolean;
}

type FetchState = {
  data: Response | ArrayBuffer | null;
  loading: number;
  error: Error | null;
  controller: AbortController | null;
};

const concatBuffers = (b1: ArrayBuffer, b2: ArrayBuffer) : ArrayBuffer => {
  const tmp = new Uint8Array(b1.byteLength + b2.byteLength);
  tmp.set(new Uint8Array(b1), 0);
  tmp.set(new Uint8Array(b2), b1.byteLength);
  return tmp;
};

const useAbortableFetch = (
  url: string | null,
  init: RequestInitStream= {}
): {
  data: Response | ArrayBuffer | null;
  loading: boolean;
  error: Error | null;
  abort: () => void;
} => {

  const fetchData = (
    url: string,
    init: RequestInitStream,
    signal: AbortSignal,
    setState: Dispatch<SetStateAction<FetchState>>
  ) => {
    const actualInit: RequestInit = { ...init, signal };

    fetch(url, actualInit)
      .then(rsp =>
        rsp.ok
          ? Promise.resolve(rsp)
          : Promise.reject({
              message: rsp.statusText,
              status: rsp.status
            })
      )
      .then(rsp => {
        if (!init.streaming) return rsp;
        if (!rsp.body) throw new Error('Invalid response body');

        const reader = rsp.body.getReader();
        (async () => {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              break;
            }

            setState((oldState: FetchState) => {
              const oldData = ((oldState.data) ? oldState.data :  new Int8Array()) as ArrayBuffer;
              return {
                ...oldState,
                data: concatBuffers(oldData, value),
              };
            });
          }
        })();
      })
      .then(data => {
        setState((oldState: FetchState) => ({
          ...oldState,
          data: data || null,
          loading: oldState.loading - 1
        }));
      })
      .catch((err: Error) => {
        const error = err.name !== 'AbortError' ? err : null;
        setState((oldState: FetchState) => ({
          ...oldState,
          error,
          loading: oldState.loading - 1
        }));
      });
  };

  const [state, setState] = useState<FetchState>({
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
      setState((oldState: FetchState) => ({
        data: null,
        loading: oldState.loading + 1,
        error: null,
        controller
      }));

      fetchData(url, init, controller.signal, state => {
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
