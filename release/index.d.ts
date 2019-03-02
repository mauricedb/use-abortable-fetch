interface RequestInitStreaming extends RequestInit {
    streaming?: boolean;
}
declare const useAbortableFetch: <T>(url: string | null, init?: RequestInitStreaming) => {
    data: T | Uint8Array | null;
    loading: boolean;
    error: Error | null;
    abort: () => void;
};
export default useAbortableFetch;
