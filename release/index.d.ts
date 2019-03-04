interface RequestInitStream extends RequestInit {
    streaming?: boolean;
}
declare const useAbortableFetch: (url: string | null, init?: RequestInitStream) => {
    data: Response | ArrayBuffer | null;
    loading: boolean;
    error: Error | null;
    abort: () => void;
};
export default useAbortableFetch;
