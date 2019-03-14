import { Dispatch, SetStateAction } from 'react';

import { FetchState } from './types';
import isJSON from './isJSON';

const fetchData = async <T>(
  url: string,
  init: RequestInit,
  signal: AbortSignal,
  setState: Dispatch<SetStateAction<FetchState<T>>>
): Promise<void> => {
  const actualInit: RequestInit = { ...init, signal };

  try {
    const rsp = await fetch(url, actualInit);

    if (!rsp.ok) {
      const err: any = new Error(rsp.statusText);
      err.status = rsp.status;
      throw err;
    }
    let data: T | string | null = null;

    const contentTypeHeader = rsp.headers.get('content-type');
    if (isJSON(contentTypeHeader)) {
      data = await rsp.json();
    } else {
      data = await rsp.text();
    }

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
