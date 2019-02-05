declare const useState: any, useEffect: any, useLayoutEffect: any, useRef: any;
declare const fetchData: (url: any, signal: any, setState: any) => void;
declare const useAbortableFetch: (url: any) => {
    data: any;
    loading: boolean;
    error: any;
    abort: () => any;
};
