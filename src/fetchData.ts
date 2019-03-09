import { Dispatch, SetStateAction } from 'react';

import { FetchState } from './types';

const fetchData = async <T>(
  url: string,
  init: RequestInit,
  signal: AbortSignal,
  setState: Dispatch<SetStateAction<FetchState<T>>>
) => {
  const actualInit: RequestInit = { ...init, signal };

  try {
    const rsp = await fetch(url, actualInit);

    if (!rsp.ok) {
      const err: any = new Error(rsp.statusText);
      err.status = rsp.status;
      throw err;
    }
    const data = await rsp.json();

    setState((oldState: FetchState<T>) => ({
      ...oldState,
      data,
      loading: oldState.loading - 1
    }));
  } catch (e) {
    const err: Error = e;

    const error = err.name !== 'AbortError' ? err : null;

    setState((oldState: FetchState<T>) => ({
      ...oldState,
      error,
      loading: oldState.loading - 1
    }));
  }
};

export default fetchData;
