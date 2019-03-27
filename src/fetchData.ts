import { Dispatch, SetStateAction } from 'react';

import { FetchState } from './types';
import isJSON from './isJSON';
import { CustomConsole } from '@jest/console';

const fetchData = async <T>(
  url: string,
  init: RequestInit = {},
  signal: AbortSignal,
  setState: Dispatch<SetStateAction<FetchState<T>>>
): Promise<void> => {
  const actualInit: RequestInit = { ...init, signal };

  try {
    const rsp = await fetch(url, actualInit);
    const contentTypeHeader = rsp.headers.get('content-type');

    if (contentTypeHeader) {
      let data: T | string | null = null;

      if (isJSON(contentTypeHeader)) {
        data = await rsp.json();
      } else {
        data = await rsp.text();
      }
      setState((oldState: FetchState<T>) => ({
        ...oldState,
        data
      }));
    }

    if (!rsp.ok) {
      const err: any = new Error(rsp.statusText);
      err.status = rsp.status;
      throw err;
    }

    setState((oldState: FetchState<T>) => ({
      ...oldState,
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
