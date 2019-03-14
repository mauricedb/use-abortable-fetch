import { Dispatch, SetStateAction } from 'react';
import { FetchState } from './types';
declare const fetchData: <T>(url: string, init: RequestInit | undefined, signal: AbortSignal, setState: Dispatch<SetStateAction<FetchState<T>>>) => Promise<void>;
export default fetchData;
