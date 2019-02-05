declare const useAbortableFetch: <T>(url: string, init?: RequestInit) => {
    data: T;
    loading: boolean;
    error: Error;
    abort: () => void;
};
export default useAbortableFetch;
