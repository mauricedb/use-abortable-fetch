const { useState, useEffect, useLayoutEffect, useRef } = require('react');

const fetchData = (url, signal, setState) => {
  fetch(url, { signal })
    .then(
      rsp =>
        rsp.ok
          ? rsp
          : Promise.reject({ message: rsp.statusText, status: rsp.status })
    )
    .then(rsp => rsp.json())
    .then(data => {
      setState(oldState => ({
        ...oldState,
        data,
        loading: oldState.loading - 1
      }));
    })
    .catch(err => {
      const error = err.name !== 'AbortError' ? err : null;

      setState(oldState => ({
        ...oldState,
        error,
        loading: oldState.loading - 1
      }));
    });
};

const useAbortableFetch = url => {
  const [state, setState] = useState({
    data: null,
    loading: 0,
    error: null,
    controller: null
  });

  const isMounted = useRef(false);
  useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(
    () => {
      const controller = new AbortController();
      setState(oldState => ({
        data: null,
        loading: oldState.loading + 1,
        error: null,
        controller
      }));

      fetchData(url, controller.signal, state => {
        if (isMounted.current) {
          setState(state);
        }
      });

      return () => controller.abort();
    },
    [url]
  );

  return {
    data: state.data,
    loading: !!state.loading,
    error: state.error,
    abort: () => state.controller && state.controller.abort()
  };
};

module.exports = useAbortableFetch;
