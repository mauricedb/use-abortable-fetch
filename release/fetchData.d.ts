import { Dispatch, SetStateAction } from 'react';
import { FetchState } from './types';
declare const fetchData: <T>(url: string, init: RequestInit | undefined, controller: AbortController, setState: Dispatch<SetStateAction<FetchState<T>>>) => Promise<void>;
export default fetchData;
