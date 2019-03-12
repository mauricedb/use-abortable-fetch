import { AbortableFetchResult } from './types';
declare const useAbortableFetch: <T>(url: string | null, init?: RequestInit) => AbortableFetchResult<T>;
export default useAbortableFetch;
