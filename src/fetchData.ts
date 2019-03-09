import { Dispatch, SetStateAction } from 'react';

import FetchState from './FetchState';

const fetchData = <T>(
  url: string,
  init: RequestInit,
  signal: AbortSignal,
  setState: Dispatch<SetStateAction<FetchState<T>>>
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
    .then(rsp => rsp.json())
    .then(data => {
      setState((oldState: FetchState<T>) => ({
        ...oldState,
        data,
        loading: oldState.loading - 1
      }));
    })
    .catch((err: Error) => {
      const error = err.name !== 'AbortError' ? err : null;

      setState((oldState: FetchState<T>) => ({
        ...oldState,
        error,
        loading: oldState.loading - 1
      }));
    });
};

export default fetchData;
